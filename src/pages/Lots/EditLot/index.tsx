import { FC, useEffect, useState, ChangeEvent, FormEvent, useCallback } from 'react'
import { generatePath, useNavigate, useParams } from 'react-router-dom'
import { useFetchCategoriesQuery, useFetchLotDataMutation, useUpdateLotMutation } from '../../../api/lotService'
import { LotT } from '../../../types/lotTypes'
import { Loader } from '../../../components/Loader'
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
import { countList, daysList, handleKeyPress, lotTypeGroup, monthsList, oblastList, productStateOptions, radioGroup, typeGroup, yearsList } from '../MakeLot'
import { ICategory } from '../../../types/commonTypes'
import { LotPathE, PathE, ProfilePathE } from '../../../enum'

export const EditLotPage: FC = () => {
  const { id: lotId } = useParams()
  const { user } = useAppSelector(selectUser)
  const navigate = useNavigate()
  const [fetchLot, { data: lotPureData, isError }] = useFetchLotDataMutation()
  const { data: categories } = useFetchCategoriesQuery()
  const [updateLot, { isSuccess, isLoading }] = useUpdateLotMutation()
  const [lotData, setLotData] = useState<LotT>()
  const [typeOption, setTypeOption] = useState<string>('')
  const [lotTypeOption, setLotTypeOption] = useState<string>('')
  const [productState, setProductState] = useState<string>('')
  const [category, setCategory] = useState<string>('')
  const [subCategoriesList, setSubCategoriesList] = useState<ICategory[]>([])
  const [subCategory, setSubCategory] = useState<string>('')
  const [imagesCount, setImagesCount] = useState<number>(0)
  const [lotPhotos, setLotPhotos] = useState<{ image: File | string | null; order?: number; id: number; advertisement?: number }[]>()

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
      } else if (lotData && categories) {
        const cat = categories.find((cat) => cat.id === lotData.category)
        if (cat) {
          setCategory(cat.title)
          setSubCategoriesList(cat.children || [])
        } else {
          const subCat = categories.find((cat) => cat.children.some((subCat) => subCat.id === lotData.category))
          if (subCat) {
            setCategory(String(subCat.id))
            const selectedSubCategory = subCat.children?.find((sc) => sc.id === lotData.category || sc.title === subCategory || String(sc.id) === subCategory)
            if (selectedSubCategory) {
              setSubCategory(String(selectedSubCategory?.title))
            }
          } else {
            setSubCategory('')
          }
        }
      }
    }
  }, [categories, category, lotData, setCategory, setSubCategory, subCategory])

  useEffect(() => {
    if (lotPhotos) {
      const filesCount = lotPhotos.filter((item) => item.image !== null).length
      setImagesCount(filesCount)
    }
  }, [lotPhotos])

  useEffect(() => {
    if (!lotPureData && lotId) {
      fetchLot(Number(lotId))
        .unwrap()
        .then((data: LotT) => {
          setLotData(data)
          setLotTypeOption(data.is_auction ? 'auction' : 'fixPrice')
          setTypeOption(data.ad_type)
          setProductState(data.condition)
          if (data.photos && data.photos.length > 0) {
            setLotPhotos(data.photos)
          } else {
            setLotPhotos([
              {
                image: null,
                advertisement: data?.id,
                order: 1,
                id: 0
              },
              {
                image: null,
                advertisement: data?.id,
                order: 2,
                id: 1
              },
              {
                image: null,
                advertisement: data?.id,
                order: 3,
                id: 2
              },
              {
                image: null,
                advertisement: data?.id,
                order: 4,
                id: 3
              },
              {
                image: null,
                advertisement: data?.id,
                order: 5,
                id: 4
              },
              {
                image: null,
                advertisement: data?.id,
                order: 6,
                id: 5
              }
            ])
          }
        })
        .catch(() => toast('Произошла непредвиденная ошибка', { type: 'error' }))
    }
  }, [fetchLot, lotData, lotId, lotPureData])

  const handleChangeOption = (option: string, event: ChangeEvent<HTMLInputElement>) => {
    if (option === 'type') {
      setTypeOption(event.target.value)
    } else if (option === 'lotType') {
      setLotTypeOption(event.target.value)
    } else if (option === 'state') {
      setProductState(event.target.value)
    }
  }

  const changeLotFields = (fieldName: string, value: any) => {
    if (lotData) {
      setLotData({ ...lotData, [fieldName]: value })
    }
  }

  const handleSubmitForm = async (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault()
    if (lotData && lotPureData && categories) {
      const formdata = new FormData()
      if (typeOption !== lotPureData.ad_type) {
        formdata.append('ad_type', typeOption)
      }
      if (!subCategory) {
        const cat = categories.find((cat) => cat.title === category || String(cat.id) === category)
        formdata.append('category', String(cat?.id))
      } else {
        const subCat = categories.find((cat) => cat.children.find((subCat) => String(subCat.id) === subCategory || subCat.title === subCategory))
        const selectedSubCategory = subCat?.children?.find((sc) => String(sc.id) === subCategory || sc.title === subCategory)
        formdata.append('category', String(selectedSubCategory?.id))
      }
      if (lotTypeOption !== 'auction' && lotPureData.is_auction) {
        formdata.append('is_auction', 'true')
      } else {
        formdata.append('is_auction', 'false')
      }
      if (lotData.city !== lotPureData.city) {
        formdata.append('city', lotData.city)
      }
      if (productState !== lotPureData.condition) {
        formdata.append('condition', productState)
      }
      if (lotData.count !== lotPureData.count) {
        formdata.append('count', String(lotData.count))
      }
      if (lotData.description !== lotPureData.description) {
        formdata.append('description', lotData.description)
      }
      if (lotData.price !== lotPureData.price) {
        formdata.append('price', lotData.price)
      }
      if (lotData.region !== lotPureData.region) {
        formdata.append('region', lotData.region)
      }
      if (lotData.title !== lotPureData.title) {
        formdata.append('title', lotData.title)
      }
      if (lotData.unit !== lotPureData.unit) {
        formdata.append('unit', lotData.unit)
      }
      if (lotData.username !== lotPureData.username) {
        formdata.append('username', String(lotData.username))
      }
      formdata.append('user', String(lotData.profile.id))

      if (formdata) {
        await updateLot({ data: formdata, lotId: lotData.id })
          .unwrap()
          .then(() => toast('Лот успешно обновлен', { type: 'success' }))
          .catch(() => toast('При редактировании лота произошла ошибка', { type: 'error' }))
      }
    }
  }

  if (isSuccess) {
    navigate(generatePath(ProfilePathE.MyLots))
  }

  const toggleToast = () => {
    toast('Вы указали эту информацию в Вашем профиле, ее нельзя изменить при подаче объявления', { type: 'info' })
  }

  if (!lotData || isError) {
    return (
      <div className="w-full h-[200px] flex justify-center items-center">
        <Loader />
      </div>
    )
  }

  return (
    <form onSubmit={handleSubmitForm} className="lg:px-[60px] px-4 w-full flex flex-col gap-8 relative">
      <ul className="w-full flex flex-col gap-8">
        <li className="text-zinc-900 text-2xl font-extrabold leading-[28.80px]">Редактирование объявления</li>
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
            <Input
              maxLength={50}
              required
              multiline={false}
              className="w-full"
              value={lotData.title}
              onChange={(event) => changeLotFields('title', event.target.value)}
            />
            <div>
              <span className="text-red-500 text-xs font-normal font-['SF Pro Text'] leading-[14.40px] tracking-tight">{lotData.title.length}</span>
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
            <SelectInput
              optionsList={categories || []}
              selectedOption={category}
              setSelectedValue={(event) => setCategory(event as string)}
              defaultOption={category || 'Выберите категорию'}
            />
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
              value={lotData.description}
              onChange={(event) => changeLotFields('description', event.target.value)}
            />
            <div>
              <span className="text-red-500 text-xs font-normal font-['SF Pro Text'] leading-[14.40px] tracking-tight">{lotData.description.length}</span>
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
              selectedOption={lotData.unit}
              defaultOption="Выберите единицу измерения"
              setSelectedValue={(event) => changeLotFields('unit', event)}
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
              value={lotData.count || ''}
              required
              type="number"
              onKeyDown={handleKeyPress}
              onChange={(event) => changeLotFields('count', Number(event.target.value))}
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
              value={lotData.price}
              required
              type="number"
              onKeyDown={handleKeyPress}
              onChange={(event) => changeLotFields('price', String(event.target.value))}
            />
          </div>
        </li>
        {/* <li className="w-full max-w-[294px] h-auto justify-center items-center inline-flex">
          <div className="w-full h-full relative flex-col justify-start items-start flex gap-2">
            <div className="text-zinc-900 text-sm font-normal font-['SF Pro Text'] leading-[16.80px] tracking-tight">
              Дата окончания аукциона<span className="text-red-500 text-sm font-normal leading-[16.80px] tracking-tight">*</span>
            </div>
            <div className="w-full flex gap-[10px]">
              <SelectInput
                key={'selectDay'}
                optionsList={daysList}
                // selectedOption={date.day}
                // setSelectedValue={(event) => setDate({ ...date, day: event as string })}
                defaultOption="дд"
              />
              <SelectInput
                key={'selectMonth'}
                // selectedOption={date.month}
                optionsList={monthsList}
                // setSelectedValue={(event) => setDate({ ...date, month: event as string })}
                defaultOption="мм"
              />
              <SelectInput
                key={'selectYear'}
                // selectedOption={date.year}
                optionsList={yearsList}
                // setSelectedValue={(event) => setDate({ ...date, year: event as string })}
                defaultOption="гг"
              />
            </div>
          </div>
        </li> */}
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
            <ImagesInput images={lotPhotos} editLot setImages={setLotPhotos} />
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
            <SelectInput
              optionsList={oblastList}
              selectedOption={lotData.region}
              setSelectedValue={(event) => changeLotFields('region', event as string)}
              defaultOption="Не выбрано"
            />
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
              value={lotData.city}
              onChange={(event) => changeLotFields('city', event.target.value)}
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
              checked={lotData.profile.type === option.value}
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
              value={String(lotData.username)}
              name="username"
              onChange={(event) => changeLotFields('username', event.target.value)}
            />
          </div>
        </li>
        <li className="w-full h-auto justify-center items-center inline-flex">
          <div className="w-full h-full relative flex-col justify-start items-start flex gap-2">
            <div className="text-zinc-900 text-sm font-normal font-['SF Pro Text'] leading-[16.80px] tracking-tight">
              {lotData.profile.type === 'person' ? 'Имя Фамилия Отчество' : lotData.profile.type === 'company' ? 'Название организации' : 'Название ИП'}
            </div>
            <div className="w-full inline-flex gap-[10px] items-center">
              <div className="w-full max-w-[535px]">
                <Input multiline={false} className="w-full max-w-[535px]" value={user?.profile.name} disabled />
              </div>
              <QuestionSVG onClick={toggleToast} className="cursor-pointer" />
            </div>
          </div>
        </li>
        {lotData.profile.type !== 'person' && (
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
            {/* {externalNumber1 && (
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
            )} */}
          </div>
        </li>
        <li className="w-full h-auto justify-start gap-8 items-start flex-col inline-flex">
          {/* {!externalNumber2 && <AddPhoneButton type="button" text="Добавить номер" onClick={handleAddNumber} />} */}
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
          <Button type="submit" variant="primary" text="Сохранить изменения">
            {isLoading && <Loader />}
          </Button>
        </li>
      </ul>
    </form>
  )
}
