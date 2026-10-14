// Окно "Скидка добавлена". note — необязательная пометка (например, про демо-режим).
function SuccessModal({ onClose, note = '' }) {
  return (
    <div className="fixed inset-0 z-50 flex items-start justify-center bg-black/50 px-8 pt-[31vh]">
      <div
        role="dialog"
        aria-modal="true"
        className="w-full max-w-[250px] rounded-2xl bg-white px-4 pb-4 pt-4 text-center shadow-card"
      >
        <div className="mx-auto flex h-[42px] w-[42px] items-center justify-center rounded-full bg-primary">
          <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="white" strokeWidth="3">
            <path d="m5 12.5 5 5L19.5 7" strokeLinecap="round" strokeLinejoin="round" />
          </svg>
        </div>
        <h3 className="mt-3 text-[15px] font-medium text-black">Скидка добавлена</h3>
        <p className="mt-2 text-[11px] leading-snug text-gray-500">
          Ваша скидка успешно опубликована и доступна для резидентов.
        </p>
        {note && <p className="mt-2 text-[10px] leading-snug text-gray-400">{note}</p>}
        <button
          type="button"
          onClick={onClose}
          className="mt-2 h-8 w-[112px] rounded-md bg-primary text-[14px] font-medium text-white active:opacity-80"
        >
          Закрыть
        </button>
      </div>
    </div>
  )
}

export default SuccessModal
