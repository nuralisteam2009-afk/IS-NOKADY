import DiscountGrid from '../components/DiscountGrid.jsx'
import ErrorMessage from '../components/ErrorMessage.jsx'
import Loader from '../components/Loader.jsx'
import LogoutButton from '../components/LogoutButton.jsx'
import PageTitle from '../components/PageTitle.jsx'
import { useFetch } from '../hooks/useFetch.js'
import { getDiscounts } from '../services/api.js'

// Главная: часто используемые скидки
function Home() {
  const { data: discounts, loading, error } = useFetch(getDiscounts)

  return (
    <div className="px-5 pt-10">
      <PageTitle>Часто используемые</PageTitle>

      {loading && <Loader />}
      {error && <ErrorMessage message={error} />}
      {discounts && <DiscountGrid discounts={discounts} />}

      <LogoutButton className="mt-8" />
    </div>
  )
}

export default Home
