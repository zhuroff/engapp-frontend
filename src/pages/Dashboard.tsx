import { useLocale } from '../hooks/useLocale'

export const Dashboard = () => {
  const { localize } = useLocale()
  return <h1>{localize('routes.dashboard')}</h1>
}
