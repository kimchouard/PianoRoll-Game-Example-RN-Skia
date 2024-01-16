import { StyleSheet } from "react-native";
import { appColors } from "../components/utils/styleColors";
import { playingUIMaxHeight } from "../components/utils/utils";

const styles = StyleSheet.create({
  body: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: appColors.darkGrey,
  },
  canvasWrapper: {
    flex: 1,
    overflow: 'hidden',
  },
  canvas: {
    flex: 1,
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

export default styles;
