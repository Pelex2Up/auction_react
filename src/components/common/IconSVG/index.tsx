import { IconSvgT } from "../../../types/commonTypes";
import { FC } from "react";

export const IconSvg: FC<IconSvgT> = ({
  styles,
  width,
  height,
  path,
  viewBoxSize = "0 0 20 20",
  className,
  functionOnClick,
  children,
  onPointerDown,
  id,
}) => {
  return (
    <svg
      id={id && id}
      style={styles}
      className={className}
      onClick={functionOnClick}
      onPointerDown={onPointerDown}
      width={width}
      height={height}
      viewBox={viewBoxSize}
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
    >
      {path &&
        path.map((path, id) => {
          const {
            d,
            fill,
            stroke,
            strokeWidth,
            strokeLinecap,
            strokeLinejoin,
            fillRule,
            clipRule,
          } = path;
          return (
            <path
              key={id}
              id={id.toString()}
              d={d}
              fill={fill}
              stroke={stroke && stroke}
              strokeWidth={strokeWidth && strokeWidth}
              strokeLinecap={strokeLinecap && strokeLinecap}
              strokeLinejoin={strokeLinejoin && strokeLinejoin}
              fillRule={fillRule && fillRule}
              clipRule={clipRule && clipRule}
            />
          );
        })}
      {children}
    </svg>
  );
};

export default IconSvg;
