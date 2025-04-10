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
    preserveAspectRatio="xMidYMid slice"
    {...props}
  >
    <g clipPath="url(#clip0_1_2)">
      <rect width="1920" height="1080" fill="#57008A" />
      <g opacity="0.5" filter="url(#filter0_f_1_2)">
        <path d="M1920 0H0V1080H1920V0Z" fill="url(#paint0_linear_1_2)" />
      </g>
      <g opacity="0.5" filter="url(#filter1_f_1_2)">
        <path d="M1920 0H0V1080H1920V0Z" fill="url(#paint1_linear_1_2)" />
      </g>
      <g opacity="0.5" filter="url(#filter2_f_1_2)">
        <path d="M1920 0H0V1080H1920V0Z" fill="url(#paint2_linear_1_2)" />
      </g>
    </g>
    <defs>
      <filter
        id="filter0_f_1_2"
        x="-200"
        y="-200"
        width="2320"
        height="1480"
        filterUnits="userSpaceOnUse"
        colorInterpolationFilters="sRGB"
      >
        <feFlood floodOpacity="0" result="BackgroundImageFix" />
        <feBlend mode="normal" in="SourceGraphic" in2="BackgroundImageFix" result="shape" />
        <feGaussianBlur stdDeviation="100" result="effect1_foregroundBlur_1_2" />
      </filter>
      <filter
        id="filter1_f_1_2"
        x="-200"
        y="-200"
        width="2320"
        height="1480"
        filterUnits="userSpaceOnUse"
        colorInterpolationFilters="sRGB"
      >
        <feFlood floodOpacity="0" result="BackgroundImageFix" />
        <feBlend mode="normal" in="SourceGraphic" in2="BackgroundImageFix" result="shape" />
        <feGaussianBlur stdDeviation="100" result="effect1_foregroundBlur_1_2" />
      </filter>
      <filter
        id="filter2_f_1_2"
        x="-200"
        y="-200"
        width="2320"
        height="1480"
        filterUnits="userSpaceOnUse"
        colorInterpolationFilters="sRGB"
      >
        <feFlood floodOpacity="0" result="BackgroundImageFix" />
        <feBlend mode="normal" in="SourceGraphic" in2="BackgroundImageFix" result="shape" />
        <feGaussianBlur stdDeviation="100" result="effect1_foregroundBlur_1_2" />
      </filter>
      <linearGradient id="paint0_linear_1_2" x1="960" y1="0" x2="960" y2="1080" gradientUnits="userSpaceOnUse">
        <stop stopColor="#5E00FF" />
        <stop offset="1" stopColor="#5E00FF" stopOpacity="0" />
      </linearGradient>
      <linearGradient id="paint1_linear_1_2" x1="960" y1="0" x2="960" y2="1080" gradientUnits="userSpaceOnUse">
        <stop stopColor="#A100FF" />
        <stop offset="1" stopColor="#A100FF" stopOpacity="0" />
      </linearGradient>
      <linearGradient id="paint2_linear_1_2" x1="960" y1="1080" x2="960" y2="0" gradientUnits="userSpaceOnUse">
        <stop stopColor="white" />
        <stop offset="1" stopColor="white" stopOpacity="0" />
      </linearGradient>
      <clipPath id="clip0_1_2">
        <rect width="1920" height="1080" fill="white" />
      </clipPath>
    </defs>
  </svg>
)

// Function to get background by name
export function getBackgroundByName(name: string) {
  const backgrounds: Record<string, React.FC<BackgroundProps>> = {
    career_main_bg: CareerMainBackground,
    // Add more backgrounds here as needed
  }

  return backgrounds[name] || null
}
