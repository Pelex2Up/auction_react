import { FC } from "react";
import SearchInput from "../common/SearchInput";

export const SearchBlock: FC = () => {
  const alphabet = "абвгдеёжзийклмнопрстуфхцчшщъыьэюя".split("");
  return (
    <div className="flex flex-col w-full xl:h-[643px] xl:justify-center xl:items-start gap-[25px] xl:flex-row items-center justify-start h-full xl:px-[60px]">
      <div className="xl:w-[50%] w-full h-[643px] relative flex-col justify-start items-center flex gap-6">
        <div className="text-zinc-900 text-2xl font-medium font-['SF Pro Text'] leading-[28.80px] tracking-tight">
          Обьявления о продаже
        </div>
        <SearchInput />
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
        <div className="w-full h-[472px] relative lg:overflow-hidden overflow-x-scroll overflow-y-hidden">
          <div className="w-full h-[472px] left-0 top-0 absolute bg-white shadow"></div>
          <div className="h-[386px] left-[24px] top-[24px] absolute flex-col justify-start items-start gap-6 inline-flex">
            <div className="w-[138px] justify-start items-center gap-2 inline-flex">
              <div className="grow shrink basis-0 h-[17px] justify-between items-center flex">
                <div className="justify-start items-center gap-2 flex">
                  <div className="text-green-800 text-sm font-normal font-['SF Pro Text'] leading-[16.80px] tracking-tight">
                    Электроника
                  </div>
                </div>
                <div className="w-4 h-4 pl-0.5 pr-[1.62px] py-[5px] origin-top-left rotate-90 justify-center items-center flex"></div>
              </div>
            </div>
            <div className="w-[138px] justify-start items-center gap-2 inline-flex">
              <div className="grow shrink basis-0 h-[17px] justify-start items-center gap-[39px] flex">
                <div className="justify-start items-center gap-2 flex">
                  <div className="text-zinc-900 text-sm font-normal font-['SF Pro Text'] leading-[16.80px] tracking-tight">
                    Электроника
                  </div>
                </div>
              </div>
            </div>
            <div className="w-[138px] justify-start items-center gap-2 inline-flex">
              <div className="grow shrink basis-0 h-[17px] justify-start items-center gap-[39px] flex">
                <div className="justify-start items-center gap-2 flex">
                  <div className="text-zinc-900 text-sm font-normal font-['SF Pro Text'] leading-[16.80px] tracking-tight">
                    Электроника
                  </div>
                </div>
              </div>
            </div>
            <div className="w-[138px] justify-start items-center gap-2 inline-flex">
              <div className="grow shrink basis-0 h-[17px] justify-start items-center gap-[39px] flex">
                <div className="justify-start items-center gap-2 flex">
                  <div className="text-zinc-900 text-sm font-normal font-['SF Pro Text'] leading-[16.80px] tracking-tight">
                    Электроника
                  </div>
                </div>
              </div>
            </div>
            <div className="w-[138px] justify-start items-center gap-2 inline-flex">
              <div className="grow shrink basis-0 h-[17px] justify-start items-center gap-[39px] flex">
                <div className="justify-start items-center gap-2 flex">
                  <div className="text-zinc-900 text-sm font-normal font-['SF Pro Text'] leading-[16.80px] tracking-tight">
                    Электроника
                  </div>
                </div>
              </div>
            </div>
            <div className="w-[138px] justify-start items-center gap-2 inline-flex">
              <div className="grow shrink basis-0 h-[17px] justify-start items-center gap-[39px] flex">
                <div className="justify-start items-center gap-2 flex">
                  <div className="text-zinc-900 text-sm font-normal font-['SF Pro Text'] leading-[16.80px] tracking-tight">
                    Электроника
                  </div>
                </div>
              </div>
            </div>
            <div className="w-[138px] justify-start items-center gap-2 inline-flex">
              <div className="grow shrink basis-0 h-[17px] justify-start items-center gap-[39px] flex">
                <div className="justify-start items-center gap-2 flex">
                  <div className="text-zinc-900 text-sm font-normal font-['SF Pro Text'] leading-[16.80px] tracking-tight">
                    Электроника
                  </div>
                </div>
              </div>
            </div>
            <div className="w-[138px] justify-start items-center gap-2 inline-flex">
              <div className="grow shrink basis-0 h-[17px] justify-start items-center gap-[39px] flex">
                <div className="justify-start items-center gap-2 flex">
                  <div className="text-zinc-900 text-sm font-normal font-['SF Pro Text'] leading-[16.80px] tracking-tight">
                    Электроника
                  </div>
                </div>
              </div>
            </div>
            <div className="w-[138px] justify-start items-center gap-2 inline-flex">
              <div className="grow shrink basis-0 h-[17px] justify-start items-center gap-[39px] flex">
                <div className="justify-start items-center gap-2 flex">
                  <div className="text-zinc-900 text-sm font-normal font-['SF Pro Text'] leading-[16.80px] tracking-tight">
                    Электроника
                  </div>
                </div>
              </div>
            </div>
            <div className="w-[138px] justify-start items-center gap-2 inline-flex">
              <div className="grow shrink basis-0 h-[17px] justify-start items-center gap-[39px] flex">
                <div className="justify-start items-center gap-2 flex">
                  <div className="text-zinc-900 text-sm font-normal font-['SF Pro Text'] leading-[16.80px] tracking-tight">
                    Электроника
                  </div>
                </div>
              </div>
            </div>
          </div>
          <div className="h-[408px] left-[230px] top-[24px] absolute justify-start items-start gap-[46px] inline-flex">
            <div className="w-40 h-[274px] flex-col justify-start items-start gap-8 inline-flex">
              <div className="h-[146px] flex-col justify-start items-start gap-3 flex">
                <div className="w-[104px] h-[17px] justify-center items-center inline-flex">
                  <div className="text-zinc-900 text-base font-medium font-['SF Pro Text'] leading-[17px]">
                    Компьютеры
                  </div>
                </div>
                <div className="self-stretch h-[117px] flex-col justify-start items-start gap-2 flex">
                  <div className="w-[124px] h-[17px] pr-[52px] justify-start items-center inline-flex">
                    <div className="text-zinc-500 text-sm font-normal font-['SF Pro Text'] leading-[17px]">
                      Мониторы
                    </div>
                  </div>
                  <div className="w-[124px] h-[17px] justify-center items-center inline-flex">
                    <div className="text-zinc-500 text-sm font-normal font-['SF Pro Text'] leading-[17px]">
                      Системные блоки
                    </div>
                  </div>
                  <div className="w-[124px] h-[17px] justify-end items-center inline-flex">
                    <div className="text-zinc-500 text-sm font-normal font-['SF Pro Text'] leading-[17px]">
                      Сетевое оборудование
                    </div>
                  </div>
                  <div className="w-[124px] h-[17px] justify-center items-center inline-flex">
                    <div className="text-zinc-500 text-sm font-normal font-['SF Pro Text'] leading-[17px]">
                      Системные блоки
                    </div>
                  </div>
                  <div className="w-[124px] h-[17px] justify-center items-center inline-flex">
                    <div className="text-zinc-500 text-sm font-normal font-['SF Pro Text'] leading-[17px]">
                      Системные блоки
                    </div>
                  </div>
                </div>
              </div>
              <div className="h-24 flex-col justify-start items-start gap-3 flex">
                <div className="w-[104px] h-[17px] justify-end items-center inline-flex">
                  <div className="text-zinc-900 text-base font-medium font-['SF Pro Text'] leading-[17px]">
                    Офисная техника
                  </div>
                </div>
                <div className="self-stretch h-[67px] flex-col justify-start items-start gap-2 flex">
                  <div className="w-[124px] h-[17px] pr-[52px] justify-start items-center inline-flex">
                    <div className="text-zinc-500 text-sm font-normal font-['SF Pro Text'] leading-[17px]">
                      Мониторы
                    </div>
                  </div>
                  <div className="w-[124px] h-[17px] justify-center items-center inline-flex">
                    <div className="text-zinc-500 text-sm font-normal font-['SF Pro Text'] leading-[17px]">
                      Системные блоки
                    </div>
                  </div>
                  <div className="w-[124px] h-[17px] justify-end items-center inline-flex">
                    <div className="text-zinc-500 text-sm font-normal font-['SF Pro Text'] leading-[17px]">
                      Сетевое оборудование
                    </div>
                  </div>
                </div>
              </div>
              <div className="h-24 flex-col justify-start items-start gap-3 flex">
                <div className="w-[104px] h-[17px] justify-end items-center inline-flex">
                  <div className="text-zinc-900 text-base font-medium font-['SF Pro Text'] leading-[17px]">
                    Офисная техника
                  </div>
                </div>
                <div className="self-stretch h-[67px] flex-col justify-start items-start gap-2 flex">
                  <div className="w-[124px] h-[17px] pr-[52px] justify-start items-center inline-flex">
                    <div className="text-zinc-500 text-sm font-normal font-['SF Pro Text'] leading-[17px]">
                      Мониторы
                    </div>
                  </div>
                  <div className="w-[124px] h-[17px] justify-center items-center inline-flex">
                    <div className="text-zinc-500 text-sm font-normal font-['SF Pro Text'] leading-[17px]">
                      Системные блоки
                    </div>
                  </div>
                  <div className="w-[124px] h-[17px] justify-end items-center inline-flex">
                    <div className="text-zinc-500 text-sm font-normal font-['SF Pro Text'] leading-[17px]">
                      Сетевое оборудование
                    </div>
                  </div>
                </div>
              </div>
            </div>
            <div className="w-[196px] h-[274px] flex-col justify-start items-start gap-8 inline-flex">
              <div className="w-[196px] h-[146px] flex-col justify-start items-start gap-3 flex">
                <div className="w-[104px] h-[17px] justify-end items-center inline-flex">
                  <div className="text-zinc-900 text-base font-medium font-['SF Pro Text'] leading-[17px]">
                    Телефоны и акксесуары
                  </div>
                </div>
                <div className="self-stretch h-[67px] flex-col justify-start items-start gap-2 flex">
                  <div className="w-[124px] h-[17px] pr-[52px] justify-start items-center inline-flex">
                    <div className="text-zinc-500 text-sm font-normal font-['SF Pro Text'] leading-[17px]">
                      Мониторы
                    </div>
                  </div>
                  <div className="w-[124px] h-[17px] justify-center items-center inline-flex">
                    <div className="text-zinc-500 text-sm font-normal font-['SF Pro Text'] leading-[17px]">
                      Системные блоки
                    </div>
                  </div>
                  <div className="w-[124px] h-[17px] justify-end items-center inline-flex">
                    <div className="text-zinc-500 text-sm font-normal font-['SF Pro Text'] leading-[17px]">
                      Сетевое оборудование
                    </div>
                  </div>
                </div>
              </div>
              <div className="h-24 flex-col justify-start items-start gap-3 flex">
                <div className="w-[104px] h-[17px] justify-end items-center inline-flex">
                  <div className="text-zinc-900 text-base font-medium font-['SF Pro Text'] leading-[17px]">
                    Комплектующие для ПК
                  </div>
                </div>
                <div className="self-stretch h-[67px] flex-col justify-start items-start gap-2 flex">
                  <div className="w-[124px] h-[17px] pr-[52px] justify-start items-center inline-flex">
                    <div className="text-zinc-500 text-sm font-normal font-['SF Pro Text'] leading-[17px]">
                      Мониторы
                    </div>
                  </div>
                  <div className="w-[124px] h-[17px] justify-center items-center inline-flex">
                    <div className="text-zinc-500 text-sm font-normal font-['SF Pro Text'] leading-[17px]">
                      Системные блоки
                    </div>
                  </div>
                  <div className="w-[124px] h-[17px] justify-end items-center inline-flex">
                    <div className="text-zinc-500 text-sm font-normal font-['SF Pro Text'] leading-[17px]">
                      Сетевое оборудование
                    </div>
                  </div>
                </div>
              </div>
              <div className="h-24 flex-col justify-start items-start gap-3 flex">
                <div className="w-[104px] h-[17px] justify-end items-center inline-flex">
                  <div className="text-zinc-900 text-base font-medium font-['SF Pro Text'] leading-[17px]">
                    Комплектующие для ПК
                  </div>
                </div>
                <div className="self-stretch h-[67px] flex-col justify-start items-start gap-2 flex">
                  <div className="w-[124px] h-[17px] pr-[52px] justify-start items-center inline-flex">
                    <div className="text-zinc-500 text-sm font-normal font-['SF Pro Text'] leading-[17px]">
                      Мониторы
                    </div>
                  </div>
                  <div className="w-[124px] h-[17px] justify-center items-center inline-flex">
                    <div className="text-zinc-500 text-sm font-normal font-['SF Pro Text'] leading-[17px]">
                      Системные блоки
                    </div>
                  </div>
                  <div className="w-[124px] h-[17px] justify-end items-center inline-flex">
                    <div className="text-zinc-500 text-sm font-normal font-['SF Pro Text'] leading-[17px]">
                      Сетевое оборудование
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
      <div className="xl:w-[50%] w-full h-[643px] relative flex-col justify-start items-center flex gap-6">
        <div className="text-zinc-900 text-2xl font-medium font-['SF Pro Text'] leading-[28.80px] tracking-tight">
          Обьявления о покупке
        </div>
        <SearchInput />
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
        <div className="w-full h-[472px] relative lg:overflow-hidden overflow-x-scroll overflow-y-hidden">
          <div className="w-full h-[472px] left-0 top-0 absolute bg-white shadow"></div>
          <div className="h-[386px] left-[24px] top-[24px] absolute flex-col justify-start items-start gap-6 inline-flex">
            <div className="w-[138px] justify-start items-center gap-2 inline-flex">
              <div className="grow shrink basis-0 h-[17px] justify-between items-center flex">
                <div className="justify-start items-center gap-2 flex">
                  <div className="text-green-800 text-sm font-normal font-['SF Pro Text'] leading-[16.80px] tracking-tight">
                    Электроника
                  </div>
                </div>
                <div className="w-4 h-4 pl-0.5 pr-[1.62px] py-[5px] origin-top-left rotate-90 justify-center items-center flex"></div>
              </div>
            </div>
            <div className="w-[138px] justify-start items-center gap-2 inline-flex">
              <div className="grow shrink basis-0 h-[17px] justify-start items-center gap-[39px] flex">
                <div className="justify-start items-center gap-2 flex">
                  <div className="text-zinc-900 text-sm font-normal font-['SF Pro Text'] leading-[16.80px] tracking-tight">
                    Электроника
                  </div>
                </div>
              </div>
            </div>
            <div className="w-[138px] justify-start items-center gap-2 inline-flex">
              <div className="grow shrink basis-0 h-[17px] justify-start items-center gap-[39px] flex">
                <div className="justify-start items-center gap-2 flex">
                  <div className="text-zinc-900 text-sm font-normal font-['SF Pro Text'] leading-[16.80px] tracking-tight">
                    Электроника
                  </div>
                </div>
              </div>
            </div>
            <div className="w-[138px] justify-start items-center gap-2 inline-flex">
              <div className="grow shrink basis-0 h-[17px] justify-start items-center gap-[39px] flex">
                <div className="justify-start items-center gap-2 flex">
                  <div className="text-zinc-900 text-sm font-normal font-['SF Pro Text'] leading-[16.80px] tracking-tight">
                    Электроника
                  </div>
                </div>
              </div>
            </div>
            <div className="w-[138px] justify-start items-center gap-2 inline-flex">
              <div className="grow shrink basis-0 h-[17px] justify-start items-center gap-[39px] flex">
                <div className="justify-start items-center gap-2 flex">
                  <div className="text-zinc-900 text-sm font-normal font-['SF Pro Text'] leading-[16.80px] tracking-tight">
                    Электроника
                  </div>
                </div>
              </div>
            </div>
            <div className="w-[138px] justify-start items-center gap-2 inline-flex">
              <div className="grow shrink basis-0 h-[17px] justify-start items-center gap-[39px] flex">
                <div className="justify-start items-center gap-2 flex">
                  <div className="text-zinc-900 text-sm font-normal font-['SF Pro Text'] leading-[16.80px] tracking-tight">
                    Электроника
                  </div>
                </div>
              </div>
            </div>
            <div className="w-[138px] justify-start items-center gap-2 inline-flex">
              <div className="grow shrink basis-0 h-[17px] justify-start items-center gap-[39px] flex">
                <div className="justify-start items-center gap-2 flex">
                  <div className="text-zinc-900 text-sm font-normal font-['SF Pro Text'] leading-[16.80px] tracking-tight">
                    Электроника
                  </div>
                </div>
              </div>
            </div>
            <div className="w-[138px] justify-start items-center gap-2 inline-flex">
              <div className="grow shrink basis-0 h-[17px] justify-start items-center gap-[39px] flex">
                <div className="justify-start items-center gap-2 flex">
                  <div className="text-zinc-900 text-sm font-normal font-['SF Pro Text'] leading-[16.80px] tracking-tight">
                    Электроника
                  </div>
                </div>
              </div>
            </div>
            <div className="w-[138px] justify-start items-center gap-2 inline-flex">
              <div className="grow shrink basis-0 h-[17px] justify-start items-center gap-[39px] flex">
                <div className="justify-start items-center gap-2 flex">
                  <div className="text-zinc-900 text-sm font-normal font-['SF Pro Text'] leading-[16.80px] tracking-tight">
                    Электроника
                  </div>
                </div>
              </div>
            </div>
            <div className="w-[138px] justify-start items-center gap-2 inline-flex">
              <div className="grow shrink basis-0 h-[17px] justify-start items-center gap-[39px] flex">
                <div className="justify-start items-center gap-2 flex">
                  <div className="text-zinc-900 text-sm font-normal font-['SF Pro Text'] leading-[16.80px] tracking-tight">
                    Электроника
                  </div>
                </div>
              </div>
            </div>
          </div>
          <div className="h-[408px] left-[230px] top-[24px] absolute justify-start items-start gap-[46px] inline-flex">
            <div className="w-40 h-[274px] flex-col justify-start items-start gap-8 inline-flex">
              <div className="h-[146px] flex-col justify-start items-start gap-3 flex">
                <div className="w-[104px] h-[17px] justify-center items-center inline-flex">
                  <div className="text-zinc-900 text-base font-medium font-['SF Pro Text'] leading-[17px]">
                    Компьютеры
                  </div>
                </div>
                <div className="self-stretch h-[117px] flex-col justify-start items-start gap-2 flex">
                  <div className="w-[124px] h-[17px] pr-[52px] justify-start items-center inline-flex">
                    <div className="text-green-800 text-sm font-normal font-['SF Pro Text'] leading-[17px]">
                      Мониторы
                    </div>
                  </div>
                  <div className="w-[124px] h-[17px] justify-center items-center inline-flex">
                    <div className="text-zinc-500 text-sm font-normal font-['SF Pro Text'] leading-[17px]">
                      Системные блоки
                    </div>
                  </div>
                  <div className="w-[124px] h-[17px] justify-end items-center inline-flex">
                    <div className="text-zinc-500 text-sm font-normal font-['SF Pro Text'] leading-[17px]">
                      Сетевое оборудование
                    </div>
                  </div>
                  <div className="w-[124px] h-[17px] justify-center items-center inline-flex">
                    <div className="text-zinc-500 text-sm font-normal font-['SF Pro Text'] leading-[17px]">
                      Системные блоки
                    </div>
                  </div>
                  <div className="w-[124px] h-[17px] justify-center items-center inline-flex">
                    <div className="text-zinc-500 text-sm font-normal font-['SF Pro Text'] leading-[17px]">
                      Системные блоки
                    </div>
                  </div>
                </div>
              </div>
              <div className="h-24 flex-col justify-start items-start gap-3 flex">
                <div className="w-[104px] h-[17px] justify-end items-center inline-flex">
                  <div className="text-zinc-900 text-base font-medium font-['SF Pro Text'] leading-[17px]">
                    Офисная техника
                  </div>
                </div>
                <div className="self-stretch h-[67px] flex-col justify-start items-start gap-2 flex">
                  <div className="w-[124px] h-[17px] pr-[52px] justify-start items-center inline-flex">
                    <div className="text-zinc-500 text-sm font-normal font-['SF Pro Text'] leading-[17px]">
                      Мониторы
                    </div>
                  </div>
                  <div className="w-[124px] h-[17px] justify-center items-center inline-flex">
                    <div className="text-zinc-500 text-sm font-normal font-['SF Pro Text'] leading-[17px]">
                      Системные блоки
                    </div>
                  </div>
                  <div className="w-[124px] h-[17px] justify-end items-center inline-flex">
                    <div className="text-zinc-500 text-sm font-normal font-['SF Pro Text'] leading-[17px]">
                      Сетевое оборудование
                    </div>
                  </div>
                </div>
              </div>
              <div className="h-24 flex-col justify-start items-start gap-3 flex">
                <div className="w-[104px] h-[17px] justify-end items-center inline-flex">
                  <div className="text-zinc-900 text-base font-medium font-['SF Pro Text'] leading-[17px]">
                    Офисная техника
                  </div>
                </div>
                <div className="self-stretch h-[67px] flex-col justify-start items-start gap-2 flex">
                  <div className="w-[124px] h-[17px] pr-[52px] justify-start items-center inline-flex">
                    <div className="text-zinc-500 text-sm font-normal font-['SF Pro Text'] leading-[17px]">
                      Мониторы
                    </div>
                  </div>
                  <div className="w-[124px] h-[17px] justify-center items-center inline-flex">
                    <div className="text-zinc-500 text-sm font-normal font-['SF Pro Text'] leading-[17px]">
                      Системные блоки
                    </div>
                  </div>
                  <div className="w-[124px] h-[17px] justify-end items-center inline-flex">
                    <div className="text-zinc-500 text-sm font-normal font-['SF Pro Text'] leading-[17px]">
                      Сетевое оборудование
                    </div>
                  </div>
                </div>
              </div>
            </div>
            <div className="w-[196px] h-[274px] flex-col justify-start items-start gap-8 inline-flex">
              <div className="w-[196px] h-[146px] flex-col justify-start items-start gap-3 flex">
                <div className="w-[104px] h-[17px] justify-end items-center inline-flex">
                  <div className="text-zinc-900 text-base font-medium font-['SF Pro Text'] leading-[17px]">
                    Телефоны и акксесуары
                  </div>
                </div>
                <div className="self-stretch h-[67px] flex-col justify-start items-start gap-2 flex">
                  <div className="w-[124px] h-[17px] pr-[52px] justify-start items-center inline-flex">
                    <div className="text-zinc-500 text-sm font-normal font-['SF Pro Text'] leading-[17px]">
                      Мониторы
                    </div>
                  </div>
                  <div className="w-[124px] h-[17px] justify-center items-center inline-flex">
                    <div className="text-zinc-500 text-sm font-normal font-['SF Pro Text'] leading-[17px]">
                      Системные блоки
                    </div>
                  </div>
                  <div className="w-[124px] h-[17px] justify-end items-center inline-flex">
                    <div className="text-zinc-500 text-sm font-normal font-['SF Pro Text'] leading-[17px]">
                      Сетевое оборудование
                    </div>
                  </div>
                </div>
              </div>
              <div className="h-24 flex-col justify-start items-start gap-3 flex">
                <div className="w-[104px] h-[17px] justify-end items-center inline-flex">
                  <div className="text-zinc-900 text-base font-medium font-['SF Pro Text'] leading-[17px]">
                    Комплектующие для ПК
                  </div>
                </div>
                <div className="self-stretch h-[67px] flex-col justify-start items-start gap-2 flex">
                  <div className="w-[124px] h-[17px] pr-[52px] justify-start items-center inline-flex">
                    <div className="text-zinc-500 text-sm font-normal font-['SF Pro Text'] leading-[17px]">
                      Мониторы
                    </div>
                  </div>
                  <div className="w-[124px] h-[17px] justify-center items-center inline-flex">
                    <div className="text-zinc-500 text-sm font-normal font-['SF Pro Text'] leading-[17px]">
                      Системные блоки
                    </div>
                  </div>
                  <div className="w-[124px] h-[17px] justify-end items-center inline-flex">
                    <div className="text-zinc-500 text-sm font-normal font-['SF Pro Text'] leading-[17px]">
                      Сетевое оборудование
                    </div>
                  </div>
                </div>
              </div>
              <div className="h-24 flex-col justify-start items-start gap-3 flex">
                <div className="w-[104px] h-[17px] justify-end items-center inline-flex">
                  <div className="text-zinc-900 text-base font-medium font-['SF Pro Text'] leading-[17px]">
                    Комплектующие для ПК
                  </div>
                </div>
                <div className="self-stretch h-[67px] flex-col justify-start items-start gap-2 flex">
                  <div className="w-[124px] h-[17px] pr-[52px] justify-start items-center inline-flex">
                    <div className="text-zinc-500 text-sm font-normal font-['SF Pro Text'] leading-[17px]">
                      Мониторы
                    </div>
                  </div>
                  <div className="w-[124px] h-[17px] justify-center items-center inline-flex">
                    <div className="text-zinc-500 text-sm font-normal font-['SF Pro Text'] leading-[17px]">
                      Системные блоки
                    </div>
                  </div>
                  <div className="w-[124px] h-[17px] justify-end items-center inline-flex">
                    <div className="text-zinc-500 text-sm font-normal font-['SF Pro Text'] leading-[17px]">
                      Сетевое оборудование
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default SearchBlock;
