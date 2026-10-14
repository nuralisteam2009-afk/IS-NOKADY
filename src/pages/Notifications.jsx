import { useNavigate } from 'react-router-dom'
import ErrorMessage from '../components/ErrorMessage.jsx'
import IconTile from '../components/IconTile.jsx'
import Loader from '../components/Loader.jsx'
import PageHeader from '../components/PageHeader.jsx'
import Screen from '../components/Screen.jsx'
import { useFetch } from '../hooks/useFetch.js'
import { getNotifications } from '../services/api.js'

// Какая иконка у какого типа уведомления
const iconByType = {
  partner_review: 'handshake',
  discount_expiring: 'tag',
  resident_review: 'smile',
  support_request: 'info',
}

// Страница "Уведомления"
function Notifications() {
  const navigate = useNavigate()
  const { data: notifications, loading, error } = useFetch(getNotifications)

  return (
    <Screen className="px-4 pt-8">
      <PageHeader title="Уведомления" onBack={() => navigate(-1)} />

      {loading && <Loader />}
      {error && <ErrorMessage message={error} />}

      {notifications && (
        <ul className="mt-5">
          {notifications.map((item) => (
            <li key={item.id} className="flex gap-3 border-b border-gray-200 py-3 last:border-b-0">
              <IconTile name={iconByType[item.type] || 'info'} />
              <div className="min-w-0 flex-1">
                <p className="text-[15px] font-bold leading-snug text-black">{item.title}</p>
                <p className="mt-0.5 text-[11px] leading-snug text-gray-500">
                  {item.accent && <span className="text-primary">{item.accent} </span>}
                  {item.text}
                </p>
              </div>
              <p className="w-[70px] shrink-0 text-[10px] leading-snug text-gray-400">{item.time}</p>
            </li>
          ))}
        </ul>
      )}
    </Screen>
  )
}

export default Notifications
