import { useState } from 'react'
import FormField from '../components/FormField.jsx'
import PageTitle from '../components/PageTitle.jsx'
import SuccessModal from '../components/SuccessModal.jsx'
import { saveDiscount } from '../services/api.js'
import calendarIcon from '../assets/icons/calendar_month.png'

const emptyForm = { title: '', description: '', date: '' }

// Общий стиль для полей ввода (оранжевая рамка)
const inputStyle =
  'w-full rounded-md border border-accent bg-white px-3 text-[12px] text-black outline-none placeholder:text-gray-400 focus:ring-1 focus:ring-accent'

// Прячем стандартную иконку календаря справа и растягиваем её на всё поле:
// теперь календарь открывается при нажатии в любом месте поля
const datePickerStyle =
  '[&::-webkit-calendar-picker-indicator]:absolute [&::-webkit-calendar-picker-indicator]:inset-0 ' +
  '[&::-webkit-calendar-picker-indicator]:h-full [&::-webkit-calendar-picker-indicator]:w-full ' +
  '[&::-webkit-calendar-picker-indicator]:cursor-pointer [&::-webkit-calendar-picker-indicator]:opacity-0'

// Открываем календарь по нажатию (запасной вариант для браузеров, где индикатор не работает)
const openDatePicker = (event) => {
  try {
    event.target.showPicker()
  } catch {
    // старые браузеры просто не поддерживают showPicker
  }
}

// Страница "Изменить скидку"
function EditDiscount() {
  const [form, setForm] = useState(emptyForm)
  const [photoFile, setPhotoFile] = useState(null)
  const [photoUrl, setPhotoUrl] = useState('')
  const [isSaving, setIsSaving] = useState(false)
  const [saveResult, setSaveResult] = useState(null)
  const [error, setError] = useState('')
  const [isModalOpen, setIsModalOpen] = useState(false)

  // Один обработчик для всех текстовых полей (по атрибуту name)
  const handleChange = (event) => {
    const { name, value } = event.target
    setForm({ ...form, [name]: value })
    setError('')
  }

  // Показываем выбранное фото в сером блоке
  const handlePhotoChange = (event) => {
    const file = event.target.files[0]
    if (file) {
      if (photoUrl) URL.revokeObjectURL(photoUrl)
      setPhotoFile(file)
      setPhotoUrl(URL.createObjectURL(file))
    }
  }

  // Нажатие на кнопку "Изменить скидку"
  const handleSubmit = async () => {
    if (isSaving) return // защита от повторной отправки

    const isFilled = form.title.trim() && form.description.trim() && form.date
    if (!isFilled) {
      setError('Заполните все поля')
      return
    }

    setIsSaving(true)
    setError('')
    try {
      const result = await saveDiscount({ ...form, photo: photoFile })
      setSaveResult(result)
      setIsModalOpen(true) // всё прошло успешно — показываем "Скидка добавлена"
    } catch (err) {
      setError(err.message)
    } finally {
      setIsSaving(false)
    }
  }

  const handleCloseModal = () => {
    setIsModalOpen(false)
    setForm(emptyForm)
    if (photoUrl) URL.revokeObjectURL(photoUrl)
    setPhotoFile(null)
    setPhotoUrl('')
  }

  return (
    <div className="px-5 pt-8">
      <PageTitle>Изменить скидку</PageTitle>

      {/* Загрузка фото */}
      <label className="relative mx-auto mt-8 flex h-[100px] w-[80%] cursor-pointer flex-col items-center justify-center overflow-hidden rounded-xl bg-placeholder shadow-card">
        {photoUrl ? (
          <img src={photoUrl} alt="Фото скидки" className="h-full w-full object-cover" />
        ) : (
          <>
            <span className="text-[15px] font-medium text-black">Изменить фото</span>
            <span className="mt-1 text-[11px] text-white">Рекомендуемый размер 1200 * 800</span>
          </>
        )}
        <input type="file" accept="image/*" onChange={handlePhotoChange} className="hidden" />
      </label>

      <FormField label="Название предложения">
        <input
          type="text"
          name="title"
          value={form.title}
          onChange={handleChange}
          placeholder="Например -15% на всё меню"
          className={`${inputStyle} h-[34px]`}
        />
      </FormField>

      <FormField label="Описание">
        <textarea
          name="description"
          value={form.description}
          onChange={handleChange}
          placeholder="Кратко опишите условия"
          className={`${inputStyle} h-[80px] resize-none py-2`}
        />
      </FormField>

      <FormField label="Срок действия">
        <div className="relative">
          <img
            src={calendarIcon}
            alt=""
            className="pointer-events-none absolute left-3 top-1/2 z-10 h-5 w-[18px] -translate-y-1/2 opacity-60 grayscale"
          />
          <input
            type="date"
            name="date"
            value={form.date}
            onChange={handleChange}
            onClick={openDatePicker}
            className={`${inputStyle} ${datePickerStyle} relative h-[34px] pl-10 ${form.date ? '' : 'text-transparent'}`}
          />
          {/* Подсказка вместо стандартного "дд.мм.гггг", пока дата не выбрана */}
          {!form.date && (
            <span className="pointer-events-none absolute left-10 top-1/2 -translate-y-1/2 text-[12px] text-gray-400">
              Напишите дату
            </span>
          )}
        </div>
      </FormField>

      {error && <p className="mt-3 text-[12px] text-accent">{error}</p>}

      <button
        type="button"
        onClick={handleSubmit}
        disabled={isSaving}
        className="mt-8 h-[38px] w-full rounded-lg bg-primary text-[15px] font-medium text-white active:opacity-80 disabled:opacity-60"
      >
        {isSaving ? 'Сохранение...' : 'Изменить скидку'}
      </button>

      {isModalOpen && (
        <SuccessModal
          onClose={handleCloseModal}
          note={saveResult?.demo ? 'Демо-режим: данные не сохранены на сервере.' : ''}
        />
      )}
    </div>
  )
}

export default EditDiscount
