import { FC } from 'react'
import { ImagePlaceholder } from '../../assets/svg/imagePlaceholder'

type ImagesInputT = {
  images: { image: File | string | null; id: number }[] | undefined
  setImages: (value: any) => void
  editLot: boolean
}

export const ImagesInput: FC<ImagesInputT> = ({ images, setImages, editLot }) => {
  const deleteStorageImage = (order: number) => {
    const pureImageState = [
      {
        image: null,
        id: order // Используем id инпута как идентификатор
      }
    ]

    setImages((prevImages: any) => {
      const updatedImages = [...prevImages]
      pureImageState.forEach((newImage) => {
        const existingIndex = updatedImages.findIndex((image) => image.id === newImage.id)
        if (existingIndex !== -1) {
          updatedImages[existingIndex] = newImage
        } else {
          updatedImages.push(newImage)
        }
      })
      return updatedImages
    })
  }

  const handleImageUpload = (event: React.ChangeEvent<HTMLInputElement>) => {
    if (event.target.files) {
      if (!editLot) {
        const newImages = Array.from(event.target.files).map((file) => ({
          image: file,
          id: Number(event.target.id) // Используем id инпута как идентификатор
        }))

        // Перезаписываем существующие элементы с таким же inputId
        setImages((prevImages: any) => {
          const updatedImages = [...prevImages]
          newImages.forEach((newImage) => {
            const existingIndex = updatedImages.findIndex((image) => image.id === newImage.id)
            if (existingIndex !== -1) {
              updatedImages[existingIndex] = newImage
            } else {
              updatedImages.push(newImage)
            }
          })
          return updatedImages
        })
      } else {
        const newImages = Array.from(event.target.files).map((file) => ({
          image: file,
          order: Number(event.target.id) // Используем id инпута как идентификатор
        }))

        // Перезаписываем существующие элементы с таким же inputId
        setImages((prevImages: any) => {
          const updatedImages = [...prevImages]
          newImages.forEach((newImage) => {
            const existingIndex = updatedImages.findIndex((image) => image.order === newImage.order)
            if (existingIndex !== -1) {
              updatedImages[existingIndex] = newImage
            } else {
              updatedImages.push(newImage)
            }
          })
          return updatedImages
        })
      }
    }
  }

  return (
    <div className="w-full lg:h-[174px] h-full px-8 py-4 relative flex-col justify-center items-center inline-flex">
      <div className="w-full absolute top-0 bottom-0 left-0 right-0 bg-stone-50 rounded shadow" />
      <div className="justify-start items-start gap-[20px] lg:gap-[87px] flex-col lg:flex-row inline-flex">
        <div className="w-[110px] h-[110px] relative cursor-pointer">
          {images && images[0].image ? (
            <>
              <img
                src={typeof images[0].image === 'object' ? URL.createObjectURL(images[0].image) : images[0].image}
                alt="image-upload"
                data-input-id={images[0].id}
                className="object-contain w-full h-full"
              />
              <button
                className="absolute top-0 right-0 w-4 h-4 border rounded-sm shadow-md bg-slate-200 text-slate-500 flex items-center hover:text-slate-400 hover:bg-slate-100 transition-all duration-200 justify-center font-bold"
                onClick={() => deleteStorageImage(1)}
              >
                <p className="text-xs text-center ">x</p>
              </button>
            </>
          ) : (
            <div className="w-full h-full relative border flex items-center justify-center bg-white shadow-md border-dashed border-black rounded cursor-pointer">
              <ImagePlaceholder />
              <input type="file" className="opacity-0 absolute top-0 bottom-0 left-0 right-0 cursor-pointer" onChange={handleImageUpload} id={'1'} />
            </div>
          )}
        </div>
        <div className="w-[110px] h-[110px] relative cursor-pointer">
          {images && images[1] && images[1].image ? (
            <>
              <img
                className="object-contain w-full h-full"
                src={typeof images[1].image === 'object' ? URL.createObjectURL(images[1].image) : images[1].image}
                alt="image-upload"
              />
              <button
                className="absolute top-0 right-0 w-4 h-4 border rounded-sm shadow-md bg-slate-200 text-slate-500 flex items-center hover:text-slate-400 hover:bg-slate-100 transition-all duration-200 justify-center font-bold"
                onClick={() => deleteStorageImage(2)}
              >
                <p className="text-xs text-center ">x</p>
              </button>
            </>
          ) : (
            <div className="w-full h-full relative border flex items-center justify-center bg-white shadow-md border-dashed border-black rounded cursor-pointer">
              <ImagePlaceholder />
              <input type="file" className="opacity-0 absolute top-0 bottom-0 left-0 right-0 cursor-pointer" onChange={handleImageUpload} id={'2'} />
            </div>
          )}
        </div>
        <div className="w-[110px] h-[110px] relative cursor-pointer">
          {images && images[2] && images[2].image ? (
            <>
              <img
                className="object-contain w-full h-full"
                src={typeof images[2].image === 'object' ? URL.createObjectURL(images[2].image) : images[2].image}
                alt="image-upload"
              />
              <button
                className="absolute top-0 right-0 w-4 h-4 border rounded-sm shadow-md bg-slate-200 text-slate-500 flex items-center hover:text-slate-400 hover:bg-slate-100 transition-all duration-200 justify-center font-bold"
                onClick={() => deleteStorageImage(3)}
              >
                <p className="text-xs text-center ">x</p>
              </button>
            </>
          ) : (
            <div className="w-full h-full relative border flex items-center justify-center bg-white shadow-md border-dashed border-black rounded cursor-pointer">
              <ImagePlaceholder />
              <input type="file" className="opacity-0 absolute top-0 bottom-0 left-0 right-0 cursor-pointer" onChange={handleImageUpload} id={'3'} />
            </div>
          )}
        </div>
        <div className="w-[110px] h-[110px] relative cursor-pointer">
          {images && images[3] && images[3].image ? (
            <>
              <img
                className="object-contain w-full h-full"
                src={typeof images[3].image === 'object' ? URL.createObjectURL(images[3].image) : images[3].image}
                alt="image-upload"
              />
              <button
                className="absolute top-0 right-0 w-4 h-4 border rounded-sm shadow-md bg-slate-200 text-slate-500 flex items-center hover:text-slate-400 hover:bg-slate-100 transition-all duration-200 justify-center font-bold"
                onClick={() => deleteStorageImage(4)}
              >
                <p className="text-xs text-center ">x</p>
              </button>
            </>
          ) : (
            <div className="w-full h-full relative border flex items-center justify-center bg-white shadow-md border-dashed border-black rounded cursor-pointer">
              <ImagePlaceholder />
              <input type="file" className="opacity-0 absolute top-0 bottom-0 left-0 right-0 cursor-pointer" onChange={handleImageUpload} id={'4'} />
            </div>
          )}
        </div>
        <div className="w-[110px] h-[110px] relative cursor-pointer">
          {images && images[4] && images[4].image ? (
            <>
              <img
                className="object-contain w-full h-full"
                src={typeof images[4].image === 'object' ? URL.createObjectURL(images[4].image) : images[4].image}
                alt="image-upload"
              />
              <button
                className="absolute top-0 right-0 w-4 h-4 border rounded-sm shadow-md bg-slate-200 text-slate-500 flex items-center hover:text-slate-400 hover:bg-slate-100 transition-all duration-200 justify-center font-bold"
                onClick={() => deleteStorageImage(5)}
              >
                <p className="text-xs text-center ">x</p>
              </button>
            </>
          ) : (
            <div className="w-full h-full relative border flex items-center justify-center bg-white shadow-md border-dashed border-black rounded cursor-pointer">
              <ImagePlaceholder />
              <input type="file" className="opacity-0 absolute top-0 bottom-0 left-0 right-0 cursor-pointer" onChange={handleImageUpload} id={'5'} />
            </div>
          )}
        </div>
        <div className="w-[110px] h-[110px] relative cursor-pointer">
          {images && images[5] && images[5].image ? (
            <>
              <img
                className="object-contain w-full h-full"
                src={typeof images[5].image === 'object' ? URL.createObjectURL(images[5].image) : images[5].image}
                alt="image-upload"
              />
              <button
                className="absolute top-0 right-0 w-4 h-4 border rounded-sm shadow-md bg-slate-200 text-slate-500 flex items-center hover:text-slate-400 hover:bg-slate-100 transition-all duration-200 justify-center font-bold"
                onClick={() => deleteStorageImage(6)}
              >
                <p className="text-xs text-center ">x</p>
              </button>
            </>
          ) : (
            <div className="w-full h-full relative border flex items-center justify-center bg-white shadow-md border-dashed border-black rounded cursor-pointer">
              <ImagePlaceholder />
              <input type="file" className="opacity-0 absolute top-0 bottom-0 left-0 right-0 cursor-pointer" onChange={handleImageUpload} id={'6'} />
            </div>
          )}
        </div>
      </div>
    </div>
  )
}
