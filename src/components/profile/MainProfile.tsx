/* eslint-disable @typescript-eslint/no-explicit-any */
import { ChangeEvent, FC, FormEvent, useEffect, useState } from 'react'
import { selectLangSettings, selectUser, useAppDispatch, useAppSelector } from '../../store/hooks'
import { UserProfilePhotoSVG } from '../../assets/svg/userProfile'
import Input from '../common/Input'
import { RadioButton } from '../common/RadioButton'
import { QuestionSVG } from '../../assets/svg/questionSVG'
import { Button } from '../common/buttons'
import { IProfile } from '../../types/profile'
import { useChangePasswordMutation, useUpdateProfileDataMutation } from '../../api/userService'
import { updateUser } from '../../store/redux/users/slice'
import { toast } from 'react-toastify'
import { Loader } from '../Loader'
import { PhoneInput, defaultCountries, parseCountry } from 'react-international-phone'
import styles from './MainProfile.module.scss'
import 'react-international-phone/style.css'
import { validatePhone } from '../../utility/validations'
import { handleNumberKeyPress } from '../../pages/Lots/MakeLot'

interface IProfileError {
  name: string
  phone_number: string
  passwordNew: string
  passwordOld: string
  unp: string
}

export const MainProfile: FC = () => {
  const { language } = useAppSelector(selectLangSettings)
  const { user } = useAppSelector(selectUser)
  const [userProfile, setUserProfile] = useState<IProfile>()
  const [avatarUrl, setAvatarUrl] = useState<string>('')
  const [avatarFile, setAvatarFile] = useState<File>()
  const dispatch = useAppDispatch()
  const [updateProfile, { isLoading }] = useUpdateProfileDataMutation()
  const [changePassword, { isLoading: isPassLoading }] = useChangePasswordMutation()
  const [selectedOption, setSelectedOption] = useState('')
  const [errors, setErrors] = useState<IProfileError>({ name: '', phone_number: '', passwordNew: '', passwordOld: '', unp: '' })
  const radioGroupRu = [
    { value: 'person', label: 'Физическое лицо' },
    { value: 'sole_proprietor', label: 'Индивидуальный предприниматель' },
    { value: 'company', label: 'Юридическое лицо' }
  ]

  const radioGroupEng = [
    { value: 'person', label: 'Person' },
    { value: 'sole_proprietor', label: 'Sole proprietor' },
    { value: 'company', label: 'Company' }
  ]

  function formatPhoneNumber(e164Number: string): string {
    // Убираем все символы, кроме цифр
    return e164Number.replace(/[^+\d]/g, '')
  }

  const countries = defaultCountries.filter((country) => {
    const { iso2 } = parseCountry(country)
    return ['by', 'ru'].includes(iso2)
  })

  const handleChangeOption = (event: ChangeEvent<HTMLInputElement>) => {
    setSelectedOption(event.target.value)
  }

  useEffect(() => {
    if (user && !userProfile) {
      setUserProfile(user)
      !selectedOption && setSelectedOption(user.profile.type)
    }
  }, [selectedOption, user, userProfile])

  const onChangeAvatar = (e: ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files[0]) {
      const url = URL.createObjectURL(e.target.files[0])
      setAvatarUrl(url)
      setAvatarFile(e.target.files[0])
    }
  }

  useEffect(() => {
    if (avatarUrl && userProfile) {
      setUserProfile({
        ...userProfile,
        profile: { ...userProfile.profile, avatar: avatarUrl }
      })
    }
  }, [avatarUrl, avatarFile, userProfile])

  const handleSaveProfile = async (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault()
    const form = event.target as HTMLFormElement
    const formdata = new FormData(form)
    const profileFormData = new FormData()
    const phone = formdata.get('phone_number') as string
    if (formdata.get('name')) {
      const name = formdata.get('name') as string
      if (name !== userProfile?.profile.name) {
        profileFormData.append('profile.name', name)
      }
    }
    if (formdata.get('type')) {
      const type = formdata.get('type') as string
      if (type !== userProfile?.profile.type) {
        profileFormData.append('profile.type', type)
      }
    }
    if (formdata.get('unp')) {
      const unp = formdata.get('unp') as string
      if (String(unp) !== String(userProfile?.profile.unp)) {
        profileFormData.append('profile.unp', unp)
      }
    }
    if (phone.length > 1) {
      if (formatPhoneNumber(phone) !== userProfile?.profile.phone_number) {
        profileFormData.append('profile.phone_number', formatPhoneNumber(phone))
      }
    }
    if (formdata.get('username')) {
      const usernameNew = formdata.get('username') as string
      if (usernameNew !== userProfile?.username) {
        profileFormData.append('username', usernameNew)
      }
    }
    if (formdata.get('email')) {
      const email = formdata.get('email') as string
      profileFormData.append('email', email)
    }
    if (avatarFile) {
      profileFormData.append('profile.avatar', avatarFile)
    }

    if (!validatePhone(phone)) {
      toast(language === 'RU' ? 'Проверьте правильность ввода номера телефона' : 'Phone number is invalid', { type: 'warning' })
    } else if (
      profileFormData.get('profile.name') ||
      profileFormData.get('username') ||
      profileFormData.get('profile.phone_number') ||
      profileFormData.get('profile.type') ||
      profileFormData.get('profile.avatar') ||
      profileFormData.get('profile.unp')
    ) {
      await updateProfile(profileFormData)
        .unwrap()
        .then((data: IProfile) => {
          if (user) {
            setUserProfile({ ...data, email: user.email })
            dispatch(updateUser({ ...data, email: user.email }))
            toast(language === 'RU' ? 'Данные профиля успешно обновлены' : 'Profile has been changed', { type: 'success' })
          }
        })
        .catch((err: any) => {
          if (err.data && 'profile' in err.data && 'phone_number' in err.data.profile && err.data.profile.phone_number) {
            setErrors({ ...errors, phone_number: 'Введен некорректный номер телефона' })
            toast(language === 'RU' ? 'Введен некорректный номер телефона' : 'Wrong phone number', { type: 'error' })
          } else if (err.data && 'profile' in err.data && 'unp' in err.data.profile && err.data.profile.unp) {
            setErrors({ ...errors, unp: 'Некорректный УНП' })
            toast(language === 'RU' ? 'Введен некорректный УНП' : 'Wrong UNP', { type: 'error' })
          } else {
            toast(
              language === 'RU' ? 'Ошибка изменения профиля. Проверьте корректность введенных данных' : 'Something went wrong, please check your chaged fields',
              { type: 'error' }
            )
          }
        })
    }

    if (formdata.get('old_password') && formdata.get('new_password1') && formdata.get('new_password2')) {
      const profileResetData = new FormData()
      const oldPass = formdata.get('old_password') as string
      const newPass1 = formdata.get('new_password1') as string
      const newPass2 = formdata.get('new_password2') as string
      profileResetData.append('old_password', oldPass)
      profileResetData.append('new_password1', newPass1)
      profileResetData.append('new_password2', newPass2)
      if (newPass1 === newPass2 && newPass1.length >= 8) {
        await changePassword(profileResetData)
          .unwrap()
          .then(() => toast(language === 'RU' ? 'Пароль успешно изменен' : 'Password has been changed', { type: 'success' }))
          .catch(() => {
            toast(language === 'RU' ? 'Неверный текущий пароль' : 'Wrong current password', { type: 'error' })
          })
      } else if (newPass1.length < 8 || newPass2.length < 8) {
        setErrors({ ...errors, passwordNew: 'Пароль должен содержать более 8 символов' })
      } else {
        setErrors({ ...errors, passwordNew: 'Пароли не совпадают' })
        toast(language === 'RU' ? 'Пароли не совпадают' : 'Passwords are not equal', { type: 'error' })
      }
    }
  }

  return (
    <form onSubmit={handleSaveProfile} className="flex-col flex gap-8">
      <ul className="w-full xl:w-[733px] flex flex-col px-4 py-6 gap-8 bg-white shadow-md">
        <li className="text-zinc-900 text-lg font-normal leading-snug tracking-tight">{language === 'RU' ? 'Персональные данные' : 'Personal information'}</li>
        <li className="justify-start items-center gap-[9px] inline-flex">
          <div className="relative">
            {userProfile && userProfile.profile.avatar ? (
              <img src={userProfile.profile.avatar} alt="avatar" style={{ borderRadius: '50%', width: '49px', height: '46px' }} />
            ) : (
              <UserProfilePhotoSVG style={{ cursor: 'pointer' }} />
            )}
            <input className="absolute top-0 left-0 bottom-0 right-0 opacity-0" type="file" onChange={onChangeAvatar} value="" />
          </div>
          <span className="text-zinc-500 text-lg font-normal leading-snug tracking-wide">{userProfile?.username}</span>
        </li>
        <li className="flex-col justify-center items-start gap-1.5 inline-flex">
          <label htmlFor="username" className="text-zinc-900 text-sm font-normal leading-[16.80px] tracking-tight">
            {language === 'RU' ? 'Имя пользователя' : 'Username'}
          </label>
          <Input multiline={false} defaultValue={userProfile?.username || ''} placeholder="User_12345" className="w-[315px]" name="username" id="username" />
        </li>
      </ul>
      <ul className="w-full xl:w-[733px] flex flex-col px-4 py-6 gap-6 bg-white shadow-md">
        <li className="text-zinc-900 text-lg font-normal leading-snug tracking-tight">{language === 'RU' ? 'Контактная информация' : 'Contact information'}</li>
        <li className="justify-start items-start xl:items-center gap-[9px] flex flex-col xl:flex-row xl:inline-flex">
          {language === 'RU'
            ? radioGroupRu.map((option) => (
                <RadioButton
                  key={option.label + option.value}
                  name="type"
                  id={option.value}
                  value={option.value}
                  text={option.label}
                  onChange={handleChangeOption}
                  checked={selectedOption === option.value}
                />
              ))
            : radioGroupEng.map((option) => (
                <RadioButton
                  key={option.label + option.value}
                  name="type"
                  id={option.value}
                  value={option.value}
                  text={option.label}
                  onChange={handleChangeOption}
                  checked={selectedOption === option.value}
                />
              ))}
        </li>
        <li className="flex-col justify-center items-start gap-1.5 inline-flex">
          <label htmlFor="name" className="text-zinc-900 text-sm font-normal leading-[16.80px] tracking-tight">
            {selectedOption === 'person'
              ? language === 'RU'
                ? 'Имя Фамилия Отчество'
                : 'Full name'
              : selectedOption === 'company'
              ? language === 'RU'
                ? 'Название организации'
                : 'Company name'
              : language === 'RU'
              ? 'Название ИП'
              : 'Company name'}
            <span className="text-red-500 text-xl font-normal leading-[16.80px] tracking-tight">*</span>
          </label>
          <Input
            multiline={false}
            required
            maxLength={90}
            error={errors && errors.name.length > 0}
            defaultValue={userProfile?.profile.name || ''}
            onChange={() => setErrors({ ...errors, name: '' })}
            placeholder={selectedOption === 'person' ? 'Иванов Иван Иванович' : selectedOption === 'company' ? 'Ваше название' : 'ИП'}
            className="w-full max-w-[315px] xl:w-[315px]"
            name="name"
            id="name"
          />
          {errors.name && <label className="text-red-600 text-xs font-normal leading-[16.80px] tracking-tight">{errors.name}</label>}
        </li>
        {selectedOption && selectedOption !== 'person' && (
          <li className="flex-col justify-center items-start gap-1.5 inline-flex">
            <label htmlFor="unp" className="text-zinc-900 text-sm font-normal leading-[16.80px] tracking-tight">
              {language === 'RU' ? 'УНП' : `UNP (Payer's Account Number)`}
              <span className="text-red-500 text-xl font-normal leading-[16.80px] tracking-tight">*</span>
            </label>
            <Input
              multiline={false}
              required
              maxLength={12}
              minLength={9}
              type="number"
              onKeyDown={handleNumberKeyPress}
              error={errors && errors.name.length > 0}
              defaultValue={userProfile?.profile.unp || ''}
              onChange={() => setErrors({ ...errors, unp: '' })}
              placeholder={language === 'RU' ? 'Введите Ваш УНП' : 'Enter UNP'}
              className="w-full max-w-[315px] xl:w-[315px]"
              name="unp"
              id="unp"
            />
            {errors.unp && <label className="text-red-600 text-xs font-normal leading-[16.80px] tracking-tight">{errors.unp}</label>}
          </li>
        )}
        <li className="flex-col justify-center items-start gap-1.5 inline-flex">
          <label htmlFor="email" className="text-zinc-900 text-sm font-normal leading-[16.80px] tracking-tight">
            {language === 'RU' ? 'Электронная почта' : 'Email'}
          </label>
          <div className="xl:inline-flex xl:flex-row flex flex-col items-start xl:items-center gap-[10px] w-full">
            <div className="xl:w-[315px] w-full">
              <Input
                multiline={false}
                className="w-full max-w-[315px] xl:w-[315px]"
                placeholder={userProfile?.email}
                defaultValue={userProfile?.email}
                disabled
                name="email"
                id="email"
              />
            </div>
            <div className="inline-flex items-center gap-2 w-full max-w-[335px]">
              <QuestionSVG />
              <div
                style={{
                  width: '100%',
                  height: 38,
                  paddingLeft: 5,
                  paddingRight: 5,
                  paddingTop: 2,
                  paddingBottom: 2,
                  background: '#F6F6F6',
                  borderRadius: 4,
                  justifyContent: 'flex-start',
                  alignItems: 'flex-start',
                  display: 'inline-flex'
                }}
              >
                <p
                  style={{
                    width: '100%',
                    height: 32,
                    color: '#808080',
                    fontSize: 12,
                    fontWeight: '400',
                    lineHeight: '17px',
                    wordWrap: 'break-word'
                  }}
                >
                  {language === 'RU'
                    ? 'Вы указали эту электронную почту при регистрации, ее нельзя изменить'
                    : 'You provided this email when registering. It cannot be changed'}
                </p>
              </div>
            </div>
          </div>
        </li>
        <li className="flex-col justify-center items-start gap-1.5 inline-flex">
          <label htmlFor="phone_number" className="text-zinc-900 text-sm font-normal leading-[16.80px] tracking-tight">
            {language === 'RU' ? 'Номер телефона' : 'Phone number'}
            <span className="text-red-500 text-xl font-normal leading-[16.80px] tracking-tight">*</span>
          </label>
          <PhoneInput
            onChange={() => setErrors({ ...errors, phone_number: '' })}
            inputProps={{ required: true, name: 'phone_number', id: 'phone_number' }}
            defaultCountry="by"
            countries={countries}
            value={userProfile?.profile.phone_number || ''}
            placeholder={language === 'RU' ? 'Введите номер телефона' : 'Enter phone number'}
            className={styles.PhoneInput}
            // localization={ru}
          />
          {/* <Input
            multiline={false}
            required
            error={errors.phone_number.length > 0}
            onChange={() => setErrors({ ...errors, phone_number: '' })}
            defaultValue={userProfile?.profile.phone_number || ''}
            placeholder="+375 (__) ___-__-__"
            className="w-[315px]"
            name="phone_number"
            id="phone_number"
          /> */}
          <label className="text-red-600 text-xs font-normal font-['SF Pro Text'] leading-[16.80px] tracking-tight">{errors.phone_number}</label>
        </li>
      </ul>
      <ul className="w-full xl:w-[733px] flex flex-col px-4 py-6 gap-8 bg-white shadow-md">
        <li className="text-zinc-900 text-lg font-normal leading-snug tracking-tight">
          {language === 'RU' ? 'Изменение пароля от профиля' : 'Change password'}
        </li>
        <li className="flex-col justify-center items-start gap-1.5 inline-flex">
          <label htmlFor="password-current" className="text-zinc-900 text-sm font-normal leading-[16.80px] tracking-tight">
            {language === 'RU' ? 'Текущий пароль' : 'Current password'}
          </label>
          <div className="w-full max-w-[315px] xl:w-[315px]">
            <Input
              multiline={false}
              secure
              placeholder={language === 'RU' ? 'Введите пароль' : 'Enter password'}
              className="w-full max-w-[315px] xl:w-[315px]"
              name="old_password"
              id="password-current"
            />
          </div>
        </li>
        <li className="flex-col justify-center items-start gap-1.5 inline-flex">
          <label htmlFor="password-new" className="text-zinc-900 text-sm font-normal leading-[16.80px] tracking-tight">
            {language === 'RU' ? 'Новый пароль' : 'New password'}
          </label>
          <div className="w-full max-w-[315px] xl:w-[315px]">
            <Input
              multiline={false}
              error={errors && errors.passwordNew.length > 0}
              onChange={() => setErrors({ ...errors, passwordNew: '' })}
              secure
              placeholder={language === 'RU' ? 'Введите пароль' : 'Enter new password'}
              className="w-full max-w-[315px] xl:w-[315px]"
              name="new_password1"
              id="password-new"
            />
          </div>
          <label className="text-red-600 text-xs font-normal font-['SF Pro Text'] leading-[16.80px] tracking-tight">{errors.passwordNew}</label>
        </li>
        <li className="flex-col justify-center items-start gap-1.5 inline-flex">
          <label htmlFor="password-new-repeat" className="text-zinc-900 text-sm font-normal leading-[16.80px] tracking-tight">
            {language === 'RU' ? 'Повторить пароль' : 'Repeat new password'}
          </label>
          <div className="w-full max-w-[315px] xl:w-[315px]">
            <Input
              multiline={false}
              secure
              error={errors && errors.passwordNew.length > 0}
              onChange={() => setErrors({ ...errors, passwordNew: '' })}
              placeholder={language === 'RU' ? 'Введите пароль повторно' : 'Enter new password'}
              className="w-full max-w-[315px] xl:w-[315px]"
              name="new_password2"
              id="password-new-repeat"
            />
          </div>
          <label className="text-red-600 text-xs font-normal font-['SF Pro Text'] leading-[16.80px] tracking-tight">{errors.passwordNew}</label>
        </li>
      </ul>
      <div className="flex gap-4 items-center">
        {isLoading || isPassLoading ? <Loader /> : <Button type="submit" text={language === 'RU' ? 'Сохранить' : 'Save changes'} />}
        <label className="text-red-600 text-xs font-normal font-['SF Pro Text'] leading-[16.80px] tracking-tight">
          {errors.name || errors.phone_number ? 'Введены некорректные данные в профиле' : ''}
        </label>
      </div>
    </form>
  )
}
