import { FC } from 'react'

export type SVGType = React.SVGAttributes<SVGSVGElement>

export const ArrowDown: FC<SVGType> = ({ ...props }) => {
  return (
    <svg {...props} width="16" height="17" viewBox="0 0 16 17" fill="none" xmlns="http://www.w3.org/2000/svg">
      <path
        d="M0.570313 4.90227L7.59888 11.9308C7.65019 11.9855 7.71215 12.0291 7.78095 12.0589C7.84974 12.0886 7.92392 12.104 7.99888 12.104C8.07385 12.104 8.14802 12.0886 8.21682 12.0589C8.28562 12.0291 8.34758 11.9855 8.39888 11.9308L15.4275 4.90227"
        stroke="black"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  )
}
