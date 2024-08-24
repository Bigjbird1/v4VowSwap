import React from "react";

export function Logo(props: React.SVGProps<SVGSVGElement>) {
  return (
    <svg aria-hidden="true" viewBox="0 0 300 48" {...props}>
      <g>
        <path
          fill="#3B82F6"
          fillRule="evenodd"
          d="M10 0 L20 10 L10 20 L0 10 Z"
          clipRule="evenodd"
        />
        <path
          fill="#93C5FD"
          fillRule="evenodd"
          d="M40 0 L50 10 L40 20 L30 10 Z"
          clipRule="evenodd"
        />
      </g>
      <text
        x="60"
        y="15"
        fill="#0F172A"
        fontSize="20"
        fontWeight="bold"
        fontFamily="Arial, sans-serif"
      >
        SpeedBuildMarketplace
      </text>
    </svg>
  );
}
