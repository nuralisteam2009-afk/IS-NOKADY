import sellIcon from '../assets/icons/sell.png'

// Общие настройки для линейных SVG-иконок
const svgProps = {
  width: 28,
  height: 28,
  viewBox: '0 0 24 24',
  fill: 'none',
  stroke: 'white',
  strokeWidth: 1.8,
  strokeLinecap: 'round',
  strokeLinejoin: 'round',
}

// Иконки внутри бирюзовой плитки. Рукопожатие, смайлик и "i" нарисованы SVG-кодом,
// потому что отдельных файлов для них не было.
const icons = {
  handshake: (
    <svg {...svgProps}>
      <path d="m11 17 2 2a1 1 0 1 0 3-3" />
      <path d="m14 14 2.5 2.5a1 1 0 1 0 3-3l-3.88-3.88a3 3 0 0 0-4.24 0l-.88.88a1 1 0 1 1-3-3l2.81-2.81a5.79 5.79 0 0 1 7.06-.87l.47.28a2 2 0 0 0 1.42.25L21 4" />
      <path d="m21 3 1 11h-2" />
      <path d="M3 3 2 14l6.5 6.5a1 1 0 1 0 3-3" />
      <path d="M3 4h8" />
    </svg>
  ),
  tag: <img src={sellIcon} alt="" className="h-[26px] w-[26px] object-contain brightness-0 invert" />,
  smile: (
    <svg {...svgProps}>
      <circle cx="12" cy="12" r="10" />
      <path d="M8 14s1.5 2 4 2 4-2 4-2" />
      <path d="M7.5 9.5q1-1 2 0" />
      <path d="M14.5 9.5q1-1 2 0" />
    </svg>
  ),
  info: (
    <svg {...svgProps}>
      <circle cx="12" cy="12" r="10" />
      <path d="M12 16v-4" />
      <path d="M12 8h.01" />
    </svg>
  ),
}

// Бирюзовая квадратная плитка с иконкой (поддержка, уведомления)
function IconTile({ name }) {
  return (
    <div className="flex h-[50px] w-[50px] shrink-0 items-center justify-center rounded-2xl bg-primary">
      {icons[name]}
    </div>
  )
}

export default IconTile
