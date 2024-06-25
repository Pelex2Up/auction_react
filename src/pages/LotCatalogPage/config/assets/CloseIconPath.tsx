import { FC } from 'react'
import { SVGType } from '../../../../assets/svg/arrowDown'

export const CloseIconPath: FC<SVGType> = ({ ...props }) => {
  return (
    <svg width="16" height="16" viewBox="0 0 16 16" fill="none" xmlns="http://www.w3.org/2000/svg">
      <path d="M3.23828 12.6665L12.6664 3.23841" stroke="#808080" strokeLinecap="round" strokeLinejoin="round" />
      <path d="M12.668 12.6665L3.23988 3.23841" stroke="#808080" strokeLinecap="round" strokeLinejoin="round" />
    </svg>
  )
}
