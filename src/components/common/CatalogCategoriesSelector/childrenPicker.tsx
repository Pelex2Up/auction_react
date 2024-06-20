import { FC, useState } from 'react'
import { ICategory } from '../../../types/commonTypes'
import { ArrowDown } from '../../../assets/svg/arrowDown'

interface IPicker {
  category: ICategory
}

export const ChildrenCatalogCategoriesSelector: FC<IPicker> = ({ category }) => {
  const [open, setOpen] = useState<boolean>(false)

  return (
    <li className="ml-3 flex flex-col gap-2">
      <div className={`w-full flex justify-between items-center ${open ? 'text-green-700' : 'text-black'} cursor-pointer`}>
        <p className="text-sm text-zinc-500 font-normal leading-tight tracking-tight">{`${category.title} (${category.products.length})`}</p>
        {category.children.length > 0 && (
          <span className={`transition-all duration-100 ${open ? 'rotate-180' : ''}`} onClick={() => setOpen(!open)}>
            <ArrowDown />
          </span>
        )}
      </div>
      {open && category.children.map((cat) => <ChildrenCatalogCategoriesSelector key={cat.id} category={cat} />)}
    </li>
  )
}
