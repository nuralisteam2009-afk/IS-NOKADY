import { IS_DEMO } from '../services/api.js'

// Небольшая подпись, которая видна только в демо-режиме (без Backend)
function DemoNote({ children, className = '' }) {
  if (!IS_DEMO) return null
  return <p className={`text-[10px] leading-snug text-gray-400 ${className}`}>{children}</p>
}

export default DemoNote
