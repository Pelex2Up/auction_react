import Logo from '../../assets/logo/logo.png'
import ShopImage from '../../assets/images/footerImage.png'
import BGImage from '../../assets/images/footerBg.png'
import styles from './footer.module.scss'
import { Button } from '../common/buttons'
import DefaultLink from '../common/DefaultLink'
import { CatalogPathE, PathE } from '../../enum'
import { selectLangSettings, useAppSelector } from '../../store/hooks'
import { generatePath } from 'react-router-dom'
import { useFetchFooterDataQuery } from '../../api/userService'
import parse from 'html-react-parser'

export default function Footer({ openModal }: { openModal: () => void }) {
  const { language } = useAppSelector(selectLangSettings)
  const { data: footerData, refetch } = useFetchFooterDataQuery()

  return (
    <>
      <div className="w-full xl:px-[50px] px-[20px] py-6 flex flex-col gap-[24px] bg-[#F6F6F6] relative">
        <img
          src={BGImage}
          className="absolute xl:top-[33px] right-[20px] top-[250px] xl:right-[50px] xl:h-[250px] xl:w-[250px] w-[150px] h-[150px]"
          alt="shop"
        />
        <img
          src={ShopImage}
          className="absolute xl:top-[33px] right-[20px] top-[250px] xl:right-[50px] xl:h-[250px] xl:w-[250px] w-[150px] h-[150px]"
          alt="shop"
        />

        <div className="flex w-full">
          <img src={Logo} width="189" height="54" alt="logo" />
        </div>
        <div className="flex xl:flex-row flex-col justify-between items-start xl:w-[80%] h-auto w-full gap-[20px]">
          <div className="flex flex-col gap-[6px] xl:max-w-[284px] w-full">
            <p className="text-sm text-[#1D1E22] font-normal leading-[16.8px]">ООО “Стоковая Биржа”</p>
            <p className="leading-[20px] font-normal text-sm text-[#808080]">{parse(String(footerData?.requisites))}</p>
            {/* <p className="leading-[20px] font-normal text-sm text-[#808080]">УНП 123456789, Республика Беларусь, 220067, г. Минск, ул. Карла Маркса, 15</p> */}
            {/* <p className="leading-[20px] font-normal text-sm text-[#808080]">Расчетный счет BY58ALFA00100B00011100000000 ЗАО “Альфа-Банк” БИК: ALFABY2X</p> */}
          </div>
          <div className={`flex flex-col gap-[12px] w-max-content justify-start items-start ${styles.btnGroup}`}>
            <DefaultLink text={language === 'RU' ? 'Главная' : 'Home'} href={PathE.Home} />
            <DefaultLink
              text={language === 'RU' ? 'Объявления о покупке' : 'Buy advertisements'}
              href={generatePath(CatalogPathE.Catalog + '/?ad_type=BUY&page=1')}
            />
            <DefaultLink
              text={language === 'RU' ? 'Объявления о продаже' : 'Advertisements for sale'}
              href={generatePath(CatalogPathE.Catalog + '/?ad_type=SELL&page=1')}
            />
            <DefaultLink text={language === 'RU' ? 'Правила участия' : 'Rules of participation'} href={PathE.Rules} />
            <DefaultLink text={language === 'RU' ? 'Тарифы' : 'Tariffs'} href={PathE.TarriffPlans} />
            <DefaultLink text={language === 'RU' ? 'Реклама' : 'Advertising'} href={PathE.AdsPage} />
          </div>
          <div className={`flex flex-col gap-[12px] justify-start items-start text-sm leading-[16.8px] tracking-[1%] font-normal w-max-content`}>
            <span>{language === 'RU' ? 'Контакты' : 'Contact information'}</span>
            <a href={`mailto:${footerData?.email}}?subject=Вопрос`} className="flex items-center gap-2 text-[#808080] font-normal">
              <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                <path
                  d="M21.4308 3H2.57366C1.62689 3 0.859375 3.76751 0.859375 4.71429V19.2857C0.859375 20.2325 1.62689 21 2.57366 21H21.4308C22.3776 21 23.1451 20.2325 23.1451 19.2857V4.71429C23.1451 3.76751 22.3776 3 21.4308 3Z"
                  stroke="#808080"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                />
                <path
                  d="M0.859375 5.14258L10.9051 13.714C11.2131 13.9706 11.6013 14.1111 12.0022 14.1111C12.4031 14.1111 12.7913 13.9706 13.0994 13.714L23.1451 5.14258"
                  stroke="#808080"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                />
              </svg>
              {footerData?.email}
            </a>
            <a href={`tel:${footerData?.phone_number}`} type="tel" className="flex items-center gap-2 text-[#808080] font-normal">
              <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                <g clipPath="url(#clip0_1118_539)">
                  <path
                    d="M15.0199 22.286C16.0756 22.9671 17.3336 23.2639 18.5824 23.1265C19.8312 22.9892 20.9946 22.426 21.8771 21.5318L22.6485 20.7775C22.9867 20.4315 23.1761 19.967 23.1761 19.4832C23.1761 18.9994 22.9867 18.5348 22.6485 18.1889L19.3742 14.9489C19.0312 14.6118 18.5694 14.4229 18.0885 14.4229C17.6075 14.4229 17.1458 14.6118 16.8028 14.9489C16.4568 15.2871 15.9923 15.4765 15.5085 15.4765C15.0247 15.4765 14.5601 15.2871 14.2142 14.9489L9.07134 9.80604C8.89978 9.63697 8.76354 9.43548 8.67055 9.21328C8.57756 8.99109 8.52967 8.75262 8.52967 8.51175C8.52967 8.27088 8.57756 8.03242 8.67055 7.81022C8.76354 7.58803 8.89978 7.38653 9.07134 7.21747C9.40846 6.87443 9.59737 6.41271 9.59737 5.93175C9.59737 5.45079 9.40846 4.98907 9.07134 4.64604L5.8142 1.38889C5.46827 1.05069 5.0037 0.861328 4.51991 0.861328C4.03613 0.861328 3.57156 1.05069 3.22563 1.38889L2.47134 2.16032C1.57708 3.04274 1.01391 4.20615 0.876547 5.45495C0.739179 6.70375 1.03598 7.96176 1.71705 9.01747C5.2657 14.2473 9.78095 18.7509 15.0199 22.286Z"
                    stroke="#808080"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                  />
                </g>
                <defs>
                  <clipPath id="clip0_1118_539">
                    <rect width="24" height="24" fill="white" />
                  </clipPath>
                </defs>
              </svg>
              {footerData?.phone_number}
            </a>
            <Button
              variant="secondary"
              onClick={() => {
                openModal()
              }}
              text={language === 'RU' ? 'Связатся с администратором' : 'Contact administrator'}
            />
          </div>
        </div>
        <div className="w-full flex xl:flex-row flex-col-reverse gap-2 xl:justify-between justify-center items-start xl:h-[24px] xl:mt-10">
          <p className="flex gap-1 text-sm font-normal items-center text-[#808080] justify-start">
            <svg width="14" height="14" viewBox="0 0 16 16" fill="none" xmlns="http://www.w3.org/2000/svg">
              <path
                d="M8 1.5C11.6 1.5 14.5 4.4 14.5 8C14.5 11.6 11.6 14.5 8 14.5C4.4 14.5 1.5 11.6 1.5 8C1.5 4.4 4.4 1.5 8 1.5ZM8 0C3.6 0 0 3.6 0 8C0 12.4 3.6 16 8 16C12.4 16 16 12.4 16 8C16 3.6 12.4 0 8 0Z"
                fill="#D9D9D9"
              />
              <path
                d="M9.9 10.3C9.4 10.7 8.7 11 8 11C6.3 11 5 9.7 5 8C5 6.3 6.3 5 8 5C8.8 5 9.6 5.3 10.1 5.9L11.2 4.8C10.4 4 9.2 3.5 8 3.5C5.5 3.5 3.5 5.5 3.5 8C3.5 10.5 5.5 12.5 8 12.5C9.1 12.5 10 12.1 10.8 11.5L9.9 10.3Z"
                fill="#D9D9D9"
              />
            </svg>
            2024, ООО Стоковая Биржа
          </p>
          <a
            className="text-sm font-normal text-[#808080] cursor-pointer no-underline"
            href={footerData?.user_agreement ? process.env.REACT_APP_HOST_URL + footerData?.user_agreement : PathE.Home}
            rel="noreferrer"
            target={footerData?.user_agreement ? '_blank' : '_self'}
          >
            {language === 'RU' ? 'Пользовательское соглашение' : 'User agreement'}
          </a>
          <a
            className="text-sm font-normal text-[#808080] cursor-pointer no-underline"
            href={footerData?.privacy_policy ? process.env.REACT_APP_HOST_URL + footerData?.privacy_policy : PathE.Home}
            rel="noreferrer"
            target={footerData?.privacy_policy ? '_blank' : '_self'}
          >
            {language === 'RU' ? 'Политика конфиденциальности' : 'Privacy policy'}
          </a>
          <div className="w-[251px]"></div>
        </div>
      </div>
    </>
  )
}
