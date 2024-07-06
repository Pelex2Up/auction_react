import { FC } from 'react'
import { ICategory } from '../../types/commonTypes'
import { CatalogPathE } from '../../enum'

interface ITitle {
  mainCategory: ICategory
  category: ICategory
  variant: 'BUY' | 'SELL'
}

export const TitleCategory: FC<ITitle> = ({ category, variant, mainCategory }) => {
  return (
    <a
      className="w-full justify-start items-center inline-flex cursor-pointer hover:text-green-700"
      href={CatalogPathE.Catalog + `/?page=1&ad_type=${variant}&main_category=${mainCategory.id}&category=${category.id}`}
    >
      <div className="text-zinc-900 text-base font-medium font-['SF Pro Text'] leading-[17px] hover:text-green-700">{category.title}</div>
    </a>
  )
}

export const OptionCategory: FC<ITitle> = ({ category, variant, mainCategory }) => {
  return (
    <a
      className="w-full justify-start items-center inline-flex cursor-pointer hover:text-green-700"
      href={CatalogPathE.Catalog + `/?page=1&ad_type=${variant}&main_category=${mainCategory.id}&category=${category.id}`}
    >
      <div className="text-zinc-500 text-sm font-normal font-['SF Pro Text'] leading-[17px] hover:text-green-700">{category.title}</div>
    </a>
  )
}

interface IManyOptions {
  array: ICategory[]
  variant: 'BUY' | 'SELL'
  mainCategory: ICategory
}

export const ManyOptionsCategory: FC<IManyOptions> = ({ array, mainCategory, variant }) => {
  return (
    <div className="self-stretch flex-col justify-start items-start gap-2 flex">
      {array.map((el, index) => (
        <OptionCategory category={el} key={index} variant={variant} mainCategory={mainCategory} />
      ))}
    </div>
  )
}
