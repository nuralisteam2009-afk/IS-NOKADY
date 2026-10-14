// Иконка + текст (сайт, instagram, адрес)
function ContactItem({ icon, text }) {
  return (
    <div className="flex items-center gap-1.5">
      <img src={icon} alt="" className="h-[15px] w-auto" />
      <span className="text-[14px] font-medium text-black">{text}</span>
    </div>
  )
}

export default ContactItem
