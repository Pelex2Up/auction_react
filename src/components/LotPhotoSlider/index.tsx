import { FC, useState } from 'react'
import { Swiper, SwiperSlide } from 'swiper/react'
import { IPhotoResponse } from '../../types/lotTypes'
import { FreeMode, Navigation, Thumbs } from 'swiper/modules'
import { Swiper as SwiperState } from 'swiper'

import './styles.css'
import 'swiper/css'
import 'swiper/css/free-mode'
import 'swiper/css/navigation'
import 'swiper/css/thumbs'

interface ILotPhotoSlider {
  images: IPhotoResponse[]
}

export const LotPhotoSlider: FC<ILotPhotoSlider> = ({ images }) => {
  const [thumbsSwiper, setThumbsSwiper] = useState<SwiperState | null>(null)
  return (
    <>
      <Swiper loop={true} spaceBetween={10} navigation={false} thumbs={{ swiper: thumbsSwiper }} modules={[FreeMode, Navigation, Thumbs]} className="mySwiper2">
        {images.map((image) => (
          <SwiperSlide key={image.id}>
            <img src={image.image} />
          </SwiperSlide>
        ))}
      </Swiper>
      {images.length > 1 && (
        <Swiper
          onSwiper={(swiper) => setThumbsSwiper(swiper)}
          loop={true}
          spaceBetween={10}
          slidesPerView={4}
          freeMode={true}
          watchSlidesProgress={true}
          modules={[FreeMode, Navigation, Thumbs]}
          className="mySwiper"
        >
          {images.map((image) => (
            <SwiperSlide key={image.order}>
              <img src={image.image} />
            </SwiperSlide>
          ))}
        </Swiper>
      )}
    </>
  )
}
