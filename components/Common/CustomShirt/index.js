import React, { useState, useEffect } from 'react';
import styles from './customshirt.module.scss';
import { pickTextColorBasedOnBgColorAdvanced } from '../../../utils/functions';

/**
 * A color picker component that allows users to select a color.
 *
 * @returns {JSX.Element} The color picker component.
 */
export default function CustomShirt({
  shirtColor,
  backgroundColor,
  borderColor,
  number,
}) {
  const [textColor, setTextColor] = useState('#000000');

  useEffect(() => {
    // Update the text color based on the background color
    setTextColor(
      pickTextColorBasedOnBgColorAdvanced(shirtColor, '#FFFFFF', '#000000')
    );
  }, [shirtColor]);

  return (
    <div className={styles.customShirt}>
      <svg
        xmlns="http://www.w3.org/2000/svg"
        width="99"
        height="100"
        viewBox="0 0 69 80"
        fill="none"
      >
        <path
          fill-rule="evenodd"
          clip-rule="evenodd"
          d="M33.5719 0L0.0798001 18.1445V61.2044L0 61.2548L0.0798001 61.2974V61.3911L0.16027 61.3403L34.5428 79.6721L68.0349 61.5277V18.4677L68.1147 18.4173L68.0349 18.3748V18.281L67.9544 18.3319L33.5719 0Z"
          fill={backgroundColor}
        />
        <g filter="url(#filter0_d_616_419)">
          <mask id="path-2-inside-1_616_419" fill="white">
            <path
              fill-rule="evenodd"
              clip-rule="evenodd"
              d="M45.7525 21.8796L45.7586 21.8733L54.7074 31.1685L54.7302 31.1448L56.9948 33.497L50.201 40.5538L48.046 38.3154L48.0232 38.3391L45.7525 35.9805V55.1392H34.2242V55.1394H22.6947V35.9911L20.4341 38.3391L20.4113 38.3155L18.2562 40.554L11.4624 33.4972L13.727 31.145L13.7498 31.1686L22.6947 21.8775V21.8735H22.6986L22.6987 21.8733L22.6988 21.8735H29.0679L31.3418 24.568L34.2235 27.8605L37.1053 24.5678L39.3792 21.8733H45.7525V21.8796Z"
            />
          </mask>
          <path
            fill-rule="evenodd"
            clip-rule="evenodd"
            d="M45.7525 21.8796L45.7586 21.8733L54.7074 31.1685L54.7302 31.1448L56.9948 33.497L50.201 40.5538L48.046 38.3154L48.0232 38.3391L45.7525 35.9805V55.1392H34.2242V55.1394H22.6947V35.9911L20.4341 38.3391L20.4113 38.3155L18.2562 40.554L11.4624 33.4972L13.727 31.145L13.7498 31.1686L22.6947 21.8775V21.8735H22.6986L22.6987 21.8733L22.6988 21.8735H29.0679L31.3418 24.568L34.2235 27.8605L37.1053 24.5678L39.3792 21.8733H45.7525V21.8796Z"
            fill={shirtColor}
          />
          <path
            d="M45.7586 21.8733L46.1188 21.5265L45.7586 21.1524L45.3984 21.5265L45.7586 21.8733ZM45.7525 21.8796H45.2525V23.1199L46.1127 22.2264L45.7525 21.8796ZM54.7074 31.1685L54.3472 31.5153L54.7074 31.8894L55.0676 31.5152L54.7074 31.1685ZM54.7302 31.1448L55.0904 30.798L54.7302 30.4238L54.37 30.798L54.7302 31.1448ZM56.9948 33.497L57.355 33.8438L57.6889 33.497L57.355 33.1503L56.9948 33.497ZM50.201 40.5538L49.8408 40.9006L50.201 41.2747L50.5612 40.9006L50.201 40.5538ZM48.046 38.3154L48.4062 37.9686L48.046 37.5945L47.6858 37.9686L48.046 38.3154ZM48.0232 38.3391L47.663 38.6859L48.0232 39.06L48.3834 38.6859L48.0232 38.3391ZM45.7525 35.9805L46.1127 35.6337L45.2525 34.7403V35.9805H45.7525ZM45.7525 55.1392V55.6392H46.2525V55.1392H45.7525ZM34.2242 55.1392V54.6392H33.7242V55.1392H34.2242ZM34.2242 55.1394V55.6394H34.7242V55.1394H34.2242ZM22.6947 55.1394H22.1947V55.6394H22.6947V55.1394ZM22.6947 35.9911H23.1947V34.7508L22.3345 35.6443L22.6947 35.9911ZM20.4341 38.3391L20.0739 38.6859L20.4341 39.0601L20.7943 38.6859L20.4341 38.3391ZM20.4113 38.3155L20.7715 37.9687L20.4113 37.5946L20.0511 37.9687L20.4113 38.3155ZM18.2562 40.554L17.896 40.9008L18.2562 41.2749L18.6164 40.9008L18.2562 40.554ZM11.4624 33.4972L11.1022 33.1504L10.7683 33.4972L11.1022 33.844L11.4624 33.4972ZM13.727 31.145L14.0872 30.7982L13.727 30.424L13.3668 30.7982L13.727 31.145ZM13.7498 31.1686L13.3896 31.5154L13.7498 31.8895L14.11 31.5154L13.7498 31.1686ZM22.6947 21.8775L23.0549 22.2243L23.1947 22.0791V21.8775H22.6947ZM22.6947 21.8735V21.3735H22.1947V21.8735H22.6947ZM22.6986 21.8735V22.3735H22.9117L23.0593 22.2197L22.6986 21.8735ZM22.6987 21.8733L23.0594 21.5271L22.6987 21.1513L22.3379 21.5271L22.6987 21.8733ZM22.6988 21.8735L22.3381 22.2197L22.4856 22.3735H22.6988V21.8735ZM29.0679 21.8735L29.45 21.551L29.3002 21.3735H29.0679V21.8735ZM31.3418 24.568L30.9596 24.8905L30.9656 24.8973L31.3418 24.568ZM34.2235 27.8605L33.8472 28.1898L34.2235 28.6197L34.5997 28.1898L34.2235 27.8605ZM37.1053 24.5678L37.4816 24.8972L37.4874 24.8903L37.1053 24.5678ZM39.3792 21.8733V21.3733H39.1469L38.9971 21.5508L39.3792 21.8733ZM45.7525 21.8733H46.2525V21.3733H45.7525V21.8733ZM45.3984 21.5265L45.3923 21.5328L46.1127 22.2264L46.1188 22.2201L45.3984 21.5265ZM55.0676 30.8217L46.1188 21.5265L45.3984 22.2201L54.3472 31.5153L55.0676 30.8217ZM54.37 30.798L54.3472 30.8217L55.0676 31.5152L55.0904 31.4915L54.37 30.798ZM57.355 33.1503L55.0904 30.798L54.37 31.4916L56.6346 33.8438L57.355 33.1503ZM50.5612 40.9006L57.355 33.8438L56.6346 33.1503L49.8408 40.207L50.5612 40.9006ZM47.6858 38.6622L49.8408 40.9006L50.5612 40.207L48.4062 37.9686L47.6858 38.6622ZM48.3834 38.6859L48.4062 38.6622L47.6858 37.9686L47.663 37.9923L48.3834 38.6859ZM45.3923 36.3273L47.663 38.6859L48.3834 37.9923L46.1127 35.6337L45.3923 36.3273ZM45.2525 35.9805V55.1392H46.2525V35.9805H45.2525ZM45.7525 54.6392H34.2242V55.6392H45.7525V54.6392ZM33.7242 55.1392V55.1394H34.7242V55.1392H33.7242ZM34.2242 54.6394H22.6947V55.6394H34.2242V54.6394ZM23.1947 55.1394V35.9911H22.1947V55.1394H23.1947ZM22.3345 35.6443L20.0739 37.9924L20.7943 38.6859L23.0549 36.3378L22.3345 35.6443ZM20.7943 37.9924L20.7715 37.9687L20.0511 38.6623L20.0739 38.6859L20.7943 37.9924ZM20.0511 37.9687L17.896 40.2072L18.6164 40.9008L20.7715 38.6623L20.0511 37.9687ZM18.6164 40.2072L11.8226 33.1504L11.1022 33.844L17.896 40.9008L18.6164 40.2072ZM11.8226 33.844L14.0872 31.4917L13.3668 30.7982L11.1022 33.1504L11.8226 33.844ZM13.3668 31.4917L13.3896 31.5154L14.11 30.8218L14.0872 30.7982L13.3668 31.4917ZM14.11 31.5154L23.0549 22.2243L22.3345 21.5307L13.3896 30.8218L14.11 31.5154ZM23.1947 21.8775V21.8735H22.1947V21.8775H23.1947ZM22.6947 22.3735H22.6986V21.3735H22.6947V22.3735ZM23.0593 22.2197L23.0594 22.2196L22.3379 21.5271L22.3378 21.5272L23.0593 22.2197ZM22.3379 22.2196L22.3381 22.2197L23.0595 21.5272L23.0594 21.5271L22.3379 22.2196ZM22.6988 22.3735H29.0679V21.3735H22.6988V22.3735ZM28.6858 22.1959L30.9597 24.8905L31.7239 24.2455L29.45 21.551L28.6858 22.1959ZM30.9656 24.8973L33.8472 28.1898L34.5997 27.5312L31.7181 24.2387L30.9656 24.8973ZM34.5997 28.1898L37.4816 24.8971L36.7291 24.2385L33.8472 27.5312L34.5997 28.1898ZM37.4874 24.8903L39.7613 22.1958L38.9971 21.5508L36.7232 24.2454L37.4874 24.8903ZM39.3792 22.3733H45.7525V21.3733H39.3792V22.3733ZM45.2525 21.8733V21.8796H46.2525V21.8733H45.2525Z"
            fill={borderColor || 'black'}
            mask="url(#path-2-inside-1_616_419)"
          />
        </g>
        <defs>
          <filter
            id="filter0_d_616_419"
            x="7.4624"
            y="21.8733"
            width="53.5325"
            height="41.2661"
            filterUnits="userSpaceOnUse"
            color-interpolation-filters="sRGB"
          >
            <feFlood flood-opacity="0" result="BackgroundImageFix" />
            <feColorMatrix
              in="SourceAlpha"
              type="matrix"
              values="0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 127 0"
              result="hardAlpha"
            />
            <feOffset dy="4" />
            <feGaussianBlur stdDeviation="2" />
            <feColorMatrix
              type="matrix"
              values="0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0.25 0"
            />
            <feBlend
              mode="normal"
              in2="BackgroundImageFix"
              result="effect1_dropShadow_616_419"
            />
            <feBlend
              mode="normal"
              in="SourceGraphic"
              in2="effect1_dropShadow_616_419"
              result="shape"
            />
          </filter>
        </defs>
      </svg>
      {number && <span style={{ color: textColor }}>{number}</span>}
    </div>
  );
}
