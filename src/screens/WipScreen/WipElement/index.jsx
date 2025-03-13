import React, { useState, useEffect } from 'react';
// Components
import {
  View,
  TextInput,
  Text,
  KeyboardAvoidingView,
  ActivityIndicator,
} from 'react-native';
import RowCounter from 'screens/WipScreen/WipElement/RowCounter';
import Stopwatch from 'screens/WipScreen/WipElement/Stopwatch';
import { Button } from 'components/buttons';
import { DeleteModal } from 'components/modals';
// Storage
import { storageKeys, useStorage } from 'hooks/useStorage';
// Documentation
import PropTypes from 'prop-types';
// Translation
import { useTranslation } from 'react-i18next';
// Styling
import { useTheme } from 'contexts/ThemeContext';
import getStyles from './styles';
import useWip from './useWip';

const WipElement = ({
  route: {
    params: { id },
  },
  navigation,
}) => {
  const [wips, setWips] = useStorage(storageKeys.APP.WIPS, {});
  const {
    pattern,
    handleSetPattern,
    stopwatch,
    handleSetStopwatch,
    handleDeleteWip,
  } = useWip(wips, setWips, id);
  const [isDeleteModalVisible, setIsDeleteModalVisible] = useState(false);
  const { t } = useTranslation();
  const {
    theme: { colors },
  } = useTheme();
  const styles = getStyles(colors);

  useEffect(() => {
    let title = pattern?.name ?? t('basic:loading');
    if (title.length === 0) title = t('wips:no_project_name');
    else if (title.length > 15) title = `${title.slice(0, 15)}...`;
    navigation.setOptions({ title });
  }, [navigation, pattern]);

  const handleDelete = () => {
    handleDeleteWip();
    setIsDeleteModalVisible(false);
  };

  return (
    <KeyboardAvoidingView behavior="height" style={styles.container}>
      {!pattern && <ActivityIndicator size="large" color={colors.text} />}
      {pattern && (
        <>
          <View style={[styles.subContainer, styles.infoContainer]}>
            <RowCounter
              row={pattern.row}
              setRow={(newRow) => handleSetPattern({ ...pattern, row: newRow })}
            />
            <View style={styles.patternInfo}>
              <TextInput
                style={[styles.text, styles.subtitle, styles.simpleInput]}
                onChangeText={(text) =>
                  handleSetPattern({ ...pattern, name: text })
                }
                defaultValue={pattern.name}
                placeholder={t('wips:project_name')}
                maxLength={40}
                placeholderTextColor={colors.text}
                numberOfLines={1}
              />
              <TextInput
                style={[styles.text, styles.simpleInput]}
                onChangeText={(text) =>
                  handleSetPattern({ ...pattern, section: text })
                }
                defaultValue={pattern.section}
                placeholder={t('wips:project_section')}
                multiline
                numberOfLines={2}
                maxLength={50}
                placeholderTextColor={colors.text}
              />
            </View>
          </View>
          <View style={styles.subContainer}>
            <Text style={[styles.text, styles.subtitle]}>
              {t('wips:notes')}
            </Text>
            <TextInput
              style={styles.notesInput}
              onChangeText={(text) =>
                handleSetPattern({ ...pattern, notes: text })
              }
              defaultValue={pattern.notes}
              multiline
              maxLength={500}
            />
          </View>
          <View style={styles.subContainer}>
            <Stopwatch
              handleSetStopwatch={handleSetStopwatch}
              stopwatch={stopwatch}
            />
          </View>
          <Button
            label={t('basic:delete')}
            onPress={() => setIsDeleteModalVisible(true)}
            buttonColor={colors.error}
          />
          <DeleteModal
            isVisible={isDeleteModalVisible}
            setIsVisible={setIsDeleteModalVisible}
            title={t('wips:delete_wip')}
            message={t('wips:delete_wip_detail', { name: pattern.name })}
            deleteAction={handleDelete}
          />
        </>
      )}
    </KeyboardAvoidingView>
  );
};

WipElement.propTypes = {
  /**
   * Parameters passed to the element through the tab navigation
   */
  route: PropTypes.shape({
    params: PropTypes.shape({
      id: PropTypes.string.isRequired,
    }).isRequired,
  }).isRequired,
  navigation: PropTypes.shape({
    setOptions: PropTypes.func.isRequired,
  }).isRequired,
};

export default WipElement;
