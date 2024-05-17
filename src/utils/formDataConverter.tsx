export const formDataConverter = (data: object) => {
    const formdata = new FormData()
  
    Object.entries(data).forEach(([key, value]) => {
      formdata.append(key, value)
    })
    return formdata
  }