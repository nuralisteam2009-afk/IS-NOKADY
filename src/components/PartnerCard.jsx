// Карточка пользователя (аватар + имя + роль)
function PartnerCard({ name, role, className = '' }) {
  return (
    <div className={`flex items-center gap-3 rounded-md bg-white px-3 py-2.5 shadow-card ${className}`}>
      <div className="h-[38px] w-[38px] shrink-0 rounded-full bg-placeholder" />
      <div>
        <p className="text-[15px] font-bold leading-tight text-primary">{name}</p>
        <p className="text-[11px] text-gray-500">{role}</p>
      </div>
    </div>
  )
}

export default PartnerCard
