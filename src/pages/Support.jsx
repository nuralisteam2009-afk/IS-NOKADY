import { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import ErrorMessage from '../components/ErrorMessage.jsx'
import IconTile from '../components/IconTile.jsx'
import Loader from '../components/Loader.jsx'
import PageHeader from '../components/PageHeader.jsx'
import Screen from '../components/Screen.jsx'
import { useFetch } from '../hooks/useFetch.js'
import { getSupportContacts, sendSupportMessage } from '../services/api.js'

// Страница "Поддержка"
function Support() {
  const navigate = useNavigate()
  const { data: contacts, loading, error } = useFetch(getSupportContacts)

  const [message, setMessage] = useState('')
  const [isSending, setIsSending] = useState(false)
  // status: { type: 'error' | 'success', text: '...' } или null
  const [status, setStatus] = useState(null)

  const handleSubmit = async () => {
    if (isSending) return // защита от повторной отправки

    if (!message.trim()) {
      setStatus({ type: 'error', text: 'Опишите вашу проблему' })
      return
    }

    setIsSending(true)
    setStatus(null)
    try {
      const result = await sendSupportMessage(message.trim())
      setMessage('')
      setStatus({
        type: 'success',
        text: result?.demo
          ? 'Демо-режим: сообщение не отправлено на сервер.'
          : 'Сообщение отправлено. Мы скоро свяжемся с вами.',
      })
    } catch (err) {
      setStatus({ type: 'error', text: err.message })
    } finally {
      setIsSending(false)
    }
  }

  return (
    <Screen className="px-4 pt-8">
      <PageHeader title="Поддержка" onBack={() => navigate(-1)} />

      <h2 className="mt-6 text-[15px] font-medium text-black">Связаться с нами</h2>

      {loading && <Loader />}
      {error && <ErrorMessage message={error} />}
      {contacts && (
        <ul className="mt-3">
          {contacts.map((contact) => (
            <li key={contact.id} className="flex items-center gap-4 border-b border-gray-200 px-2 py-3">
              <IconTile name={contact.icon} />
              <div className="flex-1">
                <p className="text-[15px] font-bold text-black">{contact.title}</p>
                <p className="text-[11px] text-gray-500">{contact.phone}</p>
              </div>
              <p className="self-start pt-1 text-[11px] text-gray-500">{contact.place}</p>
            </li>
          ))}
        </ul>
      )}

      <h2 className="mt-7 text-[15px] font-medium text-black">Написать в поддержку</h2>
      <textarea
        value={message}
        onChange={(event) => {
          setMessage(event.target.value)
          setStatus(null)
        }}
        placeholder="Опишите вашу проблему"
        className="mt-3 h-[68px] w-full resize-none rounded-md border border-primary bg-white px-2.5 py-2 text-[12px] text-black outline-none placeholder:text-[10px] placeholder:text-gray-400"
      />

      {status && (
        <p
          role={status.type === 'error' ? 'alert' : 'status'}
          className={`mt-3 text-[12px] ${status.type === 'error' ? 'text-accent' : 'text-primary'}`}
        >
          {status.text}
        </p>
      )}

      <button
        type="button"
        onClick={handleSubmit}
        disabled={isSending}
        className="mt-6 h-[38px] w-full rounded-md bg-primary text-[15px] font-medium text-white active:opacity-80 disabled:opacity-60"
      >
        {isSending ? 'Отправка...' : 'Отправить'}
      </button>
    </Screen>
  )
}

export default Support
