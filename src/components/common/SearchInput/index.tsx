import { FC, useRef, useState } from 'react'
import { selectLangSettings, useAppSelector } from '../../../store/hooks'
import { ISearchCategory } from '../../../api/searchService'
import { generatePath, useNavigate } from 'react-router-dom'
import { CatalogPathE } from '../../../enum'

interface IInput {
  value: string
  onChange: (arg: string) => void
  searchData: ISearchCategory[] | undefined
  id: string
  variant?: 'BUY' | 'SELL'
  placeholder?: string
}

export const SearchInput: FC<IInput> = ({ value, onChange, searchData, id, variant, placeholder }) => {
  const { language } = useAppSelector(selectLangSettings)
  const inputRef = useRef<HTMLInputElement>(null)
  const [openList, setOpenList] = useState<boolean>(false)
  const navigate = useNavigate()
  const [currentEl, setCurrentEl] = useState<ISearchCategory>()

  const handleInputBlur = () => {
    // Close the list after a short delay to allow click event on list items to propagate
    setTimeout(() => {
      setOpenList(false)
    }, 500)
  }

  const handleListItemClick = (el: ISearchCategory) => {
    // Update the input value and close the list
    setCurrentEl(el)
    onChange(el.title)
    if (inputRef.current) {
      inputRef.current.value = el.title
    }
  }

  return (
    <div className="w-full h-10 shadow justify-start items-start inline-flex relative">
      <div className="w-full h-10 px-4 py-3.5 bg-white rounded-tl rounded-bl flex-col justify-center items-center gap-2.5 inline-flex">
        <div className="self-stretch justify-start items-center gap-3 inline-flex">
          <div className="w-6 h-6 p-px justify-center items-center flex">
            <div className="w-[22px] h-[22px] relative">
              <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                <g clipPath="url(#clip0_465_16812)">
                  <path
                    d="M10.1723 19.3446C15.238 19.3446 19.3446 15.238 19.3446 10.1723C19.3446 5.10658 15.238 1 10.1723 1C5.10658 1 1 5.10658 1 10.1723C1 15.238 5.10658 19.3446 10.1723 19.3446Z"
                    stroke="#808080"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                  />
                  <path d="M23.0024 23.0005L16.6562 16.6543" stroke="#808080" strokeLinecap="round" strokeLinejoin="round" />
                </g>
                <defs>
                  <clipPath id="clip0_465_16812">
                    <rect width="24" height="24" fill="white" />
                  </clipPath>
                </defs>
              </svg>
            </div>
          </div>
          <input
            value={value}
            id={id}
            ref={inputRef}
            onFocus={() => setOpenList(true)}
            onBlur={handleInputBlur}
            onChange={(e) => onChange(e.target.value)}
            placeholder={placeholder ? placeholder : language === 'RU' ? 'Введите текст' : 'Enter text'}
            className="text-zinc-500 outline-none h-full w-full text-xs font-normal font-['SF Pro Text'] leading-[14.40px] tracking-tight"
          />
        </div>
      </div>
      <button
        className="w-[76px] h-full px-4 py-[7px] bg-[#008001] rounded-tr rounded-br justify-center items-center gap-2.5 flex cursor-pointer"
        onClick={() =>
          navigate(
            generatePath(
              CatalogPathE.Catalog +
                `/?page=1${variant ? `&ad_type=${variant}` : ''}&${
                  currentEl && (currentEl.level === 0 ? `main_category=${currentEl.id}` : `category=${currentEl.id}`)
                }`
            )
          )
        }
      >
        <div className="text-white text-sm font-normal font-['SF Pro Text'] leading-[16.80px] tracking-tight">{language === 'RU' ? 'Поиск' : 'Search'}</div>
      </button>
      {openList && searchData && (
        <ul tabIndex={-1} role="listbox" className="max-h-[300px] h-auto bg-gray-50 z-20 shadow w-full absolute top-[120%] rounded overflow-y-scroll">
          {searchData.map((el) => (
            <li
              tabIndex={0}
              role="option"
              className="w-full px-2 py-3 text-zinc-500 z-30 text-sm font-normal font-['SF Pro Text'] leading-[17px] hover:bg-gray-100 cursor-pointer"
              onClick={(e) => {
                handleListItemClick(el)
              }}
              key={el.id}
            >
              {el.title}
            </li>
          ))}
        </ul>
      )}
    </div>
  )
}

export default SearchInput
