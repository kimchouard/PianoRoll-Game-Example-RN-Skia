import { useEffect, useMemo, useState } from "react";
import { Canvas, Circle, Group, Path, Skia, } from "@shopify/react-native-skia";
import { Pressable, Text, View, useWindowDimensions } from "react-native";
import { Easing, useDerivedValue, useSharedValue, withSpring, withTiming } from "react-native-reanimated";

// DRAWING CONSTS
const circlesDiameter = 18;
const spaceBetweenCirclesRows = circlesDiameter * 2.5;


const LaggyShapesTranslation = () => {
  const numberOfCirclesPerRow = 10; // number of circles vertically
  const [numberOfCircleRows, setNumberOfCircleRows] = useState(100); // number of rows to draw
  const [usePathOptimization, setUsePathOptimization] = useState<true | false>(false); // number of rows to draw

  const { height, width } = useWindowDimensions();
  const [isPlaying, setIsPlaying] = useState(false);

  // Reanimated value used to move the notes scene
  const reanimatedXValue = useSharedValue(0);

  // Compute the transform array from the reanimated shared value
  const baseXTranslateWithTimelineFromAnimation = useDerivedValue(
    () => [{ translateX: - reanimatedXValue.value }],
    [isPlaying, reanimatedXValue],
  );

  // Update the reanimated value to animate the Circles Group when Play is pressed
  useEffect(() => {
    // IF we're playing, let's animate the scene
    if (isPlaying === true) {
      // Bring the last circle row to the left of the screen
      const finalXPosition = (numberOfCircleRows - 1) * spaceBetweenCirclesRows;

      reanimatedXValue.value = withTiming(
        finalXPosition, 
        {
          duration: finalXPosition * 10, 
          easing: Easing.linear, // No easing here, time is straight!
        },
      );

    // ELSE: we've stopped
    } else {
      reanimatedXValue.value = withSpring(0, { damping: 40 }); // we go back to 0, with a little spring effect ✨
    }
  }, [isPlaying]);

  // Start/Stop the animation and change the number of circle rows
  const renderPlayPauseButton = () => <View style={{ position: 'absolute', bottom: 20, left: 20, zIndex: 1, display: 'flex', flexDirection: 'row' }}>
   <Pressable style={ { width: 45, borderRadius: 25, backgroundColor: (numberOfCircleRows > 10) ? '#FFCC00' : '#9E9E9E' }} onPress={() => (numberOfCircleRows > 10) && setNumberOfCircleRows(numberOfCircleRows - 10)}>
      <Text style={{ color: '#454545', fontSize: 33, textAlign: 'center' }}>-</Text>
    </Pressable>
    <Pressable style={ { backgroundColor: '#7BB22B', paddingVertical: 10, paddingHorizontal: 20, marginHorizontal: 10, borderRadius: 10 }} onPress={() => setIsPlaying(!isPlaying)}>
      <Text style={{ color: '#FFF', fontSize: 20 }}>{ (isPlaying) ? 'Stop Circles Animation' : `Animate ${numberOfCircleRows*numberOfCirclesPerRow} Circles` }</Text>
    </Pressable>
    <Pressable style={ { width: 45, borderRadius: 25, backgroundColor: '#FFCC00' }} onPress={() => setNumberOfCircleRows(numberOfCircleRows + 10)}>
      <Text style={{ color: '#454545', fontSize: 33, textAlign: 'center' }}>+</Text>
    </Pressable>
    <Pressable style={ { backgroundColor: '#FFF', paddingVertical: 10, paddingHorizontal: 20, marginHorizontal: 10, borderRadius: 10 }} onPress={() => setUsePathOptimization(!usePathOptimization)}>
      <Text style={{ color: '#454545', fontSize: 20 }}>{(usePathOptimization) ? 'Use Shapes' : 'Use Paths'}</Text>
    </Pressable>
  </View>;
  
  // =======================
  //      SKIA RENDERING
  // =======================

  // Render the circles with using <Circle /> shapes
  const renderCirclesWithShapes = () => Array.from(Array(numberOfCircleRows), (_, rowNumber) => {
    return Array.from(Array(numberOfCirclesPerRow), (_, lineNumber) => (<Circle
      key={ `${rowNumber}_${lineNumber}_keyCircle` }
      cx={ spaceBetweenCirclesRows * rowNumber }
      cy={ (lineNumber + 1/2) * height / numberOfCirclesPerRow }
      r={ circlesDiameter }
      color={ '#1877AD' }
    />))
  });
  
  // Use Skia.Path to render the circles
  const circlesPath = useMemo(() => {
    const path = Skia.Path.Make();
    for (let rowNumber = 0; rowNumber < numberOfCircleRows; rowNumber++) {
      for (let lineNumber = 0; lineNumber < numberOfCirclesPerRow; lineNumber++) {
        const noteXPosition = spaceBetweenCirclesRows * rowNumber;
        const shapeYPosition = (lineNumber + 1/2) * height / numberOfCirclesPerRow;

        path.addCircle(noteXPosition, shapeYPosition, circlesDiameter);
      }
    }

    return path;
  }, [numberOfCircleRows]);

  const renderCirclesWithPaths = () => <Path
    path={ circlesPath }
    color={ '#1877AD' }
    style="fill"
    strokeJoin="round"
  />;

  // Main Canvas
  return <View style={{ flex: 1, backgroundColor: '#464646'}}>
    { renderPlayPauseButton()}

    <View style={{ flex: 1, overflow: 'hidden', width: width }}>
      <Canvas style={{ flex: 1 }}>
        <Group transform={baseXTranslateWithTimelineFromAnimation}>
          {(usePathOptimization) ? renderCirclesWithPaths() : renderCirclesWithShapes() }
        </Group>
      </Canvas>
    </View>
  </View>;
};

export default LaggyShapesTranslation;