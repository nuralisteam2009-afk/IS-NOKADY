# Скидки партнёров IŞ NOKADY (мобильная версия)

Мобильный сайт на **React + JavaScript + Vite + Tailwind CSS 3 + React Router**.
Рассчитан на экран телефона 360–430 px (десктопной версии нет).
Frontend подготовлен к подключению Backend на Python (FastAPI).

## Запуск

```bash
npm install
npm run dev
```

Откройте адрес из терминала (обычно http://localhost:5173) и включите режим телефона
в DevTools (Ctrl+Shift+M в Chrome).

Production-сборка:

```bash
npm run build
npm run preview
```

## Демо-режим (пока нет Backend)

Если переменная `VITE_API_URL` пустая, сайт работает в **демо-режиме**:

- данные берутся из папки `src/data` (это тестовые данные, не данные сервера);
- вход, сохранение скидки и отправка сообщения в поддержку **ничего не сохраняют** и никуда не отправляются;
- на этих экранах показывается пометка «Демо-режим»;
- настоящей авторизации нет: почта и пароль не проверяются, сессия не создаётся.

## Страницы и переходы

| Адрес | Страница | Файл |
|---|---|---|
| `/` | Вход | `pages/Login.jsx` |
| `/home` | Главная: «Часто используемые» | `pages/Home.jsx` |
| `/statistics` | Статистика | `pages/Statistics.jsx` |
| `/discounts` | Изменить скидку | `pages/EditDiscount.jsx` |
| `/profile` | Профиль | `pages/Profile.jsx` |
| `/discount/:id` | Страница скидки | `pages/DiscountDetail.jsx` |
| `/discount/:id/qr?mode=show` или `scan` | QR-код | `pages/QrCode.jsx` |
| `/profile/data` | Мои данные | `pages/MyData.jsx` |
| `/profile/history` | История использования скидок | `pages/History.jsx` |
| `/profile/notifications` | Уведомления | `pages/Notifications.jsx` |
| `/profile/support` | Поддержка | `pages/Support.jsx` |

Маршруты описаны в `src/App.jsx`. Нижняя навигация (`BottomNav`) показывается на страницах внутри `MainLayout`.
Карточка на главной → страница скидки → «Показать QR - код» / «Сканировать QR - код».

Страницы «Мои данные» и «История» в макетах отсутствовали, они сделаны просто, в стиле остального сайта.

## Структура

```text
src/
├── main.jsx            точка входа (подключает BrowserRouter)
├── App.jsx             список маршрутов
├── index.css           директивы Tailwind
├── pages/              страницы (по одному файлу на страницу)
├── components/         переиспользуемые части: BottomNav, DiscountCard, IconTile, Loader ...
├── hooks/useFetch.js   хук загрузки данных: { data, loading, error }
├── services/api.js     ВСЕ запросы к Backend (единственное место)
├── data/               тестовые данные для демо-режима и настройки интерфейса
└── assets/             иконки (assets/icons) и логотип (logo.svg)
```

Как это работает: страница вызывает `useFetch(getDiscounts)` → функция из `services/api.js` либо идёт на сервер,
либо (демо) возвращает данные из `src/data`. Страница показывает `Loader`, `ErrorMessage` или сами данные.

Цвета сайта заданы в `tailwind.config.js` (`primary`, `accent`, `brand` и др.).
Повторяющиеся элементы (карточки, пункты меню, уведомления) выводятся через `.map()` из массивов.

## Как подключить Python Backend (FastAPI)

1. Скопируйте `.env.example` в `.env` и укажите адрес сервера:

   ```text
   VITE_API_URL=http://localhost:8000
   ```

   Перезапустите `npm run dev`. Демо-режим выключится. Не кладите в `VITE_*` секреты: они видны в браузере.

2. Разрешите запросы с frontend (CORS) в FastAPI:

   ```python
   from fastapi import FastAPI
   from fastapi.middleware.cors import CORSMiddleware

   app = FastAPI()
   app.add_middleware(
       CORSMiddleware,
       allow_origins=["http://localhost:5173"],
       allow_methods=["*"],
       allow_headers=["*"],
   )
   ```

3. Сделайте эндпоинты, которые уже ожидает `src/services/api.js`.
   Формат ответов GET должен совпадать с объектами в `src/data/*.js`.

| Метод и адрес | Что делает | Откуда вызывается |
|---|---|---|
| `POST /auth/login` | вход (`email`, `password`, `partner_id`), вернёт токен | Login |
| `GET /partners` | партнёры для экрана входа | Login |
| `GET /discounts` | часто используемые скидки | Home |
| `GET /discounts/{id}` | одна скидка | DiscountDetail, QrCode |
| `POST /discounts` | сохранить скидку (`multipart`: `title`, `description`, `valid_until`, `photo`) | EditDiscount |
| `GET /usage-history` | история использования | History |
| `GET /stats` | статистика | Statistics |
| `GET /profile` | данные пользователя | Profile, MyData, QrCode |
| `GET /notifications` | уведомления | Notifications |
| `GET /support/contacts` | контакты поддержки | Support |
| `POST /support/messages` | сообщение в поддержку (`message`) | Support |

Ошибки FastAPI в виде `{"detail": "текст"}` показываются пользователю автоматически.
Новый запрос добавляется функцией в `api.js`, компоненты менять не нужно.

## Что останется реализовать на Python

- настоящая авторизация (проверка пароля, токен) и защита страниц: на frontend нужно сохранять токен и добавлять его в заголовки в `request()`, а также реализовать выход;
- выбор партнёра при входе: список и привязка пользователя к партнёру;
- сохранение скидок и загрузка фото, хранение данных;
- генерация и проверка QR-кодов (сейчас на странице серый блок-заглушка, камеры для сканирования нет);
- статистика, история, уведомления и сообщения в поддержку;
- выбор периода статистики (сейчас период только показывается).

## Известные ограничения

- Иконки рукопожатия, смайлика и «i» (поддержка, уведомления) нарисованы SVG-кодом, отдельных файлов не было. Их можно заменить на ваши файлы в `components/IconTile.jsx`.
- Тексты-заглушки со скриншотов (`instagtam`, `local`, `+993 6`) оставлены как есть.
- Шрифт Roboto подключается с Google Fonts (нужен интернет при просмотре).
- Страница «Главная» показывает кнопку «Выйти», как на макете.
