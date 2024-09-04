import { ChangeEvent, FC, FormEvent, useEffect, useState } from 'react'
import { RadioButton } from '../../../components/common/RadioButton'
import Input from '../../../components/common/Input'
import { SelectInput } from '../../../components/common/SelectInput/SelectInput'
import { ImagesInput } from '../../../components/ImagesInput'
import { QuestionSVG } from '../../../assets/svg/questionSVG'
import { toast } from 'react-toastify'
import { AddPhoneButton, Button } from '../../../components/common/buttons'
import Checkbox from '../../../components/common/checkbox'
import DefaultLink from '../../../components/common/DefaultLink'
import { PhoneInput, defaultCountries, parseCountry } from 'react-international-phone'
import styles from './MakeLot.module.scss'
import { useCreateLotMutation, useFetchCategoriesQuery, useGetCategoryMutation } from '../../../api/lotService'
import { Loader } from '../../../components/Loader'
import CreateLotSuccess from './SuccessCreated'
import { ICategory } from '../../../types/commonTypes'
import { useFetchFooterDataQuery, useFetchProfileQuery } from '../../../api/userService'
import { selectLangSettings, useAppSelector } from '../../../store/hooks'

export const daysList: { value: string; label: string }[] = Array.from({ length: 31 }, (_, i) => ({
  value: String(i + 1).padStart(2, '0'),
  label: String(i + 1).padStart(2, '0')
}))

// Массив месяцев от 1 до 12
export const monthsList: { value: string; label: string }[] = Array.from({ length: 12 }, (_, i) => ({
  value: String(i + 1).padStart(2, '0'),
  label: String(i + 1).padStart(2, '0')
}))

// Массив годов от текущего года до 10 лет вперед
export const currentYear = new Date().getFullYear()
export const yearsList: { value: string; label: string }[] = Array.from({ length: 10 }, (_, i) => ({
  value: String(currentYear + i),
  label: String(currentYear + i)
}))

export const handleKeyPress: React.KeyboardEventHandler<HTMLInputElement> & React.KeyboardEventHandler<HTMLTextAreaElement> = (event) => {
  if (!/[0-9]/.test(event.key) && event.key !== 'Backspace' && event.key !== '.') {
    event.preventDefault()
  }
}

export const handleNumberKeyPress: React.KeyboardEventHandler<HTMLInputElement> & React.KeyboardEventHandler<HTMLTextAreaElement> = (event) => {
  if (!/[0-9]/.test(event.key) && event.key !== 'Backspace') {
    event.preventDefault()
  }
}

export const CreateLotPage: FC = () => {
  const { language } = useAppSelector(selectLangSettings)
  const { data: overAllData } = useFetchFooterDataQuery()
  const dateNow = new Date()
  const { data: categories } = useFetchCategoriesQuery()
  const { data: user, isFetching, isSuccess } = useFetchProfileQuery()
  const [tarriffOption, setTarriffOption] = useState<string>('default')
  const [typeOption, setTypeOption] = useState<string>('BUY')
  const [lotTypeOption, setLotTypeOption] = useState<string>('auction')
  const [lotName, setLotName] = useState<string>('')
  const [lotDescription, setLotDescription] = useState<string>('')
  const [count, setCount] = useState<string>('')
  const [price, setPrice] = useState<string>('')
  const [date, setDate] = useState<{ day: string; month: string; year: string }>({
    day: String(dateNow.getDate()),
    month: String(dateNow.getMonth()),
    year: String(dateNow.getFullYear())
  })
  const [productState, setProductState] = useState<string>('NEW')
  const [photoList, setPhotoList] = useState<{ image: File | null; id: number; order: number }[]>([
    { image: null, id: 1, order: 1 },
    { image: null, id: 2, order: 2 },
    { image: null, id: 3, order: 3 },
    { image: null, id: 4, order: 4 },
    { image: null, id: 5, order: 5 },
    { image: null, id: 6, order: 6 }
  ])
  const [imagesCount, setImagesCount] = useState<number>(0)
  const [selectedProfileType, setSelectedProfileType] = useState<string>('')
  const [username, setUsername] = useState<string>('')
  const [externalNumber1, setExternalNumber1] = useState<string | undefined>()
  const [externalNumber2, setExternalNumber2] = useState<string | undefined>()
  const [sendForm, { isLoading }] = useCreateLotMutation()
  // const [sendPhoto] = useSendPhotoMutation()
  const [createdSuccessfuly, setCreatedSuccessfuly] = useState<boolean>(false)
  const [category, setCategory] = useState<ICategory>()
  const [city, setCity] = useState<string>('')
  const [subCategoriesList, setSubCategoriesList] = useState<ICategory[]>([])
  const [subCategory, setSubCategory] = useState<ICategory>()
  const [region, setRegion] = useState<string>('')
  const [unit, setUnit] = useState<string>('PIECE')
  const [lowerCatList, setLowerCatList] = useState<ICategory[]>()
  const [lowerCat, setLowerCat] = useState<ICategory>()
  const [getCatData] = useGetCategoryMutation()

  const typeGroup = [
    {
      value: 'BUY',
      label: language === 'RU' ? 'Покупка' : 'Buy'
    },
    {
      value: 'SELL',
      label: language === 'RU' ? 'Продажа' : 'Sell'
    }
  ]

  const lotTypeGroup =
    typeOption === 'SELL'
      ? [
          {
            value: 'auction',
            label: language === 'RU' ? 'Аукцион' : 'Auction'
          },
          {
            value: 'fixPrice',
            label: language === 'RU' ? 'Фиксированная цена' : 'Fixed price'
          }
        ]
      : [
          {
            value: 'auction',
            label: language === 'RU' ? 'Аукцион' : 'Auction'
          }
        ]

  const countList = [
    { value: 'PIECE', label: language === 'RU' ? 'шт' : 'piece' },
    { value: 'KG', label: language === 'RU' ? 'кг' : 'kg' },
    { value: 'TON', label: language === 'RU' ? 'тонн' : 'ton' }
  ]

  const productStateOptions = [
    {
      value: 'NEW',
      label: language === 'RU' ? 'Новый' : 'New'
    },
    {
      value: 'USED',
      label: language === 'RU' ? 'Бывший в употреблении' : 'Used'
    }
  ]

  const oblastList = [
    {
      value: 'Все',
      label: language === 'RU' ? 'Все' : 'All'
    },
    {
      value: 'г. Минск',
      label: language === 'RU' ? 'г. Минск' : 'Minsk'
    },
    {
      value: 'Брестская обл.',
      label: language === 'RU' ? 'Брестская' : 'Brestskaya'
    },
    {
      value: 'Гомельская обл.',
      label: language === 'RU' ? 'Гомельская' : 'Gomelskaya'
    },
    {
      value: 'Гродненская обл.',
      label: language === 'RU' ? 'Гродненская' : 'Grodnenskaya'
    },
    {
      value: 'Могилевская обл.',
      label: language === 'RU' ? 'Могилевская' : 'Mogilevskaya'
    },
    {
      value: 'Минская обл.',
      label: language === 'RU' ? 'Минская' : 'Minskaya'
    },
    {
      value: 'Витебская обл.',
      label: language === 'RU' ? 'Витебская' : 'Vitebskaya'
    }
  ]

  const radioGroup = [
    { value: 'person', label: language === 'RU' ? 'Физическое лицо' : 'Person' },
    { value: 'sole_proprietor', label: language === 'RU' ? 'Индивидуальный предприниматель' : 'Sole-proprietor' },
    { value: 'company', label: language === 'RU' ? 'Юридическое лицо' : 'Company' }
  ]

  const countries = defaultCountries.filter((country) => {
    const { iso2 } = parseCountry(country)
    return ['by', 'ru'].includes(iso2)
  })

  useEffect(() => {
    if (subCategory) {
      setSubCategoriesList(subCategory.children)
    }
  }, [getCatData, subCategory])

  useEffect(() => {
    if (categories && categories.length > 0) {
      if (category) {
        const currentCategory = categories.find((cat) => cat.id === category.id || cat.title === category.title)
        if (currentCategory?.children && currentCategory.children.length > 0) {
          setSubCategoriesList(currentCategory.children)
        } else {
          setSubCategoriesList([])
          setSubCategory(undefined)
          setLowerCat(undefined)
        }
      }
    }
  }, [categories, category, setCategory, setSubCategory, subCategory])

  useEffect(() => {
    const filesCount = photoList.filter((item) => item.image !== null).length
    setImagesCount(filesCount)
  }, [photoList])

  useEffect(() => {
    if (user && !selectedProfileType) {
      setSelectedProfileType(user.profile.type)
    }
    if (user && !username) {
      setUsername(user.username)
    }
  }, [selectedProfileType, user, username])

  const handleChangeOption = (option: string, event: ChangeEvent<HTMLInputElement>) => {
    if (option === 'tariff') {
      setTarriffOption(event.target.value)
    } else if (option === 'type') {
      setTypeOption(event.target.value)
      if (event.target.value === 'BUY') {
        setLotTypeOption('auction')
      }
    } else if (option === 'lotType') {
      setLotTypeOption(event.target.value)
    } else if (option === 'state') {
      setProductState(event.target.value)
    } else if (option === 'profile') {
      setSelectedProfileType(event.target.value)
    }
  }

  const toggleToast = () => {
    toast(
      language === 'RU'
        ? 'Вы указали эту информацию в Вашем профиле, ее нельзя изменить при подаче объявления'
        : "You set that information in your personal profile. It can't be changed here.",
      { type: 'info' }
    )
  }

  const handleAddNumber = () => {
    if (!externalNumber1) {
      setExternalNumber1('+375')
    } else if (externalNumber1 && !externalNumber2) {
      setExternalNumber2('+375')
    }
  }

  const handleSubmitForm = async (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault()
    const auctionEndDate = new Date(parseInt(date.year), parseInt(date.month) - 1, parseInt(date.day), 12, 0, 0)
    const formdata = new FormData()
    if (user) {
      formdata.append('user', String(user.profile.id))
    }
    if (auctionEndDate.getDate() !== parseInt(date.day)) {
      toast(language === 'RU' ? 'Проверьте правильность выбранной даты' : 'Selected incorrect date', { type: 'warning' })
    } else if (!city) {
      toast(language === 'RU' ? 'Пожалуйста, укажите город' : 'Please select city', { type: 'warning' })
    } else if (Number(count) <= 0) {
      toast(language === 'RU' ? 'Количество товара должно быть больше 0' : 'Count must be higher than 0', { type: 'warning' })
    } else if (Number(price) <= 0) {
      toast(language === 'RU' ? 'Стоимость товара должна быть больше 0' : 'Price must be higher than 0', { type: 'warning' })
    } else if (!region) {
      toast(language === 'RU' ? 'Пожалуйста, укажите область' : 'Please select region', { type: 'warning' })
    } else if (!category) {
      toast(language === 'RU' ? 'Необходимо указать категорию товара' : 'Need to choose category', { type: 'warning' })
    } else {
      formdata.append('ad_type', typeOption)
      formdata.append('condition', productState)
      formdata.append('title', lotName)
      formdata.append('description', lotDescription)
      formdata.append('is_auction', lotTypeOption === 'auction' ? 'true' : 'false')
      formdata.append('price', price)
      if (lotTypeOption === 'auction' && auctionEndDate) {
        formdata.append('auction_end_date', auctionEndDate.toISOString())
      }
      formdata.append('city', city)
      formdata.append('count', count)
      formdata.append('region', region)
      formdata.append('username', username)
      formdata.append('unit', unit)
      if (lowerCat && lowerCat.title.length > 0) {
        const cat = lowerCatList?.find((cat) => cat.title === lowerCat.title || cat.id === lowerCat.id)
        formdata.append('category', String(cat?.id))
      } else if (subCategory && subCategory.title.length > 0) {
        const subCat = categories?.find((cat) => cat.children.find((subCat) => subCat.id === subCategory.id || subCat.title === subCategory.title))
        const selectedSubCategory = subCat?.children?.find((sc) => sc.id === subCategory.id || sc.title === subCategory.title)
        formdata.append('category', String(selectedSubCategory?.id))
      } else {
        const cat = categories?.find((cat) => cat.title === category.title || cat.id === category.id)
        formdata.append('category', String(cat?.id))
      }
      photoList.map((photo) => photo.image !== null && formdata.append('photos_input', photo.image))
      await sendForm(formdata)
        .unwrap()
        .then(() => setCreatedSuccessfuly(true))
        .catch(() => toast(language === 'RU' ? 'Произошла непредвиденная ошибка' : 'Something went wrong.', { type: 'error' }))
    }
  }

  return createdSuccessfuly ? (
    <CreateLotSuccess />
  ) : (
    <form onSubmit={handleSubmitForm} className="lg:px-[60px] px-4 w-full flex flex-col gap-8 relative">
      <ul className="w-full flex flex-col gap-8">
        <li className="text-zinc-900 text-2xl font-extrabold leading-[28.80px]">{language === 'RU' ? 'Подача объявления' : 'Advertisement create'}</li>
        <li className="inline-flex items-start gap-8 flex-col md:flex-row">
          <span className="text-zinc-900 text-lg font-medium leading-snug tracking-tight">{language === 'RU' ? 'Ваш тариф' : 'Your tariff'}</span>
          <div className="justify-start h-full items-start xl:items-center gap-6 flex flex-col xl:flex-row xl:inline-flex">
            {user?.subscription && user.subscription.tariff ? (
              <RadioButton
                key={user.subscription.tariff.name}
                name="tariff"
                id={user.subscription.tariff.name}
                value={user.subscription.tariff.name}
                text={user.subscription.tariff.name}
                checked
                onChange={() => console.log()}
                textStyle={{ style: { fontSize: 14 } }}
              />
            ) : (
              <p className="flex h-full items-center text-base leading-snug">
                {language === 'RU' ? 'Нет оплаченного тарифа' : 'You have not any paid tariff plan'}
              </p>
            )}
          </div>
        </li>
        <li className="inline-flex items-start gap-8 flex-col md:flex-row">
          <span className="text-zinc-900 text-lg font-medium leading-snug tracking-tight">
            {language === 'RU' ? 'Вид объявления' : 'Advertisement variant'}
          </span>
          <div className="justify-start items-start xl:items-center gap-6 flex flex-col xl:flex-row xl:inline-flex">
            {typeGroup.map((option) => (
              <RadioButton
                key={option.label + option.value}
                name="lotType"
                id={option.value}
                value={option.value}
                text={option.label}
                onChange={(event) => handleChangeOption('type', event)}
                checked={typeOption === option.value}
              />
            ))}
          </div>
        </li>
        <li className="inline-flex items-start gap-8 flex-col md:flex-row">
          <span className="text-zinc-900 text-lg font-medium leading-snug tracking-tight">{language === 'RU' ? 'Тип объявления' : 'Advertisement type'}</span>
          <div className="justify-start items-start xl:items-center gap-6 flex flex-col xl:flex-row xl:inline-flex">
            {lotTypeGroup.map((option) => (
              <RadioButton
                key={option.label + option.value}
                name="sellType"
                id={option.value}
                value={option.value}
                text={option.label}
                onChange={(event) => handleChangeOption('lotType', event)}
                checked={lotTypeOption === option.value}
              />
            ))}
          </div>
        </li>
      </ul>
      <div className="w-full h-[0px] border border-zinc-300"></div>
      <ul className="w-full max-w-[535px] flex flex-col gap-6">
        <li className="text-zinc-900 text-lg font-medium font-['SF Pro Text'] leading-snug tracking-tight">
          {language === 'RU' ? 'Общая информация ' : 'Details'}
        </li>
        <li className="w-full h-auto justify-center items-center inline-flex">
          <div className="w-full h-full relative flex-col justify-start items-start flex gap-2">
            <div className="text-zinc-900 text-sm font-normal font-['SF Pro Text'] leading-[16.80px] tracking-tight">
              {language === 'RU' ? 'Название объявления' : 'Title'}
              <span className="text-red-500 text-sm font-normal leading-[16.80px] tracking-tight">*</span>
            </div>
            <Input maxLength={50} required multiline={false} className="w-full" value={lotName} onChange={(event) => setLotName(event.target.value)} />
            <div>
              <span className="text-red-500 text-xs font-normal font-['SF Pro Text'] leading-[14.40px] tracking-tight">{lotName.length}</span>
              <span className="text-zinc-300 text-xs font-normal font-['SF Pro Text'] leading-[14.40px] tracking-tight"> </span>
              <span className="text-zinc-500 text-xs font-normal font-['SF Pro Text'] leading-[14.40px] tracking-tight">
                {language === 'RU' ? 'из 50 знаков' : 'from 50 letters'}
              </span>
            </div>
          </div>
        </li>
        <li className="w-full h-auto justify-center items-center inline-flex">
          <div className="w-full h-full relative flex-col justify-start items-start flex gap-2">
            <div className="text-zinc-900 text-sm font-normal font-['SF Pro Text'] leading-[16.80px] tracking-tight">
              {language === 'RU' ? 'Выбор категории' : 'Select category'}
              <span className="text-red-500 text-sm font-normal leading-[16.80px] tracking-tight">*</span>
            </div>
            <SelectInput
              optionsList={categories || []}
              selectedOption={category ? category?.title : ''}
              setSelectedValue={(event) => {
                setCategory(event as ICategory)
                setSubCategoriesList(event.children as ICategory[])
                setSubCategory(undefined)
                setLowerCat(undefined)
              }}
              defaultOption={category ? category.title : language === 'RU' ? 'Выберите категорию' : 'Select category'}
            />
          </div>
        </li>
        {category && subCategoriesList && subCategoriesList.length > 0 && (
          <li className="w-full h-auto justify-center items-center inline-flex">
            <div className="w-full h-full relative flex-col justify-start items-start flex gap-2">
              <div className="text-zinc-900 text-sm font-normal font-['SF Pro Text'] leading-[16.80px] tracking-tight">
                {language === 'RU' ? 'Выбор подкатегории' : 'Select subcategory'}
                <span className="text-red-500 text-sm font-normal leading-[16.80px] tracking-tight">*</span>
              </div>
              <SelectInput
                optionsList={subCategoriesList || []}
                setSelectedValue={(event) => {
                  setSubCategory(event as ICategory)
                  setLowerCatList(event.children as ICategory[])
                  setLowerCat(undefined)
                }}
                selectedOption={subCategory ? subCategory?.title : ''}
                defaultOption={subCategory ? subCategory.title : language === 'RU' ? 'Выберите подкатегорию' : 'Select subcategory'}
              />
            </div>
          </li>
        )}
        {subCategory && lowerCatList && lowerCatList.length > 0 && (
          <li className="w-full h-auto justify-center items-center inline-flex">
            <div className="w-full h-full relative flex-col justify-start items-start flex gap-2">
              <div className="text-zinc-900 text-sm font-normal font-['SF Pro Text'] leading-[16.80px] tracking-tight">
                {language === 'RU' ? 'Выбор подкатегории' : 'Select subcategory'}
                <span className="text-red-500 text-sm font-normal leading-[16.80px] tracking-tight">*</span>
              </div>
              <SelectInput
                optionsList={lowerCatList || []}
                setSelectedValue={(event) => setLowerCat(event as ICategory)}
                selectedOption={lowerCat ? lowerCat?.title : ''}
                defaultOption={lowerCat ? lowerCat.title : language === 'RU' ? 'Выберите подкатегорию' : 'Select subcategory'}
              />
            </div>
          </li>
        )}
        <li className="w-full h-auto justify-center items-center inline-flex">
          <div className="w-full h-full relative flex-col justify-start items-start flex gap-2">
            <div className="text-zinc-900 text-sm font-normal font-['SF Pro Text'] leading-[16.80px] tracking-tight">
              {language === 'RU' ? 'Описание' : 'Description'}
              <span className="text-red-500 text-sm font-normal leading-[16.80px] tracking-tight">*</span>
            </div>
            <Input
              maxLength={4000}
              multiline={true}
              rows={4}
              required
              className="w-full"
              value={lotDescription}
              onChange={(event) => setLotDescription(event.target.value)}
            />
            <div>
              <span className="text-red-500 text-xs font-normal font-['SF Pro Text'] leading-[14.40px] tracking-tight">{lotDescription.length}</span>
              <span className="text-zinc-300 text-xs font-normal font-['SF Pro Text'] leading-[14.40px] tracking-tight"> </span>
              <span className="text-zinc-500 text-xs font-normal font-['SF Pro Text'] leading-[14.40px] tracking-tight">
                {language === 'RU' ? 'из 4000 знаков' : 'from 4000 letters'}
              </span>
            </div>
          </div>
        </li>
        <li className="w-full max-w-[294px] h-auto justify-center items-center inline-flex">
          <div className="w-full h-full relative flex-col justify-start items-start flex gap-2">
            <div className="text-zinc-900 text-sm font-normal font-['SF Pro Text'] leading-[16.80px] tracking-tight">
              {language === 'RU' ? 'Единица измерения' : 'Unit of measure'}
              <span className="text-red-500 text-sm font-normal leading-[16.80px] tracking-tight">*</span>
            </div>
            <SelectInput optionsList={countList} selectedOption={unit} setSelectedValue={(event) => setUnit(event as string)} />
          </div>
        </li>
        <li className="w-full max-w-[294px] h-auto justify-center items-center inline-flex">
          <div className="w-full h-full relative flex-col justify-start items-start flex gap-2">
            <div className="text-zinc-900 text-sm font-normal font-['SF Pro Text'] leading-[16.80px] tracking-tight">
              {language === 'RU' ? 'Количество' : 'Count'}
              <span className="text-red-500 text-sm font-normal leading-[16.80px] tracking-tight">*</span>
            </div>
            <Input
              maxLength={50}
              multiline={false}
              placeholder={language === 'RU' ? 'Введите количество' : 'Enter count'}
              className="w-full"
              value={count}
              required
              type="number"
              onKeyDown={handleNumberKeyPress}
              onChange={(event) => setCount(String(event.target.value))}
            />
          </div>
        </li>
        <li className="w-full max-w-[294px] h-auto justify-center items-center inline-flex">
          <div className="w-full h-full relative flex-col justify-start items-start flex gap-2">
            <div className="text-zinc-900 text-sm font-normal font-['SF Pro Text'] leading-[16.80px] tracking-tight">
              {language === 'RU' ? 'Стоимость за единицу (BYN)' : 'Price for 1 pcs (BYN)'}
              <span className="text-red-500 text-sm font-normal leading-[16.80px] tracking-tight">*</span>
            </div>
            <Input
              maxLength={8}
              multiline={false}
              placeholder={language === 'RU' ? 'Введите стоимость' : 'Enter price'}
              className="w-full"
              value={price}
              required
              type="number"
              onKeyDown={handleKeyPress}
              onChange={(event) => setPrice(String(event.target.value))}
            />
          </div>
        </li>
        {lotTypeOption === 'auction' && (
          <li className="w-full max-w-[294px] h-auto justify-center items-center inline-flex">
            <div className="w-full h-full relative flex-col justify-start items-start flex gap-2">
              <div className="text-zinc-900 text-sm font-normal font-['SF Pro Text'] leading-[16.80px] tracking-tight">
                {language === 'RU' ? 'Дата окончания аукциона' : 'Auction until date'}
                <span className="text-red-500 text-sm font-normal leading-[16.80px] tracking-tight">*</span>
              </div>
              <div className="w-full flex gap-[10px]">
                <SelectInput
                  key={'selectDay'}
                  optionsList={daysList}
                  selectedOption={date.day}
                  setSelectedValue={(event) => setDate({ ...date, day: event as string })}
                  defaultOption={language === 'RU' ? 'дд' : 'dd'}
                />
                <SelectInput
                  key={'selectMonth'}
                  selectedOption={date.month}
                  optionsList={monthsList}
                  setSelectedValue={(event) => setDate({ ...date, month: event as string })}
                  defaultOption={language === 'RU' ? 'мм' : 'mm'}
                />
                <SelectInput
                  key={'selectYear'}
                  selectedOption={date.year}
                  optionsList={yearsList}
                  setSelectedValue={(event) => setDate({ ...date, year: event as string })}
                  defaultOption={language === 'RU' ? 'гг' : 'yy'}
                />
              </div>
            </div>
          </li>
        )}
        <li className="inline-flex items-start gap-8 flex-col md:flex-row">
          <span className="text-zinc-900 text-base font-normal leading-snug tracking-tight">{language === 'RU' ? 'Состояние' : 'Condition'}</span>
          <div className="justify-start items-start xl:items-center gap-6 flex flex-col xl:flex-row xl:inline-flex">
            {productStateOptions.map((option) => (
              <RadioButton
                key={option.label + option.value}
                name="state"
                id={option.value}
                value={option.value}
                text={option.label}
                onChange={(event) => handleChangeOption('state', event)}
                checked={productState === option.value}
                textStyle={{ style: { fontSize: 14 } }}
              />
            ))}
          </div>
        </li>
      </ul>
      <div className="w-full h-[0px] border border-zinc-300"></div>
      <ul className="w-full flex flex-col gap-6">
        <li className="text-zinc-900 text-lg font-medium font-['SF Pro Text'] leading-snug tracking-tight">{language === 'RU' ? 'Фотография' : 'Photo'}</li>
        <li className="w-full h-auto justify-center items-center inline-flex">
          <div className="w-full h-full relative flex-col justify-start items-start flex gap-2">
            <div className="text-zinc-900 text-sm font-normal font-['SF Pro Text'] leading-[16.80px] tracking-tight">
              {language === 'RU' ? 'Добавьте фотографию' : 'Add photo'}
            </div>
            <ImagesInput images={photoList} setImages={setPhotoList} editLot={false} />
            <div className="flex justify-between w-full">
              <div className="text-zinc-500 text-xs font-normal font-['SF Pro Text'] leading-[14.40px] tracking-tight">
                {language === 'RU' ? 'Максимальный размер файла 10МБ' : 'Max file size 10MB'}
              </div>
              <div className="flex items-start justify-start">
                <span className="text-zinc-500 text-xs font-normal font-['SF Pro Text'] leading-[14.40px] tracking-tight mr-[2px]">
                  {language === 'RU' ? 'Загружено' : 'Uploaded'}
                </span>
                {imagesCount === 6 ? (
                  <span className="text-red-500 text-xs font-normal font-['SF Pro Text'] leading-[14.40px] tracking-tight mr-[2px]">{imagesCount}</span>
                ) : (
                  <span className="text-green-800 text-xs font-normal font-['SF Pro Text'] leading-[14.40px] tracking-tight mr-[2px]">{imagesCount}</span>
                )}
                <span className="text-zinc-500 text-xs font-normal font-['SF Pro Text'] leading-[14.40px] tracking-tight">
                  {language === 'RU' ? ' из 6 фотографий' : ' from 6 photos'}
                </span>
              </div>
            </div>
          </div>
        </li>
      </ul>
      <div className="w-full h-[0px] border border-zinc-300"></div>
      <ul className="w-full max-w-[535px] flex flex-col gap-6">
        <li className="text-zinc-900 text-lg font-medium font-['SF Pro Text'] leading-snug tracking-tight">
          {language === 'RU' ? 'Местоположение' : 'Location'}
        </li>
        <li className="w-full h-auto justify-center items-center inline-flex">
          <div className="w-full h-full relative flex-col justify-start items-start flex gap-2">
            <div className="text-zinc-900 text-sm font-normal font-['SF Pro Text'] leading-[16.80px] tracking-tight">
              {language === 'RU' ? 'Область' : 'State'}
              <span className="text-red-500 text-sm font-normal leading-[16.80px] tracking-tight">*</span>
            </div>
            <SelectInput
              optionsList={oblastList}
              selectedOption={region ? region : ''}
              setSelectedValue={(event) => setRegion(event as string)}
              defaultOption={language === 'RU' ? 'Не выбрано' : 'Not selected'}
            />
          </div>
        </li>
        <li className="w-full h-auto justify-center items-center inline-flex">
          <div className="w-full h-full relative flex-col justify-start items-start flex gap-2">
            <div className="text-zinc-900 text-sm font-normal font-['SF Pro Text'] leading-[16.80px] tracking-tight">
              {language === 'RU' ? 'Город / Район' : 'City/disctrict'}
              <span className="text-red-500 text-sm font-normal leading-[16.80px] tracking-tight">*</span>
            </div>
            <Input
              maxLength={60}
              required
              multiline={false}
              className="w-full"
              value={city}
              onChange={(event) => setCity(event.target.value)}
              placeholder={language === 'RU' ? 'Введите город' : 'Enter city'}
            />
          </div>
        </li>
      </ul>
      <div className="w-full h-[0px] border border-zinc-300"></div>
      <ul className="w-full flex flex-col gap-6">
        <li className="text-zinc-900 text-lg font-medium font-['SF Pro Text'] leading-snug tracking-tight">
          {language === 'RU' ? 'Контактная информация' : 'Contact information'}
        </li>
        <li className="justify-start items-start xl:items-center gap-6 flex flex-col xl:flex-row xl:inline-flex">
          {radioGroup.map((option) => (
            <RadioButton
              key={option.label + option.value}
              name="type"
              id={option.value}
              value={option.value}
              text={option.label}
              onChange={(event) => handleChangeOption('i', event)}
              checked={selectedProfileType === option.value}
            />
          ))}
          <QuestionSVG onClick={toggleToast} className="cursor-pointer" />
        </li>
        <li className="w-full h-auto justify-center items-center inline-flex">
          <div className="w-full h-full relative flex-col justify-start items-start flex gap-2">
            <div className="text-zinc-900 text-sm font-normal font-['SF Pro Text'] leading-[16.80px] tracking-tight">
              {language === 'RU' ? 'Имя пользователя' : 'Username'}
              <span className="text-red-500 text-sm font-normal leading-[16.80px] tracking-tight">*</span>
            </div>
            <Input
              required
              multiline={false}
              className="w-full max-w-[535px]"
              value={username}
              name="username"
              onChange={(event) => setUsername(event.target.value)}
            />
          </div>
        </li>
        <li className="w-full h-auto justify-center items-center inline-flex">
          <div className="w-full h-full relative flex-col justify-start items-start flex gap-2">
            <div className="text-zinc-900 text-sm font-normal font-['SF Pro Text'] leading-[16.80px] tracking-tight">
              {user?.profile.type === 'person'
                ? language === 'RU'
                  ? 'Имя Фамилия Отчество'
                  : 'Full name'
                : user?.profile.type === 'company'
                ? language === 'RU'
                  ? 'Название организации'
                  : 'Company name'
                : language === 'RU'
                ? 'Название ИП'
                : 'Sole-proprietor name'}
            </div>
            <div className="w-full inline-flex gap-[10px] items-center">
              <div className="w-full max-w-[535px]">
                <Input multiline={false} className="w-full max-w-[535px]" value={user?.profile.name ?? ''} disabled />
              </div>
              <QuestionSVG onClick={toggleToast} className="cursor-pointer" />
            </div>
          </div>
        </li>
        {user?.profile.type !== 'person' && (
          <li className="w-full h-auto justify-center items-center inline-flex">
            <div className="w-full h-full relative flex-col justify-start items-start flex gap-2">
              <div className="text-zinc-900 text-sm font-normal font-['SF Pro Text'] leading-[16.80px] tracking-tight">{language === 'RU' ? 'УНП' : 'UNP'}</div>
              <div className="w-full inline-flex gap-[10px] items-center">
                <div className="w-full max-w-[535px]">
                  <Input multiline={false} className="w-full max-w-[535px]" value={user?.profile.unp ?? ''} disabled />
                </div>
                <QuestionSVG onClick={toggleToast} className="cursor-pointer" />
              </div>
            </div>
          </li>
        )}
        <li className="w-full h-auto justify-center items-center inline-flex">
          <div className="w-full h-full relative flex-col justify-start items-start flex gap-2">
            <div className="text-zinc-900 text-sm font-normal font-['SF Pro Text'] leading-[16.80px] tracking-tight">
              {language === 'RU' ? 'Электронная почта' : 'Email'}
            </div>
            <div className="w-full inline-flex gap-[10px] items-center">
              <div className="w-full max-w-[535px]">
                <Input multiline={false} className="w-full max-w-[535px]" value={user?.email ?? ''} disabled />
              </div>
              <QuestionSVG onClick={toggleToast} className="cursor-pointer" />
            </div>
          </div>
        </li>
        <li className="w-full h-auto justify-center items-center inline-flex">
          <div className="w-full h-full relative flex-col justify-start items-start flex gap-2">
            <div className="text-zinc-900 text-sm font-normal font-['SF Pro Text'] leading-[16.80px] tracking-tight">
              {language === 'RU' ? 'Номер телефона' : 'Phone number'}
            </div>
            <div className="w-full inline-flex gap-[10px] items-center">
              <div className="w-full max-w-[535px]">
                <Input multiline={false} className="w-full max-w-[535px]" value={user?.profile.phone_number ?? ''} disabled />
              </div>
              <QuestionSVG onClick={toggleToast} className="cursor-pointer" />
            </div>
            {externalNumber1 && (
              <div className="w-full mt-4 inline-flex gap-[10px] items-center">
                <div className="w-full max-w-[535px]">
                  <PhoneInput
                    className={styles.PhoneInput}
                    defaultCountry="by"
                    countries={countries}
                    value={externalNumber1}
                    onChange={(event) => setExternalNumber1(event)}
                  />
                </div>
              </div>
            )}
            {externalNumber2 && (
              <div className="w-full mt-4 inline-flex gap-[10px] items-center">
                <div className="w-full max-w-[535px]">
                  <PhoneInput
                    className={styles.PhoneInput}
                    defaultCountry="by"
                    countries={countries}
                    value={externalNumber2}
                    onChange={(event) => setExternalNumber2(event)}
                  />
                </div>
              </div>
            )}
          </div>
        </li>
        <li className="w-full h-auto justify-start gap-8 items-start flex-col inline-flex">
          {!externalNumber2 && <AddPhoneButton type="button" text={language === 'RU' ? 'Добавить номер' : 'Add number'} onClick={handleAddNumber} />}
          <div className="w-full flex">
            <Checkbox
              required
              label={
                <p className="w-full text-xs text-[#808080] font-normal">
                  {language === 'RU' ? 'Я принимаю условия' : 'I accept'}{' '}
                  <DefaultLink
                    href={overAllData?.user_agreement ? process.env.REACT_APP_HOST_URL + overAllData?.user_agreement : '#'}
                    target={overAllData?.user_agreement ? '_blank' : '_self'}
                    text={language === 'RU' ? 'Пользовательского соглашения' : 'User agreement'}
                    style={{ color: '#008001' }}
                  />
                </p>
              }
            />
          </div>
          <Button type="submit" variant="primary" text={language === 'RU' ? 'Подать объявление' : 'Create an ad'}>
            {isLoading && <Loader />}
          </Button>
        </li>
      </ul>
    </form>
  )
}
