import { useLocale } from '../hooks/useLocale'

export const Categories = () => {
  const { text } = useLocale()
  return <h1>{text('routes.categories')}</h1>
}
