import FeedBack from '../components/feedBack'
import Logo from '../assets/logo/logo.svg'
import SearchBlock from '../components/SearchBlock'
import { SliderAds } from '../components/AdsBlock/SliderPreview'
import LotsBlock from '../components/LotsBlock'
import { FC } from 'react'

export const Home: FC = () => {
  return (
    <main className="w-full h-auto flex flex-col gap-8">
      <div className="xl:w-full xl:h-[54px] xl:justify-center xl:items-center xl:inline-flex xl:px-[60px] hidden">
        <div className="grow shrink basis-0 self-stretch justify-between items-center inline-flex">
          <img src={Logo} alt="logo" />
          <div className="justify-end items-center gap-6 flex">
            <div className="justify-start items-center gap-6 flex">
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
            <div className="justify-start items-center gap-[13px] flex">
              <div className="w-6 h-6 pl-[0.86px] pr-[0.85px] py-[0.86px] justify-center items-center flex">
                <div className="w-[22.29px] h-[22.29px] relative">
                  <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                    <g clipPath="url(#clip0_3101_19283)">
                      <path
                        d="M12.0022 23.1431C18.1563 23.1431 23.1451 18.1543 23.1451 12.0003C23.1451 5.84625 18.1563 0.857422 12.0022 0.857422C5.8482 0.857422 0.859375 5.84625 0.859375 12.0003C0.859375 18.1543 5.8482 23.1431 12.0022 23.1431Z"
                        stroke="#1D1E22"
                        strokeLinecap="round"
                        strokeLinejoin="round"
                      />
                      <path
                        d="M0.859375 12.0003H23.1451M16.2879 12.0003C16.0774 16.0751 14.5765 19.9774 12.0022 23.1431C9.42792 19.9774 7.92703 16.0751 7.71652 12.0003C7.92703 7.92544 9.42792 4.02311 12.0022 0.857422C14.5765 4.02311 16.0774 7.92544 16.2879 12.0003Z"
                        stroke="#1D1E22"
                        strokeLinecap="round"
                        strokeLinejoin="round"
                      />
                    </g>
                    <defs>
                      <clipPath id="clip0_3101_19283">
                        <rect width="24" height="24" fill="white" />
                      </clipPath>
                    </defs>
                  </svg>
                </div>
              </div>
              <div className="text-zinc-900 text-sm font-normal font-['SF Pro Text']">Русский-USD</div>
            </div>
          </div>
        </div>
      </div>
      <SearchBlock />
      <SliderAds />
      <LotsBlock />
      <FeedBack />
    </main>
  )
}
