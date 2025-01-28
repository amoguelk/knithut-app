const getStyles = (colors) => ({
  container: {
    borderRadius: 10,
    flex: 1,
    backgroundColor: colors.card,
    padding: 20,
  },
  emptyText: {
    fontSize: 16,
    color: colors.cardMidContrast,
    textAlign: 'center',
  },
});

export default getStyles;
