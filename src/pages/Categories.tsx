import { useLocale } from '../hooks/useLocale'

export const Categories = () => {
  const { localize } = useLocale()
  return <h1>{localize('routes.categories')}</h1>
}
