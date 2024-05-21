// import styles from './RadioGroup.module.scss'
// import { OptionType, RadioButton } from '../RadioButton'
// import { FC } from 'react'

// type RadioGroupProps = {
//   name: string
//   options: OptionType[]
//   selected: OptionType['value']
//   onChange?: (value: string) => void
// }

// export const RadioGroup: FC<RadioGroupProps> = ({ options, name, selected, onChange }) => {
//   const handleChange = (value: string) => onChange?.(value)

//   return (
//     <div className={styles.group}>
//       {options.map(({ value, title }) => (
//         <RadioButton key={value} groupName={name} value={value} title={title} selected={selected} onChange={handleChange} />
//       ))}
//     </div>
//   )
// }
