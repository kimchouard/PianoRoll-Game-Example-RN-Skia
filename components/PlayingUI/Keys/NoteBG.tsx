import {
  // COMPONENTS
  Group,
  // Path,
  // Circle,
  // Rect,
  RoundedRect,
  // Mask,
  // TYPES
  SkiaValue,
} from '@shopify/react-native-skia';
import { memo } from 'react';
import { useDerivedValue } from 'react-native-reanimated';

// Load global consts, styles and images
import {
  displayKeyRadius,
  timelineXPosition,
} from '../../utils/utils';
import gameColors from '../../utils/styleColors';

// ===============
//    MAIN COMPONENT
//    NoteBG
// ===============

const NoteBG = ({
  notePosition,
  noteXWidth,
  noteBgColor,
}: {
  notePosition:{
    x: number,
    y: number,
  },
  noteXWidth:number,
  noteBgColor?: string,
}) => {
  // CONSTS
  const bgLinePathSize = 2;
  const extraLinePathSize = 1;

  // Reanimated calculated values
  const bgX = notePosition.x - displayKeyRadius / 2;
  const bgWidth = noteXWidth + displayKeyRadius / 2;
  const lineWidth = noteXWidth + bgLinePathSize;
  const extraLineWidth = noteXWidth;

  // ===============
  //    BG Render Utils
  // ===============

  const renderNoteBackgroundJsx = (isLineOrBG: 'extraLine' | 'line' | 'bg') => {
    const linePathSize = (isLineOrBG === 'line') ? bgLinePathSize : extraLinePathSize;
    const pathSize = (isLineOrBG === 'bg') ? displayKeyRadius : linePathSize;
    const localLineBaseHex = gameColors.lineBaseHex;
    const lineColor = (isLineOrBG === 'line') ? localLineBaseHex : gameColors.secondaryLinesHex;
    const baseColor = (isLineOrBG === 'line' || isLineOrBG === 'extraLine') ? lineColor : gameColors.noteBgBaseHex;
    const color = (noteBgColor !== undefined) ? noteBgColor : baseColor;
    const opacity = (noteBgColor === undefined) ? 0.82 : 0.25;

    const finalLineWidth = (isLineOrBG === 'line') ? lineWidth : extraLineWidth;
    const width = (isLineOrBG === 'bg') ? bgWidth : finalLineWidth;
    const x = bgX;

    const rectBGParams = {
      x,
      y: notePosition.y - pathSize / 2,
      height: pathSize,
      width,
      r: pathSize / 2,
      color,
      opacity,
    };

    return <RoundedRect
      {...rectBGParams}
    />;
  };

  // ===========================
  //        RENDER Utils
  // ===========================

  const renderNoteBackground = () => <Group>
    {/* Render the thicker background */}
    { renderNoteBackgroundJsx('bg') }
    {/* Render the line only for non dynamicBg */}
    {/* { renderNoteBackgroundJsx('line') } */}
  </Group>;

  // ===========================
  //        RENDER Main
  // ===========================

  return renderNoteBackground();
};

export default memo(NoteBG);
