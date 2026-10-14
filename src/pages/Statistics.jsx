import ErrorMessage from '../components/ErrorMessage.jsx'
import Loader from '../components/Loader.jsx'
import PageTitle from '../components/PageTitle.jsx'
import SectionTitle from '../components/SectionTitle.jsx'
import StatCard from '../components/StatCard.jsx'
import { useFetch } from '../hooks/useFetch.js'
import { getStats } from '../services/api.js'
import calendarIcon from '../assets/icons/calendar_month.png'
import eyeIcon from '../assets/icons/visibility.png'
import personIcon from '../assets/icons/person_white.png'
import trendIcon from '../assets/icons/trending_up.png'

// Какие карточки показывать: ключ — поле в данных статистики
const cards = [
  { key: 'views', label: 'Просмотры', icon: eyeIcon },
  { key: 'usage', label: 'Использование', icon: personIcon },
  { key: 'newClients', label: 'Новые клиенты', icon: trendIcon },
]

// Страница статистики
function Statistics() {
  const { data: stats, loading, error } = useFetch(getStats)

  return (
    <div className="px-5 pt-8">
      <PageTitle>Статистика</PageTitle>

      {loading && <Loader />}
      {error && <ErrorMessage message={error} />}

      {stats && (
        <>
          {/* Период */}
          <div className="mt-6 flex w-full items-center gap-3 rounded-xl bg-white px-3 py-3 shadow-card">
            <img src={calendarIcon} alt="" className="h-5 w-[18px]" />
            <span className="flex-1 text-[15px] font-medium text-gray-400">{stats.dateRange}</span>
            <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="#9ca3af" strokeWidth="2.5">
              <path d="m4 8 8 8 8-8" strokeLinecap="round" strokeLinejoin="round" />
            </svg>
          </div>

          {/* Карточки: две в ряду, третья под ними */}
          <div className="mt-6 grid grid-cols-2 gap-3.5">
            {cards.map((card) => (
              <StatCard
                key={card.key}
                label={card.label}
                value={stats[card.key].toLocaleString('ru-RU')}
                icon={card.icon}
              />
            ))}
          </div>

          <div className="mt-8">
            <SectionTitle>Статистика использования</SectionTitle>
            {/* Место под график */}
            <div className="mt-4 h-[150px] bg-placeholder" />
          </div>
        </>
      )}
    </div>
  )
}

export default Statistics
