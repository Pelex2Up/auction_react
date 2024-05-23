import { FC } from "react";

export const SmallCard: FC = () => {
  return (
    <div className="w-[255px] h-[420px] relative">
      <div className="w-[255px] h-[418px] left-0 top-0 absolute bg-white rounded shadow"></div>
      <div className="w-[139px] h-[98px] left-[12px] top-[12px] absolute">
        <div className="w-[65px] h-[65px] pl-[21px] pr-[23px] pt-[15px] pb-3.5 left-0 top-0 absolute bg-green-800 rounded justify-center items-center inline-flex">
          <div className="w-[21px] h-9 text-white text-3xl font-medium font-['SF Pro Text'] leading-9 tracking-tight">
            Г
          </div>
        </div>
        <div className="w-[122px] left-[4px] top-[81px] absolute text-zinc-900 text-sm font-normal font-['SF Pro Text'] leading-[16.80px] tracking-tight">
          ИП Гренкина А.А
        </div>
      </div>
      <div className="w-[230px] left-[12px] top-[134px] absolute text-green-800 text-base font-normal font-['SF Pro Text'] leading-tight tracking-tight">
        Куплю шлифовальную машину
      </div>
      <div className="w-[231px] left-[12px] top-[178px] absolute text-zinc-500 text-sm font-normal font-['SF Pro Text'] leading-[16.80px] tracking-tight">
        Ищу качественную шлифовальную машину для стен и потолков WATT WDW-225.
        Можете предложить как новые, так и б.у в хорошем состоянии
      </div>
      <div className="w-[197px] left-[12px] top-[287px] absolute text-zinc-900 text-sm font-normal font-['SF Pro Text'] leading-[16.80px] tracking-tight">
        Предложенная стоимость
      </div>
      <div className="left-[12px] top-[312px] absolute text-green-800 text-lg font-bold font-['SF Pro Text'] leading-snug tracking-tight">
        1 500 BYN{" "}
      </div>
      <div className="w-[26px] h-6 pl-[1.18px] pr-[1.17px] py-[0.86px] left-[217px] top-[12px] absolute justify-center items-center inline-flex"></div>
      <div className="left-[183px] top-[389px] absolute text-zinc-500 text-sm font-normal font-['SF Pro Text'] leading-[16.80px] tracking-tight">
        г. Минск
      </div>
    </div>
  );
};
