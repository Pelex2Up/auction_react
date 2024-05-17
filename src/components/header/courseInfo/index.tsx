import { fetchData } from "../../../api/fetchData";
import { FC, useEffect, useState } from "react";
import usaDollar from "../../../assets/icons/usa.svg";
import euro from "../../../assets/icons/euro.svg";
import rub from "../../../assets/icons/russia.svg";

export const CourseInfo: FC = () => {
  const [usDollar, setUsDollar] = useState<number>();
  const [euroVal, setEuroVal] = useState<number>();
  const [rubVal, setRubVal] = useState<number>();

  useEffect(() => {
    if (!usDollar) {
      fetchData("https://api.nbrb.by/exrates/rates/431").then(
        (data: { Cur_OfficialRate: number }) =>
          setUsDollar(data.Cur_OfficialRate)
      );
    }
    if (!euroVal) {
      fetchData("https://api.nbrb.by/exrates/rates/451").then(
        (data: { Cur_OfficialRate: number }) =>
          setEuroVal(data.Cur_OfficialRate)
      );
    }
    if (!rubVal) {
      fetchData("https://api.nbrb.by/exrates/rates/456").then(
        (data: { Cur_OfficialRate: number }) => setRubVal(data.Cur_OfficialRate)
      );
    }
  }, [euroVal, rubVal, usDollar]);

  const today = new Date();
  const date = () => {
    const array = today.toLocaleDateString().split("/");
    const formated =
      array.length === 3 &&
      `${array[1].padStart(2, "0")}.${array[0].padStart(2, "0")}.${array[2]}`;
    return formated;
  };

  return (
    <div className="flex flex-row gap-8 text-sm items-center">
      <p>
        Курс валют НБРБ на {String(today.getDate()).padStart(2, "0")}.
        {String(today.getMonth() + 1).padStart(2, "0")}.{today.getFullYear()}:
      </p>
      <div className="flex gap-2 items-center">
        <img src={usaDollar} alt="us-dollar" />
        <p>USD</p>
        {usDollar}
      </div>
      <div className="flex gap-2 items-center">
        <img src={euro} alt="euro" />
        <p>EUR</p>
        {euroVal}
      </div>
      <div className="flex gap-2 items-center">
        <img src={rub} alt="euro" />
        <p className="flex gap-1">
          RUB <span className="font-medium text-xs ">100</span>
        </p>
        {rubVal}
      </div>
    </div>
  );
};

export default CourseInfo;
