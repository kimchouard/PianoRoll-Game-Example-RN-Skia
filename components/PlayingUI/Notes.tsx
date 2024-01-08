import { SkFont } from "@shopify/react-native-skia";

import { numberOfOdiseiMainLines } from "../utils/utils";
import KeyGroup from "./Keys/KeyGroup";
import KeyGroupFromFont from "./Keys/KeyGroupFromFont";
import { RenderingMethod } from "../PlayingUI";

const noteDuration = 50;
const numberOfNoteGroups = 5;

const Notes = ({
  keyMainNoteFont,
  renderingMethod,
}:{
  keyMainNoteFont: SkFont,
  renderingMethod: RenderingMethod,
}) => {

  return (<>
    { Array.from(Array(numberOfNoteGroups), (_, itMainGroup) => {
      return Array.from(Array(numberOfOdiseiMainLines), (_, itMainLine) => {
        const numberOfKeys = itMainLine + 1;
        const noteXPosition = (noteDuration + 20)*(numberOfKeys + itMainGroup * numberOfOdiseiMainLines);
        
        // return <KeyGroupFromFont noteXPosition={noteXPosition} />;
        return keyMainNoteFont && <KeyGroup
          key={`note_${numberOfKeys}`}
          noteName={numberOfKeys.toString()}
          noteColor={'#1877AD'}
          noteXWidth={noteDuration}
          numberOfMainLinesPressed={numberOfKeys}
          { ... { noteXPosition, keyMainNoteFont, renderingMethod } }
        />
      })
    })}
  </>);
};

export default Notes;
