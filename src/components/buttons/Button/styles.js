const getStyles = (colors, buttonColor = null) => ({
  button: {
    borderRadius: 10,
    alignItems: 'center',
    justifyContent: 'center',
    paddingHorizontal: 20,
    paddingVertical: 15,
    margin: 5,
  },
  disabled: { backgroundColor: colors.cardMidContrast },
  enabled: { backgroundColor: buttonColor ?? colors.primary },
  buttonLabel: {
    color: colors.text,
    fontSize: 20,
  },
});

export default getStyles;
