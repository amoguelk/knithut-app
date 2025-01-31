import React, { useState } from 'react';
import List from 'components/List';
import { View } from 'react-native';
import { useTheme } from 'contexts/ThemeContext';
import { useTranslation } from 'react-i18next';
import { Button } from 'components/buttons';
import { useStorage, storageKeys } from 'hooks/useStorage';
import {
  errorCodes,
  pick,
  releaseLongTermAccess,
  types,
} from '@react-native-documents/picker';

const PatternsScreen = () => {
  const {
    theme: { colors },
  } = useTheme();
  const { t } = useTranslation();
  const [patterns, setPatterns] = useStorage(storageKeys.APP.PATTERNS, []);
  const [isSelecting, setIsSelecting] = useState(false);

  /**
   * Called to open the document picker. If a document is successfully picked, its information is added to `patterns`. If the operation is cancelled, nothing happens.
   * @async
   */
  const handlePickDocument = async () => {
    setIsSelecting(true);
    try {
      const [result] = await pick({
        mode: 'open',
        type: [types.pdf],
        requestLongTermAccess: true,
      });
      if (result.bookmarkStatus === 'success') {
        setPatterns([
          ...patterns,
          {
            fileName: result.name ?? null,
            bookmark: result.bookmark,
            uri: result.uri,
          },
        ]);
      } else {
        throw new Error(result.bookmarkError);
      }
    } catch (error) {
      if (error?.code !== errorCodes.OPERATION_CANCELED) {
        console.error('🚩 Error selecting document', error);
      }
    } finally {
      setIsSelecting(false);
    }
  };

  /**
   * Called when an item is selected to be deleted. Includes [releasing the long term access](https://react-native-documents.github.io/docs/sponsor-only/picker/open-mode#releasing-long-term-access).
   * @param {number} index The index of the item
   */
  const handlePatternDelete = async (index) => {
    try {
      const [releaseResult] = await releaseLongTermAccess([
        patterns[index].uri,
      ]);
      if (releaseResult.status === 'success') {
        const patternsCopy = [...patterns];
        patternsCopy.splice(index, 1);
        setPatterns(patternsCopy);
      } else {
        throw new Error(releaseResult.errorMessage);
      }
    } catch (error) {
      console.error('🚩 Error deleting pattern', error);
    }
  };

  return (
    <View
      style={{
        flex: 1,
        backgroundColor: colors.border,
        padding: 20,
      }}
    >
      <List
        items={patterns.map((pattern) => ({
          text: pattern.fileName ?? t('patterns:no_name'),
        }))}
        emptyText={t('patterns:empty_pattern_list')}
        handleItemDelete={handlePatternDelete}
      />
      <Button
        label={t('patterns:select_document')}
        onPress={handlePickDocument}
        disabled={isSelecting}
      />
    </View>
  );
};

export default PatternsScreen;
