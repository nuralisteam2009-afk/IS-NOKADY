import clockIcon from '../assets/icons/schedule.png'

// Строка "Активна | (часы) до 31.10.2026"
function DiscountStatus({ status, validUntil, className = '' }) {
  return (
    <div className={`flex items-center border-b border-gray-300 pb-1.5 ${className}`}>
      <span className="pr-3 text-[14px] font-medium text-black">{status}</span>
      <span className="flex items-center gap-1.5 border-l border-gray-400 pl-3 text-[14px] font-medium text-black">
        <img src={clockIcon} alt="" className="h-[23px] w-[23px]" />
        до <span className="font-bold text-accent">{validUntil}</span>
      </span>
    </div>
  )
}

export default DiscountStatus
