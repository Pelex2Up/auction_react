import { FC } from "react";
import LotImage from "../../../assets/images/lot.png";

export const FixedCard: FC = () => {
  return (
    <div className="w-[255px] h-[420px] relative">
      <div className="w-[255px] h-[418px] left-0 top-0 absolute bg-white rounded shadow"></div>
      <div className="w-[255px] h-[197px] left-0 top-0 absolute justify-center items-center inline-flex">
        <img
          width={255}
          height={197}
          className="w-[255px] h-[197px] rounded-tl rounded-tr"
          src={LotImage}
          alt="fixed-lot"
        />
      </div>
      <div className="w-[243px] left-0 top-[9px] absolute justify-between items-center inline-flex">
        <div className="p-2 bg-white rounded-tr rounded-br justify-start items-center gap-2.5 flex">
          <div className="text-green-800 text-xs font-normal font-['SF Pro Text'] leading-[14.40px] tracking-tight">
            Фиксированная цена
          </div>
        </div>
        <div className="w-6 h-6 pl-[1.09px] pr-[1.08px] py-[0.86px] justify-center items-center flex"></div>
      </div>
      <div className="left-[12px] top-[209px] absolute flex-col justify-start items-start gap-3 inline-flex">
        <div className="w-[231px] justify-between items-start inline-flex">
          <div className="flex-col justify-start items-start gap-1.5 inline-flex">
            <div className="text-zinc-500 text-sm font-normal font-['SF Pro Text'] leading-[16.80px] tracking-tight">
              Код товара
            </div>
            <div className="text-zinc-500 text-sm font-normal font-['SF Pro Text'] leading-[16.80px] tracking-tight">
              №000123
            </div>
          </div>
          <div className="w-[93px] flex-col justify-start items-end inline-flex">
            <div className="text-green-800 text-lg font-bold font-['SF Pro Text'] leading-snug tracking-tight">
              2 000 BYN
            </div>
          </div>
        </div>
        <div className="flex-col justify-start items-start gap-1.5 flex">
          <div className="text-green-800 text-base font-normal font-['SF Pro Text'] leading-tight tracking-tight">
            Высоковольтные провода{" "}
          </div>
          <div className="w-[231px] text-zinc-500 text-sm font-normal font-['SF Pro Text'] leading-[16.80px] tracking-tight">
            Предлагаю широкий выбор проводов высокого качества для различных
            целей. Независимо от того, нужны ...
          </div>
        </div>
      </div>
      <div className="left-[183px] top-[389px] absolute text-zinc-500 text-sm font-normal font-['SF Pro Text'] leading-[16.80px] tracking-tight">
        г. Минск
      </div>
    </div>
  );
};
