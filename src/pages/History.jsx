import { useNavigate } from 'react-router-dom'
import DemoNote from '../components/DemoNote.jsx'
import DiscountGrid from '../components/DiscountGrid.jsx'
import ErrorMessage from '../components/ErrorMessage.jsx'
import Loader from '../components/Loader.jsx'
import PageHeader from '../components/PageHeader.jsx'
import Screen from '../components/Screen.jsx'
import { useFetch } from '../hooks/useFetch.js'
import { getUsageHistory } from '../services/api.js'

// "История использования скидок" (в макете этой страницы нет — использованы карточки с главной)
function History() {
  const navigate = useNavigate()
  const { data: discounts, loading, error } = useFetch(getUsageHistory)

  return (
    <Screen className="px-5 pt-8">
      <PageHeader title="История" onBack={() => navigate(-1)} />

      {loading && <Loader />}
      {error && <ErrorMessage message={error} />}
      {discounts && <DiscountGrid discounts={discounts} />}

      <DemoNote className="mt-6">Демо-режим: показаны тестовые данные.</DemoNote>
    </Screen>
  )
}

export default History
