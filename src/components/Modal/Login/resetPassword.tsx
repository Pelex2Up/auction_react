import { Input } from "../../common/Input";
import { Button } from "../../common/buttons";
import { FC } from "react";

export const ResetPassword: FC = () => {
  return (
    <div className="w-[500px] h-auto relative">
      <Button
        style={{ width: "315px" }}
        className="left-[94px] top-[302px] absolute"
        text="Сбросить текущий пароль"
      />
      <div className="left-[33px] top-[97px] absolute text-zinc-900 text-lg font-normal font-['SF Pro Text'] leading-snug tracking-tight">
        Восстановление пароля
      </div>
      <div className="w-[501px] h-[0px] left-[1px] top-[175px] absolute border border-zinc-300"></div>

      <div className="w-[315px] h-[63px] left-[93px] top-[209px] absolute flex-col justify-center items-start gap-1.5 inline-flex">
        <div className="justify-start items-start gap-0.5 inline-flex">
          <label className="text-zinc-900 text-sm font-normal font-['SF Pro Text'] leading-[16.80px] tracking-tight">
            Электронная почта
          </label>
        </div>
        <Input
          multiline={false}
          placeholder="Ваша электронная почта"
          className="w-full"
          name="email"
          type="email"
        />
      </div>
      <div className="w-[418px] left-[33px] top-[127px] absolute text-zinc-500 text-xs font-normal font-['SF Pro Text'] leading-[14.40px] tracking-tight">
        Введите вашу электронную почту, указаную при регистрации.
        <br />
        Мы отправим на нее ссылку для восстановления пароля
      </div>
    </div>
  );
};

export default ResetPassword;
