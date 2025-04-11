import type React from "react"
import { cn } from "@/lib/utils"

interface IconProps extends React.SVGProps<SVGSVGElement> {
  className?: string
  size?: "sm" | "md" | "lg" | "mxl" | "xl"
}

const sizeMap = {
  sm: "w-4 h-4",
  md: "w-5 h-5",
  lg: "w-6 h-6",
  mxl: "w20- h-20",
  xl: "w-25 h-25",
}

// Eye icon
export const EyeIcon = ({ className, size = "md", ...props }: IconProps) => (
  <svg
    className={cn(sizeMap[size], className)}
    viewBox="0 0 24 24"
    fill="none"
    stroke="currentColor"
    strokeWidth="1.5"
    strokeLinecap="round"
    strokeLinejoin="round"
    {...props}
  >
    <path d="M15.5799 11.9999C15.5799 13.9799 13.9799 15.5799 11.9999 15.5799C10.0199 15.5799 8.41992 13.9799 8.41992 11.9999C8.41992 10.0199 10.0199 8.41992 11.9999 8.41992C13.9799 8.41992 15.5799 10.0199 15.5799 11.9999Z" />
    <path d="M11.9998 20.2707C15.5298 20.2707 18.8198 18.1907 21.1098 14.5907C22.0098 13.1807 22.0098 10.8107 21.1098 9.4007C18.8198 5.8007 15.5298 3.7207 11.9998 3.7207C8.46984 3.7207 5.17984 5.8007 2.88984 9.4007C1.98984 10.8107 1.98984 13.1807 2.88984 14.5907C5.17984 18.1907 8.46984 20.2707 11.9998 20.2707Z" />
  </svg>
)

// target icon
export const TargetIcon = ({ className, size = "mxl", ...props }: IconProps) => (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    viewBox="0 0 24 24"
    fill="none"
    stroke="currentColor"
    strokeWidth="2"
    strokeLinecap="round"
    strokeLinejoin="round"
    className={cn(sizeMap[size], className)}
    {...props}
  >
    <circle cx="12" cy="12" r="10" />
    <circle cx="12" cy="12" r="6" />
    <circle cx="12" cy="12" r="2" />
  </svg>
)

// priority icon
export const PriorityIcon = ({ className, size = "xl", ...props }: IconProps) => (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    width="24"
    height="24"
    viewBox="0 0 24 24"
    fill="none"
    stroke="currentColor"
    strokeWidth="2"
    strokeLinecap="round"
    strokeLinejoin="round"
    className={cn(sizeMap[size], className)}
    {...props}
  >
    <path d="M10 12h11" />
    <path d="M10 18h11" />
    <path d="M10 6h11" />
    <path d="M4 10h2" />
    <path d="M4 6h1v4" />
    <path d="M6 18H4c0-1 2-2 2-3s-1-1.5-2-1" />
  </svg>
);


// Eye-off icon
export const EyeOffIcon = ({ className, size = "md", ...props }: IconProps) => (
  <svg
    className={cn(sizeMap[size], className)}
    viewBox="0 0 24 24"
    fill="none"
    stroke="currentColor"
    strokeWidth="1.5"
    strokeLinecap="round"
    strokeLinejoin="round"
    {...props}
  >
    <path d="M14.5299 9.46992L9.46992 14.5299C8.81992 13.8799 8.41992 12.9899 8.41992 11.9999C8.41992 10.0199 10.0199 8.41992 11.9999 8.41992C12.9899 8.41992 13.8799 8.81992 14.5299 9.46992Z" />
    <path d="M17.8198 5.77047C16.0698 4.45047 14.0698 3.73047 11.9998 3.73047C8.46984 3.73047 5.17984 5.81047 2.88984 9.41047C1.98984 10.8205 1.98984 13.1905 2.88984 14.6005C3.67984 15.8405 4.59984 16.9105 5.59984 17.7705" />
    <path d="M8.41992 19.5297C9.55992 20.0097 10.7699 20.2697 11.9999 20.2697C15.5299 20.2697 18.8199 18.1897 21.1099 14.5897C22.0099 13.1797 22.0099 10.8097 21.1099 9.39969C20.7799 8.87969 20.4199 8.38969 20.0499 7.92969" />
    <path d="M15.5099 12.6992C15.2499 14.1092 14.0999 15.2592 12.6899 15.5192" />
    <path d="M9.47 14.5293L2 21.9993" />
    <path d="M21.9998 2L14.5298 9.47" />
  </svg>
)

// Mail icon
export const MailIcon = ({ className, size = "md", ...props }: IconProps) => (
  <svg
    className={cn(sizeMap[size], className)}
    viewBox="0 0 24 24"
    fill="none"
    stroke="currentColor"
    strokeWidth="1.5"
    strokeLinecap="round"
    strokeLinejoin="round"
    {...props}
  >
    <path d="M17 20.5H7C4 20.5 2 19 2 15.5V8.5C2 5 4 3.5 7 3.5H17C20 3.5 22 5 22 8.5V15.5C22 19 20 20.5 17 20.5Z" />
    <path d="M17 9L13.87 11.5C12.84 12.32 11.15 12.32 10.12 11.5L7 9" />
  </svg>
)

// Home icon
export const HomeIcon = ({ className, size = "md", ...props }: IconProps) => (
  <svg
    className={cn(sizeMap[size], className)}
    viewBox="0 0 24 24"
    fill="none"
    stroke="currentColor"
    strokeWidth="1.5"
    strokeLinecap="round"
    strokeLinejoin="round"
    {...props}
  >
    <path d="M9.02 2.84004L3.63 7.04004C2.73 7.74004 2 9.23004 2 10.36V17.77C2 20.09 3.89 21.99 6.21 21.99H17.79C20.11 21.99 22 20.09 22 17.78V10.5C22 9.29004 21.19 7.74004 20.2 7.05004L14.02 2.72004C12.62 1.74004 10.37 1.79004 9.02 2.84004Z" />
    <path d="M12 17.99V14.99" />
  </svg>
)

// Career icon
export const CareerIcon = ({ className, size = "md", ...props }: IconProps) => (
  <svg
    className={cn(sizeMap[size], className)}
    viewBox="0 0 24 24"
    fill="none"
    stroke="currentColor"
    strokeWidth="1.5"
    strokeLinecap="round"
    strokeLinejoin="round"
    {...props}
  >
    <path d="M22 10V15C22 20 20 22 15 22H9C4 22 2 20 2 15V9C2 4 4 2 9 2H14" />
    <path d="M22 10H18C15 10 14 9 14 6V2L22 10Z" />
    <path d="M7 13H13" />
    <path d="M7 17H11" />
  </svg>
)

// Education/Skills icon
export const EducationIcon = ({ className, size = "md", ...props }: IconProps) => (
  <svg
    className={cn(sizeMap[size], className)}
    viewBox="0 0 24 24"
    fill="none"
    stroke="currentColor"
    strokeWidth="1.5"
    strokeLinecap="round"
    strokeLinejoin="round"
    {...props}
  >
    <path d="M22 16.74V4.67C22 3.47 21.02 2.58 19.83 2.68H19.77C17.67 2.86 14.48 4.39 12.7 5.74L12.53 5.87C12.24 6.11 11.76 6.11 11.47 5.87L11.22 5.68C9.44 4.34 6.26 2.82 4.16 2.67C2.97 2.57 2 3.47 2 4.66V16.74C2 17.7 2.78 18.6 3.74 18.72L4.03 18.76C6.2 19.05 9.55 20.58 11.47 21.93L11.51 21.95C11.78 22.15 12.21 22.15 12.47 21.95C14.39 20.59 17.75 19.05 19.93 18.76L20.26 18.72C21.22 18.6 22 17.7 22 16.74Z" />
    <path d="M12 5.99V20.99" />
    <path d="M7.75 8.99H5.5" />
    <path d="M8.5 11.99H5.5" />
  </svg>
)

// Teams/Projects icon
export const TeamsIcon = ({ className, size = "md", ...props }: IconProps) => (
  <svg
    className={cn(sizeMap[size], className)}
    viewBox="0 0 24 24"
    fill="none"
    stroke="currentColor"
    strokeWidth="1.5"
    strokeLinecap="round"
    strokeLinejoin="round"
    {...props}
  >
    <path d="M18 7.16C17.94 7.15 17.87 7.15 17.81 7.16C16.43 7.11 15.33 5.98 15.33 4.58C15.33 3.15 16.48 2 17.91 2C19.34 2 20.49 3.16 20.49 4.58C20.48 5.98 19.38 7.11 18 7.16Z" />
    <path d="M16.9699 14.44C18.3399 14.67 19.8499 14.43 20.9099 13.72C22.3199 12.78 22.3199 11.24 20.9099 10.3C19.8399 9.59004 18.3099 9.35003 16.9399 9.59003" />
    <path d="M5.96998 7.16C6.02998 7.15 6.09998 7.15 6.15998 7.16C7.53998 7.11 8.63998 5.98 8.63998 4.58C8.63998 3.15 7.48998 2 6.05998 2C4.62998 2 3.47998 3.16 3.47998 4.58C3.48998 5.98 4.58998 7.11 5.96998 7.16Z" />
    <path d="M7 14.44C5.63 14.67 4.12 14.43 3.06 13.72C1.65 12.78 1.65 11.24 3.06 10.3C4.13 9.59004 5.66 9.35003 7.03 9.59003" />
    <path d="M12 14.63C11.94 14.62 11.87 14.62 11.81 14.63C10.43 14.58 9.32996 13.45 9.32996 12.05C9.32996 10.62 10.48 9.46997 11.91 9.46997C13.34 9.46997 14.49 10.63 14.49 12.05C14.48 13.45 13.38 14.59 12 14.63Z" />
    <path d="M9.08997 17.78C7.67997 18.72 7.67997 20.26 9.08997 21.2C10.69 22.27 13.31 22.27 14.91 21.2C16.32 20.26 16.32 18.72 14.91 17.78C13.32 16.72 10.69 16.72 9.08997 17.78Z" />
  </svg>
)

// Charts/Analysis icon
export const ChartsIcon = ({ className, size = "md", ...props }: IconProps) => (
  <svg
    className={cn(sizeMap[size], className)}
    viewBox="0 0 24 24"
    fill="none"
    stroke="currentColor"
    strokeWidth="1.5"
    strokeLinecap="round"
    strokeLinejoin="round"
    {...props}
  >
    <path d="M2 22H22" />
    <path d="M9.75 4V22" />
    <path d="M9.75 4C9.75 2.9 9.12 2 8.25 2H5.25C4.38 2 3.75 2.9 3.75 4C3.75 5.1 4.38 6 5.25 6H8.25C9.12 6 9.75 5.1 9.75 4Z" />
    <path d="M14.25 11V22" />
    <path d="M14.25 11C14.25 9.9 14.88 9 15.75 9H18.75C19.62 9 20.25 9.9 20.25 11C20.25 12.1 19.62 13 18.75 13H15.75C14.88 13 14.25 12.1 14.25 11Z" />
  </svg>
)

// Settings icon
export const SettingsIcon = ({ className, size = "md", ...props }: IconProps) => (
  <svg
    className={cn(sizeMap[size], className)}
    viewBox="0 0 24 24"
    fill="none"
    stroke="currentColor"
    strokeWidth="1.5"
    strokeLinecap="round"
    strokeLinejoin="round"
    {...props}
  >
    <path d="M12 15C13.6569 15 15 13.6569 15 12C15 10.3431 13.6569 9 12 9C10.3431 9 9 10.3431 9 12C9 13.6569 10.3431 15 12 15Z" />
    <path d="M2 12.88V11.12C2 10.08 2.85 9.22 3.9 9.22C5.71 9.22 6.45 7.94 5.54 6.37C5.02 5.47 5.33 4.3 6.24 3.78L7.97 2.79C8.76 2.32 9.78 2.6 10.25 3.39L10.36 3.58C11.26 5.15 12.74 5.15 13.65 3.58L13.76 3.39C14.23 2.6 15.25 2.32 16.04 2.79L17.77 3.78C18.68 4.3 18.99 5.47 18.47 6.37C17.56 7.94 18.3 9.22 20.11 9.22C21.15 9.22 22.01 10.07 22.01 11.12V12.88C22.01 13.92 21.16 14.78 20.11 14.78C18.3 14.78 17.56 16.06 18.47 17.63C18.99 18.54 18.68 19.7 17.77 20.22L16.04 21.21C15.25 21.68 14.23 21.4 13.76 20.61L13.65 20.42C12.75 18.85 11.27 18.85 10.36 20.42L10.25 20.61C9.78 21.4 8.76 21.68 7.97 21.21L6.24 20.22C5.33 19.7 5.02 18.53 5.54 17.63C6.45 16.06 5.71 14.78 3.9 14.78C2.85 14.78 2 13.92 2 12.88Z" />
  </svg>
)

// Logout icon
export const LogoutIcon = ({ className, size = "md", ...props }: IconProps) => (
  <svg
    className={cn(sizeMap[size], className)}
    viewBox="0 0 24 24"
    fill="none"
    stroke="currentColor"
    strokeWidth="1.5"
    strokeLinecap="round"
    strokeLinejoin="round"
    {...props}
  >
    <path d="M8.90002 7.56023C9.21002 3.96023 11.06 2.49023 15.11 2.49023H15.24C19.71 2.49023 21.5 4.28023 21.5 8.75023V15.2702C21.5 19.7402 19.71 21.5302 15.24 21.5302H15.11C11.09 21.5302 9.24002 20.0802 8.91002 16.5402" />
    <path d="M15 12H3.62" />
    <path d="M5.85 8.65039L2.5 12.0004L5.85 15.3504" />
  </svg>
)

// Search icon
export const SearchIcon = ({ className, size = "md", ...props }: IconProps) => (
  <svg
    className={cn(sizeMap[size], className)}
    viewBox="0 0 24 24"
    fill="none"
    stroke="currentColor"
    strokeWidth="1.5"
    strokeLinecap="round"
    strokeLinejoin="round"
    {...props}
  >
    <path d="M11.5 21C16.7467 21 21 16.7467 21 11.5C21 6.25329 16.7467 2 11.5 2C6.25329 2 2 6.25329 2 11.5C2 16.7467 6.25329 21 11.5 21Z" />
    <path d="M22 22L20 20" />
  </svg>
)

// X (close) icon
export const XIcon = ({ className, size = "md", ...props }: IconProps) => (
  <svg
    className={cn(sizeMap[size], className)}
    viewBox="0 0 24 24"
    fill="none"
    stroke="currentColor"
    strokeWidth="1.5"
    strokeLinecap="round"
    strokeLinejoin="round"
    {...props}
  >
    <path d="M18 6L6 18" />
    <path d="M6 6L18 18" />
  </svg>
)

// Filter icon
export const FilterIcon = ({ className, size = "md", ...props }: IconProps) => (
  <svg
    className={cn(sizeMap[size], className)}
    viewBox="0 0 24 24"
    fill="none"
    stroke="currentColor"
    strokeWidth="1.5"
    strokeLinecap="round"
    strokeLinejoin="round"
    {...props}
  >
    <path d="M5.40002 2.09961H18.6C19.7 2.09961 20.6 2.99961 20.6 4.09961V6.29961C20.6 7.09961 20.1 8.09961 19.6 8.59961L15.3 12.3996C14.7 12.8996 14.3 13.8996 14.3 14.6996V19.4996C14.3 20.0996 13.9 20.8996 13.4 21.1996L12 21.8996C10.7 22.5996 9 21.6996 9 20.1996V14.5996C9 13.8996 8.6 12.9996 8.2 12.4996L4.3 7.99961C3.8 7.49961 3.40002 6.59961 3.40002 5.99961V4.19961C3.40002 2.99961 4.30002 2.09961 5.40002 2.09961Z" />
  </svg>
)

// Map icon names to components
export const getIconByName = (name: string) => {
  const icons: Record<string, React.FC<IconProps>> = {
    "icon-eye": EyeIcon,
    "icon-eye-off": EyeOffIcon,
    "icon-mail": MailIcon,
    "icon-home": HomeIcon,
    "icon-carrer": CareerIcon,
    "icon-education": EducationIcon,
    "icon-teams": TeamsIcon,
    "icon-charts": ChartsIcon,
    "icon-setting": SettingsIcon,
    "icon-logout": LogoutIcon,
    "icon-search": SearchIcon,
    "icon-x": XIcon,
    "icon-filter": FilterIcon,
    "icon-target": TargetIcon,
    "icon-priority": PriorityIcon,
  }

  return icons[name] || null
}
