import styles from './selectInput.module.scss'
import { ArrowDown } from '../../../assets/svg/arrowDown'
import { FC, useState, useRef, useEffect } from 'react'
import { useOutsideClick } from '../../../utils/useOutsideClickHook'

interface DefaultOptions {
  label?: string
  value?: string
  title?: string
  id?: number
}

export type SelectInputPropsT = {
  optionsList: DefaultOptions[]
  selectedOption?: string
  defaultOption?: string
  setSelectedValue?: (value: any) => void
}

export const SelectInput: FC<SelectInputPropsT> = ({ optionsList, selectedOption, defaultOption = 'выбрать', setSelectedValue }) => {
  const [isOptionsOpen, setIsOptionsOpen] = useState<boolean>(false)
  const [selectedIndex, setSelectedIndex] = useState<number | null>(null)

  const toggleOptions = () => {
    setIsOptionsOpen(!isOptionsOpen)
  }

  const menuRef = useRef<HTMLDivElement>(null)
  useOutsideClick(menuRef, () => setIsOptionsOpen(false))

  useEffect(() => {
    const selectingOption = optionsList.find(
      (option) => option.value?.toLowerCase() === selectedOption?.toLowerCase() || (option.id && String(option.id) === selectedOption)
    )
    setSelectedIndex(selectingOption ? optionsList.indexOf(selectingOption) : null)
  }, [optionsList, selectedOption])

  const handleOptionClick = (index: number) => {
    toggleOptions()
    setSelectedIndex(index)
    setIsOptionsOpen(false)
    if (setSelectedValue) {
      if ('value' in optionsList[index] && optionsList[index].value) {
        setSelectedValue(typeof optionsList[index].id !== 'number' ? String(optionsList[index].value) : String(optionsList[index].id))
      } else {
        setSelectedValue(optionsList[index])
      }
    }
  }

  return (
    <div ref={menuRef} className={styles.wrapper} onClick={toggleOptions}>
      <div className={styles.container}>
        <button type="button" onClick={toggleOptions} className="absolute right-0 top-0 z-10">
          <ArrowDown
            style={{
              transform: `${isOptionsOpen ? 'rotate(180deg)' : ''}`,
              transition: 'all ease-in-out 80ms'
            }}
          />
        </button>

        <button className={styles.container_btn} type="button" aria-haspopup="listbox" aria-expanded={isOptionsOpen}>
          {selectedIndex !== null ? optionsList[selectedIndex].label || optionsList[selectedIndex].title : defaultOption}
        </button>
        <ul
          tabIndex={-1}
          role="listbox"
          style={{
            transition: 'all 0.3s ease-in-out'
          }}
          className={`${styles.options} ${isOptionsOpen ? styles.show : ''}`}
        >
          {optionsList.map((option, index) => (
            <li key={index} tabIndex={0} role="option" aria-selected={selectedIndex === index} onClick={() => handleOptionClick(index)}>
              {option.label || String(option.title)}
            </li>
          ))}
        </ul>
      </div>
    </div>
  )
}
