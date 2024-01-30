import React from 'react';
import * as icons from 'react-feather';

const RenderIcon = ({ iconName }: { iconName: string }) => {
  const Icon = icons[iconName] as unknown as React.ElementType;
  if (!Icon) { return; }
  return (<Icon />);
}

export default RenderIcon;
