import { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import DemoNote from '../components/DemoNote.jsx'
import ErrorMessage from '../components/ErrorMessage.jsx'
import Loader from '../components/Loader.jsx'
import Screen from '../components/Screen.jsx'
import { useFetch } from '../hooks/useFetch.js'
import { getPartners, login } from '../services/api.js'
import logo from '../assets/logo.svg'

const emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/

// Стиль полей ввода на экране входа
const inputStyle =
  'h-[34px] w-full rounded-lg border border-gray-300 bg-white px-3 text-[14px] font-medium text-primary outline-none placeholder:font-normal placeholder:text-gray-400 focus:border-primary'

// Экран входа
function Login() {
  const navigate = useNavigate()
  const { data: partners, loading, error: partnersError } = useFetch(getPartners)

  const [form, setForm] = useState({ email: '', password: '' })
  const [partnerId, setPartnerId] = useState(null)
  const [showPassword, setShowPassword] = useState(false)
  const [error, setError] = useState('')
  const [isSubmitting, setIsSubmitting] = useState(false)

  const handleChange = (event) => {
    const { name, value } = event.target
    setForm({ ...form, [name]: value })
    setError('')
  }

  const handleSubmit = async (event) => {
    event.preventDefault()
    if (isSubmitting) return // защита от повторной отправки

    if (partnerId === null) {
      setError('Выберите, какой вы партнёр')
      return
    }
    if (!emailPattern.test(form.email)) {
      setError('Введите корректную почту')
      return
    }
    if (!form.password) {
      setError('Введите пароль')
      return
    }

    setIsSubmitting(true)
    setError('')
    try {
      await login({ ...form, partnerId })
      navigate('/home')
    } catch (err) {
      setError(err.message)
    } finally {
      setIsSubmitting(false)
    }
  }

  return (
    <Screen className="px-6 pt-[30px] pb-8">
      <img src={logo} alt="IŞ NOKADY" className="h-[38px] w-auto" />

      {/* Выбор партнёра */}
      <div className="mt-9 min-h-[140px]">
        {loading && <Loader />}
        {partnersError && <ErrorMessage message={partnersError} />}
        {partners && (
          <ul className="grid grid-cols-4 gap-3">
            {partners.map((partner) => (
              <li key={partner.id}>
                <button
                  type="button"
                  aria-label={partner.name}
                  aria-pressed={partnerId === partner.id}
                  onClick={() => {
                    setPartnerId(partner.id)
                    setError('')
                  }}
                  className={
                    'aspect-square w-full rounded-full bg-placeholder transition ' +
                    (partnerId === partner.id ? 'ring-2 ring-primary ring-offset-2' : '')
                  }
                />
              </li>
            ))}
          </ul>
        )}
      </div>

      <form onSubmit={handleSubmit} noValidate className="mt-9">
        <input
          type="email"
          name="email"
          value={form.email}
          onChange={handleChange}
          placeholder="Почта"
          autoComplete="email"
          className={inputStyle}
        />

        <div className="relative mt-3">
          <input
            type={showPassword ? 'text' : 'password'}
            name="password"
            value={form.password}
            onChange={handleChange}
            placeholder="Пароль"
            autoComplete="current-password"
            className={`${inputStyle} pr-11`}
          />
          <button
            type="button"
            onClick={() => setShowPassword(!showPassword)}
            aria-label={showPassword ? 'Скрыть пароль' : 'Показать пароль'}
            className="absolute right-3 top-1/2 -translate-y-1/2"
          >
            <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="#8a8a8a" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
              <path d="M2 12s3.5-7 10-7 10 7 10 7-3.5 7-10 7S2 12 2 12Z" />
              <circle cx="12" cy="12" r="3" />
              {showPassword && <path d="M4 20 20 4" />}
            </svg>
          </button>
        </div>

        {error && (
          <p role="alert" className="mt-2 text-[12px] text-accent">
            {error}
          </p>
        )}

        <button
          type="submit"
          disabled={isSubmitting}
          className="mt-2 h-8 w-full rounded-lg bg-primary text-[14px] font-medium text-white active:opacity-80 disabled:opacity-60"
        >
          {isSubmitting ? 'Вход...' : 'Войти'}
        </button>
      </form>

      <p className="mt-4 text-center text-[14px] text-gray-400">Выберите какой вы партнёр</p>
      <DemoNote className="mt-6 text-center">
        Демо-режим: Backend не подключён, почта и пароль не проверяются.
      </DemoNote>
    </Screen>
  )
}

export default Login
