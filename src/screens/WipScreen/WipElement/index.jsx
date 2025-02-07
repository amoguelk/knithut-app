import React from 'react';
// Components
import { View, TextInput, Text, KeyboardAvoidingView } from 'react-native';
import RowCounter from 'screens/WipScreen/WipElement/RowCounter';
import dayjs from 'dayjs';
// Storage
import { storageKeys, useStorage } from 'hooks/useStorage';
// Documentation
import PropTypes from 'prop-types';
// Translation
import { useTranslation } from 'react-i18next';
// Styling
import { useTheme } from 'contexts/ThemeContext';
import getStyles from './styles';

const WipElement = ({
  route: {
    params: { name, key },
  },
}) => {
  const [pattern, setPattern] = useStorage(
    `${storageKeys.APP.WIPS}.${key}.pattern`,
    {
      name,
      section: '',
      row: 0,
      notes: '',
    },
  );
  const { t } = useTranslation();
  const {
    theme: { colors },
  } = useTheme();
  const styles = getStyles(colors);

  return (
    <KeyboardAvoidingView behavior="height" style={styles.container}>
      <View style={[styles.subContainer, styles.infoContainer]}>
        <RowCounter
          row={pattern.row}
          setRow={(newRow) => setPattern((prev) => ({ ...prev, row: newRow }))}
        />
        <View style={styles.patternInfo}>
          <TextInput
            style={[styles.text, styles.subtitle, styles.simpleInput]}
            onChangeText={(text) =>
              setPattern((prev) => ({ ...prev, name: text }))
            }
            defaultValue={pattern.name}
            placeholder={t('wips:pattern_name')}
            maxLength={40}
            placeholderTextColor={colors.text}
          />
          <TextInput
            style={[styles.text, styles.simpleInput]}
            onChangeText={(text) =>
              setPattern((prev) => ({ ...prev, section: text }))
            }
            defaultValue={pattern.section}
            placeholder={t('wips:pattern_section')}
            multiline
            numberOfLines={2}
            maxLength={50}
            placeholderTextColor={colors.text}
          />
        </View>
      </View>
      <View style={styles.subContainer}>
        <Text style={[styles.text, styles.subtitle]}>{t('wips:notes')}</Text>
        <TextInput
          style={styles.notesInput}
          onChangeText={(text) =>
            setPattern((prev) => ({ ...prev, notes: text }))
          }
          defaultValue={pattern.notes}
          multiline
          maxLength={500}
        />
      </View>
    </KeyboardAvoidingView>
  );
};

WipElement.propTypes = {
  /**
   * Parameters passed to the element through the tab navigation
   */
  route: PropTypes.shape({
    params: PropTypes.shape({
      name: PropTypes.string.isRequired,
      key: PropTypes.string.isRequired,
    }).isRequired,
  }).isRequired,
};

export default WipElement;
