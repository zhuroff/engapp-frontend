import { useMemo } from 'react'
// import { useLocale } from '../hooks/useLocale'
import { useRoutes } from '../hooks/useRoutes'
import { RouteItem } from '../types/common'
import { NavLink } from 'react-router-dom'

export const Sidebar = () => {
  const routes = useRoutes()
  // const { currentLocale, text, setLocale } = useLocale()

  const reducedRoutes = useMemo(() => (
    routes.reduce<Omit<RouteItem, 'element'>[]>((acc, { path, title }) => {
      if (title) acc.push({ path, title })
      return acc
    }, [])
  ), [routes])

  return (
    <aside>
      <nav>
        <ul>
          {
            reducedRoutes.map(({ path, title }) => (
              <li key={path}>
                <NavLink to={path}>{title}</NavLink>
              </li>
            ))
          }
        </ul>
      </nav>
    </aside>
  )
}