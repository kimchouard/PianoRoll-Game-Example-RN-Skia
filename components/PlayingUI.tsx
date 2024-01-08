import { useEffect, useState } from "react";
import { Canvas, Group, useFont } from "@shopify/react-native-skia";
import { Platform, Pressable, StyleSheet, Text, View, useWindowDimensions } from "react-native";
import { appColors } from "./utils/styleColors";
import { getDistXFromBars, getTimeFromBars, playingUIMaxHeight, timelineXPosition } from "./utils/utils";
import HorizontalLines from "./PlayingUI/Lines/HorizontalLines";
import { Easing, useDerivedValue, useSharedValue, withSpring, withTiming } from "react-native-reanimated";
import Timeline from "./PlayingUI/Lines/Timeline";
import Notes from "./PlayingUI/Notes";

export type RenderingMethod = 'path' | 'shapes';

export const BPM = 60; // BPM is a const for the sake of this example

const totalBarCount = 50;
export const keyMainNoteFontSize = 15;
 
const PlayingUI = () => {
  const {height, width} = useWindowDimensions();
  const [isPlaying, setIsPlaying] = useState(false);
  const [renderingMethod, setRenderingMethod] = useState<RenderingMethod>('path');

  const keyMainNoteFont = useFont(((Platform.OS === 'web') ? '/fonts/Lato-Regular.ttf' : require('../public/fonts/Lato-Regular.ttf')), keyMainNoteFontSize);

  // Reanimated value used to move the notes scene
  const reanimatedBaseX = useSharedValue(0);

  // Deduct the X translation used for the Notes' group animation
  const baseXTranslateWithTimelineFromAnimation = useDerivedValue(
    () => [{ translateX: (- reanimatedBaseX.value + timelineXPosition) }],
    [isPlaying, reanimatedBaseX],
  );

  // Update the reanimated value to animate the notes scene when Play is pressed
  useEffect(() => {
    if (isPlaying === true) {
      reanimatedBaseX.value = withTiming(
        getDistXFromBars(totalBarCount, BPM), // Go to the final distance, computed form the total # of bars
        {
          duration: getTimeFromBars(totalBarCount, BPM), // In the time needed for the bars we have left
          easing: Easing.linear, // No easing here, time is straight!
        },
      );

    // ELSE: we've stopped
    } else {
      reanimatedBaseX.value = withSpring(0, { damping: 40 }); // we go back to 0, with a little spring effect ✨
    }
  }, [isPlaying]);

  const renderPlayPauseButton = () => <View style={styles.actionWrapper}>
    <Pressable style={styles.actionButton} onPress={() => setIsPlaying(!isPlaying)}>
      <Text style={styles.actionButtonText}>{ (isPlaying) ? 'Stop' : 'Play' }</Text>
    </Pressable>
    <Pressable style={[styles.actionButton, styles.actionButtonOutline]} onPress={() => setRenderingMethod((renderingMethod === 'path') ? 'shapes' : 'path')}>
      <Text style={[styles.actionButtonText, styles.actionButtonTextOutline]}>{ (renderingMethod === 'path') ? 'Render with Shapes (web = 🐌)' : 'Render with Paths (web = 🚀)' }</Text>
    </Pressable>
  </View>;
  
  return keyMainNoteFont && (
    <View style={styles.body}>
      { renderPlayPauseButton()}
      <View style={[styles.canvasWrapper, { width: width}]}>
        <Canvas style={styles.canvas}>
          <HorizontalLines />
          
          <Group transform={baseXTranslateWithTimelineFromAnimation}>
            <Notes keyMainNoteFont={keyMainNoteFont} renderingMethod={renderingMethod} />
          </Group>
          
          <Timeline />
        </Canvas>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  body: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: appColors.darkGrey,
  },
  canvasWrapper: {
    display: 'flex',
    height: playingUIMaxHeight,
    backgroundColor: appColors.grey,
    overflow: 'hidden',
  },
  canvas: {
    flex: 1,
    width: '100%',
    height: playingUIMaxHeight,
  },
  actionWrapper: {
    position: 'absolute',
    bottom: 20,
    left: 20,
    zIndex: 1,
    display: 'flex',
    flexDirection: 'row',
  },
  actionButton: {
    backgroundColor: appColors.odiseiGreen,
    paddingVertical: 10,
    paddingHorizontal: 20,
    marginHorizontal: 10,
    borderRadius: 10,
  },
  actionButtonOutline: {
    backgroundColor: 'transparent',
    // borderWidth: 2,
    // borderColor: appColors.odiseiGreen,
  },
  actionButtonText: {
    color: '#FFFFFF',
    fontSize: 20,
  },
  actionButtonTextOutline: {
    color: appColors.odiseiGreen,
  },
});
 
export default PlayingUI;