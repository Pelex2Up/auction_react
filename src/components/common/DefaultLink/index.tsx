import { AnchorHTMLAttributes, DetailedHTMLProps, FC } from "react";
import styles from "./defaultLink.module.scss";

type LinkT = { text: string } & DetailedHTMLProps<
  AnchorHTMLAttributes<HTMLAnchorElement>,
  HTMLAnchorElement
>;

export const DefaultLink: FC<LinkT> = ({ text, ...rest }) => {
  return (
    <a {...rest} className={`${rest.className} ${styles.link}`}>
      {text}
    </a>
  );
};

export default DefaultLink;
