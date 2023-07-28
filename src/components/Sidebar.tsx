import { useMemo } from 'react'
// import { useLocale } from '../hooks/useLocale'
import { useRoutes } from '../hooks/useRoutes'
import { LocaleCodes, RouteItem } from '../types/common'
import { NavLink } from 'react-router-dom'
import { useLocale } from '../hooks/useLocale'
import { Button } from 'primereact/button'

export const Sidebar = () => {
  const routes = useRoutes()
  const { currentLocale, setCurrentLocale, localeMessages } = useLocale()

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
        {
          Object.entries(localeMessages[currentLocale].languages)
            .map(([langKey, langCode]) => (
              <div key={langKey}>
                <Button
                  label={langCode}
                  onClick={() => setCurrentLocale(langKey as LocaleCodes)}
                />
              </div>
            ))
        }
      </nav>
    </aside>
  )
}