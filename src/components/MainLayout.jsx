import { Outlet, useLocation } from 'react-router-dom'
import BottomNav from './BottomNav.jsx'

// Общая обёртка для страниц с нижней навигацией
function MainLayout() {
  const location = useLocation()

  return (
    <div className="mx-auto min-h-screen max-w-[430px] bg-white pb-[90px]">
      {/* key меняется при смене страницы, поэтому анимация появления запускается заново */}
      <div key={location.pathname} className="animate-fade-in">
        <Outlet />
      </div>
      <BottomNav />
    </div>
  )
}

export default MainLayout
