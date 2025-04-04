export const presets = ['module:@react-native/babel-preset'];
export const plugins = [
  [
    'module-resolver',
    {
      root: ['./src'],
      extensions: [
        '.ios.ts',
        '.android.ts',
        '.ts',
        '.ios.tsx',
        '.android.tsx',
        '.tsx',
        '.jsx',
        '.js',
        '.json',
      ],
      alias: {
        '': './src',
      },
    },
  ],
];
