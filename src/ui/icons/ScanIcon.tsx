import * as React from 'react';
import Svg, {Path, Rect} from 'react-native-svg';
import {
  IconProps,
  Colors,
  ICON_TAB_BAR_HEIGHT,
  ICON_TAB_BAR_WIDTH,
} from './icon-constants';

export const ScanIcon: React.FC<IconProps> = ({width, height}) => {
  return (
    <Svg
      height={height ? height : ICON_TAB_BAR_HEIGHT}
      width={width ? width : ICON_TAB_BAR_WIDTH}
      viewBox="0 0 512 512">
      <Rect
        x={80}
        y={80}
        width={352}
        height={352}
        rx={48}
        ry={48}
        fill="none"
        stroke={Colors.primary}
        strokeLinejoin="round"
        strokeWidth={32}
      />
      <Rect
        x={144}
        y={144}
        width={224}
        height={224}
        rx={16}
        ry={16}
        fill="none"
        stroke={Colors.primary}
        strokeLinejoin="round"
        strokeWidth={32}
      />
      <Path
        fill="none"
        stroke={Colors.primary}
        strokeLinecap="round"
        strokeLinejoin="round"
        strokeWidth={32}
        d="M256 80V48m80 32V48M176 80V48m80 416v-32m80 32v-32m-160 32v-32m256-176h32m-32 80h32m-32-160h32M48 256h32m-32 80h32M48 176h32"
      />
    </Svg>
  );
};
