import DiscountCard from './DiscountCard.jsx'

// Сетка карточек скидок в два столбца
function DiscountGrid({ discounts }) {
  return (
    <ul className="mt-5 grid grid-cols-2 gap-x-3.5 gap-y-4">
      {discounts.map((discount) => (
        <li key={discount.id}>
          <DiscountCard discount={discount} />
        </li>
      ))}
    </ul>
  )
}

export default DiscountGrid
