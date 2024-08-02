import { useEffect, useState } from 'react'
import DefaultLink from '../common/DefaultLink'
import { Button, MenuButton } from '../common/buttons'
import { CourseInfo } from './courseInfo'
import styles from './header.module.scss'
import Portal from '../Modal/Portal'
import HeaderPlaceholder from '../../assets/images/headerPlaceholder.png'
import { LoginModal } from '../Modal/Login'
import ProfileHeader from '../profile'
import userImage from '../../assets/icons/newUser.svg'
import Logo from '../../assets/logo/logo.png'
import HammerLogo from '../../assets/logo/headerHammerLogo.png'
import { CatalogPathE, LotPathE, PathE, ProfilePathE } from '../../enum/index'
import { generatePath, useLocation, useNavigate } from 'react-router-dom'
import { selectLangSettings, selectUser, useAppDispatch, useAppSelector } from '../../store/hooks'
import { Loader } from '../Loader'
import { useLogoutMutation } from '../../api/loginService'
import { logoutState, updateUser } from '../../store/redux/users/slice'
import Hamburger from 'hamburger-react'
import { Modal } from '../Modal/DefaultModal/ModalTypes'
import { DefaultModal } from '../Modal/DefaultModal'
import { useLazyFetchProfileQuery } from '../../api/userService'
import { IconBurgerSVG } from '../../assets/svg/iconBurgerSVG'
import SearchInput from '../common/SearchInput'
import { Tooltip } from '@mui/material'
import { LangChangeBlock } from '../LangChangeBlock'
import { toast } from 'react-toastify'
import { useSearchInputDataMutation } from '../../api/searchService'
import { useDebounceFunc } from '../../utils/useDebounceFunc'
import { CloseIcon } from '../../assets/svg/closeIcon'
import SearchBlock from '../SearchBlock'

export default function Header() {
  const { language } = useAppSelector(selectLangSettings)
  const navigate = useNavigate()
  const dispatch = useAppDispatch()
  const [show, setShow] = useState<boolean>(false)
  const [modalState, setModalState] = useState<number>(1)
  const { auth, user } = useAppSelector(selectUser)
  const [showMenu, setShowMenu] = useState<boolean>(false)
  const [logout, { isLoading, isSuccess }] = useLogoutMutation()
  const [newModal, setNewModal] = useState<boolean>(false)
  const [variant, setVariant] = useState<string>('')
  const [getUserData] = useLazyFetchProfileQuery()
  const [searchTerm, setSearchTerm] = useState<string>('')
  const [sendSearch, { data: searchData, isLoading: loadingSearch }] = useSearchInputDataMutation()
  const debouncedBuy = useDebounceFunc(sendSearch, 300)
  const [open, setOpen] = useState<boolean>(false)
  const location = useLocation()

  const toggleSideMenu = () => {
    setShowMenu(!showMenu)
  }

  const closeSideMenu = () => {
    setShowMenu(false)
  }

  useEffect(() => {
    if (searchTerm) {
      debouncedBuy(searchTerm)
    }
  }, [searchTerm])

  useEffect(() => {
    if (auth && !user) {
      getUserData()
        .unwrap()
        .then((data) => dispatch(updateUser(data)))
    }
  })

  useEffect(() => {
    if (isSuccess) {
      dispatch(logoutState())
      closeSideMenu()
      navigate(generatePath(PathE.Home))
    }
  }, [dispatch, isSuccess, navigate])

  const openModal = (variant: string) => {
    setVariant(variant)
    setNewModal(true)
  }

  useEffect(() => {
    if (showMenu) {
      document.body.classList.add('modal-open')
    } else {
      document.body.classList.remove('modal-open')
    }
    return () => document.body.classList.remove('modal-open')
  }, [showMenu, setShowMenu])

  return (
    <>
      <header className={styles.wrapper}>
        <div className={styles.wrapper_topHeader}>
          <div className={styles.wrapper_topHeader_leftContent}>
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
          {auth ? (
            <></>
          ) : (
            <div className={styles.wrapper_topHeader_rightContent}>
              <p>
                {language === 'RU' ? 'Для подачи объявления необходимо пройти ' : 'To submit an ad, you must '}
                <DefaultLink
                  onClick={() => {
                    setModalState(2)
                    setShow(true)
                  }}
                  style={{ color: '#008001' }}
                  text={language === 'RU' ? 'регистрацию' : 'register'}
                />
              </p>
            </div>
          )}
        </div>
        <span
          style={{
            width: '100%',
            height: '0.01rem',
            border: '0.5px solid grey',
            display: 'block',
            opacity: '0.6'
          }}
        />
        <div className={styles.wrapper_bottomHeader}>
          <div className={styles.wrapper_bottomHeader_leftContent}>
            <CourseInfo />
          </div>
          <div className={styles.wrapper_bottomHeader_rightContent}>
            <Button
              text={language === 'RU' ? 'Подать объявление' : 'Submit an ad'}
              variant={user ? 'secondary' : 'primary'}
              onClick={() => {
                auth && user?.profile.is_completed ? navigate(generatePath(LotPathE.CreateLot)) : openModal(Modal.EmptyProfile)
              }}
            >
              <svg width="22" height="22" viewBox="0 0 22 22" fill="none" xmlns="http://www.w3.org/2000/svg">
                <path d="M11 1V21V1ZM1 10.9385H21H1Z" fill="white" />
                <path d="M11 1V21M1 10.9385H21" stroke={user ? 'green' : 'white'} strokeLinecap="round" strokeLinejoin="round" />
              </svg>
            </Button>
            {!auth ? (
              <Button
                onClick={() => {
                  setModalState(1)
                  setShow(true)
                }}
                text={language === 'RU' ? 'Вход в аккаунт и регистрация' : 'Sign Up & Sign In'}
                variant="secondary"
              />
            ) : (
              user && <ProfileHeader username={user.username} avatar={user.profile.avatar || ''} />
            )}
          </div>
        </div>
        <div className="xl:w-full xl:h-[54px] xl:justify-between xl:items-center xl:inline-flex hidden">
          <div className="grow shrink basis-0 self-stretch justify-between items-center inline-flex relative">
            <a href={PathE.Home}>
              <img src={HammerLogo} className="w-[293px] h-[54px]" alt="logo" />
            </a>
            {location.pathname !== PathE.Home ? (
              <div className="inline-flex gap-4 w-1/2">
                <Button
                  text={language === 'RU' ? 'Все объявления' : 'All advertisements'}
                  className={language === 'RU' ? 'min-w-[168px]' : 'min-w-[175px]'}
                  variant="secondary"
                  onClick={() => setOpen(!open)}
                >
                  {open ? <CloseIcon /> : <IconBurgerSVG />}
                </Button>
                <SearchInput
                  value={searchTerm}
                  onChange={setSearchTerm}
                  searchData={searchData}
                  id={'search-input-header'}
                  placeholder="Поиск по всем категориям"
                />
              </div>
            ) : (
              <img src={HeaderPlaceholder} className="w-[203px] h-[119px] mr-[150px]" />
            )}
            <div className="justify-end items-center gap-6 flex">
              <Tooltip title={language === 'RU' ? 'Корзина' : 'Basket'}>
                <div
                  className="justify-start items-center gap-6 flex cursor-pointer"
                  onClick={() =>
                    auth
                      ? navigate(generatePath(PathE.UserCart))
                      : toast(language === 'RU' ? 'Для использования корзины, вы должны быть авторизованы' : 'To use cart, you must be logged in', {
                          type: 'warning'
                        })
                  }
                >
                  <div className="w-6 h-6 pl-[1.09px] pr-[1.08px] py-[0.86px] justify-center items-center flex">
                    <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                      <g clipPath="url(#clip0_3101_19280)">
                        <path
                          d="M4.28721 9.42885V8.57171C4.28721 6.52575 5.09996 4.56359 6.54667 3.11688C7.99338 1.67017 9.95554 0.857422 12.0015 0.857422C14.0475 0.857422 16.0096 1.67017 17.4563 3.11688C18.903 4.56359 19.7158 6.52575 19.7158 8.57171V9.42885M8.57293 14.5717V18.0003M15.4301 14.5717V18.0003M22.9044 11.3489C22.9336 11.1096 22.9121 10.8668 22.8412 10.6364C22.7704 10.406 22.6517 10.1931 22.4929 10.0117C22.3323 9.82885 22.1345 9.68229 21.9128 9.58179C21.6912 9.4813 21.4506 9.42916 21.2072 9.42885H2.79578C2.55238 9.42916 2.31183 9.4813 2.09015 9.58179C1.86846 9.68229 1.67071 9.82885 1.51007 10.0117C1.35133 10.1931 1.23264 10.406 1.16175 10.6364C1.09085 10.8668 1.06935 11.1096 1.09864 11.3489L2.38435 21.6346C2.43488 22.0527 2.63757 22.4376 2.95375 22.7158C3.26993 22.9941 3.67748 23.1462 4.09864 23.1431H19.9386C20.3598 23.1462 20.7673 22.9941 21.0835 22.7158C21.3997 22.4376 21.6024 22.0527 21.6529 21.6346L22.9044 11.3489Z"
                          stroke="#1D1E22"
                          strokeLinecap="round"
                          strokeLinejoin="round"
                        />
                      </g>
                      <defs>
                        <clipPath id="clip0_3101_19280">
                          <rect width="24" height="24" fill="white" />
                        </clipPath>
                      </defs>
                    </svg>
                  </div>
                </div>
              </Tooltip>
              <LangChangeBlock />
            </div>
            <div className={`${open ? 'flex' : 'hidden'} absolute top-[120%] w-full py-8 px-4 bg-white shadow-md z-20 rounded`}>{open && <SearchBlock />}</div>
          </div>
        </div>
        {show && (
          <Portal close={() => setShow(false)}>
            <LoginModal selectedState={modalState} close={() => setShow(false)} />
          </Portal>
        )}
      </header>
      <header className={styles.mobileWrapper}>
        <img
          src={Logo}
          alt="Logo"
          width="189"
          height="54"
          onClick={() => {
            navigate(generatePath(PathE.Home))
            closeSideMenu()
          }}
        />
        <Hamburger toggle={toggleSideMenu} toggled={showMenu} color="#afafaf" />
        <nav id="nav-menu" className={`${styles.mobileWrapper_sideMenu} ${showMenu ? styles.open : styles.closed}`}>
          <div className="w-full relative h-[0px] border border-zinc-300" />
          <ul className="w-full flex flex-col gap-4 px-6 font-normal text-base">
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
          </ul>
          {auth && user ? (
            <ul className={`w-full z-10 cursor-default`}>
              <div className="w-full relative">
                <li>
                  <div className="inline-flex px-6 py-3 items-center justify-start gap-[10px] w-full text-zinc-900 text-base font-normal leading-tight tracking-tight">
                    <img src={user.profile.avatar || userImage} className="w-[46px] h-[46px] rounded-full" />
                    {user.username}
                  </div>
                </li>
                <div className="w-full relative h-[0px] border border-zinc-300" />
                <li>
                  <MenuButton
                    text={language === 'RU' ? 'Мои объявления' : 'My advertisements'}
                    onClick={() => {
                      closeSideMenu()
                      navigate(generatePath(ProfilePathE.MyLots))
                    }}
                  >
                    <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                      <path
                        d="M19.7132 0.857422H4.2846C3.33782 0.857422 2.57031 1.62493 2.57031 2.57171V21.4289C2.57031 22.3756 3.33782 23.1431 4.2846 23.1431H19.7132C20.6599 23.1431 21.4275 22.3756 21.4275 21.4289V2.57171C21.4275 1.62493 20.6599 0.857422 19.7132 0.857422Z"
                        stroke="#1D1E22"
                        strokeLinecap="round"
                        strokeLinejoin="round"
                      />
                      <path
                        d="M2.57031 17.9997H21.4275M7.71317 5.14258H16.2846M7.71317 9.42829H16.2846M7.71317 13.714H12.856"
                        stroke="#1D1E22"
                        strokeLinecap="round"
                        strokeLinejoin="round"
                      />
                    </svg>
                  </MenuButton>
                </li>
                <li>
                  <MenuButton
                    text={language === 'RU' ? 'Мои заказы' : 'My orders'}
                    onClick={() => {
                      closeSideMenu()
                      navigate(generatePath(ProfilePathE.MyPurchases))
                    }}
                  >
                    <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                      <g clipPath="url(#clip0_3125_16348)">
                        <path
                          d="M23.1454 0.857422H18.8597L17.3682 15.686C17.3062 16.0948 17.0986 16.4674 16.7836 16.7351C16.4686 17.0029 16.0674 17.1478 15.6539 17.1431H4.85395C4.48012 17.1626 4.11018 17.0593 3.80063 16.8488C3.49109 16.6383 3.25894 16.3322 3.13966 15.9774L0.859664 9.12028C0.774655 8.86248 0.752085 8.58817 0.793809 8.31994C0.835534 8.05171 0.940362 7.79722 1.09966 7.57742C1.26562 7.34373 1.48752 7.15538 1.74508 7.0296C2.00263 6.90381 2.28761 6.84462 2.57395 6.85742H18.2597"
                          stroke="#1D1E22"
                          strokeLinecap="round"
                          strokeLinejoin="round"
                        />
                        <path
                          d="M5.14621 23.144C5.61959 23.144 6.00335 22.7602 6.00335 22.2868C6.00335 21.8134 5.61959 21.4297 5.14621 21.4297C4.67282 21.4297 4.28906 21.8134 4.28906 22.2868C4.28906 22.7602 4.67282 23.144 5.14621 23.144Z"
                          stroke="#1D1E22"
                          strokeLinecap="round"
                          strokeLinejoin="round"
                        />
                        <path
                          d="M16.2868 23.144C16.7602 23.144 17.144 22.7602 17.144 22.2868C17.144 21.8134 16.7602 21.4297 16.2868 21.4297C15.8134 21.4297 15.4297 21.8134 15.4297 22.2868C15.4297 22.7602 15.8134 23.144 16.2868 23.144Z"
                          stroke="#1D1E22"
                          strokeLinecap="round"
                          strokeLinejoin="round"
                        />
                        <path
                          d="M6 11.4545L9.64138 14.8858C9.70213 14.9331 9.77327 14.967 9.84962 14.985C9.92597 15.0031 10.0056 15.0048 10.0828 14.9901C10.1606 14.9763 10.2345 14.9468 10.2992 14.9036C10.3639 14.8603 10.4181 14.8044 10.4579 14.7397L14 9"
                          stroke="#008001"
                          strokeLinecap="round"
                          strokeLinejoin="round"
                        />
                      </g>
                      <defs>
                        <clipPath id="clip0_3125_16348">
                          <rect width="24" height="24" fill="white" />
                        </clipPath>
                      </defs>
                    </svg>
                  </MenuButton>
                </li>
                <li>
                  <MenuButton
                    text={language === 'RU' ? 'Настройки профиля' : 'Profile settings'}
                    onClick={() => {
                      closeSideMenu()
                      navigate(generatePath(PathE.Profile))
                    }}
                  >
                    <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                      <path
                        d="M8.96209 3.85742L9.69923 1.95456C9.82355 1.63239 10.0423 1.35527 10.3267 1.1595C10.6112 0.963731 10.9482 0.858442 11.2935 0.857422H12.6992C13.0446 0.858442 13.3815 0.963731 13.666 1.1595C13.9505 1.35527 14.1692 1.63239 14.2935 1.95456L15.0307 3.85742L17.5335 5.29742L19.5564 4.98885C19.8932 4.94313 20.236 4.99858 20.5413 5.14815C20.8465 5.29772 21.1004 5.53465 21.2707 5.82885L21.9564 7.02885C22.1321 7.32773 22.213 7.67287 22.1886 8.01871C22.1641 8.36456 22.0353 8.69485 21.8192 8.96599L20.5678 10.5603V13.4403L21.8535 15.0346C22.0696 15.3057 22.1984 15.636 22.2228 15.9818C22.2473 16.3277 22.1664 16.6728 21.9907 16.9717L21.3049 18.1717C21.1347 18.4659 20.8808 18.7028 20.5755 18.8524C20.2703 19.002 19.9275 19.0574 19.5907 19.0117L17.5678 18.7031L15.0649 20.1431L14.3278 22.046C14.2035 22.3682 13.9848 22.6453 13.7003 22.8411C13.4158 23.0368 13.0788 23.1421 12.7335 23.1431H11.2935C10.9482 23.1421 10.6112 23.0368 10.3267 22.8411C10.0423 22.6453 9.82355 22.3682 9.69923 22.046L8.96209 20.1431L6.45923 18.7031L4.43637 19.0117C4.09955 19.0574 3.75673 19.002 3.45149 18.8524C3.14624 18.7028 2.89236 18.4659 2.72209 18.1717L2.03637 16.9717C1.86066 16.6728 1.77971 16.3277 1.80419 15.9818C1.82868 15.636 1.95745 15.3057 2.17352 15.0346L3.42495 13.4403V10.5603L2.13923 8.96599C1.92316 8.69485 1.79439 8.36456 1.76991 8.01871C1.74542 7.67287 1.82638 7.32773 2.00209 7.02885L2.6878 5.82885C2.85807 5.53465 3.11196 5.29772 3.4172 5.14815C3.72244 4.99858 4.06526 4.94313 4.40209 4.98885L6.42495 5.29742L8.96209 3.85742ZM8.5678 12.0003C8.5678 12.6784 8.76889 13.3413 9.14562 13.9051C9.52236 14.4689 10.0578 14.9084 10.6843 15.1679C11.3108 15.4274 12.0002 15.4953 12.6653 15.363C13.3303 15.2307 13.9412 14.9041 14.4207 14.4246C14.9002 13.9452 15.2268 13.3342 15.3591 12.6692C15.4914 12.0041 15.4235 11.3147 15.164 10.6882C14.9045 10.0617 14.465 9.52626 13.9012 9.14953C13.3374 8.77279 12.6745 8.57171 11.9964 8.57171C11.0871 8.57171 10.215 8.93293 9.57201 9.57591C8.92903 10.2189 8.5678 11.091 8.5678 12.0003Z"
                        stroke="#1D1E22"
                        strokeLinecap="round"
                        strokeLinejoin="round"
                      />
                    </svg>
                  </MenuButton>
                </li>
                <li>
                  <MenuButton
                    text={language === 'RU' ? 'Мой тариф' : 'My tariff'}
                    onClick={() => {
                      navigate(generatePath(ProfilePathE.MyTariff))
                      closeSideMenu()
                    }}
                  >
                    <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                      <path
                        d="M22.2863 11.8974C22.2702 13.6822 21.7604 15.4277 20.8134 16.9405C19.8663 18.4534 18.519 19.6746 16.9206 20.4688L12.0006 23.1431L7.08057 20.5717C5.46661 19.7696 4.10895 18.5324 3.16083 16.9997C2.21272 15.4669 1.71188 13.6997 1.71486 11.8974V2.57171C1.71486 2.11705 1.89547 1.68102 2.21696 1.35952C2.53845 1.03803 2.97449 0.857422 3.42914 0.857422H20.572C21.0267 0.857422 21.4627 1.03803 21.7842 1.35952C22.1057 1.68102 22.2863 2.11705 22.2863 2.57171V11.8974Z"
                        stroke="black"
                        strokeLinecap="round"
                        strokeLinejoin="round"
                      />
                      <g clipPath="url(#clip0_3125_16358)">
                        <path
                          d="M13.7087 11.7484C15.8389 11.7484 17.5658 10.9425 17.5658 9.94844C17.5658 8.95432 15.8389 8.14844 13.7087 8.14844C11.5785 8.14844 9.85156 8.95432 9.85156 9.94844C9.85156 10.9425 11.5785 11.7484 13.7087 11.7484Z"
                          stroke="black"
                          strokeLinecap="round"
                          strokeLinejoin="round"
                        />
                        <path
                          d="M9.85156 9.94922V15.3492C9.85156 16.3392 11.5658 17.1492 13.7087 17.1492C15.8516 17.1492 17.5658 16.3392 17.5658 15.3492V9.94922"
                          stroke="black"
                          strokeLinecap="round"
                          strokeLinejoin="round"
                        />
                        <path
                          d="M17.5686 12.6493C17.5686 13.6393 15.8544 14.4493 13.7115 14.4493C11.5686 14.4493 9.85435 13.6393 9.85435 12.6493M13.6258 6.3493C12.6242 5.70029 11.4583 5.38641 10.2829 5.4493C8.14864 5.4493 6.42578 6.2593 6.42578 7.2493C6.42578 7.7803 6.92292 8.2573 7.7115 8.5993"
                          stroke="#1D1E22"
                          strokeLinecap="round"
                          strokeLinejoin="round"
                        />
                        <path d="M7.7115 14C6.92292 13.658 6.42578 13.181 6.42578 12.65V7.25" stroke="black" strokeLinecap="round" strokeLinejoin="round" />
                        <path d="M7.7115 11.2992C6.92292 10.9572 6.42578 10.4802 6.42578 9.94922" stroke="black" strokeLinecap="round" strokeLinejoin="round" />
                      </g>
                      <defs>
                        <clipPath id="clip0_3125_16358">
                          <rect width="12" height="14" fill="white" transform="translate(6 5)" />
                        </clipPath>
                      </defs>
                    </svg>
                  </MenuButton>
                </li>
                <div className="w-full relative h-[0px] border border-zinc-300" />
                <li>
                  <MenuButton text={language === 'RU' ? 'Выход' : 'Logout'} onClick={() => logout()}>
                    {isLoading ? (
                      <Loader />
                    ) : (
                      <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                        <g clipPath="url(#clip0_3125_16369)">
                          <path
                            d="M16.2879 18.0003V21.4289C16.2879 21.8835 16.1073 22.3195 15.7858 22.641C15.4644 22.9625 15.0283 23.1431 14.5737 23.1431H2.57366C2.119 23.1431 1.68297 22.9625 1.36148 22.641C1.03999 22.3195 0.859375 21.8835 0.859375 21.4289V2.57171C0.859375 2.11705 1.03999 1.68102 1.36148 1.35952C1.68297 1.03803 2.119 0.857422 2.57366 0.857422H14.5737C15.0283 0.857422 15.4644 1.03803 15.7858 1.35952C16.1073 1.68102 16.2879 2.11705 16.2879 2.57171V6.00028M11.1451 12.0003H23.1451M23.1451 12.0003L19.7165 8.57171M23.1451 12.0003L19.7165 15.4289"
                            stroke="#1D1E22"
                            strokeLinecap="round"
                            strokeLinejoin="round"
                          />
                        </g>
                        <defs>
                          <clipPath id="clip0_3125_16369">
                            <rect width="24" height="24" fill="white" />
                          </clipPath>
                        </defs>
                      </svg>
                    )}
                  </MenuButton>
                </li>
              </div>
              <Button
                className={styles.sideBarButton}
                style={{ marginTop: '1rem' }}
                text={language === 'RU' ? 'Подать объявление' : 'Submit an ad'}
                variant={user ? 'secondary' : 'primary'}
                onClick={() => {
                  closeSideMenu()
                  user.profile.is_completed ? navigate(generatePath(LotPathE.CreateLot)) : openModal(Modal.EmptyProfile)
                }}
              >
                <svg width="22" height="22" viewBox="0 0 22 22" fill="none" xmlns="http://www.w3.org/2000/svg">
                  <path d="M11 1V21V1ZM1 10.9385H21H1Z" fill="white" />
                  <path d="M11 1V21M1 10.9385H21" stroke={user ? 'green' : 'white'} strokeLinecap="round" strokeLinejoin="round" />
                </svg>
              </Button>
            </ul>
          ) : (
            <div className="flex flex-col gap-4">
              <div className="w-full relative h-[0px] border border-zinc-300" />
              <Button
                className={styles.sideBarButton}
                onClick={() => {
                  closeSideMenu()
                  setModalState(1)
                  setShow(true)
                }}
                text={language === 'RU' ? 'Вход в аккаунт и регистрация' : 'Sign up & sign in'}
                variant="secondary"
              />
              <Button
                className={styles.sideBarButton}
                text={language === 'RU' ? 'Подать объявление' : 'Submit an ad'}
                variant={user ? 'secondary' : 'primary'}
                onClick={() => {
                  openModal(Modal.EmptyProfile)
                  closeSideMenu()
                }}
              >
                <svg width="22" height="22" viewBox="0 0 22 22" fill="none" xmlns="http://www.w3.org/2000/svg">
                  <path d="M11 1V21V1ZM1 10.9385H21H1Z" fill="white" />
                  <path d="M11 1V21M1 10.9385H21" stroke={user ? 'green' : 'white'} strokeLinecap="round" strokeLinejoin="round" />
                </svg>
              </Button>
            </div>
          )}
        </nav>
        {show && (
          <Portal close={() => setShow(false)}>
            <LoginModal selectedState={modalState} close={() => setShow(false)} />
          </Portal>
        )}
      </header>
      {newModal && <DefaultModal variant={variant} onClose={() => setNewModal(false)} />}
    </>
  )
}
