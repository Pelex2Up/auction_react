import { FC } from "react";

export const BetAuction: FC = () => {
  return (
    <div className="w-[422px] h-[353px] relative">
  <div className="w-[422px] h-[354px] left-0 top-[-1px] absolute bg-stone-50 rounded shadow"></div>
  <div className="w-[422px] h-[84px] left-0 top-[269px] absolute flex-col justify-start items-center gap-[18px] inline-flex">
    <div className="w-[422px] h-[0px] border border-zinc-300"></div>
    <div className="w-[358px]"><span className="text-zinc-500 text-xs font-normal font-['SF Pro Text'] leading-[14.40px] tracking-tight">Ваша ставка последняя, повторно сделать ставку станет возможным  после поднятия ее на шаг.<br/>Следите за заказом в Личном кабинете/ </span><span className="text-green-800 text-xs font-normal font-['SF Pro Text'] underline leading-[14.40px] tracking-tight">Мои заказы</span></div>
  </div>
  <div className="w-6 h-6 pl-[1.09px] pr-[1.08px] py-[0.86px] left-[366px] top-[24px] absolute justify-center items-center inline-flex"></div>
  <div className="left-[32px] top-[24px] absolute flex-col justify-center items-start gap-1 inline-flex">
    <div className="text-zinc-500 text-sm font-normal font-['SF Pro Text'] leading-[16.80px] tracking-tight">Текущая цена</div>
    <div className="text-right text-green-800 text-[32px] font-bold font-['SF Pro Text'] leading-[38.40px] tracking-tight">2 000 BYN</div>
  </div>
  <div className="left-[211px] top-[55px] absolute text-right text-zinc-500 text-lg font-normal font-['SF Pro Text'] leading-snug tracking-tight">/</div>
  <div className="left-[221px] top-[58px] absolute text-right text-zinc-500 text-lg font-normal font-['SF Pro Text'] leading-snug tracking-tight">3 шт </div>
  <div className="left-[32px] top-[205px] absolute justify-start items-start gap-[18px] inline-flex">
    <div className="w-[170px] h-10 px-4 py-[7px] bg-white rounded border border-green-800 justify-center items-center gap-2.5 flex">
      <div className="text-green-800 text-sm font-normal font-['SF Pro Text'] leading-[16.80px] tracking-tight">Написать продавцу</div>
    </div>
    <div className="w-[170px] h-10 px-4 py-[7px] bg-neutral-100 rounded border border-zinc-500 justify-center items-center gap-2.5 flex">
      <div className="text-zinc-500 text-sm font-normal font-['SF Pro Text'] leading-[16.80px] tracking-tight">Сделать ставку</div>
    </div>
  </div>
  <div className="left-[32px] top-[99px] absolute justify-start items-end gap-[18px] inline-flex">
    <div className="w-[170px] h-12 relative">
      <div className="w-[170px] h-10 p-3 left-0 top-[8px] absolute rounded border border-zinc-300 justify-between items-center inline-flex">
        <div className="text-zinc-500 text-sm font-normal font-['SF Pro Text'] leading-[17px]">2 050</div>
        <div className="text-zinc-500 text-sm font-normal font-['SF Pro Text'] leading-[17px]">BYN</div>
      </div>
      <div className="px-1 left-[8px] top-0 absolute bg-stone-50 justify-start items-start gap-2.5 inline-flex">
        <div className="text-zinc-500 text-xs font-normal font-['SF Pro Text'] leading-none">Ваша ставка</div>
      </div>
    </div>
    <div className="w-[152px] flex-col justify-start items-start gap-1.5 inline-flex">
      <div className="text-zinc-900 text-sm font-normal font-['SF Pro Text'] leading-[16.80px] tracking-tight">Окончание аукциона:</div>
      <div className="flex-col justify-start items-start gap-1.5 flex">
        <div className="justify-start items-start gap-1.5 inline-flex">
          <div className="text-zinc-500 text-sm font-normal font-['SF Pro Text'] leading-[16.80px] tracking-tight">25-08-2023</div>
          <div className="text-zinc-500 text-sm font-normal font-['SF Pro Text'] leading-[16.80px] tracking-tight">10:00</div>
        </div>
      </div>
    </div>
  </div>
  <div className="w-[167px] left-[35px] top-[153px] absolute text-zinc-500 text-xs font-normal font-['SF Pro Text'] leading-[14.40px] tracking-tight">Мин.ставка 2050 BYN, <br/>шаг ставки 50 BYN</div>
</div>
  );
};
