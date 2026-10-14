import { useNavigate, useParams, useSearchParams } from 'react-router-dom'
import BackButton from '../components/BackButton.jsx'
import DiscountStatus from '../components/DiscountStatus.jsx'
import ErrorMessage from '../components/ErrorMessage.jsx'
import Loader from '../components/Loader.jsx'
import PartnerCard from '../components/PartnerCard.jsx'
import { qrModes } from '../data/qrModes.js'
import { useFetch } from '../hooks/useFetch.js'
import { getDiscount, getProfile } from '../services/api.js'

// Страница с QR-кодом (синий фон). Режим берётся из адреса: ?mode=show или ?mode=scan
function QrCode() {
  const navigate = useNavigate()
  const { id } = useParams()
  const [searchParams] = useSearchParams()
  const mode = searchParams.get('mode') === 'scan' ? 'scan' : 'show'
  const { caption, role } = qrModes[mode]

  // Загружаем скидку и профиль одновременно
  const { data, loading, error } = useFetch(
    () => Promise.all([getDiscount(id), getProfile()]),
    [id],
  )

  return (
    <div className="mx-auto min-h-screen max-w-[430px] animate-fade-in bg-brand px-10 pb-10 pt-[33px]">
      <BackButton onClick={() => navigate(-1)} className="-ml-5" />

      {loading && <Loader light />}

      {error && (
        <div className="mt-[49px] rounded-3xl bg-white px-4">
          <ErrorMessage message={error} />
        </div>
      )}

      {data && (
        <>
          <section className="mt-[49px] rounded-3xl bg-white px-4 pb-4 pt-[18px] text-center">
            <div className="mx-auto h-[62px] w-[62px] rounded-full border-2 border-black bg-placeholder" />

            <h1 className="mt-3 text-[22px] font-bold text-brand">{data[0].partnerName}</h1>
            <p className="mt-3 text-[40px] font-bold leading-none text-accent">{data[0].value}</p>
            <p className="mt-1 text-[14px] font-medium text-black">{data[0].description}</p>

            <DiscountStatus
              status={data[0].status}
              validUntil={data[0].validUntil}
              className="mx-auto mt-3 w-fit"
            />

            {/* Место под настоящий QR-код (его будет выдавать Backend) */}
            <div className="mx-auto mt-5 h-[130px] w-[140px] bg-placeholder" />

            <p className="mt-4 text-[10px] text-gray-400">{caption}</p>
          </section>

          <PartnerCard name={data[1].name} role={role} className="mx-auto mt-6 w-[145px]" />
        </>
      )}
    </div>
  )
}

export default QrCode
