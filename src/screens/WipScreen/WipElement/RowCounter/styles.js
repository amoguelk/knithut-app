const getStyles = (colors) => ({
  rowCounter: {
    width: '40%',
    backgroundColor: colors.card,
    marginRight: 10,
    marginVertical: 40,
    flexDirection: 'row',
  },
  text: {
    color: colors.cardContrast,
    fontSize: 20,
  },
  rowDisplay: {
    flex: 1,
    justifyContent: 'center',
    paddingHorizontal: 15,
  },
  rowNumber: (digitCount) => ({
    fontWeight: 'bold',
    fontSize: digitCount < 3 ? 50 : 50 - (digitCount - 2) * 10,
  }),
  buttons: {
    height: '100%',
    justifyContent: 'center',
    position: 'absolute',
    right: 0,
  },
  counterButton: {
    height: '50%',
    backgroundColor: colors.border,
    margin: 0,
    justifyContent: 'center',
  },
});

export default getStyles;
