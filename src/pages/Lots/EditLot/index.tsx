import { FC, useEffect, useState, ChangeEvent, FormEvent, useCallback } from 'react'
import { generatePath, useNavigate, useParams } from 'react-router-dom'
import { useFetchCategoriesQuery, useFetchLotDataMutation, useGetCategoryMutation, useUpdateLotMutation } from '../../../api/lotService'
import { LotT } from '../../../types/lotTypes'
import { Loader } from '../../../components/Loader'
import { RadioButton } from '../../../components/common/RadioButton'
import Input from '../../../components/common/Input'
import { SelectInput } from '../../../components/common/SelectInput/SelectInput'
import { ImagesInput } from '../../../components/ImagesInput'
import { selectLangSettings, selectUser, useAppSelector } from '../../../store/hooks'
import { QuestionSVG } from '../../../assets/svg/questionSVG'
import { toast } from 'react-toastify'
import { AddPhoneButton, Button } from '../../../components/common/buttons'
import Checkbox from '../../../components/common/checkbox'
import DefaultLink from '../../../components/common/DefaultLink'
import { PhoneInput, defaultCountries, parseCountry } from 'react-international-phone'
import styles from './MakeLot.module.scss'
import { handleKeyPress, handleNumberKeyPress } from '../MakeLot'
import { ICategory } from '../../../types/commonTypes'
import { ProfilePathE } from '../../../enum'

export type LotImageT = {
  image: File | string | null
  order: number
  id: number
  advertisement?: number
}

export const EditLotPage: FC = () => {
  const { language } = useAppSelector(selectLangSettings)
  const { slug } = useParams()
  const { user } = useAppSelector(selectUser)
  const navigate = useNavigate()
  const [fetchLot, { data: lotPureData, isError }] = useFetchLotDataMutation()
  const { data: categories } = useFetchCategoriesQuery()
  const [updateLot, { isSuccess, isLoading }] = useUpdateLotMutation()
  const [lotData, setLotData] = useState<LotT>()
  const [typeOption, setTypeOption] = useState<string>('')
  const [lotTypeOption, setLotTypeOption] = useState<string>('')
  const [productState, setProductState] = useState<string>('')
  const [category, setCategory] = useState<ICategory>()
  const [subCategoriesList, setSubCategoriesList] = useState<ICategory[]>([])
  const [subCategory, setSubCategory] = useState<ICategory>()
  const [imagesCount, setImagesCount] = useState<number>(0)
  const [lotPhotos, setLotPhotos] = useState<LotImageT[]>()
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

  const fillMissingOrders = useCallback(
    (objects: LotImageT[]): LotImageT[] => {
      const sortedObjects = [...objects].sort((a, b) => a.order - b.order)
      const missingOrders = []

      for (let i = 1; i <= 6; i++) {
        if (!sortedObjects.some((obj) => obj.order === i)) {
          missingOrders.push({ order: i, image: null, id: i, advertisement: lotData?.id })
        }
      }

      return [...sortedObjects, ...missingOrders].sort((a, b) => a.order - b.order)
    },
    [lotData?.id]
  )

  useEffect(() => {
    if (subCategory) {
      setLowerCatList(subCategory.children)
      getCatData(subCategory.parent)
        .unwrap()
        .then((data: ICategory) => {
          setCategory(data)
          setSubCategoriesList(data.children)
        })
    }
  }, [getCatData, subCategory])

  useEffect(() => {
    if (lowerCat) {
      getCatData(lowerCat.parent)
        .unwrap()
        .then((data: ICategory) => {
          setSubCategory(data)
        })
    }
  }, [getCatData, lowerCat])

  useEffect(() => {
    if (lotData && lotPhotos && lotPhotos.length < 6) {
      setLotPhotos(fillMissingOrders(lotPhotos))
    }
  }, [fillMissingOrders, lotData, lotPhotos])

  // useEffect(() => {
  //   if (categories && categories.length > 0) {
  //     if (category) {
  //       const currentCategory = categories.find((cat) => cat.id === category.id || cat.title === category.title)
  //       if (currentCategory?.children && currentCategory.children.length > 0) {
  //         setSubCategoriesList(currentCategory.children)
  //       } else {
  //         setSubCategoriesList([])
  //         setSubCategory(undefined)
  //         setLowerCat(undefined)
  //       }
  //     } else if (lotData && categories) {
  //       const cat = categories.find((cat) => cat.id === lotData.category)
  //       if (cat) {
  //         setCategory(cat)
  //         setSubCategoriesList(cat.children || [])
  //       } else {
  //         const subCat = categories.find((cat) => cat.children.some((subCat) => subCat.id === lotData.category))
  //         if (subCat) {
  //           setCategory(cat)
  //           const selectedSubCategory = subCat.children?.find(
  //             (sc) => sc.id === lotData.category || sc.title === subCategory?.title || sc.id === subCategory?.id
  //           )
  //           if (selectedSubCategory) {
  //             setSubCategory(selectedSubCategory)
  //           }
  //         } else {
  //           setSubCategory(undefined)
  //           setLowerCat(undefined)
  //         }
  //       }
  //     }
  //   }
  // }, [categories, category, lotData, setCategory, setSubCategory, subCategory])

  useEffect(() => {
    if (lotData) {
      getCatData(lotData.category)
        .unwrap()
        .then((data: ICategory) => {
          if (data.parent === null) {
            setCategory(data)
            setSubCategoriesList(data.children)
          } else if (data.level === 1) {
            setSubCategory(data)
            setLowerCatList(data.children)
          } else if (data.level === 2) {
            setLowerCat(data)
          }
        })
    }
  }, [lotData])

  useEffect(() => {
    if (lotPhotos) {
      const filesCount = lotPhotos.filter((item) => item.image !== null).length
      setImagesCount(filesCount)
    }
  }, [lotPhotos])

  useEffect(() => {
    if (!lotPureData && slug) {
      fetchLot(slug)
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
  }, [fetchLot, lotData, slug, lotPureData])

  const handleChangeOption = (option: string, event: ChangeEvent<HTMLInputElement>) => {
    if (option === 'type') {
      setTypeOption(event.target.value)
      if (event.target.value === 'BUY') {
        setLotTypeOption('auction')
      }
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
      if (Number(lotData.count) <= 0) {
        toast(language === 'RU' ? 'Количество товара должно быть больше 0' : 'Count must be higher than 0', { type: 'warning' })
      } else if (Number(lotData.price) <= 0) {
        toast(language === 'RU' ? 'Стоимость товара должна быть больше 0' : 'Price must be higher than 0', { type: 'warning' })
      } else if (lotData.region.length < 1) {
        toast(language === 'RU' ? 'Пожалуйста введите область' : 'Please type a region', { type: 'warning' })
      } else {
        const formdata = new FormData()
        if (typeOption !== lotPureData.ad_type) {
          formdata.append('ad_type', typeOption)
        }
        if (lowerCat && lowerCat.title.length > 0) {
          const cat = lowerCatList?.find((cat) => cat.title === lowerCat.title || cat.id === lowerCat.id)
          formdata.append('category', String(cat?.id))
        } else if (subCategory && subCategory.title.length > 0) {
          const subCat = categories?.find((cat) => cat.children.find((subCat) => subCat.id === subCategory.id || subCat.title === subCategory.title))
          const selectedSubCategory = subCat?.children?.find((sc) => sc.id === subCategory.id || sc.title === subCategory.title)
          formdata.append('category', String(selectedSubCategory?.id))
        } else {
          const cat = categories?.find((cat) => cat.title === category?.title || cat.id === category?.id)
          formdata.append('category', String(cat?.id))
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
            .then(() => toast(language === 'RU' ? 'Лот успешно обновлен' : 'Advertisement has been changed successfuly', { type: 'success' }))
            .catch(() => toast(language === 'RU' ? 'При редактировании лота произошла непредвиденная ошибка' : 'Something went wrong', { type: 'error' }))
        }
      }
    }
  }

  if (isSuccess) {
    navigate(generatePath(ProfilePathE.MyLots))
  }

  const toggleToast = () => {
    toast(
      language === 'RU'
        ? 'Вы указали эту информацию в Вашем профиле, ее нельзя изменить при подаче объявления'
        : 'You set that information in your personal profile. It can not be changed here.',
      { type: 'info' }
    )
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
        <ul className="text-zinc-900 text-2xl font-extrabold leading-[28.80px]">{language === 'RU' ? 'Редактирование объявления' : 'Edit advertisement'}</ul>
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
                textStyle={{ style: { fontSize: 14 } }}
              />
            ) : (
              <p className="flex h-full items-center text-base leading-snug">
                {language === 'RU' ? 'Нет оплаченного тарифа' : 'You do not have any paid tariff.'}
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
              value={lotData.description}
              onChange={(event) => changeLotFields('description', event.target.value)}
            />
            <div>
              <span className="text-red-500 text-xs font-normal font-['SF Pro Text'] leading-[14.40px] tracking-tight">{lotData.description.length}</span>
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
            <SelectInput
              optionsList={countList}
              selectedOption={lotData.unit}
              defaultOption={language === 'RU' ? 'Выберите единицу измерения' : 'Select unit of measure'}
              setSelectedValue={(event) => changeLotFields('unit', event)}
            />
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
              value={lotData.count || ''}
              required
              type="number"
              onKeyDown={handleNumberKeyPress}
              onChange={(event) => changeLotFields('count', Number(event.target.value))}
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
              maxLength={15}
              multiline={false}
              placeholder={language === 'RU' ? 'Введите стоимость' : 'Enter price'}
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
            <ImagesInput images={lotPhotos} editLot setImages={setLotPhotos} lotData={lotData} />
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
              selectedOption={lotData.region}
              setSelectedValue={(event) => changeLotFields('region', event as string)}
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
              placeholder={language === 'RU' ? 'Введите город' : 'Enter city'}
              className="w-full"
              value={lotData.city}
              onChange={(event) => changeLotFields('city', event.target.value)}
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
              checked={lotData.profile.type === option.value}
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
              value={String(lotData.username)}
              name="username"
              onChange={(event) => changeLotFields('username', event.target.value)}
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
                <Input multiline={false} className="w-full max-w-[535px]" value={user?.profile.name} disabled />
              </div>
              <QuestionSVG onClick={toggleToast} className="cursor-pointer" />
            </div>
          </div>
        </li>
        {lotData.profile.type !== 'person' && (
          <li className="w-full h-auto justify-center items-center inline-flex">
            <div className="w-full h-full relative flex-col justify-start items-start flex gap-2">
              <div className="text-zinc-900 text-sm font-normal font-['SF Pro Text'] leading-[16.80px] tracking-tight">{language === 'RU' ? 'УНП' : 'UNP'}</div>
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
            <div className="text-zinc-900 text-sm font-normal font-['SF Pro Text'] leading-[16.80px] tracking-tight">
              {language === 'RU' ? 'Электронная почта' : 'Email'}
            </div>
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
            <div className="text-zinc-900 text-sm font-normal font-['SF Pro Text'] leading-[16.80px] tracking-tight">
              {language === 'RU' ? 'Номер телефона' : 'Phone number'}
            </div>
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
                  {language === 'RU' ? 'Я принимаю условия' : 'I accept'}{' '}
                  <DefaultLink text={language === 'RU' ? 'Пользовательского соглашения' : 'User agreement'} style={{ color: '#008001' }} />
                </p>
              }
            />
          </div>
          <Button type="submit" variant="primary" text={language === 'RU' ? 'Сохранить изменения' : 'Save changes'}>
            {isLoading && <Loader />}
          </Button>
        </li>
      </ul>
    </form>
  )
}
