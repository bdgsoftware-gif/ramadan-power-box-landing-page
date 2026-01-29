import React from "react";

interface IconProps extends React.SVGProps<SVGSVGElement> {
  className?: string;
}

export const productIcons = {
  check: (props: IconProps) => (
    <svg
      {...props}
      viewBox="0 0 24 24"
      fill="none"
      stroke="#166534"
      xmlns="http://www.w3.org/2000/svg"
    >
      <path
        d="M21.803 10a10 10 0 1 1-4.801-6.665"
        stroke-width="2"
        stroke-linecap="round"
        stroke-linejoin="round"
      />
      <path
        d="m9 11 3 3L22 4"
        stroke-width="2"
        stroke-linecap="round"
        stroke-linejoin="round"
      />
    </svg>
  ),
  gift: (props: IconProps) => (
    <svg
      {...props}
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
    >
      <path d="M20 12v10H4V12M2 7h20v5H2zM12 22V7M12 7H7.5a2.5 2.5 0 0 1 0-5C11 2 12 7 12 7zM12 7h4.5a2.5 2.5 0 0 0 0-5C13 2 12 7 12 7z" />
    </svg>
  ),
  salt: (props: IconProps) => (
    <svg
      {...props}
      viewBox="0 0 512 512"
      fill="none"
      stroke="#166534"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
    >
      <path d="M164.318 51.006a79.1 79.1 0 0 0-8.606 35.953c0 16.064 13.022 29.086 29.086 29.086h142.404c16.064 0 29.086-13.022 29.086-29.086 0-43.884-35.575-79.459-79.459-79.459h-41.658c-18.264 0-35.076 6.177-48.496 16.536m212.988 330.418-108.05-58.744a74.56 74.56 0 0 0-71.229 0l-108.049 58.744m95.908 43.847c0-7.602-6.163-13.765-13.765-13.765s-13.765 6.163-13.765 13.765m123.044 0c0-7.602 6.163-13.765 13.765-13.765s13.765 6.163 13.765 13.765m-89.888 16.088c3.55 4.074 8.773 6.652 14.601 6.652s11.051-2.578 14.601-6.652" />
      <path d="M344.677 504.5h27.688c29.432 0 51.537-26.879 45.854-55.757l-44.927-228.287c-5.562-28.264-30.344-48.644-59.15-48.644H197.857c-28.806 0-53.587 20.38-59.15 48.644L93.781 448.743c-5.683 28.878 16.422 55.757 45.854 55.757h170.043M192.267 116.046v56.028m127.466 0v-56.028m-46.16-54.273" />
    </svg>
  ),
  calendar: (props: IconProps) => (
    <svg
      {...props}
      viewBox="0 0 24 24"
      fill="none"
      stroke="#166534"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
    >
      <rect x="3" y="4" width="18" height="18" rx="2" ry="2" />
      <line x1="16" y1="2" x2="16" y2="6" />
      <line x1="8" y1="2" x2="8" y2="6" />
      <line x1="3" y1="10" x2="21" y2="10" />
    </svg>
  ),
  video: (props: IconProps) => (
    <svg
      {...props}
      viewBox="0 0 24 24"
      fill="none"
      stroke="#166534"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
    >
      <polygon points="23 7 16 12 23 17 23 7" />
      <rect x="1" y="5" width="15" height="14" rx="2" ry="2" />
    </svg>
  ),
  graduation: (props: IconProps) => (
    <svg
      {...props}
      viewBox="0 0 24 24"
      fill="none"
      stroke="#166534"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
    >
      <path d="M22 10v6M2 10l10-5 10 5-10 5z" />
      <path d="M6 12v5c3 3 9 3 12 0v-5" />
    </svg>
  ),
  trophy: (props: IconProps) => (
    <svg
      {...props}
      viewBox="0 0 24 24"
      fill="none"
      stroke="#166534"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
    >
      <path d="M6 9H4.5a2.5 2.5 0 0 1 0-5H6M18 9h1.5a2.5 2.5 0 0 0 0-5H18M4 22h16M10 14.66V17c0 .55.47.98.97 1.21C11.47 18.44 12 19 12 19s.53-.56 1.03-.79c.5-.23.97-.66.97-1.21v-2.34" />
      <path d="M12 15a6 6 0 0 1-6-6V3h12v6a6 6 0 0 1-6 6z" />
    </svg>
  ),
  heart: (props: IconProps) => (
    <svg
      {...props}
      viewBox="0 0 24 24"
      fill="none"
      stroke="#166534"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
    >
      <path d="M20.84 4.61a5.5 5.5 0 0 0-7.78 0L12 5.67l-1.06-1.06a5.5 5.5 0 0 0-7.78 7.78l1.06 1.06L12 21.23l7.78-7.78 1.06-1.06a5.5 5.5 0 0 0 0-7.78z" />
    </svg>
  ),
  truck: (props: IconProps) => (
    <svg
      {...props}
      viewBox="0 0 24 24"
      fill="none"
      stroke="#166534"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
    >
      <rect x="1" y="3" width="15" height="13" />
      <polygon points="16 8 20 8 23 11 23 16 16 16 16 8" />
      <circle cx="5.5" cy="18.5" r="2.5" />
      <circle cx="18.5" cy="18.5" r="2.5" />
    </svg>
  ),
};

export type IconKey = keyof typeof productIcons;
