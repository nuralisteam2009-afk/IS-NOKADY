import { Link } from 'react-router-dom'

// Карточка скидки в сетке. По нажатию открывает страницу скидки.
function DiscountCard({ discount }) {
  return (
    <Link
      to={`/discount/${discount.id}`}
      className="block overflow-hidden rounded-2xl bg-white shadow-card transition active:scale-[0.98]"
    >
      <div className="h-[75px] bg-placeholder" />
      <div className="px-3.5 pb-3 pt-2.5">
        <p className="text-[14px] font-medium leading-tight text-black">{discount.partnerName}</p>
        <p className="mt-0.5 text-[14px] leading-tight text-accent">{discount.value}</p>
        <p className="text-[11px] text-gray-400">{discount.description}</p>
      </div>
    </Link>
  )
}

export default DiscountCard
