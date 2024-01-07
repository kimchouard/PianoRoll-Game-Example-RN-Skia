// import { MIDINotesMap } from '../features/Instruments/MIDINotesMap';

// ----------------------
// COLORS

export const appColors = {
  // Global Colors
  darkerGrey: '#1A191C',
  darkGrey: '#222124',
  darkLighterGrey: '#2F2F2F',
  grey: '#302F33',
  lightGrey: '#A59C9C',
  darkerWhite: '#757575',
  odiseiGreen: '#05A288',
};

export const gameColors = {
  // Lines
  timeLineHex: '#FFCC00',
  pressedLinesHex: '#9E9E9E',
  mainLinesHex: '#757575',
  secondaryLinesHex: '#555555',
  secondaryQuaterNotesHex: '#454545',
  connectingLineHex: '#454545',

  // Notes Colors
  noteBaseHex: '#1877AD',
  noteTimelyHex: '#7BB22B',
  noteMissedHex: '#DC231F',
  noteEarlyHex: '#FF8400',
  noteLateHex: '#A23ABC',

  octaveKeyHex: '#05A288', // ODISEI GREEN!
  // nonDisplayKeyHex: '#1877AD',

  // Note BG
  // Base color for default background, used w/ opacity 0.82
  // otherwise using notes colors w/ opacity 0.25
  noteBgBaseHex: '#222124',
  // Base line colors
  lineBaseHex: '#383737',
};

// export const getNoteColorFromStatus = (noteQueueItem: MIDINumberQueueItem, params:{ isOctaveKey?: true | false, hasAnOctaveKey?: true | false, mainLineNumber?: string } = { isOctaveKey: false, hasAnOctaveKey: false }) => {
//   switch (noteQueueItem.notePlayedStatus) {
//     case 'COMING':
//       // COMING colors change based on octave
//       return (params.hasAnOctaveKey) ? gameColors.octaveKeyHex : gameColors.noteBaseHex;
//     case 'TIMELY':
//       return gameColors.noteTimelyHex;
//     case 'MISSED':
//       if (noteQueueItem.noteMissedMIDINumber !== undefined && noteQueueItem.noteMissedMIDINumber !== null
//       && params.mainLineNumber !== undefined && params.mainLineNumber !== null) {
//         const correctFingerings = MIDINotesMap[noteQueueItem.noteMIDINumber];
//         const missedFingerings = MIDINotesMap[noteQueueItem.noteMissedMIDINumber];

//         if (correctFingerings && correctFingerings.fingerings && correctFingerings.fingerings[params.mainLineNumber]
//         && missedFingerings && missedFingerings.fingerings && missedFingerings.fingerings[params.mainLineNumber]) {
//           const correctFingering = correctFingerings.fingerings[params.mainLineNumber];
//           const missedFingering = missedFingerings.fingerings[params.mainLineNumber];

//           if (correctFingering.pressed === missedFingering.pressed) {
//             return gameColors.noteTimelyHex;
//           }
//         } else {
//           console.error('Error while getting the fingering color for missed note', noteQueueItem, correctFingerings, missedFingerings);
//         }
//       }

//       return gameColors.noteMissedHex;
//     case 'EARLY':
//       return gameColors.noteEarlyHex;
//     case 'LATE':
//       return gameColors.noteLateHex;
//     case 'MISSED_OCTAVE':
//       // Only the octave key is red
//       if (params.isOctaveKey) {
//         return gameColors.noteMissedHex;
//       }
//       // The rest is a default color
//       return gameColors.noteTimelyHex;
//     default:
//       return gameColors.noteBaseHex;
//   }
// };

export default gameColors;
