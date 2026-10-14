// Единое место для всех запросов к будущему Backend (Python / FastAPI).
// Компоненты НЕ ходят на сервер напрямую — они вызывают функции из этого файла.
//
// Адрес сервера берётся из переменной окружения VITE_API_URL (см. .env.example).
// Если она пустая — сайт работает в ДЕМО-РЕЖИМЕ: данные берутся из папки src/data,
// а действия (вход, отправка форм) НИЧЕГО не сохраняют на сервере.

import { discounts } from '../data/discounts.js'
import { profile } from '../data/profile.js'
import { partners } from '../data/partners.js'
import { stats } from '../data/stats.js'
import { notifications } from '../data/notifications.js'
import { supportContacts } from '../data/support.js'

const API_URL = (import.meta.env.VITE_API_URL || '').replace(/\/$/, '')

// true, пока Backend не подключён
export const IS_DEMO = API_URL === ''

// Ошибка с понятным текстом, который можно показать пользователю
export class ApiError extends Error {
  constructor(message, status) {
    super(message)
    this.name = 'ApiError'
    this.status = status
  }
}

// Базовая функция: отправляет запрос и аккуратно обрабатывает ошибки
async function request(path, { method = 'GET', body } = {}) {
  const headers = {}
  let payload

  if (body instanceof FormData) {
    payload = body // браузер сам добавит нужный Content-Type
  } else if (body !== undefined) {
    headers['Content-Type'] = 'application/json'
    payload = JSON.stringify(body)
  }

  let response
  try {
    response = await fetch(`${API_URL}${path}`, { method, headers, body: payload })
  } catch {
    // сервер выключен, нет интернета, ошибка CORS и т.п.
    throw new ApiError('Сервер недоступен. Проверьте подключение и попробуйте ещё раз.')
  }

  if (!response.ok) {
    let detail = ''
    try {
      // FastAPI возвращает ошибки в виде { "detail": "текст" }
      const errorData = await response.json()
      detail = errorData.detail || errorData.message || ''
    } catch {
      // тело ответа не JSON — используем общий текст
    }
    const message = typeof detail === 'string' && detail ? detail : `Ошибка сервера (${response.status})`
    throw new ApiError(message, response.status)
  }

  if (response.status === 204) return null
  return response.json()
}

const apiGet = (path) => request(path)
const apiPost = (path, body) => request(path, { method: 'POST', body })

// Демо-режим: возвращаем тестовые данные с небольшой задержкой,
// чтобы были видны состояния загрузки
function demoResponse(data) {
  return new Promise((resolve) => setTimeout(() => resolve(data), 300))
}

// ---------- Функции для страниц ----------

// POST /auth/login
export function login({ email, password, partnerId }) {
  if (IS_DEMO) return demoResponse({ demo: true })
  // Здесь Backend вернёт токен. Его нужно будет сохранить и добавлять в заголовки запросов.
  return apiPost('/auth/login', { email, password, partner_id: partnerId })
}

// GET /partners — список партнёров на экране входа
export function getPartners() {
  if (IS_DEMO) return demoResponse(partners)
  return apiGet('/partners')
}

// GET /discounts — часто используемые скидки
export function getDiscounts() {
  if (IS_DEMO) return demoResponse(discounts)
  return apiGet('/discounts')
}

// GET /discounts/{id} — одна скидка
export function getDiscount(id) {
  if (IS_DEMO) {
    const discount = discounts.find((item) => String(item.id) === String(id))
    if (!discount) return Promise.reject(new ApiError('Скидка не найдена', 404))
    return demoResponse(discount)
  }
  return apiGet(`/discounts/${id}`)
}

// POST /discounts — создать или изменить скидку (вместе с фото)
export function saveDiscount({ title, description, date, photo }) {
  if (IS_DEMO) return demoResponse({ demo: true })
  const body = new FormData()
  body.append('title', title)
  body.append('description', description)
  body.append('valid_until', date)
  if (photo) body.append('photo', photo)
  return apiPost('/discounts', body)
}

// GET /usage-history — история использования скидок
export function getUsageHistory() {
  if (IS_DEMO) return demoResponse(discounts.slice(0, 2))
  return apiGet('/usage-history')
}

// GET /stats — статистика
export function getStats() {
  if (IS_DEMO) return demoResponse(stats)
  return apiGet('/stats')
}

// GET /profile — данные текущего пользователя
export function getProfile() {
  if (IS_DEMO) return demoResponse(profile)
  return apiGet('/profile')
}

// GET /notifications — уведомления
export function getNotifications() {
  if (IS_DEMO) return demoResponse(notifications)
  return apiGet('/notifications')
}

// GET /support/contacts — контакты поддержки
export function getSupportContacts() {
  if (IS_DEMO) return demoResponse(supportContacts)
  return apiGet('/support/contacts')
}

// POST /support/messages — сообщение в поддержку
export function sendSupportMessage(message) {
  if (IS_DEMO) return demoResponse({ demo: true })
  return apiPost('/support/messages', { message })
}
