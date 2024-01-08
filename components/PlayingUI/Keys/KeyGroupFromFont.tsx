import {
  useFont,
  Text as SkiaText,
 } from "@shopify/react-native-skia";
import { Platform } from "react-native";

const KeyGroupFromFont = ({
  noteXPosition,
}: {
  noteXPosition: number,
}) => {
  const keyMainNoteFont = useFont(((Platform.OS === 'web') ? '/fonts/odisei-play.ttf' : require('../../../public/fonts/odisei-play.ttf')), 300);

  return <SkiaText
    x={ noteXPosition } // x + ((isAccidental) && -25) }
    y={ 300 }
    text={ '' }
    color={ '#FF0000' }
    font={ keyMainNoteFont }
  />
}

export default KeyGroupFromFont;
