import * as React from 'react';
import Svg, {Path} from 'react-native-svg';
import {useTheme} from 'ui/Theme';
import {IconProps} from './icon-constants';

export const HomeIcon: React.FC<IconProps> = ({active}) => {
  const theme = useTheme();
  return (
    <Svg
      width={24}
      height={24}
      viewBox="0 0 24 24"
      fill={active ? theme.colors.primary : 'none'}
      stroke={theme.colors.primary}
      strokeWidth={2}
      strokeLinecap="round"
      strokeLinejoin="round">
      <Path
        fill={active ? 'white' : 'none'}
        d="M3 9l9-7 9 7v11a2 2 0 01-2 2H5a2 2 0 01-2-2z"
      />
      <Path fill={active ? theme.colors.primary : 'none'} d="M9 22V12h6v10" />
    </Svg>
  );
};
