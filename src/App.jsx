import { Routes, Route, Navigate } from 'react-router-dom'
import MainLayout from './components/MainLayout.jsx'
import Login from './pages/Login.jsx'
import Home from './pages/Home.jsx'
import Statistics from './pages/Statistics.jsx'
import EditDiscount from './pages/EditDiscount.jsx'
import Profile from './pages/Profile.jsx'
import DiscountDetail from './pages/DiscountDetail.jsx'
import QrCode from './pages/QrCode.jsx'
import MyData from './pages/MyData.jsx'
import History from './pages/History.jsx'
import Notifications from './pages/Notifications.jsx'
import Support from './pages/Support.jsx'

function App() {
  return (
    <Routes>
      <Route path="/" element={<Login />} />

      {/* Страницы с нижней навигацией */}
      <Route element={<MainLayout />}>
        <Route path="/home" element={<Home />} />
        <Route path="/statistics" element={<Statistics />} />
        <Route path="/discounts" element={<EditDiscount />} />
        <Route path="/profile" element={<Profile />} />
      </Route>

      {/* Страницы без нижней навигации (как на скриншотах) */}
      <Route path="/discount/:id" element={<DiscountDetail />} />
      <Route path="/discount/:id/qr" element={<QrCode />} />
      <Route path="/profile/data" element={<MyData />} />
      <Route path="/profile/history" element={<History />} />
      <Route path="/profile/notifications" element={<Notifications />} />
      <Route path="/profile/support" element={<Support />} />

      {/* Неизвестный адрес — возвращаем на экран входа */}
      <Route path="*" element={<Navigate to="/" replace />} />
    </Routes>
  )
}

export default App
