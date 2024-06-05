import { DetailedHTMLProps, FC, HTMLAttributes } from 'react'
import styles from './button.module.scss'
import { ButtonT } from '../../../types/commonTypes'
import { RoundedPlusSVG } from '../../../assets/svg/roundedPlusSVG'

export const Button: FC<ButtonT> = ({ variant = 'primary', children, text, ...restProps }) => {
  let buttonStyle = styles.wrapper

  if (variant === 'primary') {
    buttonStyle += ' ' + styles.primary
  } else if (variant === 'secondary') {
    buttonStyle += ' ' + styles.secondary
  } else if (variant === 'disabled') {
    buttonStyle += ' ' + styles.disabled
  }

  return (
    <button {...restProps} className={`${buttonStyle} ${restProps.className}`}>
      {children}
      {text}
    </button>
  )
}

export const MenuButton: FC<ButtonT> = ({ variant = 'primary', children, text, ...restProps }) => {
  return (
    <button {...restProps} className={`${restProps.className} ${styles.MenuButton}`}>
      {children}
      <div className="text-zinc-900 text-base font-normal leading-tight tracking-tight">{text}</div>
    </button>
  )
}

type AddPhoneButtonT = {
  text: string
  children?: DetailedHTMLProps<HTMLAttributes<SVGElement>, SVGElement>
} & DetailedHTMLProps<React.ButtonHTMLAttributes<HTMLButtonElement>, HTMLButtonElement>

export const AddPhoneButton: FC<AddPhoneButtonT> = ({ text, children, ...restProps }) => {
  return (
    <button {...restProps} className="inline-flex gap-[10px] items-center justify-center">
      {children ? children : <RoundedPlusSVG />}
      <p className="text-green-800 text-sm font-normal font-['SF Pro Text'] leading-[16.80px] tracking-tight">{text}</p>
    </button>
  )
}
