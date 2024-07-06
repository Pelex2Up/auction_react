import { FC, useEffect } from 'react'
import { Outlet, generatePath, useLocation, useNavigate } from 'react-router-dom'
import { MenuButton } from '../components/common/buttons'
import { selectLangSettings, selectUser, useAppDispatch, useAppSelector } from '../store/hooks'
import { useLogoutMutation } from '../api/loginService'
import { logoutState } from '../store/redux/users/slice'
import { PathE, ProfilePathE } from '../enum'
import { Loader } from '../components/Loader'
import styles from './defaultStyles.module.scss'

export const ProfilePage: FC = () => {
  const { language } = useAppSelector(selectLangSettings)
  const [logout, { isLoading, isSuccess }] = useLogoutMutation()
  const dispatch = useAppDispatch()
  const navigate = useNavigate()
  const { auth } = useAppSelector(selectUser)
  const path = useLocation()

  useEffect(() => {
    if (!auth) {
      navigate(generatePath(PathE.Home))
    }
  }, [auth, navigate])

  useEffect(() => {
    if (isSuccess) {
      dispatch(logoutState())
      navigate(generatePath(PathE.Home))
    }
  }, [dispatch, isSuccess, navigate])

  return (
    <div className="flex-col xl:flex-row flex gap-8 px-4 xl:px-[60px]">
      <ul className="min-w-[312px] w-[312px] h-min hidden xl:flex flex-col px-2 py-8 bg-[#F6F6F6] shadow-xl">
        <MenuButton
          text={language === 'RU' ? 'Мои объявления' : 'My advertisements'}
          className={path.pathname === ProfilePathE.MyLots ? styles.selected : ''}
          onClick={() => {
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
        <MenuButton
          text={language === 'RU' ? 'Мои заказы' : 'My orders'}
          onClick={() => {
            navigate(generatePath(ProfilePathE.MyPurchases))
          }}
          className={path.pathname === ProfilePathE.MyPurchases ? styles.selected : ''}
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
        <MenuButton
          text={language === 'RU' ? 'Настройки профиля' : 'Profile settings'}
          className={path.pathname === PathE.Profile ? styles.selected : ''}
          onClick={() => {
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
        <MenuButton
          text={language === 'RU' ? 'Мой тариф' : 'My tariff'}
          className={path.pathname === ProfilePathE.MyTariff ? styles.selected : ''}
          onClick={() => {
            navigate(generatePath(ProfilePathE.MyTariff))
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
        <div className="my-2 w-full relative h-[0px] border border-zinc-300" />
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
      </ul>
      <Outlet />
    </div>
  )
}
