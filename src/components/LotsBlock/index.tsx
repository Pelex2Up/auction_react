import { FC } from "react";
import AuctionCard from "../cards/auction";
import { FixedCard } from "../cards/fixed";
import { SmallCard } from "../cards/smallCard";

export const LotsBlock: FC = () => {
  return (
    <div className="w-full xl:h-[490px] h-full flex-col justify-center items-start gap-8 inline-flex xl:px-[60px] px-5">
      <div className="self-stretch justify-between items-center inline-flex">
        <div className="w-[372px] h-[29px] pr-[7px] justify-start items-center flex">
          <div className="text-zinc-900 text-2xl font-medium font-['SF Pro Text'] leading-[28.80px] tracking-tight">
            Товары по сниженным ценам
          </div>
        </div>
        <div className="justify-start items-start gap-6 flex">
          <div className="w-10 h-10 relative origin-top-left">
            <div className="w-10 h-10 left-0 top-0 absolute bg-white rounded-full shadow" />
            <div className="w-[18px] h-[18px] px-[4.95px] py-[0.64px] left-[29px] top-[29px] absolute origin-top-left -rotate-180 justify-center items-center inline-flex">
              <svg
                width="10"
                height="18"
                viewBox="0 0 10 18"
                fill="none"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path
                  d="M0.952736 17.3569L8.85988 9.44979C8.92137 9.39207 8.97039 9.32237 9.0039 9.24497C9.0374 9.16757 9.05469 9.08413 9.05469 8.99979C9.05469 8.91545 9.0374 8.83201 9.0039 8.75461C8.97039 8.67721 8.92137 8.60751 8.85988 8.54979L0.952736 0.642647"
                  stroke="#1D1E22"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                />
              </svg>
            </div>
          </div>
          <div className="w-10 h-10 relative">
            <div className="w-10 h-10 left-0 top-0 absolute bg-white rounded-full shadow" />
            <div className="w-[18px] h-[18px] px-[4.95px] py-[0.64px] left-[29px] top-[29px] absolute origin-top-left -rotate-180 justify-center items-center inline-flex">
              <svg
                width="10"
                height="18"
                viewBox="0 0 10 18"
                fill="none"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path
                  d="M9.04726 17.3569L1.14012 9.44979C1.07863 9.39207 1.02961 9.32237 0.996105 9.24497C0.962599 9.16757 0.945312 9.08413 0.945312 8.99979C0.945312 8.91545 0.962599 8.83201 0.996105 8.75461C1.02961 8.67721 1.07863 8.60751 1.14012 8.54979L9.04726 0.642647"
                  stroke="#1D1E22"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                />
              </svg>
            </div>
          </div>
        </div>
      </div>
      <div className="w-full h-[450px] justify-start items-start xl:gap-6 gap-[270px] flex overflow-x-scroll overflow-y-hidden">
        <AuctionCard />
        <FixedCard />
        <SmallCard />
        <AuctionCard />
        <SmallCard/>
      </div>
    </div>
  );
};

export default LotsBlock;
