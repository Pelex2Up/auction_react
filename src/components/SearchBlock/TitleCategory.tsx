import { FC } from 'react'

interface ITitle {
  text: string
}

export const TitleCategory: FC<ITitle> = ({ text }) => {
  return (
    <div className="w-full justify-start items-center inline-flex">
      <div className="text-zinc-900 text-base font-medium font-['SF Pro Text'] leading-[17px]">{text}</div>
    </div>
  )
}

export const OptionCategory: FC<ITitle> = ({ text }) => {
  return (
    <div className="w-full justify-start items-center inline-flex">
      <div className="text-zinc-500 text-sm font-normal font-['SF Pro Text'] leading-[17px]">{text}</div>
    </div>
  )
}

interface IManyOptions {
  array: string[]
}

export const ManyOptionsCategory: FC<IManyOptions> = ({ array }) => {
  return (
    <div className="self-stretch flex-col justify-start items-start gap-2 flex">
      {array.map((el, index) => (
        <OptionCategory text={el} key={index} />
      ))}
    </div>
  )
}
