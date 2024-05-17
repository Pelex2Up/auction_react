import { FC } from "react";
import Ad1 from "../../../assets/ads/sport.png";
import Ad2 from "../../../assets/ads/sale.png";
import Ad3 from "../../../assets/ads/pc.png";

export const SliderAds: FC = () => {
  return (
    <div className="w-full h-[527px] flex-col justify-center items-start gap-8 inline-flex lg:px-[60px] px-5">
      <div className="lg:w-[1320px] w-full grow shrink basis-0 flex-col justify-center items-start gap-8 inline-flex">
        <div className="w-32 h-[29px] pr-[23px] justify-start items-center inline-flex">
          <div className="text-zinc-900 text-2xl font-medium font-['SF Pro Text'] leading-[28.80px] tracking-tight">
            Реклама
          </div>
        </div>
        <div className="self-stretch justify-start items-start gap-6 inline-flex overflow-hidden">
          <img
            className="w-[312px] h-[418px] rounded shadow"
            src={Ad1}
            alt=""
          />
          <img
            className="w-[312px] h-[418px] rounded shadow"
            src={Ad2}
            alt=""
          />
          <img className="w-[312px] h-[418px] rounded" src={Ad3} alt="" />
          <img className="w-[312px] h-[418px] rounded" src={Ad1} alt="" />
        </div>
      </div>
      <div className="self-stretch justify-center items-start gap-3 inline-flex">
        <div className="justify-start items-center gap-3 flex">
          <div className="w-3.5 h-3.5 pl-px pr-[0.62px] py-1 origin-top-left rotate-90 justify-center items-center flex"></div>
        </div>
        <div className="justify-start items-start gap-1.5 flex">
          <div className="justify-start items-start gap-1.5 flex">
            <div className="text-zinc-500 text-sm font-normal font-['SF Pro Text'] leading-none">
              1
            </div>
            <div className="text-green-700 text-sm font-normal font-['SF Pro Text'] leading-none">
              2
            </div>
            <div className="text-zinc-500 text-sm font-normal font-['SF Pro Text'] leading-none">
              3
            </div>
            <div className="text-zinc-500 text-sm font-normal font-['SF Pro Text'] leading-none">
              4
            </div>
          </div>
          <div className="justify-start items-start gap-1 flex">
            <div className="text-zinc-500 text-sm font-normal font-['SF Pro Text'] leading-none">
              .
            </div>
            <div className="text-zinc-500 text-sm font-normal font-['SF Pro Text'] leading-none">
              .
            </div>
            <div className="text-zinc-500 text-sm font-normal font-['SF Pro Text'] leading-none">
              .
            </div>
          </div>
          <div className="text-zinc-500 text-sm font-normal font-['SF Pro Text'] leading-none">
            6
          </div>
        </div>
        <div className="justify-start items-center gap-3 flex">
          <div className="w-3.5 h-3.5 pl-px pr-[0.62px] py-1 origin-top-left -rotate-90 justify-center items-center flex"></div>
        </div>
      </div>
    </div>
  );
};
