import { FC, FormEvent, useState } from 'react'
import { IModal } from '../DefaultModal'
import { Button } from '../../common/buttons'
import { CloseIcon } from '../../../assets/svg/closeIcon'
import { selectLangSettings, useAppSelector } from '../../../store/hooks'
import Input from '../../common/Input'
import { PhoneInput, defaultCountries, parseCountry } from 'react-international-phone'
import styles from '../../profile/MainProfile.module.scss'
import 'react-international-phone/style.css'
import { useSendAdminMessageMutation } from '../../../api/userService'
import { toast } from 'react-toastify'
import { validateEmail, validatePhone } from '../../../utility/validations'

export const AdminAssistanceModal: FC<IModal> = ({ close }) => {
  const { language } = useAppSelector(selectLangSettings)
  const [sendMessage, { isSuccess, isLoading }] = useSendAdminMessageMutation()
  const [emailErr, setEmailErr] = useState<boolean>(false)

  const countries = defaultCountries.filter((country) => {
    const { iso2 } = parseCountry(country)
    return ['by', 'ru'].includes(iso2)
  })

  const handleSubmitForm = (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault()
    const form = e.target as HTMLFormElement
    const formdata = new FormData(form)
    formdata.append('accept_privacy_policy', 'true')
    if (formdata) {
      if (!validatePhone(String(formdata.get('phone_number')))) {
        toast(language === 'RU' ? 'Проверьте правильность ввода номера телефона' : 'Phone number seems wrong', { type: 'error' })
      } else if (!validateEmail(String(formdata.get('email')))) {
        setEmailErr(true)
        toast(language === 'RU' ? 'Проверьте правильность ввода электронной почты' : 'Email seems wrong', { type: 'error' })
      } else {
        sendMessage(formdata)
          .unwrap()
          .then(() => {
            toast(
              language === 'RU'
                ? 'Сообщение успешно отправлено, ожидайте ответа администратора на вашу электронную почту'
                : 'Mail successfuly delivered, wait answer at your email.',
              { type: 'success' }
            )
            close()
          })
          .catch(() => toast(language === 'RU' ? 'Что-то пошло не так' : 'smth went wrong', { type: 'error' }))
      }
    }
  }

  return (
    <div className="w-full md:w-[718px] xl:h-auto h-auto self-center m-auto bg-white rounded shadow relative">
      <form className="w-full h-full p-8 flex flex-col gap-8 justify-start items-center" onSubmit={handleSubmitForm}>
        <div className="w-full h-6 justify-between items-start inline-flex">
          <div className="text-zinc-900 text-lg font-normal font-['SF Pro Text'] leading-snug tracking-tight">Связаться с администратором</div>
          <button className="w-6 h-6 relative flex-col justify-start items-start flex" onClick={close}>
            <CloseIcon />
          </button>
        </div>
        <div className="flex-col w-full justify-start items-center gap-4 inline-flex">
          <div className="w-full flex xl:flex-row flex-col gap-6 justify-between items-center">
            <div className="w-full">
              <div className="text-zinc-900 pb-2 text-sm font-normal font-['SF Pro Text'] leading-[16.80px] tracking-tight">
                {language === 'RU' ? 'Имя' : 'Your name'}
              </div>
              <Input type="text" required multiline={false} placeholder={language === 'RU' ? 'Ваше имя' : 'Your name'} className="w-full" name="name" />
            </div>
            <div className="w-full">
              <div className="text-zinc-900 pb-2 text-sm font-normal font-['SF Pro Text'] leading-[16.80px] tracking-tight">
                {language === 'RU' ? 'Электронная почта' : 'Email'}
              </div>
              <Input
                type="email"
                required
                error={emailErr}
                onChange={() => setEmailErr(false)}
                multiline={false}
                placeholder={language === 'RU' ? 'Ваша электронная почта' : 'Your email'}
                className="w-full"
                name="email"
              />
            </div>
          </div>
          <div className="w-full xl:w-1/2 xl:self-start xl:pr-3 pr-0">
            <div className="w-full">
              <div className="text-zinc-900 pb-2 text-sm font-normal font-['SF Pro Text'] leading-[16.80px] tracking-tight">
                {language === 'RU' ? 'Номер телефона' : 'Phone number'}
              </div>
              <PhoneInput
                inputProps={{ required: true, name: 'phone_number', id: 'phone_number' }}
                defaultCountry="by"
                name="phone_number"
                style={{ width: '100%', maxWidth: '100%' }}
                countries={countries}
                required
                placeholder={language === 'RU' ? 'Введите номер телефона' : 'Enter phone number'}
                className={styles.PhoneInput}
              // localization={ru}
              />
            </div>
          </div>
          <div className="w-full">
            <div className="text-zinc-900 pb-2 text-sm font-normal font-['SF Pro Text'] leading-[16.80px] tracking-tight">
              {language === 'RU' ? 'Сообщение' : 'Message'}
            </div>
            <Input type="text" required multiline rows={4} className="w-full" name="message" />
          </div>
        </div>
        <div className="w-[718px] h-[0px] border border-zinc-300" />
        <div className="justify-start items-start gap-6 inline-flex flex-row">
          <Button text="Закрыть" variant="secondary" className="w-[180px] md:w-[249px]" onClick={close} />
          <Button className="w-[180px] md:w-[249px]" text="Отправить" type="submit" />
        </div>
      </form>
    </div>
  )
}
