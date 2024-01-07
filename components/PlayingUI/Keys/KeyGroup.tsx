import {
  // COMPONENTS
  Group,
  Path,
  Skia,
  SkFont,
} from '@shopify/react-native-skia';
import { memo } from 'react';

import { SharedValue } from 'react-native-reanimated';
import { Dimensions } from 'react-native';
// Load global consts, styles and images
import {
  playingUIMaxHeight,
  getMainLinePosition,
} from '../../utils/utils';
import gameColors from '../../utils/styleColors';

import Key from './Key';
import NoteBG from './NoteBG';

// ===============
//    MAIN COMPONENT
//    KeyGroup
// ===============

export const KeyGroup = ({
  noteName,
  noteColor,
  noteXPosition,
  noteXWidth,
  numberOfMainLinesPressed,
  keyMainNoteFont,
}: {
  noteName: string,
  noteColor: string,
  noteXPosition: number;
  noteXWidth: number;
  numberOfMainLinesPressed: number,
  keyMainNoteFont?: SkFont,
}) => {
  // From REDUX store
  const canvasDimensions = {
    height: playingUIMaxHeight,
    width: Dimensions.get('window').width,
  };

  // ===============
  //    Utils
  // ===============

  // Render the connecting line between keys
  const renderConnectingLine = (firstKeyYPosition:number, lastKeyYPosition:number) => {
    if (firstKeyYPosition !== undefined && lastKeyYPosition !== undefined
      && firstKeyYPosition !== null && lastKeyYPosition !== null) {
      const connectingLineWidth = 2;
      const connectingLineOpacity = 0.5;
      const connectingLineColor = gameColors.noteBaseHex;

      // ========== MAIN LINE ============
      const barLinePath = Skia.Path.Make();
      barLinePath.moveTo(noteXPosition, firstKeyYPosition);
      barLinePath.lineTo(noteXPosition, lastKeyYPosition);
      barLinePath.close();

      // ========== MAIN RENDER ============
      return <Group>
        <Path
          path={ barLinePath }
          color={ connectingLineColor }
          style="stroke"
          strokeJoin="round"
          strokeWidth={connectingLineWidth}
          opacity={connectingLineOpacity}
        />
      </Group>;
    }
  };

  // ===========================
  //        RENDER Utils
  // ===========================

  const renderKeyGroup = () => {
    let firstKeyYPosition:number;
    let lastKeyYPosition:number;

    // Storing the noteBGs JSX values to be able to paint behind the connecting line while the dots stays on top
    const noteBGJSXs:React.JSX.Element[] = [];

    // ITERATE over the keys that needs to be pressed
    const allKeyJsx = <Group key={`${noteName}_allKeys`}>
      { Array.from(Array(numberOfMainLinesPressed), (_, mainLineNumber) => {
        let mainKeyCircles;
        let mainKeyBackground;

        // Get its Y position
        const mainDotY = getMainLinePosition(mainLineNumber, canvasDimensions, 'saxOdisei');

        // and it's the first one (firstKeyYPosition not defined yet), then we store it's position as the top one.
        if (firstKeyYPosition === undefined) { firstKeyYPosition = mainDotY; }
        // Set the Y lowest position too, in case it's the last one that does :)
        lastKeyYPosition = mainDotY;

        noteBGJSXs.push((<NoteBG
          key={ `${noteName}_keyBG_${mainLineNumber}` }
          notePosition={ {
            x: noteXPosition,
            y: mainDotY,
          } }
          noteXWidth={noteXWidth}
        />))

        return <Group key={ `${noteName}_keyCircle_${mainLineNumber}` }>
          <Key
            noteColor={noteColor}
            notePosition={ {
              x: noteXPosition, 
              // x: baseXTranslateAnimation,
              y: mainDotY,
            } }
            shouldRenderNoteName={(mainLineNumber === (numberOfMainLinesPressed - 1))}
            noteName={noteName}
            keyMainNoteFont={keyMainNoteFont}
          />
        </Group>;
      })}
    </Group>;

    let connectingLine;
    if (firstKeyYPosition < lastKeyYPosition) {
      connectingLine = renderConnectingLine(firstKeyYPosition, lastKeyYPosition);
    }

    const allNoteBGsJSX = <Group>
      {noteBGJSXs.map((noteBGJSX) => noteBGJSX)}
    </Group>

    return <Group key={ `${noteName}_KeyGroup` }>
      { allNoteBGsJSX }
      { connectingLine }
      { allKeyJsx }
    </Group>;
  }

  // ===========================
  //        RENDER Main
  // ===========================

  return renderKeyGroup();
};

export default memo(KeyGroup);
