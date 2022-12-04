import React from "react";
import { Button } from "react-native";

interface Props extends React.ComponentProps<typeof Button> {
  title: string;
  svg: React.FC<React.SVGProps<SVGSVGElement>>;
}

export function SignInSocialButton({title, svg: Svg, ...rest}: Props) {
  return (
    <Button
      title={title}
      color="#fff"
      {...rest}
    />
  )
}