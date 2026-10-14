import { useEffect, useState } from 'react'

// Хук для загрузки данных: возвращает { data, loading, error }.
// fetcher — функция из services/api.js, deps — список значений, при изменении которых нужно загрузить данные заново.
export function useFetch(fetcher, deps = []) {
  const [state, setState] = useState({ data: null, loading: true, error: '' })

  useEffect(() => {
    // Если страницу закрыли до ответа сервера, результат игнорируем
    let isCancelled = false
    setState({ data: null, loading: true, error: '' })

    fetcher()
      .then((data) => {
        if (!isCancelled) setState({ data, loading: false, error: '' })
      })
      .catch((error) => {
        if (!isCancelled) setState({ data: null, loading: false, error: error.message })
      })

    return () => {
      isCancelled = true
    }
  }, deps)

  return state
}
