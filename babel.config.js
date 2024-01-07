module.exports = function (api) {
  api.cache(true);
  return {
    presets: ['babel-preset-expo'],
    plugins: [
      // Required for expo-router
      'expo-router/babel',
      // KEEP THIS ONE LAST
      'react-native-reanimated/plugin',
    ],
  };
};
