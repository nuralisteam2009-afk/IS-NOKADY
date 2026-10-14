import { useNavigate } from 'react-router-dom'
import DemoNote from '../components/DemoNote.jsx'
import ErrorMessage from '../components/ErrorMessage.jsx'
import Loader from '../components/Loader.jsx'
import PageHeader from '../components/PageHeader.jsx'
import Screen from '../components/Screen.jsx'
import { useFetch } from '../hooks/useFetch.js'
import { getProfile } from '../services/api.js'

// "Мои данные" (в макете этой страницы нет — сделана просто, в стиле остального сайта)
function MyData() {
  const navigate = useNavigate()
  const { data: profile, loading, error } = useFetch(getProfile)

  return (
    <Screen className="px-4 pt-8">
      <PageHeader title="Мои данные" onBack={() => navigate(-1)} />

      {loading && <Loader />}
      {error && <ErrorMessage message={error} />}

      {profile && (
        <div className="mt-8 flex items-center gap-3">
          <div className="h-[63px] w-[63px] shrink-0 rounded-full bg-placeholder" />
          <div>
            <p className="text-[18px] font-bold text-primary">{profile.name}</p>
            <p className="text-[13px] text-gray-500">{profile.role}</p>
          </div>
        </div>
      )}

      <DemoNote className="mt-6">Демо-режим: показаны тестовые данные.</DemoNote>
    </Screen>
  )
}

export default MyData
