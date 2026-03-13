import React from "react";
import {getViewBox} from "@/features/shared/utils/SVGHelpers";
interface SvgProps extends React.SVGProps<SVGSVGElement> {
  className?: string;
  width?: string;
  height?: string;
  children: React.ReactNode;
  viewBox?: string;
  fill?: string;
}

const SvgComponent = ({
  className,
  width,
  height,
  viewBox,
  children,
  fill,
  ...restProps
}: SvgProps) => {
  return (
    <svg
      width={width}
      height={height}
      viewBox={viewBox}
      fill={fill ?? "none"}
      xmlns="http://www.w3.org/2000/svg"
      className={className}
      {...restProps}
    >
      {children}
    </svg>
  );
};


export interface ISVGIconProps extends React.SVGProps<SVGSVGElement> {
  className?: string;
  width?: string;
  height?: string;
  strokeClassName?: string;
  fill?: string;
}


const SVGIcon = (pathData: string | string[], customViewBox?: string) => {
  const calculatedViewBox = getViewBox(pathData, customViewBox);

  const Icon: React.FC<ISVGIconProps> =  ({
    className,
    width,
    height,
    strokeClassName,
    fill,
    ...restProps
  }: ISVGIconProps) => (
    <SvgComponent
      width={width || "1em"}
      height={height || "1em"}
      className={className}
      fill={fill}
      viewBox={calculatedViewBox}
      {...restProps}
    >
      {Array.isArray(pathData) ? (
        pathData.map((path, index) => (
          <path
            key={index}
            d={path}
            className={`${strokeClassName}`}
            strokeWidth="1.25"
            strokeLinecap="round"
            strokeLinejoin="round"
          />
        ))
      ) : (
        <path
          d={pathData}
          className={`${strokeClassName}`}
          strokeWidth="1.25"
          strokeLinecap="round"
          strokeLinejoin="round"
        />
      )}
    </SvgComponent>
  );

  Icon.displayName = "SVGIcon";

  return Icon;
};


export default SVGIcon;