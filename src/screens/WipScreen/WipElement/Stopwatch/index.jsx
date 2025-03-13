import React, { useEffect, useRef, useState, useCallback } from 'react';
// Components
import { Text, View } from 'react-native';
import {
  faPause,
  faPlay,
  faRotateLeft,
} from '@fortawesome/free-solid-svg-icons';
import { IconButton } from 'components/buttons';
import { InfoModal } from 'components/modals';
import dayjs from 'dayjs';
// Navigation
import { useFocusEffect } from '@react-navigation/native';
// Translation
import { useTranslation } from 'react-i18next';
// Documentation
import PropTypes from 'prop-types';
// Styling
import { useTheme } from 'contexts/ThemeContext';
import getStyles from './styles';

const Stopwatch = ({ handleSetStopwatch, stopwatch }) => {
  const {
    theme: { colors },
  } = useTheme();
  const styles = getStyles(colors);
  const { t } = useTranslation();
  const { isActive, offset, start = null } = stopwatch;
  const [isSecretModalVisible, setIsSecretModalVisible] = useState(false);
  const ref = useRef(null);

  const padNumbers = (num) => (num < 10 ? `0${num}` : String(num));

  const calculateDisplayTime = useCallback(() => {
    const msElapsed = start ? -dayjs(start).diff() : offset * 1000;
    const sElapsed = Math.floor(msElapsed / 1000);
    const mElapsed = Math.floor(sElapsed / 60);
    const hElapsed = Math.floor(mElapsed / 60);
    if (hElapsed <= 999) {
      return {
        h: padNumbers(hElapsed),
        m: padNumbers(mElapsed % 60),
        s: padNumbers(sElapsed % 60),
      };
    }
    clearInterval(ref.current);
    setIsSecretModalVisible(true);
    return { h: '00', m: '00', s: '00' };
  }, [start, offset]);

  const [displayTime, setDisplayTime] = useState({ h: '--', m: '--', s: '--' });

  useFocusEffect(
    useCallback(() => {
      setDisplayTime(calculateDisplayTime());
    }, []),
  );

  // Create counting interval
  useEffect(() => {
    if (isActive) {
      ref.current = setInterval(() => {
        setDisplayTime(calculateDisplayTime());
      }, 1000);
    }

    return () => {
      clearInterval(ref.current);
    };
  }, [isActive]);

  const handleStartPause = () => {
    if (!isActive) {
      handleSetStopwatch({
        offset,
        start: dayjs().subtract(offset, 'second').toString(),
        isActive: true,
      });
      // await Notifications.scheduleNotificationAsync({
      //   content: {
      //     title: t('stopwatch_running'),
      //     body: t('stopwatch_running_message'),
      //     sticky: true,
      //     autoDismiss: false,
      //   },
      //   trigger: null,
      // });
    } else {
      handleSetStopwatch({
        isActive: false,
        start: null,
        offset: Math.floor(-dayjs(start).diff() / 1000),
      });
      // await Notifications.dismissAllNotificationsAsync();
    }
  };

  const handleReset = () => {
    clearInterval(ref.current);
    handleSetStopwatch({
      isActive: false,
      start: null,
      offset: 0,
    });
    setDisplayTime({ h: '00', m: '00', s: '00' });
    // await Notifications.dismissAllNotificationsAsync();
  };

  return (
    <View>
      <View style={styles.container}>
        <Text style={styles.text}>
          {displayTime.h} : {displayTime.m} : {displayTime.s}
        </Text>
        <View style={styles.actions}>
          <IconButton
            color={colors.text}
            size="lg"
            customStyle={styles.iconButton('lg')}
            icon={isActive ? faPause : faPlay}
            hasRipple
            onPress={handleStartPause}
          />
          <IconButton
            color={colors.text}
            customStyle={styles.iconButton('md')}
            icon={faRotateLeft}
            hasRipple
            onPress={handleReset}
          />
        </View>
      </View>
      <InfoModal
        isVisible={isSecretModalVisible}
        setIsVisible={setIsSecretModalVisible}
        title={t('basic:wow')}
        message={t('wips:stopwatch_limit_message')}
        confirmAction={() => {
          setIsSecretModalVisible(false);
          handleReset();
        }}
      />
    </View>
  );
};

Stopwatch.propTypes = {
  /**
   * An object with all of the stopwatch's information
   */
  stopwatch: PropTypes.shape({
    /**
     * Whether the stopwatch is active (running) or not.
     */
    isActive: PropTypes.bool.isRequired,
    /**
     * An offset in seconds that is added to the stopwatch to keep track of pauses.
     */
    offset: PropTypes.number.isRequired,
    /**
     * The start timestamp.
     */
    start: PropTypes.string,
  }),
  /**
   * Called to modify the stopwatch object
   * @param {object} newStopwatch
   */
  handleSetStopwatch: PropTypes.func.isRequired,
};

export default Stopwatch;
