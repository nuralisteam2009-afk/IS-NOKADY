import BackButton from './BackButton.jsx'
import PageTitle from './PageTitle.jsx'

// Шапка страницы: кнопка "назад" и заголовок
function PageHeader({ title, onBack }) {
  return (
    <header className="flex items-center gap-3.5">
      <BackButton onClick={onBack} className="shadow-card" />
      <PageTitle>{title}</PageTitle>
    </header>
  )
}

export default PageHeader
