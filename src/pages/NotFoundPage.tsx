import React from 'react'
import { useNavigate } from 'react-router-dom'
import { PathE } from '../enum'
import { Button } from '../components/common/buttons'

const NotFoundPage: React.FC = () => {
  const navigate = useNavigate()

  /**
   * Call this function to redirect the user to the homepage.
   */
  const redirectToHomePage = () => {
    navigate(PathE.Home)
  }

  return (
    <div style={{ position: 'relative', width: '100%', display: 'flex', height: '50vh', justifyContent: 'center', alignItems: 'center', flexDirection: 'column', gap: '2rem' }}>
      <h1 style={{ fontSize: '2em', textAlign: 'center' }}>Упс 404! Страница которую вы искали не найдена.</h1>
      <Button text="Вернуться на главную" style={{ cursor: 'pointer' }} onClick={() => redirectToHomePage()} />
    </div>
  )
}

export default NotFoundPage
