const getStyles = (colors) => ({
  container: {
    flex: 1,
    backgroundColor: colors.background,
    alignItems: 'center',
    justifyContent: 'center',
  },
  logo: {
    width: 350,
    height: 350,
    position: 'absolute',
  },
  navContainer: {
    width: '100%',
    height: 400,
  },
  icon: (i) => ({
    position: 'absolute',
    left: i % 2 === 0 ? 10 : null,
    right: i % 2 !== 0 ? 10 : null,
    top: i < 2 ? 0 : null,
    bottom: i >= 2 ? 0 : null,
  }),
});

export default getStyles;
