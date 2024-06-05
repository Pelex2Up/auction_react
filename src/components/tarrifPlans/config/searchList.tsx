import { FC } from 'react'

export const SearchListSVG: FC = () => {
  return (
    <svg width="80" height="80" viewBox="0 0 80 80" fill="none" xmlns="http://www.w3.org/2000/svg">
      <g filter="url(#filter0_ii_785_76393)">
        <path d="M0 25C0 11.1929 11.1929 0 25 0H55C68.8071 0 80 11.1929 80 25V55C80 68.8071 68.8071 80 55 80H0V25Z" fill="white" />
      </g>
      <path d="M0.5 25C0.5 11.469 11.469 0.5 25 0.5H55C68.531 0.5 79.5 11.469 79.5 25V55C79.5 68.531 68.531 79.5 55 79.5H0.5V25Z" stroke="white" />
      <path
        d="M25.0391 41.1069V21.8212C25.0391 20.9687 25.3777 20.1512 25.9805 19.5484C26.5833 18.9456 27.4009 18.6069 28.2533 18.6069H44.3248L60.3962 34.6784V57.1784C60.3962 58.0308 60.0576 58.8484 59.4548 59.4512C58.852 60.054 58.0344 60.3926 57.1819 60.3926H47.5391"
        stroke="#008001"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
      <path d="M44.3281 18.6069V34.6784H60.3996" stroke="#008001" strokeLinecap="round" strokeLinejoin="round" />
      <path
        d="M35.4327 57.0096C31.1153 57.0096 27.6154 53.5097 27.6154 49.1923C27.6154 44.8749 31.1153 41.375 35.4327 41.375C39.7501 41.375 43.25 44.8749 43.25 49.1923C43.25 53.5097 39.7501 57.0096 35.4327 57.0096Z"
        stroke="#008001"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
      <path d="M24.4976 60.125L29.9062 54.7163" stroke="#008001" strokeLinecap="round" strokeLinejoin="round" />
      <defs>
        <filter id="filter0_ii_785_76393" x="-4" y="0" width="88" height="84" filterUnits="userSpaceOnUse" colorInterpolationFilters="sRGB">
          <feFlood floodOpacity="0" result="BackgroundImageFix" />
          <feBlend mode="normal" in="SourceGraphic" in2="BackgroundImageFix" result="shape" />
          <feColorMatrix in="SourceAlpha" type="matrix" values="0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 127 0" result="hardAlpha" />
          <feOffset dx="4" dy="4" />
          <feGaussianBlur stdDeviation="15" />
          <feComposite in2="hardAlpha" operator="arithmetic" k2="-1" k3="1" />
          <feColorMatrix type="matrix" values="0 0 0 0 0.819608 0 0 0 0 0.85098 0 0 0 0 0.901961 0 0 0 1 0" />
          <feBlend mode="normal" in2="shape" result="effect1_innerShadow_785_76393" />
          <feColorMatrix in="SourceAlpha" type="matrix" values="0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 127 0" result="hardAlpha" />
          <feOffset dx="-4" dy="4" />
          <feGaussianBlur stdDeviation="15" />
          <feComposite in2="hardAlpha" operator="arithmetic" k2="-1" k3="1" />
          <feColorMatrix type="matrix" values="0 0 0 0 1 0 0 0 0 1 0 0 0 0 1 0 0 0 0.5 0" />
          <feBlend mode="normal" in2="effect1_innerShadow_785_76393" result="effect2_innerShadow_785_76393" />
        </filter>
      </defs>
    </svg>
  )
}
