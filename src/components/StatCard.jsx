// Оранжевая карточка со статистикой
function StatCard({ label, value, icon }) {
  return (
    <div className="rounded-xl bg-accent px-3 py-3 shadow-card">
      <img src={icon} alt="" className="h-[21px] w-auto object-contain" />
      <p className="mt-2 text-[11px] text-white">{label}</p>
      <p className="mt-1 text-[14px] font-bold text-black">{value}</p>
    </div>
  )
}

export default StatCard
