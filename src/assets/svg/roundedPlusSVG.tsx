import { FC } from 'react'

export const RoundedPlusSVG: FC = () => {
  return (
    <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
      <circle cx="12" cy="12" r="11.5" stroke="#008001" />
      <g clipPath="url(#clip0_768_72469)">
        <path d="M12 2V22M2 11.9385H22" stroke="#008001" strokeLinecap="round" strokeLinejoin="round" />
      </g>
      <defs>
        <clipPath id="clip0_768_72469">
          <rect width="16" height="16" fill="white" transform="translate(4 4)" />
        </clipPath>
      </defs>
    </svg>
  )
}
