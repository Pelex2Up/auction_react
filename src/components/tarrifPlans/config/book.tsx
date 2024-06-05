import { FC } from 'react'

export const BookWithPencilSVG: FC = () => {
  return (
    <svg width="80" height="80" viewBox="0 0 80 80" fill="none" xmlns="http://www.w3.org/2000/svg">
      <g filter="url(#filter0_ii_785_76365)">
        <path d="M0 25C0 11.1929 11.1929 0 25 0H55C68.8071 0 80 11.1929 80 25V55C80 68.8071 68.8071 80 55 80H0V25Z" fill="white" />
      </g>
      <path d="M0.5 25C0.5 11.469 11.469 0.5 25 0.5H55C68.531 0.5 79.5 11.469 79.5 25V55C79.5 68.531 68.531 79.5 55 79.5H0.5V25Z" stroke="white" />
      <path
        d="M43.7165 61.3926H22.8237C21.9712 61.3926 21.1536 61.054 20.5508 60.4512C19.948 59.8484 19.6094 59.0308 19.6094 58.1784V22.8212C19.6094 21.9687 19.948 21.1512 20.5508 20.5484C21.1536 19.9456 21.9712 19.6069 22.8237 19.6069H46.9308M51.7522 48.5355H61.3951M29.2522 19.6069V61.3926M37.2879 30.8569H43.7165M51.7522 29.2498L56.5737 19.6069L61.3951 29.2498V56.5712C61.3951 57.8499 60.8871 59.0763 59.9829 59.9805C59.0787 60.8847 57.8524 61.3926 56.5737 61.3926C55.2949 61.3926 54.0686 60.8847 53.1644 59.9805C52.2602 59.0763 51.7522 57.8499 51.7522 56.5712V29.2498Z"
        stroke="#008001"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
      <defs>
        <filter id="filter0_ii_785_76365" x="-4" y="0" width="88" height="84" filterUnits="userSpaceOnUse" colorInterpolationFilters="sRGB">
          <feFlood floodOpacity="0" result="BackgroundImageFix" />
          <feBlend mode="normal" in="SourceGraphic" in2="BackgroundImageFix" result="shape" />
          <feColorMatrix in="SourceAlpha" type="matrix" values="0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 127 0" result="hardAlpha" />
          <feOffset dx="4" dy="4" />
          <feGaussianBlur stdDeviation="15" />
          <feComposite in2="hardAlpha" operator="arithmetic" k2="-1" k3="1" />
          <feColorMatrix type="matrix" values="0 0 0 0 0.819608 0 0 0 0 0.85098 0 0 0 0 0.901961 0 0 0 1 0" />
          <feBlend mode="normal" in2="shape" result="effect1_innerShadow_785_76365" />
          <feColorMatrix in="SourceAlpha" type="matrix" values="0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 127 0" result="hardAlpha" />
          <feOffset dx="-4" dy="4" />
          <feGaussianBlur stdDeviation="15" />
          <feComposite in2="hardAlpha" operator="arithmetic" k2="-1" k3="1" />
          <feColorMatrix type="matrix" values="0 0 0 0 1 0 0 0 0 1 0 0 0 0 1 0 0 0 0.5 0" />
          <feBlend mode="normal" in2="effect1_innerShadow_785_76365" result="effect2_innerShadow_785_76365" />
        </filter>
      </defs>
    </svg>
  )
}
