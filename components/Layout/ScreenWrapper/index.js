// Images
import BlueLightning from '../../../public/assets/imgs/svgs/blueLightning.svg';
import GrayLightning from '../../../public/assets/imgs/svgs/grayLightning.svg';
import GrayLightningHalf from '../../../public/assets/imgs/svgs/grayLightningHalf.svg';
import GrayLightningFull from '../../../public/assets/imgs/svgs/grayLightningFull.svg';
import BlueLightningFull from '../../../public/assets/imgs/svgs/blueLightningFull.svg';

// Styles
import styles from './screenwrapper.module.scss';
import Image from 'next/image';

/**
 * ScreenWrapper component
 *
 * Renders a container with a background and a lightning image. The background can be blue or gray, and the lightning image can be a full blue lightning, half blue lightning, full gray lightning, or half gray lightning. The position of the lightning image can be controlled with the `positionX` and `positionY` props.
 *
 * @param {string} background The background color. Can be `blue` or `gray`. (optional, defaults to `gray`)
 * @param {string} image The name of the lightning image. Can be `blueLightning`, `grayLightningHalf`, `grayLightningFull`, or `blueLightningFull`. (optional, defaults to `grayLightningHalf`)
 * @param {number} positionX The horizontal position of the lightning image. (optional, defaults to `0`)
 * @param {number} positionY The vertical position of the lightning image. (optional, defaults to `0`)
 * @param {React.Node} children The content of the container.
 *
 * @returns {React.Element} A `div` element with the specified background color and lightning image.
 */
const ScreenWrapper = ({
  background,
  image,
  positionX,
  positionY,
  children,
}) => {
  const images = {
    blueLightning: BlueLightning,
    grayLightning: GrayLightning,
    grayLightningHalf: GrayLightningHalf,
    grayLightningFull: GrayLightningFull,
    blueLightningFull: BlueLightningFull,
  };

  const imageUrl = images[image];

  const BACKGROUND_COLOR_BLUE = '#144587';
  const BACKGROUND_COLOR_GRAY =
    'linear-gradient(180deg, rgba(255, 255, 255, 0.20) 0%, rgba(172, 172, 172, 0.20) 45.92%), #FFF';
  const BACKGROUND_COLOR_WHITE = '#FFFFFF';

  const backgroundColor =
    background === 'blue'
      ? BACKGROUND_COLOR_BLUE
      : background === 'white'
      ? BACKGROUND_COLOR_WHITE
      : BACKGROUND_COLOR_GRAY;

  return (
    <div
      className={styles.screenWrapper}
      style={{
        background: backgroundColor,
      }}
    >
      {children}
      {imageUrl && (
        <Image
          src={imageUrl}
          alt="Lightning"
          className={styles.lightning}
          style={{
            position: 'absolute',
            bottom: positionY || 0,
            left: positionX || 0,
          }}
        />
      )}
    </div>
  );
};

export default ScreenWrapper;
