// ТЕСТОВЫЕ ДАННЫЕ. Используются только в демо-режиме (пока не подключён Backend).
// Когда Backend будет готов, сервер должен отдавать объекты в таком же виде.
const baseDiscount = {
  partnerName: 'Express pizza',
  value: '-15%',
  description: 'на всё меню',
  status: 'Активна',
  validUntil: '31.10.2026',
  site: 'site',
  instagram: 'instagtam',
  location: 'local',
  conditions: [
    'Скидка действует на всё меню',
    'Не суммируется с другими акциями',
    'Для резидентов IS NOKADY',
  ],
}

// На скриншотах все карточки одинаковые, поэтому создаём 4 копии с разными id
export const discounts = [1, 2, 3, 4].map((id) => ({ id, ...baseDiscount }))
