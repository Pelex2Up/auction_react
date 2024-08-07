import { FC, useState } from 'react'
import { ICategory } from '../../../types/commonTypes'
import { ArrowDown } from '../../../assets/svg/arrowDown'

interface IPicker {
  category: ICategory
  searchParams: URLSearchParams
  updateUrl: (newParams: any) => void
}

export const ChildrenCatalogCategoriesSelector: FC<IPicker> = ({ category, searchParams, updateUrl }) => {
  const [open, setOpen] = useState<boolean>(false)
  const categoryId = searchParams.get('category')

  return (
    <li className="ml-3 flex flex-col gap-2">
      <div className={`w-full flex justify-between items-center ${open ? 'text-green-700' : 'text-black'} cursor-pointer`}>
        <p
          className={`text-sm ${Number(categoryId) === category.id ? 'text-green-700' : 'text-zinc-500'} font-normal leading-tight tracking-tight`}
          onClick={() => updateUrl({ category: category.id, page: 1 })}
        >
          {category.title}
        </p>
        {category.children.length > 0 && (
          <span className={`transition-all duration-100 ${open ? 'rotate-180' : ''}`} onClick={() => setOpen(!open)}>
            <ArrowDown />
          </span>
        )}
      </div>
      {open &&
        category.children.map((cat) => <ChildrenCatalogCategoriesSelector key={cat.id} category={cat} searchParams={searchParams} updateUrl={updateUrl} />)}
    </li>
  )
}
