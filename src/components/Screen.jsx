// Белый экран шириной как телефон, с плавным появлением
function Screen({ children, className = '' }) {
  return (
    <div className={`mx-auto min-h-screen max-w-[430px] animate-fade-in bg-white ${className}`}>
      {children}
    </div>
  )
}

export default Screen
