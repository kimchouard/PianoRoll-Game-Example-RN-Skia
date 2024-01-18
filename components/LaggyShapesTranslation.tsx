import { useEffect, useMemo, useState } from "react";
import { Canvas, Circle, Group, Path, Points, RoundedRect, Skia, vec, } from "@shopify/react-native-skia";
import { Pressable, Text, View, useWindowDimensions } from "react-native";
import { Easing, useDerivedValue, useSharedValue, withSpring, withTiming } from "react-native-reanimated";
import { MaterialCommunityIcons } from "@expo/vector-icons";

// DRAWING CONSTS
const circlesDiameter = 18;
const spaceBetweenCirclesRows = circlesDiameter * 2.5;


const LaggyShapesTranslation = () => {
  const numberOfCirclesPerRow = 10; // number of circles vertically
  const [numberOfCircleRows, setNumberOfCircleRows] = useState(100); // number of rows to draw
  const [shapeType, setShapeType] = useState<'circle' | 'rrect' | 'mixed'>('circle'); // number of rows to draw
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
  const renderActionButtons = () => <View style={{ position: 'absolute', bottom: 20, left: 20, zIndex: 1, display: 'flex', flexDirection: 'row' }}>
    <Pressable style={ { width: 45, borderRadius: 25, paddingTop: 6, paddingLeft: 7, marginRight: 10, backgroundColor: '#FFF' }} onPress={() => setShapeType((shapeType === 'circle') ? 'rrect' : ((shapeType === 'rrect') ? 'mixed' : 'circle'))}>
      <MaterialCommunityIcons name={(shapeType === 'circle') ? 'circle' : ((shapeType === 'rrect') ? 'rectangle' : 'format-list-bulleted-type')} size={30} color="#464646" />
    </Pressable>
   <Pressable style={ { width: 45, borderRadius: 25, backgroundColor: (numberOfCircleRows > 10) ? '#FFCC00' : '#9E9E9E' }} onPress={() => (numberOfCircleRows > 10) && setNumberOfCircleRows(numberOfCircleRows - 10)}>
      <Text style={{ color: '#454545', fontSize: 33, textAlign: 'center' }}>-</Text>
    </Pressable>
    <Pressable style={ { backgroundColor: '#7BB22B', paddingVertical: 10, paddingHorizontal: 20, marginHorizontal: 10, borderRadius: 10 }} onPress={() => setIsPlaying(!isPlaying)}>
      <Text style={{ color: '#FFF', fontSize: 20 }}>{ (isPlaying) ? 'Stop Circles Animation' : `Animate ${numberOfCircleRows*numberOfCirclesPerRow} Circles` }</Text>
    </Pressable>
    <Pressable style={ { width: 45, borderRadius: 25, backgroundColor: '#FFCC00' }} onPress={() => setNumberOfCircleRows(numberOfCircleRows + 10)}>
      <Text style={{ color: '#454545', fontSize: 33, textAlign: 'center' }}>+</Text>
    </Pressable>
    <Pressable style={ { paddingVertical: 10, paddingHorizontal: 20, borderRadius: 10, marginHorizontal: 10 }} onPress={() => setUsePathOptimization(!usePathOptimization)}>
      <Text style={{ color: '#FFF', fontSize: 20 }}>{(usePathOptimization) ? 'Use Shapes' : 'Use Paths'}</Text>
    </Pressable>
  </View>;
  
  // =======================
  //      SKIA RENDERING
  // =======================

  // Render the shapes with using <Circle />, <RoundedRect /> or <Points /> component
  const renderShapesWithComponents = () => Array.from(Array(numberOfCircleRows), (_, rowNumber) => {
    return Array.from(Array(numberOfCirclesPerRow), (_, lineNumber) => {
      const xPos = spaceBetweenCirclesRows * rowNumber;
      const yPos = (lineNumber + 1/2) * height / numberOfCirclesPerRow;

      const circleJsx = <Circle
        key={ `${rowNumber}_${lineNumber}_keyCircle` }
        cx={ xPos }
        cy={ yPos }
        r={ circlesDiameter }
        color={ '#1877AD' }
      />;

      const rrectJsx = <RoundedRect
        key={ `${rowNumber}_${lineNumber}_keyRRect` }
        x={ xPos - circlesDiameter }
        y={ yPos - circlesDiameter * 0.75}
        width={ circlesDiameter * 2 }
        height={ circlesDiameter * 1.5 }
        r={circlesDiameter / 4 }
        color={ '#1877AD' }
      />;

      // Draw a triangle
      const triangleJsx = <Points
        key={ `${rowNumber}_${lineNumber}_keyTriangle` }
        points={[
          vec(xPos - circlesDiameter, yPos - circlesDiameter * 0.75),
          vec(xPos + circlesDiameter, yPos - circlesDiameter * 0.75),
          vec(xPos, yPos + circlesDiameter * 0.75),
          vec(xPos - circlesDiameter, yPos - circlesDiameter * 0.75),
        ]}
        mode="polygon"
        style="fill"
        color={ '#1877AD' }
      />;
      
      switch (shapeType) {
        case 'circle':
          return circleJsx;
        case 'rrect':
          return rrectJsx;
        case 'mixed':
          switch ((lineNumber + rowNumber) % 3) {
            case 0:
              return circleJsx 
            case 1:
              return rrectJsx;
            case 2:
              return triangleJsx;
          }
      }
    })
  });
  
  // Use Skia.Path to render the shapes
  const shapesPath = useMemo(() => {
    const path = Skia.Path.Make();
    for (let rowNumber = 0; rowNumber < numberOfCircleRows; rowNumber++) {
      for (let lineNumber = 0; lineNumber < numberOfCirclesPerRow; lineNumber++) {
        const xPos = spaceBetweenCirclesRows * rowNumber;
        const yPos = (lineNumber + 1/2) * height / numberOfCirclesPerRow;

        
        switch (shapeType) {
          case 'circle':
            path.addCircle(xPos, yPos, circlesDiameter);
            break;
          case 'rrect':
            path.addRRect(Skia.RRectXY(Skia.XYWHRect(xPos - circlesDiameter, yPos - circlesDiameter * 0.75, circlesDiameter * 2, circlesDiameter * 1.5), circlesDiameter / 4, circlesDiameter / 4));
            break;
          case 'mixed':
            switch ((lineNumber + rowNumber) % 3) {
              case 0:
                path.addCircle(xPos, yPos, circlesDiameter);
                break;
              case 1:
                path.addRRect(Skia.RRectXY(Skia.XYWHRect(xPos - circlesDiameter, yPos - circlesDiameter * 0.75, circlesDiameter * 2, circlesDiameter * 1.5), circlesDiameter / 4, circlesDiameter / 4));
                break;
              case 2:
                path.addPoly([vec(xPos - circlesDiameter, yPos - circlesDiameter * 0.75), vec(xPos + circlesDiameter, yPos - circlesDiameter * 0.75), vec(xPos, yPos + circlesDiameter * 0.75), vec(xPos - circlesDiameter, yPos - circlesDiameter * 0.75)], true);
                break;
            }
        }
      }
    }

    return path;
  }, [numberOfCircleRows, shapeType]);

  const renderShapesWithPaths = () => <Path
    path={ shapesPath }
    color={ '#1877AD' }
    style="fill"
    strokeJoin="round"
  />;

  // Main Canvas
  return <View style={{ flex: 1, backgroundColor: '#464646'}}>
    { renderActionButtons()}

    <View style={{ flex: 1, overflow: 'hidden', width: width }}>
      <Canvas style={{ flex: 1 }}>
        <Group transform={baseXTranslateWithTimelineFromAnimation}>
          {(usePathOptimization) ? renderShapesWithPaths() : renderShapesWithComponents() }
        </Group>
      </Canvas>
    </View>
  </View>;
};

export default LaggyShapesTranslation;