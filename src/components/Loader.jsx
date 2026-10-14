// Крутящийся индикатор загрузки
function Loader({ light = false }) {
  return (
    <div className="flex justify-center py-16" role="status" aria-label="Загрузка">
      <span
        className={`h-8 w-8 animate-spin rounded-full border-4 border-t-transparent ${
          light ? 'border-white' : 'border-primary'
        }`}
      />
    </div>
  )
}

export default Loader
