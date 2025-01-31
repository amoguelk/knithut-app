const getStyles = (colors, disabled = false) => ({
  item: {
    paddingVertical: 10,
    flexDirection: 'row',
    alignItems: 'center',
    minHeight: 70,
  },
  textContainer: { flex: 1 },
  text: {
    color: disabled ? colors.disabled : colors.cardContrast,
    fontSize: 20,
  },
  details: {
    color: disabled ? colors.disabled : colors.cardContrast,
    fontSize: 14,
  },
});

export default getStyles;
