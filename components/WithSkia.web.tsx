import React from 'react';
import { Text } from "react-native";
// Notice the import path `@shopify/react-native-skia/lib/module/web`
// This is important only to pull the code responsible for loading Skia.
import { WithSkiaWeb } from '@shopify/react-native-skia/lib/module/web';
import { version } from 'canvaskit-wasm/package.json';

export default function WithSkia() {
  return (
    <WithSkiaWeb
      opts={{ locateFile: (file) => `https://cdn.jsdelivr.net/npm/canvaskit-wasm@${version}/bin/full/${file}` }}
      getComponent={() => require('./PlayingUI')}
      fallback={<Text>Loading Skia...</Text>}
    />
  );
}