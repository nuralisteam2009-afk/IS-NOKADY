// Сообщение об ошибке загрузки
function ErrorMessage({ message }) {
  return (
    <p role="alert" className="py-6 text-center text-[13px] text-accent">
      {message}
    </p>
  )
}

export default ErrorMessage
