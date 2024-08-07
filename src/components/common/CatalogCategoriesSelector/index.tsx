import { FC, useEffect, useState } from 'react'
import { ICategory } from '../../../types/commonTypes'
import { ArrowDown } from '../../../assets/svg/arrowDown'
import { ChildrenCatalogCategoriesSelector } from './childrenPicker'

interface IPicker {
  category: ICategory
  searchParams: URLSearchParams
  updateUrl: (newParams: any) => void
}

export const CatalogCategoriesSelector: FC<IPicker> = ({ category, searchParams, updateUrl }) => {
  const [open, setOpen] = useState<boolean>(false)
  const categoryId = searchParams.get('category')

  useEffect(() => {
    if (searchParams.get('category')) {
      const cat = searchParams.get('category')
      if (cat) {
        const ids = category.children.map((item) => item.id)
        const isFound = ids.includes(Number(cat))
        if (isFound) {
          setOpen(true)
        } else {
          setOpen(false)
        }
      }
    }
  }, [searchParams])

  return (
    <li className="flex flex-col gap-4 py-[5px] px-[10px]">
      <div className={`w-full flex justify-between items-center ${Number(categoryId) === category.id ? 'text-green-700' : 'text-black'}`}>
        <p
          className="text-base font-medium font-['SF Pro Text'] leading-tight tracking-tight cursor-pointer"
          onClick={() => updateUrl({ category: category.id, page: 1 })}
        >
          {category.title}
        </p>
        {category.children.length > 0 && (
          <span className={`transition-all duration-100 cursor-pointer ${open ? 'rotate-180' : ''}`} onClick={() => setOpen(!open)}>
            <ArrowDown />
          </span>
        )}
      </div>
      {open &&
        category.children.map((cat) => <ChildrenCatalogCategoriesSelector key={cat.id} category={cat} updateUrl={updateUrl} searchParams={searchParams} />)}
    </li>
  )
}
