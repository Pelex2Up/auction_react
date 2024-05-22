'use client'
import { DetailedHTMLProps, FC, InputHTMLAttributes, TextareaHTMLAttributes, useState } from 'react'

type InputT = DetailedHTMLProps<InputHTMLAttributes<HTMLInputElement>, HTMLInputElement> & {
  multiline: boolean
  secure?: boolean
  error?: boolean
} & DetailedHTMLProps<TextareaHTMLAttributes<HTMLTextAreaElement>, HTMLTextAreaElement>

export const Input: FC<InputT> = ({ multiline, error = false, secure = false, ...rest }) => {
  const [eyeState, setEyeState] = useState<boolean>(secure || false)

  return !multiline ? (
    <div className="relative flex w-full">
      <input
        {...rest}
        type={eyeState ? 'password' : 'text'}
        style={error ? { border: '1px solid red' } : { border: '1px solid #D9D9D9' }}
        className={`${secure ? 'pr-12' : ''} p-[12px] rounded ${rest.disabled ? 'bg-[#F7F5F5] cursor-not-allowed' : 'bg-transparent'} text-sm font-normal relative ${
          rest.className
        }`}
      />
      {secure && (
        <span onClick={() => setEyeState((prev) => !prev)} className="absolute right-3 top-3">
          {eyeState ? (
            <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
              <path
                d="M21.0652 9.25603C21.7167 9.83888 22.2652 10.4046 22.6767 10.8503C22.961 11.1653 23.1183 11.5746 23.1183 11.9989C23.1183 12.4232 22.961 12.8325 22.6767 13.1475C20.8767 15.0846 16.7795 18.856 11.9967 18.856H11.311M6.63095 17.3646C4.64518 16.2524 2.85091 14.8286 1.31667 13.1475C1.03237 12.8325 0.875 12.4232 0.875 11.9989C0.875 11.5746 1.03237 11.1653 1.31667 10.8503C3.11667 8.91317 7.21381 5.14174 11.9967 5.14174C13.882 5.18115 15.7271 5.69401 17.3624 6.63317M21.4252 2.57031L2.5681 21.4275"
                stroke="#808080"
                strokeLinecap="round"
                strokeLinejoin="round"
              />
              <path
                d="M9.58174 14.416C8.93788 13.776 8.57414 12.9067 8.57031 11.9989C8.57031 11.0896 8.93154 10.2175 9.57452 9.57452C10.2175 8.93154 11.0896 8.57031 11.9989 8.57031C12.9067 8.57414 13.776 8.93788 14.416 9.58174M14.9817 13.7132C14.6766 14.2348 14.2389 14.6666 13.7132 14.9646"
                stroke="#808080"
                strokeLinecap="round"
                strokeLinejoin="round"
              />
            </svg>
          ) : (
            <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
              <path
                d="M22.6767 10.8511C22.961 11.1662 23.1183 11.5754 23.1183 11.9997C23.1183 12.424 22.961 12.8333 22.6767 13.1483C20.8767 15.0854 16.7795 18.8569 11.9967 18.8569C7.21381 18.8569 3.11667 15.0854 1.31667 13.1483C1.03237 12.8333 0.875 12.424 0.875 11.9997C0.875 11.5754 1.03237 11.1662 1.31667 10.8511C3.11667 8.91401 7.21381 5.14258 11.9967 5.14258C16.7795 5.14258 20.8767 8.91401 22.6767 10.8511Z"
                stroke="#808080"
                strokeLinecap="round"
                strokeLinejoin="round"
              />
              <path
                d="M11.9989 15.4275C13.8924 15.4275 15.4275 13.8924 15.4275 11.9989C15.4275 10.1053 13.8924 8.57031 11.9989 8.57031C10.1053 8.57031 8.57031 10.1053 8.57031 11.9989C8.57031 13.8924 10.1053 15.4275 11.9989 15.4275Z"
                stroke="#808080"
                strokeLinecap="round"
                strokeLinejoin="round"
              />
            </svg>
          )}
        </span>
      )}
    </div>
  ) : (
    <textarea {...rest} style={{ border: '1px solid #D9D9D9' }} className={`p-[12px] rounded bg-transparent text-sm font-normal ${rest.className}`} />
  )
}

export default Input
