import { Path, Skia } from "@shopify/react-native-skia";
import { useWindowDimensions } from "react-native";
import { playingUIMaxHeight, timelineXPosition } from "../../utils/utils";
import gameColors from "../../utils/styleColors";

const timelinePath = Skia.Path.Make();

const Timeline = () => {
  const {height, width} = useWindowDimensions();

  // Main timeline
  const timeLinePath = () => {
    const timelineHeight = height;

    const timelinePathXPosition = timelineXPosition;
    timelinePath.moveTo(timelinePathXPosition, 0);
    timelinePath.lineTo(timelinePathXPosition, timelineHeight);
    timelinePath.close();

    return timelinePath;
  };

  // ----------------------
  // MAIN

  return <Path
    path={timeLinePath()}
    color={ gameColors.timeLineHex}
    style="stroke"
    strokeJoin="round"
    strokeWidth={1}
  />;
}

export default Timeline;
