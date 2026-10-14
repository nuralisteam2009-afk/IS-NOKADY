// Подпись + поле формы
function FormField({ label, children }) {
  return (
    <div className="mt-6">
      <label className="mb-2 block text-[15px] font-medium text-black">{label}</label>
      {children}
    </div>
  )
}

export default FormField
