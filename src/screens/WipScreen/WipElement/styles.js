const getStyles = (colors) => ({
  container: {
    borderBottomLeftRadius: 10,
    borderBottomRightRadius: 10,
    flex: 1,
    backgroundColor: colors.primary,
    padding: 20,
    // justifyContent: 'center',
  },
  text: {
    color: colors.text,
    fontSize: 14,
  },
  title: {
    fontSize: 30,
    textAlign: 'center',
  },
  subtitle: {
    fontSize: 20,
  },
  subContainer: {
    minHeight: '30%',
    maxHeight: '30%',
  },
  infoContainer: {
    flexDirection: 'row',
  },
  simpleInput: {
    borderBottomColor: colors.border,
    borderBottomWidth: 2,
    marginVertical: 5,
  },
  patternInfo: {
    flex: 1,
    justifyContent: 'center',
  },
  notesInput: {
    textAlignVertical: 'top',
    backgroundColor: colors.card,
    color: colors.cardContrast,
    fontSize: 20,
    padding: 5,
    margin: 10,
    height: '80%',
  },
  deleteButton: {
    backgroundColor: 'red',
  },
});

export default getStyles;
