import { FC, useState } from 'react'
import { ICategory } from '../../../types/commonTypes'
import { ArrowDown } from '../../../assets/svg/arrowDown'
import { ChildrenCatalogCategoriesSelector } from './childrenPicker'

interface IPicker {
  category: ICategory
}

export const CatalogCategoriesSelector: FC<IPicker> = ({ category }) => {
  const [open, setOpen] = useState<boolean>(false)

  return (
    <li className="flex flex-col gap-4">
      <div className={`w-full flex justify-between items-center ${open ? 'text-green-700' : 'text-black'}`}>
        <p className="text-base font-medium font-['SF Pro Text'] leading-tight tracking-tight cursor-pointer">{`${category.title} (${category.products.length})`}</p>
        {category.children.length > 0 && (
          <span className={`transition-all duration-100 cursor-pointer ${open ? 'rotate-180' : ''}`} onClick={() => setOpen(!open)}>
            <ArrowDown />
          </span>
        )}
      </div>
      {open && category.children.map((cat) => <ChildrenCatalogCategoriesSelector key={cat.id} category={cat} />)}
    </li>
  )
}
