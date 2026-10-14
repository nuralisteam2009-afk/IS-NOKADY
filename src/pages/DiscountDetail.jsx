import { useNavigate, useParams } from 'react-router-dom'
import BackButton from '../components/BackButton.jsx'
import ContactItem from '../components/ContactItem.jsx'
import DiscountStatus from '../components/DiscountStatus.jsx'
import ErrorMessage from '../components/ErrorMessage.jsx'
import Loader from '../components/Loader.jsx'
import PageHeader from '../components/PageHeader.jsx'
import Screen from '../components/Screen.jsx'
import SectionTitle from '../components/SectionTitle.jsx'
import { useFetch } from '../hooks/useFetch.js'
import { getDiscount } from '../services/api.js'
import siteIcon from '../assets/icons/language_site.png'
import instagramIcon from '../assets/icons/language_instagram.png'
import locationIcon from '../assets/icons/location_on.png'

// Страница скидки партнёра (id берётся из адреса /discount/:id)
function DiscountDetail() {
  const navigate = useNavigate()
  const { id } = useParams()
  const { data: discount, loading, error } = useFetch(() => getDiscount(id), [id])

  if (loading) {
    return (
      <Screen>
        <Loader />
      </Screen>
    )
  }

  if (error) {
    return (
      <Screen className="px-5 pt-8">
        <PageHeader title="Скидка" onBack={() => navigate(-1)} />
        <ErrorMessage message={error} />
      </Screen>
    )
  }

  return (
    <div className="mx-auto flex min-h-screen max-w-[430px] animate-fade-in flex-col bg-[#f5f5f5]">
      {/* Серая шапка с логотипом */}
      <header className="relative h-[180px] bg-header">
        <BackButton onClick={() => navigate(-1)} className="absolute left-5 top-[38px]" />
        <span className="absolute right-9 top-[68px] text-[30px] font-bold text-black">LOGO</span>
      </header>

      {/* Белая карточка с закруглёнными верхними углами */}
      <main className="-mt-4 flex flex-1 flex-col rounded-t-3xl bg-white px-5 pb-6 pt-8">
        <div className="flex gap-3">
          <div className="h-[62px] w-[62px] shrink-0 rounded-full bg-placeholder" />
          <div className="flex-1">
            <h1 className="text-[22px] font-bold leading-tight text-primary">{discount.partnerName}</h1>
            <div className="mt-1 flex justify-between">
              <ContactItem icon={siteIcon} text={discount.site} />
              <ContactItem icon={instagramIcon} text={discount.instagram} />
            </div>
            <div className="mt-1">
              <ContactItem icon={locationIcon} text={discount.location} />
            </div>
          </div>
        </div>

        <p className="mt-5 text-[40px] font-bold leading-none text-accent">{discount.value}</p>
        <p className="mt-1 text-[14px] text-black">{discount.description}</p>

        <DiscountStatus status={discount.status} validUntil={discount.validUntil} className="mt-3 w-fit" />

        <div className="mt-6">
          <SectionTitle>Условия</SectionTitle>
          <ul className="mt-3 space-y-2">
            {discount.conditions.map((condition) => (
              <li key={condition} className="flex items-center gap-2 text-[13px] font-medium text-black">
                <span className="h-1.5 w-1.5 shrink-0 rounded-full bg-sun" />
                {condition}
              </li>
            ))}
          </ul>
        </div>

        {/* Кнопки внизу страницы */}
        <div className="mt-auto space-y-3 pt-10">
          <button
            type="button"
            onClick={() => navigate(`/discount/${id}/qr?mode=show`)}
            className="h-[38px] w-full rounded-md bg-primary text-[14px] font-medium text-white active:opacity-80"
          >
            Показать QR - код
          </button>
          <button
            type="button"
            onClick={() => navigate(`/discount/${id}/qr?mode=scan`)}
            className="h-[38px] w-full rounded-md bg-placeholder text-[14px] font-medium text-primary active:opacity-80"
          >
            Сканировать QR - код
          </button>
        </div>
      </main>
    </div>
  )
}

export default DiscountDetail
