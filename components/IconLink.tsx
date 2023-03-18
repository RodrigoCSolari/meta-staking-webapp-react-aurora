import { Img, Link } from "@chakra-ui/react";
import React from "react";

type Props = {
  alt?: string;
  href: string;
  src: string;
};

export const IconLink = ({ alt, href, src }: Props) => {
  return (
    <Link
      href={href}
      target="_blank"
      _active={{
        textDecoration: "none",
        boxShadow: "0 0 0 0 #0000",
      }}
      _focus={{
        textDecoration: "none",
        boxShadow: "0 0 0 0 #0000",
      }}
      minW="25px"
    >
      <Img src={src} alt={alt ?? ""} width="25px" height="25px" />
    </Link>
  );
};
