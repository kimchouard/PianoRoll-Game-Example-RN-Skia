import {
  // COMPONENTS
  Group,
  Circle,
  Text,
  SkFont,
} from '@shopify/react-native-skia';
import { memo } from 'react';

// Load global consts, styles and images
import {
  keyPressedCircleRadius,
  displayKeyRadius,
} from '../../utils/utils';

const verbose = false;

// ===============
//    MAIN COMPONENT
//    NotePlayed
// ===============

const Key = ({
  noteColor,
  notePosition,
  shouldRenderNoteName,
  noteName,
  keyMainNoteFont,
}: {
  noteColor: string,
  notePosition:{
    x: number,
    y: number,
  },
  shouldRenderNoteName?: true | false,
  noteName?: string,
  keyMainNoteFont?: SkFont,
}) => {

  // ===============
  //    Circle Render Utils
  // ===============

  const renderNoteName = (dotRadius:number) => {
    // If the fonts are loaded
    if (keyMainNoteFont) {
      let y = notePosition.y + dotRadius / 4;
      let x = notePosition.x - dotRadius / 3;

      return <Text
          x={ x }
          y={ y }
          text={ noteName }
          color={ '#FFFFFF' }
          font={ keyMainNoteFont }
        />;
    }
  };

  // ===========================
  //        RENDER Utils
  // ===========================

  const renderDot = (dotRadius:number) => (
    <Circle
      cx={ notePosition.x }
      cy={ notePosition.y }
      r={ dotRadius }
      color={ noteColor }
    />
  );

  const renderNoteDrawing = () => {
    const dotRadius = (shouldRenderNoteName === true) ? displayKeyRadius : keyPressedCircleRadius;

    return <Group>
      { renderDot(dotRadius) }
      { (shouldRenderNoteName === true) && renderNoteName(dotRadius) }
    </Group>;
  };

  // ===========================
  //        RENDER Main
  // ===========================

  return renderNoteDrawing();
};

export default memo(Key);
