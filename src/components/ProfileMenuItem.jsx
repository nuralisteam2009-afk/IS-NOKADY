// Одна строка меню профиля: текст слева, стрелка справа
function ProfileMenuItem({ label, isActive, onClick }) {
  return (
    <button
      type="button"
      onClick={onClick}
      className={
        'flex h-[38px] w-full items-center justify-between px-2.5 text-left transition-colors ' +
        (isActive ? 'bg-[#E9E9E9]' : 'bg-transparent active:bg-[#E9E9E9]')
      }
    >
      <span className="text-[14px] font-medium text-black">{label}</span>
      <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="#c4c4c4" strokeWidth="2.5">
        <path d="m9 4 8 8-8 8" strokeLinecap="round" strokeLinejoin="round" />
      </svg>
    </button>
  )
}

export default ProfileMenuItem
