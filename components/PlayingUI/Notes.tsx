import { SkFont } from "@shopify/react-native-skia";

import { numberOfOdiseiMainLines } from "../utils/utils";
import KeyGroup from "./Keys/KeyGroup";

const noteDuration = 50;
const numberOfNoteGroups = 5;

const Notes = ({
  keyMainNoteFont,
}:{
  keyMainNoteFont: SkFont,
}) => {

  return (<>
    { Array.from(Array(numberOfNoteGroups), (_, itMainGroup) => {
      return Array.from(Array(numberOfOdiseiMainLines), (_, itMainLine) => {
        const numberOfKeys = itMainLine + 1;
        
        return keyMainNoteFont && <KeyGroup
          key={`note_${numberOfKeys}`}
          noteName={numberOfKeys.toString()}
          noteColor={'#1877AD'}
          numberOfMainLinesPressed={numberOfKeys}
          noteXPosition={(noteDuration + 20)*(numberOfKeys + itMainGroup * numberOfOdiseiMainLines)}
          noteXWidth={noteDuration}
          keyMainNoteFont={keyMainNoteFont}
        />
      })
    })}
  </>);
};

export default Notes;
