import { useNavigate } from 'react-router-dom'

// Серая кнопка "Выйти".
// Пока нет Backend, сессии не существует — кнопка просто возвращает на экран входа.
// Позже здесь нужно будет сообщить серверу о выходе и удалить токен.
function LogoutButton({ className = '' }) {
  const navigate = useNavigate()

  return (
    <button
      type="button"
      onClick={() => navigate('/', { replace: true })}
      className={`h-[38px] w-full rounded-xl bg-[#EBEBEB] text-[14px] font-medium text-primary active:opacity-80 ${className}`}
    >
      Выйти
    </button>
  )
}

export default LogoutButton
