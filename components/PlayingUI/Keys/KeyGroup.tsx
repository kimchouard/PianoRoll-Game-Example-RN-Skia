import {
  // COMPONENTS
  Group,
  Path,
  Skia,
  SkFont,
  Text,
} from '@shopify/react-native-skia';
import { memo, useMemo } from 'react';

import { Dimensions } from 'react-native';
// Load global consts, styles and images
import {
  playingUIMaxHeight,
  getMainLinePosition,
  displayKeyRadius,
  keyPressedCircleRadius,
} from '../../utils/utils';
import gameColors from '../../utils/styleColors';

import Key from './Key';
import NoteBG from './NoteBG';
import { RenderingMethod } from '../../PlayingUI';

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
  renderingMethod,
}: {
  noteName: string,
  noteColor: string,
  noteXPosition: number,
  noteXWidth: number,
  numberOfMainLinesPressed: number,
  keyMainNoteFont?: SkFont,
  renderingMethod: RenderingMethod,
}) => {
  // From REDUX store
  const canvasDimensions = {
    height: playingUIMaxHeight,
    width: Dimensions.get('window').width,
  };

  const createNoteBGRRect = (x:number, y:number, pathSize: number) => {
    return Skia.RRectXY(
      Skia.XYWHRect(
        x, // x
        y - pathSize / 2, // y
        noteXWidth + pathSize / 2, // width
        pathSize, // height
      ),
      pathSize / 2, pathSize / 2 // radius (rx, ry)
    )
  }

  // ===========================
  //     Creating Paths
  // ===========================

  const paths = useMemo(() => {
    let firstKeyYPosition:number;
    let lastKeyYPosition:number;

    const connectingLine = Skia.Path.Make();
    let keyCircles;
    let noteBGs;
    let noteName;

    if (renderingMethod === 'path') {
      keyCircles = Skia.Path.Make();
      noteBGs = Skia.Path.Make();
      noteName = Skia.Path.Make();
    }

    for (let mainLineNumber = 0; mainLineNumber < numberOfMainLinesPressed; mainLineNumber++) {
      // Get its Y position
      const mainDotY = getMainLinePosition(mainLineNumber, canvasDimensions, 'saxOdisei');

      // and it's the first one (firstKeyYPosition not defined yet), then we store it's position as the top one.
      if (firstKeyYPosition === undefined) { firstKeyYPosition = mainDotY; }
      // Set the Y lowest position too, in case it's the last one that does :)
      lastKeyYPosition = mainDotY;

      if (renderingMethod === 'path'
      && keyCircles !== undefined && noteBGs !== undefined) {
        const shouldRenderNoteName = (mainLineNumber === (numberOfMainLinesPressed - 1));

        const dotRadius = (shouldRenderNoteName === true) ? displayKeyRadius : keyPressedCircleRadius;
        keyCircles.addCircle(noteXPosition, mainDotY, dotRadius);


        const noteBGx = noteXPosition - displayKeyRadius / 2;
        noteBGs.addRRect(createNoteBGRRect(noteBGx, mainDotY, displayKeyRadius));
      }
    }


    if (firstKeyYPosition < lastKeyYPosition
    && firstKeyYPosition !== undefined && firstKeyYPosition !== null
    && lastKeyYPosition !== undefined && lastKeyYPosition !== null) {

      // ========== MAIN LINE ============
      connectingLine.moveTo(noteXPosition, firstKeyYPosition);
      connectingLine.lineTo(noteXPosition, lastKeyYPosition);
      // connectingLine.close(); => just a line, not a closed path
    }

    if (renderingMethod === 'path'
    && keyCircles !== undefined && noteBGs !== undefined && noteName !== undefined) {
      // Usefull performance-wise or not ?
      keyCircles.simplify();
      noteBGs.simplify();

      keyCircles.close();
      noteBGs.close();
    }

    // Volatile => USEFUL for performance OR NOT ?
    /** 
    * Specifies whether Path is volatile; whether it will be altered or discarded
    * by the caller after it is drawn. Path by default have volatile set false.
    *
    * Mark animating or temporary paths as volatile to improve performance.
    * Mark unchanging Path non-volatile to improve repeated rendering.
    */
    // connectingLine.setIsVolatile(true);
    // if (renderingMethod === 'path'
    // && keyCircles !== undefined && noteBGs !== undefined && noteBGLines !== undefined) {
    //   keyCircles.setIsVolatile(true);
    //   noteBGs.setIsVolatile(true);
    // }

    return {
      connectingLine,
      keyCircles,
      noteBGs,
    };
  }, [renderingMethod]); // add Note ID to the deps array

  // ===============
  //    Utils
  // ===============

  // Render the connecting line between keys
  const renderConnectingLine = () => {
    const connectingLineWidth = 2;
    const connectingLineOpacity = 0.5;
    const connectingLineColor = gameColors.noteBaseHex;

    // ========== MAIN RENDER ============

    return paths && paths.connectingLine && (
      <Path
        path={ paths.connectingLine }
        color={ connectingLineColor }
        style="stroke"
        strokeJoin="round"
        strokeWidth={connectingLineWidth}
        opacity={connectingLineOpacity}
      />
    );
  };

  // ===========================
  //        RENDER Utils
  // ===========================

  const renderKeyGroupPaths = () => {
    return paths && paths.keyCircles && paths.noteBGs && (
      <Group key={ `${noteName}_KeyGroup` }>
        <Path
          path={ paths.noteBGs }
          color={ gameColors.noteBgBaseHex }
          style="fill"
          strokeJoin="round"
          opacity={0.82}
        />

        { renderConnectingLine() }

        <Path
          path={ paths.keyCircles }
          color={ gameColors.noteBaseHex }
          style="fill"
          strokeJoin="round"
        />

        <Text
          x={ noteXPosition - displayKeyRadius / 4 }
          y={ getMainLinePosition((numberOfMainLinesPressed - 1), canvasDimensions, 'saxOdisei') + displayKeyRadius / 4 }
          text={ noteName }
          color={ '#FFFFFF' }
          font={ keyMainNoteFont }
        />
      </Group>
    );
  }

  const renderKeyGroupShapes = () => {
    let firstKeyYPosition:number;
    let lastKeyYPosition:number;

    // Storing the noteBGs JSX values to be able to paint behind the connecting line while the dots stays on top
    const noteBGJSXs:React.JSX.Element[] = [];

    // // ITERATE over the keys that needs to be pressed
    const allKeyJsx = <Group key={`${noteName}_allKeys`}>
      { Array.from(Array(numberOfMainLinesPressed), (_, mainLineNumber) => {
        // Get its Y position
        const mainDotY = getMainLinePosition(mainLineNumber, canvasDimensions, 'saxOdisei');

        // and it's the first one (firstKeyYPosition not defined yet), then we store it's position as the top one.
        if (firstKeyYPosition === undefined) { firstKeyYPosition = mainDotY; }
        // Set the Y lowest position too, in case it's the last one that does :)
        lastKeyYPosition = mainDotY;

        noteBGJSXs.push((
          <NoteBG
            key={ `${noteName}_keyBG_${mainLineNumber}` }
            notePosition={ {
              x: noteXPosition,
              y: mainDotY,
            } }
            noteXWidth={noteXWidth}
          />
        ))

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

  return (renderingMethod === 'path') ? renderKeyGroupPaths() : renderKeyGroupShapes();
};

export default memo(KeyGroup);
