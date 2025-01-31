const getStyles = (colors) => ({
  button: {
    alignItems: 'center',
    margin: 10,
  },
  icon: {
    width: 60,
    height: 60,
    backgroundColor: colors.primary,
    borderRadius: 10,
  },
  label: {
    color: colors.text,
    fontSize: 16,
    textAlign: 'center',
  },
});

export default getStyles;
