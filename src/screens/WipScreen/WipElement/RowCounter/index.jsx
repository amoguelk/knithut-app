import React, { useState } from 'react';
// Components
import { Pressable, Text, TextInput, View } from 'react-native';
import { IconButton } from 'components/buttons';
import { ConfirmModal } from 'components/modals';
import { faArrowDown, faArrowUp } from '@fortawesome/free-solid-svg-icons';
// Translation
import { useTranslation } from 'react-i18next';
// Documentation
import PropTypes from 'prop-types';
// Styling
import { useTheme } from 'contexts/ThemeContext';
import getStyles from './styles';

// If its has more than 7 digits, the function that calculates the font size returns 0 (which obviously breaks the app)
const MAX_ROWS = 999999;

const RowCounter = ({ row, setRow }) => {
  const [isModalVisible, setIsModalVisible] = useState(false);
  const [editRow, setEditRow] = useState(row.toString());
  const { t } = useTranslation();
  const {
    theme: { colors },
  } = useTheme();
  const styles = getStyles(colors);

  const handleOpenModal = () => {
    setEditRow(row.toString());
    setIsModalVisible(true);
  };

  const handleNumberEdit = (value = '') => {
    if (value === '') {
      setEditRow('');
      return;
    }
    const numValue = Number(value.replace(/[^0-9]/g, ''));
    if (!Number.isNaN(numValue) && numValue >= 0 && numValue <= MAX_ROWS) {
      setEditRow(numValue.toString());
    }
  };

  const handleEditRow = () => {
    setRow(!Number.isNaN(Number(editRow)) ? Number(editRow) : row);
    setIsModalVisible(false);
  };

  return (
    <View style={styles.rowCounter}>
      <Pressable onPress={handleOpenModal}>
        <Text style={styles.text}>{t('wips:row')}</Text>
        <View style={styles.rowDisplay}>
          <Text style={[styles.text, styles.rowNumber(row.toString().length)]}>
            {row}
          </Text>
        </View>
      </Pressable>
      <View style={styles.buttons}>
        <IconButton
          size="lg"
          color={colors.text}
          icon={faArrowUp}
          customStyle={styles.counterButton(row === MAX_ROWS)}
          onPress={() => setRow(row <= MAX_ROWS ? row + 1 : row)}
          disabled={row === MAX_ROWS}
        />
        <IconButton
          size="lg"
          color={colors.text}
          icon={faArrowDown}
          customStyle={styles.counterButton(row === 0)}
          onPress={() => setRow(row > 0 ? row - 1 : row)}
          disabled={row === 0}
        />
      </View>
      <ConfirmModal
        isVisible={isModalVisible}
        setIsVisible={setIsModalVisible}
        title={t('wips:edit_row')}
        disabled={editRow === ''}
        confirmAction={handleEditRow}
      >
        <TextInput
          placeholder={t('wips:row')}
          style={styles.textInput}
          value={editRow}
          onChangeText={handleNumberEdit}
          keyboardType="number-pad"
          contextMenuHidden
          maxLength={MAX_ROWS.toString().length}
        />
      </ConfirmModal>
    </View>
  );
};

RowCounter.propTypes = {
  /**
   * The current row number.
   */
  row: PropTypes.number.isRequired,
  /**
   * Function to set the value of the current row.
   * @param {number} newRow The value of the new row
   */
  setRow: PropTypes.func.isRequired,
};

export default RowCounter;
