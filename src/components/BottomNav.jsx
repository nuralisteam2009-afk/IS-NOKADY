import { NavLink } from 'react-router-dom'
import { navItems } from '../data/navItems.js'

function BottomNav() {
  return (
    <nav className="fixed bottom-0 left-1/2 z-40 flex h-[70px] w-full max-w-[430px] -translate-x-1/2 items-center border-t border-gray-300 bg-white">
      {navItems.map((item) => (
        <NavLink
          key={item.id}
          to={item.path}
          end
          className="flex flex-1 items-center justify-center"
        >
          {({ isActive }) => (
            // Размер у всех вкладок одинаковый, поэтому активная вкладка никуда не "выскакивает",
            // а только плавно меняет цвет фона, иконки и текста
            <span
              className={
                'flex h-[52px] w-[60px] flex-col items-center justify-center gap-1 rounded-2xl ' +
                'transition-all duration-300 active:scale-95 ' +
                (isActive ? 'bg-primary shadow-card' : 'bg-transparent')
              }
            >
              <img
                src={item.icon}
                alt=""
                className={
                  'h-5 w-5 object-contain transition duration-300 ' +
                  (isActive ? 'brightness-0 invert' : '')
                }
              />
              <span
                className={
                  'text-[10px] font-medium leading-none transition-colors duration-300 ' +
                  (isActive ? 'text-white' : 'text-primary')
                }
              >
                {item.label}
              </span>
            </span>
          )}
        </NavLink>
      ))}
    </nav>
  )
}

export default BottomNav
