const { getDefaultConfig } = require("expo/metro-config");
const { withNativeWind } = require('nativewind/metro');

module.exports = (() => {
    // Start with Expo default config
    const config = getDefaultConfig(__dirname);

    // Apply NativeWind first
    const nativeWindConfig = withNativeWind(config, { input: './global.css' });

    // Then apply svg-transformer config
    const { transformer, resolver } = nativeWindConfig;

    nativeWindConfig.transformer = {
        ...transformer,
        babelTransformerPath: require.resolve("react-native-svg-transformer/expo"),
    };

    nativeWindConfig.resolver = {
        ...resolver,
        assetExts: resolver.assetExts.filter((ext) => ext !== "svg"),
        sourceExts: [...resolver.sourceExts, "svg"],
    };

    return nativeWindConfig;
})();