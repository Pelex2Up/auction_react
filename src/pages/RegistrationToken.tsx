import { Suspense } from 'react'
import { useParams } from 'react-router-dom'
import { VerificationData } from '../components/VerificationData'

export default function RegistrationToken() {
  const { token } = useParams()

  return <Suspense fallback={<div className="w-full h-full text-center">Проверка токена...</div>}>{token && <VerificationData token={token} />}</Suspense>
}
