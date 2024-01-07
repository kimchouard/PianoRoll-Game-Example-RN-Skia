const verbose = false;

// ===========================
//   TYPES
// ===========================

export type CanvasDimensions = {
  width: number;
  height: number;
};
export type PlayingUIModes = 'saxOdisei' | 'classicMusicSheet';

// ===========================
//   CONSTS
// ===========================

// ----------------------
// Positions

// Distance at which the timeline is moved from the left side :
export const timelineXPosition = 200; // 180

// Quater notes positioning and other time related consts
export const defaultBPM = 60;
export const maxBPM = 140;
export const minBPM = 20;

// Distance between quarter lines & change ratio based on BPM
export const distanceBetweenQuarterNotes = 100;
export const baseBPM = 80;
export const dynamicDistRatio = 0.85;

export const numberOfDefaultMeasures = 151;
export const numberOfCountdownBars = 4;
export const numberOfClosingBarCount = 2;

// Minimum time for a note to be accepted as a "wanted note"
export const minimumNoteLengthMs = 50;

// Game: Time for accepting played note (ms)
interface TimeDelta {
  // Maximum time delta accepted BEFORE baseNoteOnTime for a note to be considered 'EARLY'
  early: number,
  // Maximum time delta accepted BEFORE and AFTER baseNoteOnTime for a note to be considered 'TIMELY' (i.e. played on time)
  timely: number,
  // Maximum time delta accepted AFTER baseNoteOnTime for a note to be considered 'LATE'
  late: number,
}
// WARNING you should respect :
// timeDeltaEarlyNote > timeDeltaTimelyNote
// AND timeDeltaLateNote > timeDeltaTimelyNote

const timeDeltas:TimeDelta[] = [
  // Stage 0 (debug)
  {
    early: 200,
    timely: 100,
    late: 200,
  },
  // Stage 1
  {
    early: 500,
    timely: 250,
    late: 500,
  },
  // Stage 2
  {
    early: 350,
    timely: 200,
    late: 350,
  },
  // Stage 3
  {
    early: 200,
    timely: 100,
    late: 200,
  },
  // Stage 4
  {
    early: 200,
    timely: 100,
    late: 200,
  },
];

// timeDeltaTimelyNote / timeDeltaEarlyNote / timeDeltaLateNote
export const getTimeDelta = (deltaType: 'early' | 'timely' | 'late', stageNumber: number) => {
  if (stageNumber >= 0 && stageNumber <= 4) {
    return timeDeltas[stageNumber][deltaType];
  }

  console.error('Wrong stage number', deltaType, stageNumber);
};

// ----------------------
// Note Keys Played

// Notes Display
export const keyPressedCircleRadius = 4;
export const displayKeyRadius = 18;
export const displayKeyRadiusClassic = 16;

// The BPM threshold value after which lines are not changing dynamically based on key-pressed
export const dynamicColorBPMThreshold = 85;

// ----------------------
// DIMENSIONS

export const headerWidth = 110;
export const playingUIMaxHeight = 380;

export const getPlayingUIHeight = (canvasDimensions) => ((canvasDimensions.height > playingUIMaxHeight) ? playingUIMaxHeight : canvasDimensions.height);

export const getPlayingUIHeightUIWorklet = (canvasDimensions) => {
  'worklet';

  return ((canvasDimensions.height > playingUIMaxHeight) ? playingUIMaxHeight : canvasDimensions.height);
};

// ===========================
//   Key & Sax Images Position & Sizes
// ===========================

// Width of the TS2 backgroundImage
export const saxFrontWidth = 210;
export const saxBackWidth = 70;
// X position of the TS2 BG
export const saxFrontXPosition = timelineXPosition - (saxFrontWidth / 2);
export const saxBackXPosition = saxFrontXPosition - saxBackWidth + 15;

// Width of the Clef backgroundImage
export const clefSolWidth = 125;
// X position of the TS2 BG
export const clefSolXPosition = timelineXPosition - (clefSolWidth / 2) - 15;

// Place the main keys on the saxophone
// > lineNumber, from 0 to 8
export const mainKeysPositionNSize = [
  // Main Key #0: Octave
  { lineNumber: 1, deltaX: (saxFrontWidth + saxBackWidth) / 2 - 25, deltaY: -35 },
  // Main Key #1: B
  { lineNumber: 2, deltaX: 3, deltaY: -3 },
  // Main Key #2: C / A
  { lineNumber: 3, deltaX: 6, deltaY: -2 },
  // Main Key #3: G
  { lineNumber: 4, deltaX: 15, deltaY: 6 },
  // Main Key #4: F
  { lineNumber: 5, deltaX: -5, deltaY: 0 },
  // Main Key #5: E
  { lineNumber: 6, deltaX: -3, deltaY: 0 },
  // Main Key #6: D
  { lineNumber: 7, deltaX: -8, deltaY: 3 },
  // Main Key #7: C - 1
  { lineNumber: 8, deltaX: -45, deltaY: 2 },
];

// Secondary Lines
// Listing all the secondary key names that need to be placed right after each main lines
export const secondaryLinesKeysByMainLines = [
  // After First Line, Blowing
  [
    {
      imgName: 'side-top-key-1', deltaY: 0, deltaX: -25, display: true,
    },
    {
      imgName: 'side-top-key-2', deltaY: 0, deltaX: -40, display: true,
    },
    {
      imgName: 'top-key-contour', deltaY: 0, deltaX: 30, display: true,
    },
  ],
  // After Main Key #0: Octave
  [
    {
      imgName: 'right-key-1', deltaY: 0, deltaX: 40, display: true,
    },
    {
      imgName: 'right-key-2', deltaY: 0, deltaX: 40, display: true,
    },
    {
      imgName: 'right-key-3', deltaY: 0, deltaX: 40, display: true,
    },
  ],
  // After Main Key #1: B
  [
    {
      imgName: 'key-1-2', deltaY: 0, deltaX: 28, display: true,
    },
    {
      imgName: 'side-top-key-3', deltaY: 0, deltaX: -40, display: true,
    },
  ],
  // After Main Key #2: C / A
  [],
  // After Main Key #3: G
  [
    {
      imgName: '4er-top', deltaY: -10, deltaX: 50, display: true,
    },
  ],
  // After Main Key #4: F
  [
    {
      imgName: 'side-low-key-1', deltaY: 0, deltaX: -30, display: true,
    },
    {
      imgName: 'side-low-key-2', deltaY: 3, deltaX: -46, display: true,
    },
  ],
  // After Main Key #5: E
  [
    {
      imgName: '7-sharp', deltaY: 0, deltaX: -42, display: true,
    },
  ],
  // After Main Key #6: D
  [
    {
      imgName: '4er-right', deltaY: 0, deltaX: 42, display: true,
    },
  ],
  // After Main Key #7: C - 1
  [
    {
      imgName: '4er-left', deltaY: -2, deltaX: 15, display: true,
    },
    {
      imgName: '4er-low', deltaY: -10, deltaX: 45, display: true,
    },
  ],
];

export const isMainKeyPressed = (currentFingering, mainKeyNumber) => (currentFingering && currentFingering[mainKeyNumber] && currentFingering[mainKeyNumber].pressed);

export const isSecondaryKeyPressed = (currentFingering, mainLineNumber, secondaryLineNumber) => (currentFingering[mainLineNumber]
  && currentFingering[mainLineNumber].secondary
  && currentFingering[mainLineNumber].secondary[secondaryLineNumber]
  && currentFingering[mainLineNumber].secondary[secondaryLineNumber].pressed);

export const getWetherThisWillKeyBePlayed = (allKeysUsed, itMainLine, itSecondaryLine = null) => (
  (itSecondaryLine === null && allKeysUsed && allKeysUsed[itMainLine] && allKeysUsed[itMainLine].pressed)
|| (itSecondaryLine !== null && allKeysUsed && allKeysUsed[itMainLine] && allKeysUsed[itMainLine].secondary && allKeysUsed[itMainLine].secondary[itSecondaryLine] && allKeysUsed[itMainLine].secondary[itSecondaryLine].pressed)
);

// ===========================
//   Horizontal LINES
// ===========================

// Main Lines
export const numberOfOdiseiMainLines = 9;
export const numberOfClassicMainLines = 5;
export const numberOfClassicSecondaryHighLines = 4;
export const numberOfClassicSecondaryLowLines = 2;
export const firstLineX = 13;

export const getNumberOfMainLineBasedOnUIMode = (playingUIMode: PlayingUIModes) => ((playingUIMode === 'saxOdisei') ? numberOfOdiseiMainLines : numberOfClassicMainLines);

export const getSpaceBetweenLines = (canvasDimensions, playingUIMode) => {
  if (playingUIMode === 'classicMusicSheet') {
    // We count ALL the lines to calculate the position, even though we will only show the main lines
    const numberOfLines = numberOfClassicMainLines + numberOfClassicSecondaryHighLines + numberOfClassicSecondaryLowLines;
    return getPlayingUIHeight(canvasDimensions) / numberOfLines;
  }

  // ELSE: UI mode is saxOdisei
  return getPlayingUIHeight(canvasDimensions) / numberOfOdiseiMainLines;
};

// Get the X position for a specific main line number, from 0 to { numberOfMainLines }
export const getMainLinePosition = (mainNumLine: number, canvasDimensions, playingUIMode: PlayingUIModes) => {
  if (mainNumLine !== undefined && mainNumLine !== null) {
    if (canvasDimensions !== undefined && canvasDimensions !== null) {
      // In "classic" music sheet mode, we "slide" the fist main line down to 4 lines, so it leaves room for the notes on the secondary lines
      const adaptedLineNumber = mainNumLine + ((playingUIMode === 'classicMusicSheet') && numberOfClassicSecondaryHighLines);

      return (firstLineX + getSpaceBetweenLines(canvasDimensions, playingUIMode) * adaptedLineNumber);
    }
    console.error('Undefined canvasDimensions parameter passed to getMainLinePosition');
    return 0;
  } else {
    console.error('Undefined mainNumLine parameter passed to getMainLinePosition');
    return 0;
  }
};
// Could move up the last line a tiny bit with :
// - ((mainNumLine === numberOfMainLines - 1) ? 5 : 0)

// Get the X position for a specific secondary line, based on :
//    - the main line number, from 0 to { numberOfMainLines }
//    - the secondary line number,
//    - the number of secondary line planned inbetween the 2 main lines
// TODO : Manage the last line ! #calculateTheSpaceBetween
export const getSecondaryLinePosition = (mainNumLine: number, secondaryNumLine: number, canvasDimensions, playingUIMode: PlayingUIModes) => {
  if (mainNumLine !== undefined && mainNumLine !== null) {
    if (canvasDimensions !== undefined && canvasDimensions !== null) {
      if (secondaryNumLine !== undefined && secondaryNumLine !== null) {
        const currentMainLinePosition = getMainLinePosition(mainNumLine, canvasDimensions, playingUIMode);

        // IF we're rendering the classic music sheet view
        if (playingUIMode === 'classicMusicSheet') {
          const spaceBetweenLines = getSpaceBetweenLines(canvasDimensions, playingUIMode);

          return currentMainLinePosition + spaceBetweenLines * secondaryNumLine;
        }
        // ELSE: UI mode is saxOdisei

        const numberOfSecondaryLinesPlanned = secondaryLinesKeysByMainLines[mainNumLine]?.length;
        let spaceBetweenMainLines;

        // If we're after the last line, calculate from the whole width size
        if (mainNumLine === getNumberOfMainLineBasedOnUIMode(playingUIMode) - 1) {
          spaceBetweenMainLines = getPlayingUIHeight(canvasDimensions) - currentMainLinePosition;
        } else { // Otherwise, calculate between lines
          const nextMainLinePosition = getMainLinePosition(mainNumLine + 1, canvasDimensions, playingUIMode);
          spaceBetweenMainLines = nextMainLinePosition - currentMainLinePosition;
        }

        // secondaryLinePosition value
        return currentMainLinePosition + (secondaryNumLine + 1) * (spaceBetweenMainLines / (numberOfSecondaryLinesPlanned + 1));
      }

      console.error('Undefined canvasDimensions parameter passed to getSecondaryLinePosition');
    } else {
      console.error('Undefined canvasDimensions parameter passed to getSecondaryLinePosition');
    }
  } else {
    console.error('Undefined mainNumLine parameter passed to getSecondaryLinePosition');
  }
};

// ===========================
//   X Dist. & Time Utils
// ===========================

// Get the dynamic distance for 1 bar: 75% fixed and 25% dynamic based on the BPM
// >> allows for a easier reading on fast BPM
export const getDistFor1Bar = (BPM: number):number => distanceBetweenQuarterNotes * ((1 - dynamicDistRatio) + dynamicDistRatio * (baseBPM / BPM));

// Returns the X position (px) based on the number of bars
export const getDistXFromBars = (barCount: number, BPM: number, options: { roundValue: true | false } = { roundValue: true }):number => {
  // Only return a value if the currentTime && BPM are passsed
  // console.log('getNoteXPositionBasedOnTime params: ', currentTime, BPM);
  if (barCount !== undefined && BPM !== undefined
  && barCount !== null && BPM !== null) {
    const distXFromBars = barCount * getDistFor1Bar(BPM);
    return (options.roundValue === true) ? Math.round(distXFromBars) : distXFromBars;
  }

  verbose && console.log('getDistXFromBars called with undefined or null arguments');
};

// Returns the X position (px) based on a time (ms)
export const getDistXFromTime = (currentTime: number, BPM: number, options: { roundValue: true | false } = { roundValue: true }):number => {
  // Only return a value if the currentTime && BPM are passsed
  // console.log('getNoteXPositionBasedOnTime params: ', currentTime, BPM);
  if (currentTime !== undefined && BPM !== undefined
  && currentTime !== null && BPM !== null) {
    const distXFromTime = (currentTime / 1000) * (BPM / 60) * getDistFor1Bar(BPM);
    return (options.roundValue === true) ? Math.round(distXFromTime) : distXFromTime;
  }

  verbose && console.log('getDistXFromTime called with undefined or null arguments');
};

// Get time (ms) from the number of bars
export const getTimeFromBars = (barCount: number, BPM: number, options: { roundValue: true | false } = { roundValue: true }):number => {
  if (barCount !== undefined && BPM !== undefined
  && barCount !== null && BPM !== null) {
    const timeFromBars = barCount * (60 / BPM) * 1000;
    return (options.roundValue === true) ? Math.round(timeFromBars) : timeFromBars;
  }

  verbose && console.log('getTimeFromBars called with undefined or null arguments');
};

// Returns the # of bars based on a time (ms)
export const getBarsFromTime = (currentTime: number, BPM: number, options: { roundValue: true | false } = { roundValue: true }):number => {
  // Only return a value if the currentTime && BPM are passsed
  // console.log('getNoteXPositionBasedOnTime params: ', currentTime, BPM);
  if (currentTime !== undefined && BPM !== undefined
  && currentTime !== null && BPM !== null) {
    const numberOfBars = (currentTime / 1000) * (BPM / 60);
    return (options.roundValue === true) ? Math.round(numberOfBars) : numberOfBars;
  }

  verbose && console.log('getDistXFromTime called with undefined or null arguments');
};

// Get time (ms) from the current X Position (px)
export const getTimeFromDistX = (xPosition: number, BPM: number, options: { roundValue: true | false } = { roundValue: true }):number => {
  if (xPosition !== undefined && BPM !== undefined
  && xPosition !== null && BPM !== null) {
    const timeFromDistX = xPosition * (60 / (BPM * getDistFor1Bar(BPM))) * 1000;
    return (options.roundValue === true) ? Math.round(timeFromDistX) : timeFromDistX;
  }

  verbose && console.log('getTimeFromDistX called with undefined or null arguments');
};

export const getHowManyBarCountsAreLeft = (numberOfBars:number, BPM: number, reanimatedBaseXValue:number, countdownBars:number) => {
  // How much bars is there in total ?
  const totalBarCount = numberOfBars + numberOfClosingBarCount || numberOfDefaultMeasures * 4;
  // How much bars have we passed already ?
  // PAUSE: we use the reanimatedBaseX value to figure it out
  // FIRST LAUNCH: we use the countdown bars value (in NEGATIVE since we need to add it to the total time to cover)
  const elapsedBarCount = (reanimatedBaseXValue > 0) ? reanimatedBaseXValue / getDistFor1Bar(BPM) : -countdownBars;
  const barCountLeft = totalBarCount - elapsedBarCount;

  return {
    barCountLeft,
    elapsedBarCount,
    totalBarCount,
  };
};
