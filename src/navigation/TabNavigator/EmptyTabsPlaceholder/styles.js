const getStyles = (colors) => ({
  container: {
    flex: 1,
    paddingTop: 50,
  },
  body: {
    borderBottomStartRadius: 10,
    borderBottomEndRadius: 10,
    flex: 1,
    backgroundColor: colors.card,
    padding: 20,
    alignItems: 'center',
  },
  text: {
    color: colors.cardContrast,
    fontSize: 16,
  },
});

export default getStyles;
