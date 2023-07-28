import { useLocale } from '../hooks/useLocale'

export const Dashboard = () => {
  const { text } = useLocale()
  return <h1>{text('routes.dashboard')}</h1>
}
