import { ChangeEvent, FC, FormEvent, useEffect, useState } from 'react'
import { RadioButton } from '../../../components/common/RadioButton'
import Input from '../../../components/common/Input'
import { SelectInput } from '../../../components/common/SelectInput/SelectInput'
import { ImagesInput } from '../../../components/ImagesInput'
import { selectUser, useAppSelector } from '../../../store/hooks'
import { QuestionSVG } from '../../../assets/svg/questionSVG'
import { toast } from 'react-toastify'
import { AddPhoneButton, Button } from '../../../components/common/buttons'
import Checkbox from '../../../components/common/checkbox'
import DefaultLink from '../../../components/common/DefaultLink'
import { PhoneInput, defaultCountries, parseCountry } from 'react-international-phone'
import styles from './MakeLot.module.scss'
import { useCreateLotMutation, useFetchCategoriesQuery, useSendPhotoMutation } from '../../../api/lotService'
import { Loader } from '../../../components/Loader'
import CreateLotSuccess from './SuccessCreated'
import { ICategory } from '../../../types/commonTypes'

export const tarriffGroup = [
  {
    value: 'oneTime',
    label: 'Разовый'
  },
  {
    value: 'default',
    label: 'Стандартный'
  },
  {
    value: 'premium',
    label: 'Премиум'
  }
]

export const typeGroup = [
  {
    value: 'BUY',
    label: 'Покупка'
  },
  {
    value: 'SELL',
    label: 'Продажа'
  }
]

export const lotTypeGroup = [
  {
    value: 'auction',
    label: 'Аукцион'
  },
  {
    value: 'fixPrice',
    label: 'Фиксированная цена'
  }
]

export const countList = [
  { value: 'PIECE', label: 'шт' },
  { value: 'KG', label: 'кг' },
  { value: 'TON', label: 'тонн' }
]

export const productStateOptions = [
  {
    value: 'NEW',
    label: 'Новый'
  },
  {
    value: 'USED',
    label: 'Бывший в употреблении'
  }
]

export const oblastList = [
  {
    value: 'Все',
    label: 'Все'
  },
  {
    value: 'г. Минск',
    label: 'Минск'
  },
  {
    value: 'Брестская обл.',
    label: 'Брестская'
  },
  {
    value: 'Гомельская обл.',
    label: 'Гомельская'
  },
  {
    value: 'Гродненская обл.',
    label: 'Гродненская'
  },
  {
    value: 'Могилевская обл.',
    label: 'Могилевская'
  },
  {
    value: 'Минская обл.',
    label: 'Минская'
  },
  {
    value: 'Витебская обл.',
    label: 'Витебская'
  }
]

export const radioGroup = [
  { value: 'person', label: 'Физическое лицо' },
  { value: 'sole_proprietor', label: 'Индивидуальный предприниматель' },
  { value: 'company', label: 'Юридическое лицо' }
]

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

export const CreateLotPage: FC = () => {
  const dateNow = new Date()
  const { data: categories } = useFetchCategoriesQuery()
  const { user } = useAppSelector(selectUser)
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
  const [photoList, setPhotoList] = useState<{ image: File | null; id: number }[]>([
    { image: null, id: 1 },
    { image: null, id: 2 },
    { image: null, id: 3 },
    { image: null, id: 4 },
    { image: null, id: 5 },
    { image: null, id: 6 }
  ])
  const [imagesCount, setImagesCount] = useState<number>(0)
  const [selectedProfileType, setSelectedProfileType] = useState<string>('')
  const [username, setUsername] = useState<string>('')
  const [externalNumber1, setExternalNumber1] = useState<string | undefined>()
  const [externalNumber2, setExternalNumber2] = useState<string | undefined>()
  const [sendForm, { isLoading }] = useCreateLotMutation()
  // const [sendPhoto] = useSendPhotoMutation()
  const [createdSuccessfuly, setCreatedSuccessfuly] = useState<boolean>(false)
  const [category, setCategory] = useState<string>('')
  const [city, setCity] = useState<string>('')
  const [subCategoriesList, setSubCategoriesList] = useState<ICategory[]>([])
  const [subCategory, setSubCategory] = useState<string>('')
  const [region, setRegion] = useState<string>('')
  const [unit, setUnit] = useState<string>('PIECE')

  const countries = defaultCountries.filter((country) => {
    const { iso2 } = parseCountry(country)
    return ['by', 'ru'].includes(iso2)
  })

  useEffect(() => {
    if (categories && categories.length > 0) {
      if (category) {
        const currentCategory = categories.find((cat) => String(cat.id) === category || cat.title === category)
        if (currentCategory?.children && currentCategory.children.length > 0) {
          setSubCategoriesList(currentCategory.children)
        } else {
          setSubCategoriesList([])
          setSubCategory('')
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
    } else if (option === 'lotType') {
      setLotTypeOption(event.target.value)
    } else if (option === 'state') {
      setProductState(event.target.value)
    } else if (option === 'profile') {
      setSelectedProfileType(event.target.value)
    }
  }

  const toggleToast = () => {
    toast('Вы указали эту информацию в Вашем профиле, ее нельзя изменить при подаче объявления', { type: 'info' })
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
    const auctionEndDate = new Date(`${date.month}.${date.day}.${date.year}`)
    const formdata = new FormData()
    if (user) {
      formdata.append('user', String(user.id))
    }
    if (!city) {
      toast('Пожалуйста, укажите город', { type: 'warning' })
    } else if (!category) {
      toast('Необходимо указать категорию товара', { type: 'warning' })
    } else {
      formdata.append('ad_type', typeOption)
      formdata.append('condition', productState)
      formdata.append('title', lotName)
      formdata.append('description', lotDescription)
      formdata.append('is_auction', lotTypeOption === 'auction' ? 'true' : 'false')
      formdata.append('price', price)
      if (lotTypeOption === 'auction') {
        formdata.append('auction_end_date', auctionEndDate.toISOString())
      }
      formdata.append('city', city)
      formdata.append('count', count)
      formdata.append('region', region)
      formdata.append('username', username)
      formdata.append('unit', unit)
      if (!subCategory) {
        const cat = categories?.find((cat) => cat.title === category || String(cat.id) === category)
        formdata.append('category', String(cat?.id))
      } else {
        const subCat = categories?.find((cat) => cat.children.find((subCat) => String(subCat.id) === subCategory || subCat.title === subCategory))
        const selectedSubCategory = subCat?.children?.find((sc) => String(sc.id) === subCategory || sc.title === subCategory)
        formdata.append('category', String(selectedSubCategory?.id))
      }
      photoList.map((photo) => photo.image !== null && formdata.append('photos_input', photo.image))
      await sendForm(formdata)
        .unwrap()
        .then(() => setCreatedSuccessfuly(true))
    }
  }

  return createdSuccessfuly ? (
    <CreateLotSuccess />
  ) : (
    <form onSubmit={handleSubmitForm} className="lg:px-[60px] px-4 w-full flex flex-col gap-8 relative">
      <ul className="w-full flex flex-col gap-8">
        <li className="text-zinc-900 text-2xl font-extrabold leading-[28.80px]">Подача объявления</li>
        <li className="inline-flex items-start gap-8 flex-col md:flex-row">
          <span className="text-zinc-900 text-lg font-medium leading-snug tracking-tight">Ваш тариф</span>
          <div className="justify-start items-start xl:items-center gap-6 flex flex-col xl:flex-row xl:inline-flex">
            {user?.subscription ? (
              <RadioButton
                key={user.subscription.tariff.name}
                name="tariff"
                id={user.subscription.tariff.name}
                value={user.subscription.tariff.name}
                text={user.subscription.tariff.name}
                checked
                textStyle={{ style: { fontSize: 14 } }}
              />
            ) : (
              <p>Нет оплаченного тарифа</p>
            )}
          </div>
        </li>
        <li className="inline-flex items-start gap-8 flex-col md:flex-row">
          <span className="text-zinc-900 text-lg font-medium leading-snug tracking-tight">Вид объявления</span>
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
          <span className="text-zinc-900 text-lg font-medium leading-snug tracking-tight">Тип объявления</span>
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
        <li className="text-zinc-900 text-lg font-medium font-['SF Pro Text'] leading-snug tracking-tight">Общая информация </li>
        <li className="w-full h-auto justify-center items-center inline-flex">
          <div className="w-full h-full relative flex-col justify-start items-start flex gap-2">
            <div className="text-zinc-900 text-sm font-normal font-['SF Pro Text'] leading-[16.80px] tracking-tight">
              Название объявления<span className="text-red-500 text-sm font-normal leading-[16.80px] tracking-tight">*</span>
            </div>
            <Input maxLength={50} required multiline={false} className="w-full" value={lotName} onChange={(event) => setLotName(event.target.value)} />
            <div>
              <span className="text-red-500 text-xs font-normal font-['SF Pro Text'] leading-[14.40px] tracking-tight">{lotName.length}</span>
              <span className="text-zinc-300 text-xs font-normal font-['SF Pro Text'] leading-[14.40px] tracking-tight"> </span>
              <span className="text-zinc-500 text-xs font-normal font-['SF Pro Text'] leading-[14.40px] tracking-tight">из 50 знаков</span>
            </div>
          </div>
        </li>
        <li className="w-full h-auto justify-center items-center inline-flex">
          <div className="w-full h-full relative flex-col justify-start items-start flex gap-2">
            <div className="text-zinc-900 text-sm font-normal font-['SF Pro Text'] leading-[16.80px] tracking-tight">
              Выбор категории<span className="text-red-500 text-sm font-normal leading-[16.80px] tracking-tight">*</span>
            </div>
            <SelectInput optionsList={categories || []} setSelectedValue={(event) => setCategory(event as string)} defaultOption="Выберите категорию" />
          </div>
        </li>
        {subCategoriesList && subCategoriesList.length > 0 && (
          <li className="w-full h-auto justify-center items-center inline-flex">
            <div className="w-full h-full relative flex-col justify-start items-start flex gap-2">
              <div className="text-zinc-900 text-sm font-normal font-['SF Pro Text'] leading-[16.80px] tracking-tight">
                Выбор подкатегории<span className="text-red-500 text-sm font-normal leading-[16.80px] tracking-tight">*</span>
              </div>
              <SelectInput
                optionsList={subCategoriesList || []}
                setSelectedValue={(event) => setSubCategory(event as string)}
                selectedOption={subCategory}
                defaultOption={subCategory.length > 0 ? subCategory : 'Выберите подкатегорию'}
              />
            </div>
          </li>
        )}
        <li className="w-full h-auto justify-center items-center inline-flex">
          <div className="w-full h-full relative flex-col justify-start items-start flex gap-2">
            <div className="text-zinc-900 text-sm font-normal font-['SF Pro Text'] leading-[16.80px] tracking-tight">
              Описание<span className="text-red-500 text-sm font-normal leading-[16.80px] tracking-tight">*</span>
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
              <span className="text-zinc-500 text-xs font-normal font-['SF Pro Text'] leading-[14.40px] tracking-tight">из 4000 знаков</span>
            </div>
          </div>
        </li>
        <li className="w-full max-w-[294px] h-auto justify-center items-center inline-flex">
          <div className="w-full h-full relative flex-col justify-start items-start flex gap-2">
            <div className="text-zinc-900 text-sm font-normal font-['SF Pro Text'] leading-[16.80px] tracking-tight">
              Единица измерения<span className="text-red-500 text-sm font-normal leading-[16.80px] tracking-tight">*</span>
            </div>
            <SelectInput
              optionsList={countList}
              selectedOption={unit}
              setSelectedValue={(event) => setUnit(event as string)}
              defaultOption="Выберите единицу измерения"
            />
          </div>
        </li>
        <li className="w-full max-w-[294px] h-auto justify-center items-center inline-flex">
          <div className="w-full h-full relative flex-col justify-start items-start flex gap-2">
            <div className="text-zinc-900 text-sm font-normal font-['SF Pro Text'] leading-[16.80px] tracking-tight">
              Количество<span className="text-red-500 text-sm font-normal leading-[16.80px] tracking-tight">*</span>
            </div>
            <Input
              maxLength={50}
              multiline={false}
              placeholder="Введите количество"
              className="w-full"
              value={count}
              required
              type="number"
              onKeyDown={handleKeyPress}
              onChange={(event) => setCount(String(event.target.value))}
            />
          </div>
        </li>
        <li className="w-full max-w-[294px] h-auto justify-center items-center inline-flex">
          <div className="w-full h-full relative flex-col justify-start items-start flex gap-2">
            <div className="text-zinc-900 text-sm font-normal font-['SF Pro Text'] leading-[16.80px] tracking-tight">
              Стоимость за единицу (BYN)<span className="text-red-500 text-sm font-normal leading-[16.80px] tracking-tight">*</span>
            </div>
            <Input
              maxLength={15}
              multiline={false}
              placeholder="Введите стоимость"
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
                Дата окончания аукциона<span className="text-red-500 text-sm font-normal leading-[16.80px] tracking-tight">*</span>
              </div>
              <div className="w-full flex gap-[10px]">
                <SelectInput
                  key={'selectDay'}
                  optionsList={daysList}
                  selectedOption={date.day}
                  setSelectedValue={(event) => setDate({ ...date, day: event as string })}
                  defaultOption="дд"
                />
                <SelectInput
                  key={'selectMonth'}
                  selectedOption={date.month}
                  optionsList={monthsList}
                  setSelectedValue={(event) => setDate({ ...date, month: event as string })}
                  defaultOption="мм"
                />
                <SelectInput
                  key={'selectYear'}
                  selectedOption={date.year}
                  optionsList={yearsList}
                  setSelectedValue={(event) => setDate({ ...date, year: event as string })}
                  defaultOption="гг"
                />
              </div>
            </div>
          </li>
        )}
        <li className="inline-flex items-start gap-8 flex-col md:flex-row">
          <span className="text-zinc-900 text-base font-normal leading-snug tracking-tight">Состояние</span>
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
        <li className="text-zinc-900 text-lg font-medium font-['SF Pro Text'] leading-snug tracking-tight">Фотография</li>
        <li className="w-full h-auto justify-center items-center inline-flex">
          <div className="w-full h-full relative flex-col justify-start items-start flex gap-2">
            <div className="text-zinc-900 text-sm font-normal font-['SF Pro Text'] leading-[16.80px] tracking-tight">Добавьте фотографию</div>
            <ImagesInput images={photoList} setImages={setPhotoList} editLot={false} />
            <div className="flex justify-between w-full">
              <div className="text-zinc-500 text-xs font-normal font-['SF Pro Text'] leading-[14.40px] tracking-tight">Максимальный размер файла 10МБ</div>
              <div className="flex items-start justify-start">
                <span className="text-zinc-500 text-xs font-normal font-['SF Pro Text'] leading-[14.40px] tracking-tight mr-[2px]">{'Загружено'}</span>
                {imagesCount === 6 ? (
                  <span className="text-red-500 text-xs font-normal font-['SF Pro Text'] leading-[14.40px] tracking-tight mr-[2px]">{imagesCount}</span>
                ) : (
                  <span className="text-green-800 text-xs font-normal font-['SF Pro Text'] leading-[14.40px] tracking-tight mr-[2px]">{imagesCount}</span>
                )}
                <span className="text-zinc-500 text-xs font-normal font-['SF Pro Text'] leading-[14.40px] tracking-tight">{' из 6 фотографий'}</span>
              </div>
            </div>
          </div>
        </li>
      </ul>
      <div className="w-full h-[0px] border border-zinc-300"></div>
      <ul className="w-full max-w-[535px] flex flex-col gap-6">
        <li className="text-zinc-900 text-lg font-medium font-['SF Pro Text'] leading-snug tracking-tight">Местоположение</li>
        <li className="w-full h-auto justify-center items-center inline-flex">
          <div className="w-full h-full relative flex-col justify-start items-start flex gap-2">
            <div className="text-zinc-900 text-sm font-normal font-['SF Pro Text'] leading-[16.80px] tracking-tight">
              Область<span className="text-red-500 text-sm font-normal leading-[16.80px] tracking-tight">*</span>
            </div>
            <SelectInput optionsList={oblastList} setSelectedValue={(event) => setRegion(event as string)} defaultOption="Не выбрано" />
          </div>
        </li>
        <li className="w-full h-auto justify-center items-center inline-flex">
          <div className="w-full h-full relative flex-col justify-start items-start flex gap-2">
            <div className="text-zinc-900 text-sm font-normal font-['SF Pro Text'] leading-[16.80px] tracking-tight">
              Город / Район
              <span className="text-red-500 text-sm font-normal leading-[16.80px] tracking-tight">*</span>
            </div>
            <Input
              maxLength={60}
              required
              multiline={false}
              className="w-full"
              value={city}
              onChange={(event) => setCity(event.target.value)}
              placeholder="Введите город"
            />
          </div>
        </li>
      </ul>
      <div className="w-full h-[0px] border border-zinc-300"></div>
      <ul className="w-full flex flex-col gap-6">
        <li className="text-zinc-900 text-lg font-medium font-['SF Pro Text'] leading-snug tracking-tight">Контактная информация</li>
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
              Имя пользователя<span className="text-red-500 text-sm font-normal leading-[16.80px] tracking-tight">*</span>
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
              {user?.profile.type === 'person' ? 'Имя Фамилия Отчество' : user?.profile.type === 'company' ? 'Название организации' : 'Название ИП'}
            </div>
            <div className="w-full inline-flex gap-[10px] items-center">
              <div className="w-full max-w-[535px]">
                <Input multiline={false} className="w-full max-w-[535px]" value={user?.profile.name} disabled />
              </div>
              <QuestionSVG onClick={toggleToast} className="cursor-pointer" />
            </div>
          </div>
        </li>
        {user?.profile.type !== 'person' && (
          <li className="w-full h-auto justify-center items-center inline-flex">
            <div className="w-full h-full relative flex-col justify-start items-start flex gap-2">
              <div className="text-zinc-900 text-sm font-normal font-['SF Pro Text'] leading-[16.80px] tracking-tight">УНП</div>
              <div className="w-full inline-flex gap-[10px] items-center">
                <div className="w-full max-w-[535px]">
                  <Input multiline={false} className="w-full max-w-[535px]" value={user?.profile.unp} disabled />
                </div>
                <QuestionSVG onClick={toggleToast} className="cursor-pointer" />
              </div>
            </div>
          </li>
        )}
        <li className="w-full h-auto justify-center items-center inline-flex">
          <div className="w-full h-full relative flex-col justify-start items-start flex gap-2">
            <div className="text-zinc-900 text-sm font-normal font-['SF Pro Text'] leading-[16.80px] tracking-tight">Электронная почта</div>
            <div className="w-full inline-flex gap-[10px] items-center">
              <div className="w-full max-w-[535px]">
                <Input multiline={false} className="w-full max-w-[535px]" value={user?.email} disabled />
              </div>
              <QuestionSVG onClick={toggleToast} className="cursor-pointer" />
            </div>
          </div>
        </li>
        <li className="w-full h-auto justify-center items-center inline-flex">
          <div className="w-full h-full relative flex-col justify-start items-start flex gap-2">
            <div className="text-zinc-900 text-sm font-normal font-['SF Pro Text'] leading-[16.80px] tracking-tight">Номер телефона</div>
            <div className="w-full inline-flex gap-[10px] items-center">
              <div className="w-full max-w-[535px]">
                <Input multiline={false} className="w-full max-w-[535px]" value={user?.profile.phone_number} disabled />
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
          {!externalNumber2 && <AddPhoneButton type="button" text="Добавить номер" onClick={handleAddNumber} />}
          <div className="w-full flex">
            <Checkbox
              required
              label={
                <p className="w-full text-xs text-[#808080] font-normal">
                  Я принимаю условия <DefaultLink text="Пользовательского соглашения" style={{ color: '#008001' }} />
                </p>
              }
            />
          </div>
          <Button type="submit" variant="primary" text="Подать объявление">
            {isLoading && <Loader />}
          </Button>
        </li>
      </ul>
    </form>
  )
}
