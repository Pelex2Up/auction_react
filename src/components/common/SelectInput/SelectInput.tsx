import { FC, useEffect, useRef, useState } from 'react'
import styles from './selectInput.module.scss'
import { ArrowDown } from '../../../assets/svg/arrowDown'

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
  setSelectedValue?: (value: number | string) => void
}

export const SelectInput: FC<SelectInputPropsT> = ({ optionsList, selectedOption, defaultOption = 'выбрать', setSelectedValue }) => {
  const [isOptionsOpen, setIsOptionsOpen] = useState<boolean>(false)
  const [selectOption, setSelectOption] = useState<number | null>(null)
  const [defaultOp, setDefaultOp] = useState<string>('')

  const toggleOptions = () => {
    setIsOptionsOpen(!isOptionsOpen)
  }

  const handleToggleOptionsOpen = () => {
    setIsOptionsOpen(!selectOption)
  }

  const menuRef = useRef<HTMLDivElement>(null)

  const handleClick = (event: MouseEvent) => {
    const target = event?.target as HTMLHeadingElement

    if (!menuRef.current?.contains(target)) {
      setIsOptionsOpen(false)
    }
  }

  useEffect(() => {
    document.addEventListener('click', handleClick)

    return () => {
      document.removeEventListener('click', handleClick)
    }
  }, [])

  useEffect(() => {
    if (typeof selectedOption !== 'undefined') {
      const indexOfItem = optionsList.findIndex((option) => {
        (option.value && option.value.toLowerCase() === selectedOption?.toLowerCase()) || (option.id && String(option.id) === selectedOption?.toLowerCase())
      })

      if (indexOfItem !== -1) {
        setSelectOption(indexOfItem)
        setDefaultOp('')
      } else {
        setSelectOption(null)
        setDefaultOp(defaultOption)
      }
    } else {
      setDefaultOp(defaultOption)
    }
  }, [defaultOption, optionsList, selectedOption])

  return (
    <div ref={menuRef} className={styles.wrapper} onClick={toggleOptions}>
      <div className={styles.container}>
        <button type="button" onClick={handleToggleOptionsOpen} className="absolute right-0 top-0 z-10">
          <ArrowDown style={{ transform: `${isOptionsOpen ? 'rotate(180deg)' : ''}`, transition: 'all ease-in-out 80ms' }} />
        </button>

        <button className={styles.container_btn} type="button" aria-haspopup="listbox" aria-expanded={isOptionsOpen}>
          {defaultOp ? defaultOp : typeof selectOption === 'number' ? optionsList[selectOption].label || optionsList[selectOption].title : ''}
        </button>
        <ul
          tabIndex={-1}
          role="listbox"
          style={{
            transition: 'all 0.3s ease-in-out'
          }}
          className={`${styles.options} ${isOptionsOpen ? styles.show : ''}`}
        >
          {optionsList?.map((option, index: number) => (
            <li
              key={index + `_${selectedOption}`}
              tabIndex={0}
              role="option"
              aria-selected={selectOption === index}
              onClick={() => {
                setSelectOption(index)
                setDefaultOp('')
                setIsOptionsOpen(false)
                setSelectedValue && setSelectedValue(typeof option.id !== 'number' ? (option.value as string) : String(option.id))
              }}
            >
              {option.label || String(option.title)}
            </li>
          ))}
        </ul>
      </div>
    </div>
  )
}
