import type React from "react"
import { cn } from "@/lib/utils"

interface BackgroundProps extends React.SVGProps<SVGSVGElement> {
  className?: string
}

// Career Main Background SVG
export const CareerMainBackground = ({ className, ...props }: BackgroundProps) => (
  <svg
    className={cn("w-full h-full", className)}
    viewBox="0 0 1920 1080"
    fill="none"
    xmlns="http://www.w3.org/2000/svg"
    xmlnsXlink="http://www.w3.org/1999/xlink"
    preserveAspectRatio="xMidYMid slice"
    {...props}
  >
    <g filter="url(#filter0_f_406_6094)">
      <ellipse cx="910.368" cy="552.5" rx="273.5" ry="273" transform="rotate(-90 910.368 552.5)" fill="#57008A" />
    </g>
    <g style={{ mixBlendMode: "hard-light" }} filter="url(#filter1_f_406_6094)">
      <ellipse cx="584.868" cy="552.998" rx="272" ry="271.5" transform="rotate(-90 584.868 552.998)" fill="#5E00FF" />
    </g>
    <g style={{ mixBlendMode: "hard-light" }} filter="url(#filter2_f_406_6094)">
      <circle cx="1309.37" cy="552.998" r="272" transform="rotate(-90 1309.37 552.998)" fill="#A100FF" />
    </g>
    <g style={{ mixBlendMode: "plus-lighter" }}>
      <rect
        y="1079.75"
        width="1080"
        height="1920"
        transform="rotate(-90 0 1079.75)"
        fill="url(#pattern0_406_6094)"
        style={{ mixBlendMode: "darken" }}
      />
    </g>
    <defs>
      <filter
        id="filter0_f_406_6094"
        x="271.384"
        y="-86.984"
        width="1277.97"
        height="1278.97"
        filterUnits="userSpaceOnUse"
        colorInterpolationFilters="sRGB"
      >
        <feFlood floodOpacity="0" result="BackgroundImageFix" />
        <feBlend mode="normal" in="SourceGraphic" in2="BackgroundImageFix" result="shape" />
        <feGaussianBlur stdDeviation="182.992" result="effect1_foregroundBlur_406_6094" />
      </filter>
      <filter
        id="filter1_f_406_6094"
        x="-52.6156"
        y="-84.986"
        width="1274.97"
        height="1275.97"
        filterUnits="userSpaceOnUse"
        colorInterpolationFilters="sRGB"
      >
        <feFlood floodOpacity="0" result="BackgroundImageFix" />
        <feBlend mode="normal" in="SourceGraphic" in2="BackgroundImageFix" result="shape" />
        <feGaussianBlur stdDeviation="182.992" result="effect1_foregroundBlur_406_6094" />
      </filter>
      <filter
        id="filter2_f_406_6094"
        x="671.384"
        y="-84.986"
        width="1275.97"
        height="1275.97"
        filterUnits="userSpaceOnUse"
        colorInterpolationFilters="sRGB"
      >
        <feFlood floodOpacity="0" result="BackgroundImageFix" />
        <feBlend mode="normal" in="SourceGraphic" in2="BackgroundImageFix" result="shape" />
        <feGaussianBlur stdDeviation="182.992" result="effect1_foregroundBlur_406_6094" />
      </filter>
      <pattern id="pattern0_406_6094" patternContentUnits="objectBoundingBox" width="1" height="1">
        <use xlinkHref="#image0_406_6094" transform="matrix(0.000868056 0 0 0.000488281 -0.388889 0)" />
      </pattern>
    </defs>
  </svg>
)

// Career Top Background SVG
export const CareerTopBackground = ({ className, ...props }: BackgroundProps) => (
  <svg
    className={cn("w-full h-full", className)}
    viewBox="0 0 1920 1080"
    fill="none"
    xmlns="http://www.w3.org/2000/svg"
    preserveAspectRatio="xMidYMid slice"
    {...props}
  >
    <g filter="url(#filter0_f_426_5512)">
      <ellipse cx="910.368" cy="-5.50001" rx="273.5" ry="273" transform="rotate(-90 910.368 -5.50001)" fill="#57008A" />
    </g>
    <g style={{ mixBlendMode: "hard-light" }} filter="url(#filter1_f_426_5512)">
      <ellipse cx="584.868" cy="-5.00197" rx="272" ry="271.5" transform="rotate(-90 584.868 -5.00197)" fill="#5E00FF" />
    </g>
    <g style={{ mixBlendMode: "hard-light" }} filter="url(#filter2_f_426_5512)">
      <circle cx="1309.37" cy="-5.00197" r="272" transform="rotate(-90 1309.37 -5.00197)" fill="#A100FF" />
    </g>
    <defs>
      <filter
        id="filter0_f_426_5512"
        x="271.384"
        y="-644.984"
        width="1277.97"
        height="1278.97"
        filterUnits="userSpaceOnUse"
        colorInterpolationFilters="sRGB"
      >
        <feFlood floodOpacity="0" result="BackgroundImageFix" />
        <feBlend mode="normal" in="SourceGraphic" in2="BackgroundImageFix" result="shape" />
        <feGaussianBlur stdDeviation="182.992" result="effect1_foregroundBlur_426_5512" />
      </filter>
      <filter
        id="filter1_f_426_5512"
        x="-52.6156"
        y="-642.986"
        width="1274.97"
        height="1275.97"
        filterUnits="userSpaceOnUse"
        colorInterpolationFilters="sRGB"
      >
        <feFlood floodOpacity="0" result="BackgroundImageFix" />
        <feBlend mode="normal" in="SourceGraphic" in2="BackgroundImageFix" result="shape" />
        <feGaussianBlur stdDeviation="182.992" result="effect1_foregroundBlur_426_5512" />
      </filter>
      <filter
        id="filter2_f_426_5512"
        x="671.384"
        y="-642.986"
        width="1275.97"
        height="1275.97"
        filterUnits="userSpaceOnUse"
        colorInterpolationFilters="sRGB"
      >
        <feFlood floodOpacity="0" result="BackgroundImageFix" />
        <feBlend mode="normal" in="SourceGraphic" in2="BackgroundImageFix" result="shape" />
        <feGaussianBlur stdDeviation="182.992" result="effect1_foregroundBlur_426_5512" />
      </filter>
    </defs>
  </svg>
)

// Function to get background by name
export function getBackgroundByName(name: string) {
  const backgrounds: Record<string, React.FC<BackgroundProps>> = {
    career_main_bg: CareerMainBackground,
    career_top_bg: CareerTopBackground,
    // Add more backgrounds here as needed
  }

  return backgrounds[name] || null
}