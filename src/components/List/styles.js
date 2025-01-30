const getStyles = (colors) => ({
  container: {
    padding: 20,
  },
  list: {
    borderRadius: 10,
    backgroundColor: colors.card,
    flex: 1,
  },
  divider: {
    borderBottomColor: colors.cardContrast,
    borderBottomWidth: 1,
  },
  emptyText: {
    fontSize: 16,
    color: colors.cardMidContrast,
    textAlign: 'center',
  },
});

export default getStyles;
