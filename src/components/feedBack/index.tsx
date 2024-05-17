import Person from "../../assets/images/feedbackPerson.png";
import BG from "../../assets/images/feedbackBG.png";
import { Input } from "../common/Input";
import Checkbox from "../common/checkbox";
import { Button } from "../common/buttons";
import DefaultLink from "../common/DefaultLink";

export default function FeedBack() {
  return (
    <div className="w-full mb-[360px] lg:mb-0 relative">
      <img
        src={Person}
        height={247}
        width={350}
        style={{
          objectFit: "scale-down",
          zIndex: "20",
          position: "relative",
          marginLeft: "20px",
        }}
        alt="feed-back"
      />
      <div className="w-full xl:h-[215px] h-auto absolute top-[22px] left-0 z-0 bg-[#f3f3f3]">
        <img
          src={BG}
          style={{
            objectFit: "cover",
            position: "absolute",
            height: '100%',
            top: 0,
            bottom: 0,
            left: 0,
            right: 0,
          }}
          alt="background"
        />
        <div className="w-full h-full xl:py-[32px] py-[32px] xl:pl-[390px]  xl:pr-[40px] px-4 pt-[250px] relative z-20 flex flex-col gap-[10px]">
          <span className="text-sm leading-[16.8px] font-normal text-[#1D1E22]">
            Отправьте ваш электронный адрес и мы ответим
          </span>
          <div className="grid lg:grid-cols-2 grid-rows-2 w-full gap-[20px]">
            <div className="grid grid-cols-2 w-full gap-[10px]">
              <Input
                className="w-full"
                multiline={false}
                placeholder="Имя"
                name="name"
              />
              <Input
                className="w-full"
                multiline={false}
                placeholder="Электронная почта"
                name="email"
              />
              <Input
                multiline
                rows={2}
                placeholder="Сообщение"
                className="col-span-2"
                name="message"
                aria-multiline
              />
            </div>
            <div className="flex flex-col gap-[20px]">
              <Checkbox
                label={
                  <p className="max-w-[230px] text-sm text-[#808080] font-normal">
                    Я принимаю условия{" "}
                    <DefaultLink
                      text="Пользовательского соглашения"
                      style={{ color: "#008001" }}
                    />{" "}
                    и{" "}
                    <DefaultLink
                      text="Политику конфиденциальности"
                      style={{ color: "#008001" }}
                    />
                  </p>
                }
              />
              <Button variant="primary" text="Отправить" />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
