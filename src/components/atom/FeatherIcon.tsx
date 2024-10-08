import React from 'react';
import * as icons from 'react-feather';
import type { IconProps } from 'react-feather';

export interface FeatherIconProps extends IconProps {
  iconName: keyof typeof icons;
}

const FeatherIcon = ({ iconName, ...props }: FeatherIconProps) => {
  const Icon = icons[iconName] as unknown as React.ElementType;
  if (!Icon) { return; }
  return (<Icon {...props} />);
}

export default FeatherIcon;
