const getStyles = (colors) => ({
  container: {
    borderRadius: 10,
    alignItems: 'center',
    justifyContent: 'center',
    paddingVertical: 15,
    margin: 5,
  },
  text: {
    color: colors.text,
    fontSize: 40,
    fontWeight: 'bold',
  },
  iconButton: (size) => {
    let sizeNum;
    switch (size) {
      case 'sm':
        sizeNum = 16;
        break;
      case 'lg':
        sizeNum = 48;
        break;
      default:
        sizeNum = 20;
        break;
    }

    return {
      backgroundColor: colors.background,
      borderRadius: 50,
      padding: sizeNum / 2,
    };
  },
  actions: {
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
  },
});

export default getStyles;
