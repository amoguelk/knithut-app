const getStyles = (colors) => ({
  modal: {
    flex: 1,
    justifyContent: 'center',
    margin: 5,
  },
  body: {
    backgroundColor: colors.border,
    padding: 10,
    alignItems: 'center',
    justifyContent: 'center',
    borderRadius: 10,
  },
  text: {
    color: colors.text,
    fontSize: 20,
    textAlign: 'center',
  },
  title: {
    fontWeight: 'bold',
    fontSize: 30,
  },
  backdrop: {
    backgroundColor: '#000',
    opacity: 0.5,
    position: 'absolute',
    top: 0,
    left: 0,
    bottom: 0,
    right: 0,
  },
});

export default getStyles;
