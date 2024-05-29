import { ChangeEvent, DetailedHTMLProps, FC } from 'react'
import styles from './RadioButton.module.scss'

export type OptionType = {
  value: string
  title: string
}

type RadioButtonPropsT = {
  id: string
  value: string
  name?: string
  checked: boolean
  text: string
  textStyle?: DetailedHTMLProps<React.HTMLAttributes<HTMLSpanElement>, HTMLSpanElement>
  onChange?: (event: ChangeEvent<HTMLInputElement>) => void
}

export const RadioButton: FC<RadioButtonPropsT> = ({ value, id, checked, name, text, onChange, textStyle }) => {
  return (
    <label htmlFor={id} className={styles['radio_label']}>
      <input className={styles['radio_input']} type="radio" name={name} id={id} value={value} onChange={onChange} checked={checked} />
      <span {...textStyle} className={styles['custom_radio']} />
      {text}
    </label>
  )
}
