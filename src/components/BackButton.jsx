// Белая круглая кнопка "назад" со стрелкой
function BackButton({ onClick, className = '' }) {
  return (
    <button
      type="button"
      onClick={onClick}
      aria-label="Назад"
      className={`flex h-7 w-7 items-center justify-center rounded-full bg-white active:scale-95 ${className}`}
    >
      <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="black" strokeWidth="3">
        <path d="M15 4 7 12l8 8" strokeLinecap="round" strokeLinejoin="round" />
      </svg>
    </button>
  )
}

export default BackButton
