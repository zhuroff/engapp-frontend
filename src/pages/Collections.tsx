import { useLocale } from '../hooks/useLocale'

export const Collections = () => {
  const { localize } = useLocale()
  return <h1>{localize('routes.collections')}</h1>
}
