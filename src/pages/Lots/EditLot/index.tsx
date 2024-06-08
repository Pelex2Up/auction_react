import { FC, useEffect, useState, ChangeEvent, FormEvent } from 'react'
import { useParams } from 'react-router-dom'
import { useFetchCategoriesQuery, useFetchLotDataMutation } from '../../../api/lotService'
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
import {
  countList,
  daysList,
  handleKeyPress,
  lotTypeGroup,
  monthsList,
  oblastList,
  productStateOptions,
  radioGroup,
  tarriffGroup,
  typeGroup,
  yearsList
} from '../MakeLot'

export const EditLotPage: FC = () => {
  const { id: lotId } = useParams()
  const { user } = useAppSelector(selectUser)
  const [fetchLot, { data: lotPureData }] = useFetchLotDataMutation()
  const { data: categories } = useFetchCategoriesQuery()
  const [lotData, setLotData] = useState<LotT>()
  const [tarriffOption, setTarriffOption] = useState<string>('default')
  const [typeOption, setTypeOption] = useState<string>('')
  const [lotTypeOption, setLotTypeOption] = useState<string>('')
  const [productState, setProductState] = useState<string>('')
  const [selectedProfileType, setSelectedProfileType] = useState<string>('')
  const [category, setCategory] = useState<string>('')

  useEffect(() => {
    if (!lotPureData && lotId) {
      fetchLot(Number(lotId))
        .unwrap()
        .then((data: LotT) => {
          setLotData(data)
          setLotTypeOption(data.is_auction ? 'auction' : 'fixPrice')
          setTypeOption(data.ad_type)
          setProductState(data.condition)
        })
    }
  }, [fetchLot, lotData, lotId, lotPureData])

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

  const handleSubmitForm = () => {
    console.log('')
  }

  const toggleToast = () => {
    toast('Вы указали эту информацию в Вашем профиле, ее нельзя изменить при подаче объявления', { type: 'info' })
  }

  if (!lotData) {
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
          <span className="text-zinc-900 text-lg font-medium leading-snug tracking-tight">Тариф</span>
          <div className="justify-start items-start xl:items-center gap-6 flex flex-col xl:flex-row xl:inline-flex">
            {tarriffGroup.map((option) => (
              <RadioButton
                key={option.label + option.value}
                name="tariff"
                id={option.value}
                value={option.value}
                text={option.label}
                onChange={(event) => handleChangeOption('tariff', event)}
                checked={tarriffOption === option.value}
                textStyle={{ style: { fontSize: 14 } }}
              />
            ))}
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
              // onChange={(event) => setLotName(event.target.value)}
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
            <SelectInput optionsList={categories || []} setSelectedValue={(event) => setCategory(event as string)} defaultOption="Выберите категорию" />
          </div>
        </li>
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
              //   onChange={(event) => setLotDescription(event.target.value)}
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
            <SelectInput optionsList={countList} defaultOption="Выберите единицу измерения" />
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
              //   value={count}
              required
              type="number"
              onKeyDown={handleKeyPress}
              //   onChange={(event) => setCount(String(event.target.value))}
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
              //   value={price}
              required
              type="number"
              onKeyDown={handleKeyPress}
              //   onChange={(event) => setPrice(String(event.target.value))}
            />
          </div>
        </li>
        <li className="w-full max-w-[294px] h-auto justify-center items-center inline-flex">
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
        </li>
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
        {/* <li className="w-full h-auto justify-center items-center inline-flex">
          <div className="w-full h-full relative flex-col justify-start items-start flex gap-2">
            <div className="text-zinc-900 text-sm font-normal font-['SF Pro Text'] leading-[16.80px] tracking-tight">Добавьте фотографию</div>
            <ImagesInput images={photoList} setImages={setPhotoList} />
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
        </li> */}
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
              // setSelectedValue={(event) => setCity(event as string)}
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
            <SelectInput
              optionsList={oblastList}
              // setSelectedValue={(event) => setCity(event as string)}
              defaultOption="Не выбрано"
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
              value={lotData.user.username}
              name="username"
              //   onChange={(event) => setUsername(event.target.value)}
            />
          </div>
        </li>
        <li className="w-full h-auto justify-center items-center inline-flex">
          <div className="w-full h-full relative flex-col justify-start items-start flex gap-2">
            <div className="text-zinc-900 text-sm font-normal font-['SF Pro Text'] leading-[16.80px] tracking-tight">
              {lotData.user.profile.type === 'person'
                ? 'Имя Фамилия Отчество'
                : lotData.user.profile.type === 'company'
                ? 'Название организации'
                : 'Название ИП'}
            </div>
            <div className="w-full inline-flex gap-[10px] items-center">
              <div className="w-full max-w-[535px]">
                <Input multiline={false} className="w-full max-w-[535px]" value={user?.profile.name} disabled />
              </div>
              <QuestionSVG onClick={toggleToast} className="cursor-pointer" />
            </div>
          </div>
        </li>
        {lotData.user.profile.type !== 'person' && (
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
            {/* {isLoading && <Loader />} */}
          </Button>
        </li>
      </ul>
    </form>
  )
}
