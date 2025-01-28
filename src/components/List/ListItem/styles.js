const getStyles = (colors) => ({
  item: {
    borderBottomColor: colors.cardContrast,
    borderBottomWidth: 1,
    paddingVertical: 10,
    flexDirection: 'row',
    alignItems: 'center',
    minHeight: 70,
  },
  textContainer: { flex: 1 },
  text: {
    color: colors.cardContrast,
    fontSize: 20,
  },
  details: {
    color: colors.cardContrast,
    fontSize: 14,
  },
});

export default getStyles;
