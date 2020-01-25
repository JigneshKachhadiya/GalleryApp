import { PixelRatio } from 'react-native';

const buttonRatios = {
  1: 2, // 160 dpi
  1.5: 2, // 240 dpi
  2: 2, // 320 dpi
  3: 2.5, // 480 dpi
  3.5: 2.5, // Nexus 6
};

export const currentRatio = PixelRatio.get();
export const buttonRatioCoef = buttonRatios[currentRatio.toString()];

export const resizeVideo = (videoWidth, videoHeight, finalWidth) => {
  const videoRatio = videoHeight / videoWidth;
  const height = videoRatio * finalWidth;
  return { width: finalWidth, height };
};
