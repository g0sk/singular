import * as React from 'react';
import Svg, {Path} from 'react-native-svg';
import {
  IconProps,
  Colors,
  ICON_TAB_BAR_HEIGHT,
  ICON_TAB_BAR_WIDTH,
} from './icon-constants';

export const DocumentIcon: React.FC<IconProps> = ({active, height, width}) => {
  return (
    <Svg
      height={height ? height : ICON_TAB_BAR_HEIGHT}
      width={width ? width : ICON_TAB_BAR_WIDTH}
      viewBox="0 0 512 512">
      <Path
        d="M416 221.25V416a48 48 0 01-48 48H144a48 48 0 01-48-48V96a48 48 0 0148-48h98.75a32 32 0 0122.62 9.37l141.26 141.26a32 32 0 019.37 22.62z"
        fill={active ? Colors.primary : 'none'}
        stroke={Colors.primary}
        strokeLinejoin="round"
        strokeWidth={32}
      />
      <Path
        d="M256 56v120a32 32 0 0032 32h120"
        fill={active ? Colors.primary : 'none'}
        stroke={active ? Colors.lightBorder : Colors.primary}
        strokeLinecap="round"
        strokeLinejoin="round"
        strokeWidth={32}
      />
    </Svg>
  );
};
