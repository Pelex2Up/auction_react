import { FC, useEffect, useState } from 'react'
import SearchInput from '../common/SearchInput'
import { ManyOptionsCategory, TitleCategory } from './TitleCategory'
import { selectLangSettings, useAppSelector } from '../../store/hooks'
import { useGetSearchBlockDataQuery, useSearchInputDataMutation } from '../../api/searchService'
import { ICategory } from '../../types/commonTypes'
import { GreenArrowRight } from '../../assets/svg/arrowRight'
import { useDebounceFunc } from '../../utils/useDebounceFunc'
import { Loader } from '../Loader'

export const SearchBlock: FC = () => {
  const [currentBuyLetter, setCurrentBuyLetter] = useState<string>()
  const [currentSellLetter, setCurrentSellLetter] = useState<string>()

  const [selectedBuyCategory, setSelectedBuyCategory] = useState<ICategory>()
  const [selectedSellCategory, setSelectedSellCategory] = useState<ICategory>()

  const { language } = useAppSelector(selectLangSettings)
  const alphabetRu = 'абвгдеёжзийклмнопрстуфхцчшщъыьэюя'.split('')

  const { data: sellData, refetch: refetchSell, isSuccess: successSell, isFetching: fetchingSell } = useGetSearchBlockDataQuery(currentSellLetter)
  const { data: buyData, refetch: refetchBuy, isSuccess: successBuy, isFetching: fetchingBuy } = useGetSearchBlockDataQuery(currentBuyLetter)

  const [searchBuyTerm, setSearchBuyTerm] = useState<string>('')
  const [sendBuySearch, { data: searchBuyData, isLoading: loadingBuy }] = useSearchInputDataMutation()
  const debouncedBuy = useDebounceFunc(sendBuySearch, 300)

  const [searchSellTerm, setSearchSellTerm] = useState<string>('')
  const [sendSellSearch, { data: searchSellData, isLoading: loadingSell }] = useSearchInputDataMutation()
  const debouncedSell = useDebounceFunc(sendSellSearch, 300)

  useEffect(() => {
    if (searchBuyTerm) {
      debouncedBuy(searchBuyTerm)
    }
  }, [searchBuyTerm])

  useEffect(() => {
    if (searchSellTerm) {
      debouncedSell(searchSellTerm)
    }
  }, [searchSellTerm])

  const handleBuyLetter = (letter: string) => {
    setCurrentBuyLetter(letter)
    setSelectedBuyCategory(undefined)
  }

  const handleSellLetter = (letter: string) => {
    setCurrentSellLetter(letter)
    setSelectedSellCategory(undefined)
  }

  useEffect(() => {
    if (currentSellLetter) {
      refetchSell()
    }
  }, [currentSellLetter, refetchSell])

  useEffect(() => {
    if (successSell && sellData) {
      if (sellData.length === 0) {
        setSelectedSellCategory(undefined)
      } else {
        setSelectedSellCategory(sellData[0])
      }
    }
  }, [successSell, sellData])

  useEffect(() => {
    if (currentBuyLetter) {
      refetchBuy()
    }
  }, [currentBuyLetter, refetchBuy])

  useEffect(() => {
    if (successBuy && buyData) {
      if (buyData.length === 0) {
        setSelectedBuyCategory(undefined)
      } else {
        setSelectedBuyCategory(buyData[0])
      }
    }
  }, [successBuy, buyData])

  return (
    <div className="flex flex-col w-full h-full xl:h-[643px] xl:justify-center xl:items-start gap-[25px] xl:flex-row items-center justify-start xl:px-[60px]">
      <div className="xl:w-[50%] w-full h-full xl:h-[643px] relative flex-col justify-start items-center flex gap-6">
        <div className="text-zinc-900 text-2xl font-medium font-['SF Pro Text'] leading-[28.80px] tracking-tight">
          {language === 'RU' ? 'Обьявления о продаже' : 'Advertisements for sale'}
        </div>
        <div className="w-[337px] relative">
          <SearchInput value={searchSellTerm} onChange={setSearchSellTerm} searchData={searchSellData} id={'search-input-sell'} variant="SELL" />
        </div>
        <div className="w-full justify-center items-start gap-2 inline-flex flex-wrap px-2">
          {alphabetRu.map((el, index) => (
            <button
              className={`capitalize text-center ${
                currentSellLetter === el ? 'text-green-700' : 'text-zinc-900'
              } text-base font-medium font-['SF Pro Text'] leading-tight tracking-tight`}
              key={index}
              onClick={() => (currentSellLetter !== el ? handleSellLetter(el) : handleSellLetter(''))}
            >
              {el}
            </button>
          ))}
        </div>
        <div
          className="w-full h-[472px] gap-12 shadow-md px-6 py-8 flex flex-row relative lg:overflow-hidden overflow-x-scroll overflow-y-hidden scrollbar-hide"
          style={{ scrollbarWidth: 'none' }}
        >
          {fetchingSell && (
            <div className="absolute flex w-full h-full items-center justify-center inset-0 backdrop-blur-md">
              <Loader />
            </div>
          )}
          <div
            className="flex-col justify-start items-start min-w-[138px] gap-4 w-[138px] inline-flex overflow-y-scroll scrollbar-hide"
            style={{ scrollbarWidth: 'none' }}
          >
            {sellData &&
              sellData.map((category, index: number) => (
                <button className="w-[138px] justify-start items-center gap-2 inline-flex" onClick={() => setSelectedSellCategory(category)} key={index}>
                  <div className="grow shrink basis-0 min-h-[17px] justify-start items-center gap-[19px] flex">
                    <div className="justify-start w-full gap-3 items-center flex">
                      <span
                        className={`${
                          selectedSellCategory === category ? 'text-green-700' : 'text-zinc-900'
                        } text-sm text-start font-normal font-['SF Pro Text'] leading-[16.80px] tracking-tight`}
                      >
                        {category.title}
                      </span>
                      {selectedSellCategory === category && (
                        <span>
                          <GreenArrowRight />
                        </span>
                      )}
                    </div>
                  </div>
                </button>
              ))}
          </div>
          <div
            className="w-full lg:w-[420px] justify-start h-full overflow-y-scroll flex-wrap items-start gap-2 flex-row inline-flex"
            style={{ scrollbarWidth: 'none' }}
          >
            {selectedSellCategory && selectedSellCategory.children.length > 0 ? (
              selectedSellCategory.children.map((subCat) => (
                <div className="flex-col w-[195px] h-min justify-start items-start gap-3 flex" key={subCat.id}>
                  <TitleCategory category={subCat} mainCategory={selectedSellCategory} variant="SELL" />
                  <ManyOptionsCategory array={subCat.children} mainCategory={selectedSellCategory} variant="SELL" />
                </div>
              ))
            ) : (
              <span>По результатам поиска ничего не найдено.</span>
            )}
          </div>
        </div>
      </div>
      <div className="xl:w-[50%] w-full h-full xl:h-[643px] relative flex-col justify-start items-center flex gap-6">
        <div className="text-zinc-900 text-2xl font-medium font-['SF Pro Text'] leading-[28.80px] tracking-tight">
          {language === 'RU' ? 'Обьявления о покупке' : 'Buy advertisements'}
        </div>
        <div className="w-[337px] relative">
          <SearchInput value={searchBuyTerm} onChange={setSearchBuyTerm} variant="BUY" searchData={searchBuyData} id={'search-input-buy'} />
        </div>
        <div className="w-full justify-center items-start gap-2 inline-flex flex-wrap px-2">
          {alphabetRu.map((el, index) => (
            <span
              className={`capitalize text-center ${
                currentBuyLetter === el ? 'text-green-700' : 'text-zinc-900'
              } text-base font-medium font-['SF Pro Text'] leading-tight tracking-tight cursor-pointer`}
              key={index}
              onClick={() => (currentBuyLetter !== el ? handleBuyLetter(el) : handleBuyLetter(''))}
            >
              {el}
            </span>
          ))}
        </div>
        <div
          className="w-full h-[472px] gap-5 shadow-md px-6 py-8 flex flex-row relative lg:overflow-hidden overflow-x-scroll overflow-y-hidden scrollbar-hide"
          style={{ scrollbarWidth: 'none' }}
        >
          {fetchingBuy && (
            <div className="absolute flex w-full h-full items-center justify-center inset-0 backdrop-blur-md">
              <Loader />
            </div>
          )}
          <div
            className="flex-col min-w-[138px] w-[138px] justify-start items-start gap-4 inline-flex overflow-y-scroll scrollbar-hide"
            style={{ scrollbarWidth: 'none' }}
          >
            {buyData &&
              buyData.map((category, index: number) => (
                <button className="w-[138px] justify-start items-center gap-2 inline-flex" onClick={() => setSelectedBuyCategory(category)} key={index}>
                  <div className="grow shrink basis-0 min-h-[17px] justify-start items-center gap-[39px] flex">
                    <div className="justify-start items-center gap-3 flex">
                      <div
                        className={`${
                          selectedBuyCategory === category ? 'text-green-700' : 'text-zinc-900'
                        } text-sm text-start font-normal font-['SF Pro Text'] leading-[16.80px] tracking-tight`}
                      >
                        {category.title}
                      </div>
                      {selectedBuyCategory === category && (
                        <span>
                          <GreenArrowRight />
                        </span>
                      )}
                    </div>
                  </div>
                </button>
              ))}
          </div>
          <div
            className="w-full lg:w-[420px] justify-start h-full overflow-y-auto scrollbar-hide flex-wrap items-start gap-2 flex-row inline-flex"
            style={{ scrollbarWidth: 'none' }}
          >
            {selectedBuyCategory && selectedBuyCategory.children.length > 0 ? (
              selectedBuyCategory.children.map((subCat) => (
                <div className="flex-col w-[195px] h-min justify-start items-start gap-3 flex" key={subCat.id}>
                  <TitleCategory category={subCat} mainCategory={selectedBuyCategory} variant="BUY" />
                  <ManyOptionsCategory array={subCat.children} mainCategory={selectedBuyCategory} variant="BUY" />
                </div>
              ))
            ) : (
              <span>По результатам поиска ничего не найдено.</span>
            )}
          </div>
        </div>
      </div>
    </div>
  )
}

export default SearchBlock
