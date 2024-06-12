import { FC } from 'react'
import SearchInput from '../common/SearchInput'
import { ManyOptionsCategory, TitleCategory } from './TitleCategory'

export const SearchBlock: FC = () => {
  const alphabet = 'абвгдеёжзийклмнопрстуфхцчшщъыьэюя'.split('')
  return (
    <div className="flex flex-col w-full h-full xl:h-[643px] xl:justify-center xl:items-start gap-[25px] xl:flex-row items-center justify-start xl:px-[60px]">
      <div className="xl:w-[50%] w-full h-full xl:h-[643px] relative flex-col justify-start items-center flex gap-6">
        <div className="text-zinc-900 text-2xl font-medium font-['SF Pro Text'] leading-[28.80px] tracking-tight">Обьявления о продаже</div>
        <div className="w-[337px]">
          <SearchInput />
        </div>
        <div className="w-full justify-center items-start gap-2 inline-flex flex-wrap px-2">
          {alphabet.map((el, index) => (
            <span
              className="capitalize text-center text-zinc-900 text-base font-medium font-['SF Pro Text'] leading-tight tracking-tight cursor-pointer"
              key={index}
            >
              {el}
            </span>
          ))}
        </div>
        <div className="w-full h-[472px] gap-5 shadow-md px-6 py-8 flex flex-row relative lg:overflow-hidden overflow-x-scroll overflow-y-hidden">
          <div className="flex-col justify-start items-start gap-6 inline-flex">
            <div className="w-[138px] justify-start items-center gap-2 inline-flex">
              <div className="grow shrink basis-0 h-[17px] justify-start items-center gap-[39px] flex">
                <div className="justify-start items-center gap-2 flex">
                  <div className="text-zinc-900 text-sm font-normal font-['SF Pro Text'] leading-[16.80px] tracking-tight">Электроника</div>
                </div>
              </div>
            </div>
            <div className="w-[138px] justify-start items-center gap-2 inline-flex">
              <div className="grow shrink basis-0 h-[17px] justify-start items-center gap-[39px] flex">
                <div className="justify-start items-center gap-2 flex">
                  <div className="text-zinc-900 text-sm font-normal font-['SF Pro Text'] leading-[16.80px] tracking-tight">Электроника</div>
                </div>
              </div>
            </div>
            <div className="w-[138px] justify-start items-center gap-2 inline-flex">
              <div className="grow shrink basis-0 h-[17px] justify-start items-center gap-[39px] flex">
                <div className="justify-start items-center gap-2 flex">
                  <div className="text-zinc-900 text-sm font-normal font-['SF Pro Text'] leading-[16.80px] tracking-tight">Электроника</div>
                </div>
              </div>
            </div>
            <div className="w-[138px] justify-start items-center gap-2 inline-flex">
              <div className="grow shrink basis-0 h-[17px] justify-start items-center gap-[39px] flex">
                <div className="justify-start items-center gap-2 flex">
                  <div className="text-zinc-900 text-sm font-normal font-['SF Pro Text'] leading-[16.80px] tracking-tight">Электроника</div>
                </div>
              </div>
            </div>
            <div className="w-[138px] justify-start items-center gap-2 inline-flex">
              <div className="grow shrink basis-0 h-[17px] justify-start items-center gap-[39px] flex">
                <div className="justify-start items-center gap-2 flex">
                  <div className="text-zinc-900 text-sm font-normal font-['SF Pro Text'] leading-[16.80px] tracking-tight">Электроника</div>
                </div>
              </div>
            </div>
            <div className="w-[138px] justify-start items-center gap-2 inline-flex">
              <div className="grow shrink basis-0 h-[17px] justify-start items-center gap-[39px] flex">
                <div className="justify-start items-center gap-2 flex">
                  <div className="text-zinc-900 text-sm font-normal font-['SF Pro Text'] leading-[16.80px] tracking-tight">Электроника</div>
                </div>
              </div>
            </div>
            <div className="w-[138px] justify-start items-center gap-2 inline-flex">
              <div className="grow shrink basis-0 h-[17px] justify-start items-center gap-[39px] flex">
                <div className="justify-start items-center gap-2 flex">
                  <div className="text-zinc-900 text-sm font-normal font-['SF Pro Text'] leading-[16.80px] tracking-tight">Электроника</div>
                </div>
              </div>
            </div>
            <div className="w-[138px] justify-start items-center gap-2 inline-flex">
              <div className="grow shrink basis-0 h-[17px] justify-start items-center gap-[39px] flex">
                <div className="justify-start items-center gap-2 flex">
                  <div className="text-zinc-900 text-sm font-normal font-['SF Pro Text'] leading-[16.80px] tracking-tight">Электроника</div>
                </div>
              </div>
            </div>
            <div className="w-[138px] justify-start items-center gap-2 inline-flex">
              <div className="grow shrink basis-0 h-[17px] justify-start items-center gap-[39px] flex">
                <div className="justify-start items-center gap-2 flex">
                  <div className="text-zinc-900 text-sm font-normal font-['SF Pro Text'] leading-[16.80px] tracking-tight">Электроника</div>
                </div>
              </div>
            </div>
            <div className="w-[138px] justify-start items-center gap-2 inline-flex">
              <div className="grow shrink basis-0 h-[17px] justify-start items-center gap-[39px] flex">
                <div className="justify-start items-center gap-2 flex">
                  <div className="text-zinc-900 text-sm font-normal font-['SF Pro Text'] leading-[16.80px] tracking-tight">Электроника</div>
                </div>
              </div>
            </div>
          </div>
          <div className="w-full justify-start items-start gap-6 flex-col inline-flex">
            <div className="w-full flex-row justify-start items-start gap-8 flex">
              <div className="flex-col w-[195px] justify-start items-start gap-3 flex">
                <TitleCategory text="Компьютеры" />
                <ManyOptionsCategory array={['Мониторы', 'Системные блоки', 'Сетевое оборудование', 'Системные блоки', 'Системные блоки']} />
              </div>
              <div className="flex-col w-[195px] justify-start items-start gap-3 flex">
                <TitleCategory text="Офисная техника" />
                <ManyOptionsCategory array={['Мониторы', 'Системные блоки', 'Сетевое оборудование']} />
              </div>
            </div>

            <div className="w-full flex-row justify-start items-start gap-8 flex">
              <div className="flex-col w-[195px] justify-start items-start gap-3 flex">
                <TitleCategory text="Телефоны и аксессуары" />
                <ManyOptionsCategory array={['Мониторы', 'Системные блоки', 'Сетевое оборудование']} />
              </div>
              <div className="flex-col w-[195px] justify-start items-start gap-3 flex">
                <TitleCategory text="Комплектующие к ПК" />
                <ManyOptionsCategory array={['Мониторы', 'Системные блоки', 'Сетевое оборудование']} />
              </div>
            </div>
            <div className="w-full flex-row justify-start items-start gap-8 flex">
              <div className="flex-col w-[195px] justify-start items-start gap-3 flex">
                <TitleCategory text="Комплектующие к ПК" />
                <ManyOptionsCategory array={['Мониторы', 'Системные блоки', 'Сетевое оборудование']} />
              </div>
              <div className="flex-col w-[195px] justify-start items-start gap-3 flex">
                <TitleCategory text="Офисная техника" />
                <ManyOptionsCategory array={['Мониторы', 'Системные блоки', 'Сетевое оборудование']} />
              </div>
            </div>
          </div>
        </div>
      </div>
      <div className="xl:w-[50%] w-full h-full xl:h-[643px] relative flex-col justify-start items-center flex gap-6">
        <div className="text-zinc-900 text-2xl font-medium font-['SF Pro Text'] leading-[28.80px] tracking-tight">Обьявления о покупке</div>
        <div className="w-[337px]">
          <SearchInput />
        </div>
        <div className="w-full justify-center items-start gap-2 inline-flex flex-wrap px-2">
          {alphabet.map((el, index) => (
            <span
              className="capitalize text-center text-zinc-900 text-base font-medium font-['SF Pro Text'] leading-tight tracking-tight cursor-pointer"
              key={index + el}
            >
              {el}
            </span>
          ))}
        </div>
        <div className="w-full h-[472px] gap-5 shadow-md px-6 py-8 flex flex-row relative lg:overflow-hidden overflow-x-scroll overflow-y-hidden">
          <div className="flex-col justify-start items-start gap-6 inline-flex">
            <div className="w-[138px] justify-start items-center gap-2 inline-flex">
              <div className="grow shrink basis-0 h-[17px] justify-start items-center gap-[39px] flex">
                <div className="justify-start items-center gap-2 flex">
                  <div className="text-zinc-900 text-sm font-normal font-['SF Pro Text'] leading-[16.80px] tracking-tight">Электроника</div>
                </div>
              </div>
            </div>
            <div className="w-[138px] justify-start items-center gap-2 inline-flex">
              <div className="grow shrink basis-0 h-[17px] justify-start items-center gap-[39px] flex">
                <div className="justify-start items-center gap-2 flex">
                  <div className="text-zinc-900 text-sm font-normal font-['SF Pro Text'] leading-[16.80px] tracking-tight">Электроника</div>
                </div>
              </div>
            </div>
            <div className="w-[138px] justify-start items-center gap-2 inline-flex">
              <div className="grow shrink basis-0 h-[17px] justify-start items-center gap-[39px] flex">
                <div className="justify-start items-center gap-2 flex">
                  <div className="text-zinc-900 text-sm font-normal font-['SF Pro Text'] leading-[16.80px] tracking-tight">Электроника</div>
                </div>
              </div>
            </div>
            <div className="w-[138px] justify-start items-center gap-2 inline-flex">
              <div className="grow shrink basis-0 h-[17px] justify-start items-center gap-[39px] flex">
                <div className="justify-start items-center gap-2 flex">
                  <div className="text-zinc-900 text-sm font-normal font-['SF Pro Text'] leading-[16.80px] tracking-tight">Электроника</div>
                </div>
              </div>
            </div>
            <div className="w-[138px] justify-start items-center gap-2 inline-flex">
              <div className="grow shrink basis-0 h-[17px] justify-start items-center gap-[39px] flex">
                <div className="justify-start items-center gap-2 flex">
                  <div className="text-zinc-900 text-sm font-normal font-['SF Pro Text'] leading-[16.80px] tracking-tight">Электроника</div>
                </div>
              </div>
            </div>
            <div className="w-[138px] justify-start items-center gap-2 inline-flex">
              <div className="grow shrink basis-0 h-[17px] justify-start items-center gap-[39px] flex">
                <div className="justify-start items-center gap-2 flex">
                  <div className="text-zinc-900 text-sm font-normal font-['SF Pro Text'] leading-[16.80px] tracking-tight">Электроника</div>
                </div>
              </div>
            </div>
            <div className="w-[138px] justify-start items-center gap-2 inline-flex">
              <div className="grow shrink basis-0 h-[17px] justify-start items-center gap-[39px] flex">
                <div className="justify-start items-center gap-2 flex">
                  <div className="text-zinc-900 text-sm font-normal font-['SF Pro Text'] leading-[16.80px] tracking-tight">Электроника</div>
                </div>
              </div>
            </div>
            <div className="w-[138px] justify-start items-center gap-2 inline-flex">
              <div className="grow shrink basis-0 h-[17px] justify-start items-center gap-[39px] flex">
                <div className="justify-start items-center gap-2 flex">
                  <div className="text-zinc-900 text-sm font-normal font-['SF Pro Text'] leading-[16.80px] tracking-tight">Электроника</div>
                </div>
              </div>
            </div>
            <div className="w-[138px] justify-start items-center gap-2 inline-flex">
              <div className="grow shrink basis-0 h-[17px] justify-start items-center gap-[39px] flex">
                <div className="justify-start items-center gap-2 flex">
                  <div className="text-zinc-900 text-sm font-normal font-['SF Pro Text'] leading-[16.80px] tracking-tight">Электроника</div>
                </div>
              </div>
            </div>
            <div className="w-[138px] justify-start items-center gap-2 inline-flex">
              <div className="grow shrink basis-0 h-[17px] justify-start items-center gap-[39px] flex">
                <div className="justify-start items-center gap-2 flex">
                  <div className="text-zinc-900 text-sm font-normal font-['SF Pro Text'] leading-[16.80px] tracking-tight">Электроника</div>
                </div>
              </div>
            </div>
          </div>
          <div className="w-full justify-start items-start gap-6 flex-col inline-flex">
            <div className="w-full flex-row justify-start items-start gap-8 flex">
              <div className="flex-col w-[195px] justify-start items-start gap-3 flex">
                <TitleCategory text="Компьютеры" />
                <ManyOptionsCategory array={['Мониторы', 'Системные блоки', 'Сетевое оборудование', 'Системные блоки', 'Системные блоки']} />
              </div>
              <div className="flex-col w-[195px] justify-start items-start gap-3 flex">
                <TitleCategory text="Офисная техника" />
                <ManyOptionsCategory array={['Мониторы', 'Системные блоки', 'Сетевое оборудование']} />
              </div>
            </div>

            <div className="w-full flex-row justify-start items-start gap-8 flex">
              <div className="flex-col w-[195px] justify-start items-start gap-3 flex">
                <TitleCategory text="Телефоны и аксессуары" />
                <ManyOptionsCategory array={['Мониторы', 'Системные блоки', 'Сетевое оборудование']} />
              </div>
              <div className="flex-col w-[195px] justify-start items-start gap-3 flex">
                <TitleCategory text="Комплектующие к ПК" />
                <ManyOptionsCategory array={['Мониторы', 'Системные блоки', 'Сетевое оборудование']} />
              </div>
            </div>
            <div className="w-full flex-row justify-start items-start gap-8 flex">
              <div className="flex-col w-[195px] justify-start items-start gap-3 flex">
                <TitleCategory text="Комплектующие к ПК" />
                <ManyOptionsCategory array={['Мониторы', 'Системные блоки', 'Сетевое оборудование']} />
              </div>
              <div className="flex-col w-[195px] justify-start items-start gap-3 flex">
                <TitleCategory text="Офисная техника" />
                <ManyOptionsCategory array={['Мониторы', 'Системные блоки', 'Сетевое оборудование']} />
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

export default SearchBlock
