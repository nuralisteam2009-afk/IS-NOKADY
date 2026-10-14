/** @type {import('tailwindcss').Config} */
export default {
  content: ['./index.html', './src/**/*.{js,jsx}'],
  theme: {
    extend: {
      // Цвета сайта, взятые со скриншотов
      colors: {
        primary: '#1C9E8D', // бирюзовый (заголовки, кнопки, навигация)
        accent: '#EC683F', // оранжевый (скидка, рамки, карточки статистики)
        sun: '#F8AE4E', // жёлто-оранжевый (маркеры списка)
        brand: '#165ABA', // синий фон страницы с QR-кодом
        placeholder: '#D9D9D9', // серые заглушки (лого, QR, график)
        header: '#CFCFCF', // серая шапка на странице скидки
      },
      fontFamily: {
        sans: ['Roboto', 'sans-serif'],
      },
      keyframes: {
        fadeIn: { from: { opacity: '0' }, to: { opacity: '1' } },
      },
      animation: {
        'fade-in': 'fadeIn 0.3s ease-out',
      },
      boxShadow: {
        card: '0 4px 8px rgba(0, 0, 0, 0.25)',
      },
    },
  },
  plugins: [],
}
