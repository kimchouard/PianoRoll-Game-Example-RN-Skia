import { useMemo, memo } from 'react';
import { Dimensions } from 'react-native';
import {
  Skia,
  Group,
  Path,
} from '@shopify/react-native-skia';
import { CanvasDimensions, playingUIMaxHeight, getMainLinePosition, numberOfOdiseiMainLines } from '../../utils/utils';

const HorizontalLines = () => {
  // ===========================
  //        PATHS
  // ===========================

  // Main lines paths
  const mainLinesPaths = useMemo(() => (Array.from(Array(numberOfOdiseiMainLines), (_, itMainLine) => {
    const canvasDimensions:CanvasDimensions = {
      height: playingUIMaxHeight,
      width: Dimensions.get('window').width,
    };

    const path = Skia.Path.Make();
    const linePosition = getMainLinePosition(itMainLine, canvasDimensions, 'saxOdisei');
    
    path.moveTo(-1, linePosition);
    path.lineTo(2 * canvasDimensions.width + 1, linePosition);
    path.close();

    return path;
  })), []);

  const renderMainLines = () => mainLinesPaths.map((mainLinePath, itMainLine) => (
    <Path
      key={`mainLine_${itMainLine}`}
      path={mainLinePath}
      color={'#757575'}
      style="stroke"
      strokeJoin="round"
      strokeWidth={1}
      opacity={1}
    />
  ));

  return <Group>
    { renderMainLines() }
  </Group>
}

export default memo(HorizontalLines);