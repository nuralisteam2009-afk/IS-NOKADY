import { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import ErrorMessage from '../components/ErrorMessage.jsx'
import Loader from '../components/Loader.jsx'
import LogoutButton from '../components/LogoutButton.jsx'
import ProfileMenuItem from '../components/ProfileMenuItem.jsx'
import { profileMenu } from '../data/profileMenu.js'
import { useFetch } from '../hooks/useFetch.js'
import { getProfile } from '../services/api.js'

// Страница "Профиль"
function Profile() {
  const navigate = useNavigate()
  const { data: profile, loading, error } = useFetch(getProfile)
  // id нажатого пункта меню (подсвечивается серым)
  const [activeId, setActiveId] = useState(1)

  const handleItemClick = (item) => {
    setActiveId(item.id)
    navigate(item.path)
  }

  return (
    <div className="px-5 pt-[60px]">
      {/* Аватар и имя в две строки */}
      <div className="flex min-h-[63px] items-center gap-3">
        <div className="h-[63px] w-[63px] shrink-0 rounded-full bg-placeholder" />
        {loading && <Loader />}
        {error && <ErrorMessage message={error} />}
        {profile && (
          <h1 className="text-[22px] font-bold leading-tight text-primary">
            {profile.name.split(' ').map((word) => (
              <span key={word} className="block">
                {word}
              </span>
            ))}
          </h1>
        )}
      </div>

      {/* Меню */}
      <div className="mt-10 space-y-px">
        {profileMenu.map((item) => (
          <ProfileMenuItem
            key={item.id}
            label={item.label}
            isActive={activeId === item.id}
            onClick={() => handleItemClick(item)}
          />
        ))}
      </div>

      <LogoutButton className="mt-14" />
    </div>
  )
}

export default Profile
