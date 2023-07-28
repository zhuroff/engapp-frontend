import { useLocale } from '../hooks/useLocale'

export const Collections = () => {
  const { text } = useLocale()
  return <h1>{text('routes.collections')}</h1>
}
