import Person from '../../assets/images/feedbackPerson.png'
import BG from '../../assets/images/feedbackBG.png'
import { Input } from '../common/Input'
import Checkbox from '../common/checkbox'
import { Button } from '../common/buttons'
import DefaultLink from '../common/DefaultLink'
import { selectLangSettings, useAppSelector } from '../../store/hooks'
import { useFetchFooterDataQuery, useSendFeedBackMutation } from '../../api/userService'
import { FormEvent, useState } from 'react'
import { toast } from 'react-toastify'
import { validateEmail } from '../../utility/validations'

export default function FeedBack() {
  const { language } = useAppSelector(selectLangSettings)
  const [sendForm, { isSuccess }] = useSendFeedBackMutation()
  const [emailErr, setEmailErr] = useState<boolean>(false)
  const { data: overAllData } = useFetchFooterDataQuery()

  const handleForm = (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault()
    const form = e.target as HTMLFormElement
    const formdata = new FormData(form)
    formdata.append('accept_privacy_policy', 'true')
    if (formdata) {
      if (!validateEmail(String(formdata.get('email')))) {
        setEmailErr(true)
        toast(language === 'RU' ? 'Проверьте правильность ввода электронной почты' : 'Email seems wrong', { type: 'error' })
      } else {
        sendForm(formdata)
          .unwrap()
          .then(() => {
            toast(
              language === 'RU'
                ? 'Сообщение успешно отправлено, ожидайте ответа администратора на вашу электронную почту'
                : 'Mail successfuly delivered, wait answer at your email.',
              { type: 'success' }
            )
          })
          .catch(() => toast(language === 'RU' ? 'Что-то пошло не так' : 'Smth went wrong', { type: 'warning' }))
      }
    }
  }

  return (
    <div className="w-full h-full mb-[2rem] flex xl:flex-row flex-col gap-10px relative">
      <img
        src={Person}
        height={247}
        width={350}
        style={{
          objectFit: 'scale-down',
          zIndex: '20',
          position: 'relative',
          marginLeft: '20px',
          maxHeight: '247px'
        }}
        alt="feed-back"
      />
      <div className="w-full h-full absolute top-[22px] left-0 z-0 bg-[#f3f3f3]">
        <img
          src={BG}
          style={{
            objectFit: 'cover',
            position: 'absolute',
            height: '100%',
            top: 0,
            bottom: 0,
            left: 0,
            right: 0
          }}
          alt="background"
        />
      </div>
      <div className="w-full h-full xl:py-[42px] py-[42px] xl:pr-[40px] px-4 relative z-20 flex flex-col gap-[10px]">
        <span className="text-sm leading-[16.8px] font-normal text-[#1D1E22]">
          {language === 'RU' ? 'Если возникли вопросы, напишите нам и мы ответим' : 'If you have any questions, send your email and we will respond'}
        </span>
        <form onSubmit={handleForm} className="grid lg:grid-cols-2 grid-rows-1 w-full gap-[20px]">
          <div className="grid grid-cols-2 w-full gap-[10px]">
            <Input maxLength={50} className="w-full" required multiline={false} placeholder={language === 'RU' ? 'Имя' : 'Your Name'} name="name" />
            <Input
              error={emailErr}
              className="w-full"
              onChange={() => setEmailErr(false)}
              required
              multiline={false}
              placeholder={language === 'RU' ? 'Электронная почта' : 'Email'}
              name="email"
            />
            <Input multiline rows={2} required placeholder={language === 'RU' ? 'Сообщение' : 'Message'} className="col-span-2" name="message" aria-multiline />
          </div>
          <div className="flex flex-col gap-[20px]">
            <Checkbox
              required
              label={
                <p className="max-w-[230px] text-sm text-[#808080] font-normal">
                  {language === 'RU' ? `Я принимаю условия` : 'I accept'}{' '}
                  <DefaultLink
                    text={language === 'RU' ? 'Пользовательского соглашения' : 'User agreement'}
                    href={overAllData?.user_agreement ? process.env.REACT_APP_HOST_URL + overAllData?.user_agreement : '#'}
                    target={overAllData?.user_agreement ? '_blank' : '_self'}
                    style={{ color: '#008001' }}
                  />{' '}
                  {language === 'RU' ? 'и' : 'and'}{' '}
                  <DefaultLink
                    target={overAllData?.privacy_policy ? '_blank' : '_self'}
                    href={overAllData?.privacy_policy ? process.env.REACT_APP_HOST_URL + overAllData?.privacy_policy : '#'}
                    text={language === 'RU' ? 'Политику конфиденциальности' : 'Privacy policy'}
                    style={{ color: '#008001' }}
                  />
                </p>
              }
            />
            <Button type="submit" variant="primary" text={language === 'RU' ? 'Отправить' : 'Send message'} />
          </div>
        </form>
      </div>
    </div>
  )
}
