import * as React from 'react';
import Svg, {Path} from 'react-native-svg';
import {
  IconProps,
  Colors,
  ICON_TAB_BAR_HEIGHT,
  ICON_TAB_BAR_WIDTH,
} from './icon-constants';

export const HomeIcon = ({active}: IconProps) => {
  return (
    <Svg
      width={ICON_TAB_BAR_WIDTH}
      height={ICON_TAB_BAR_HEIGHT}
      viewBox="0 0 512 512">
      <Path
        d="M80 212v236a16 16 0 0016 16h96V328a24 24 0 0124-24h80a24 24 0 0124 24v136h96a16 16 0 0016-16V212"
        fill="none"
        stroke={active ? Colors.focused : Colors.primary}
        strokeLinecap="round"
        strokeLinejoin="round"
        strokeWidth={32}
      />
      <Path
        d="M480 256L266.89 52c-5-5.28-16.69-5.34-21.78 0L32 256m368-77V64h-48v69"
        fill="none"
        stroke={active ? Colors.focused : Colors.primary}
        strokeLinecap="round"
        strokeLinejoin="round"
        strokeWidth={32}
      />
    </Svg>
  );
};
