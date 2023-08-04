/** @jsxImportSource @emotion/react */
import { jsx, css } from '@emotion/react'
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
    <aside css={sidebarCSS}>
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
      {/* {
        Object.entries(localeMessages[currentLocale].languages)
          .map(([langKey, langCode]) => (
            <div key={langKey}>
              <Button
                label={langCode}
                onClick={() => setCurrentLocale(langKey as LocaleCodes)}
              />
            </div>
          ))
      } */}
    </aside>
  )
}

const sidebarCSS = css`
  padding: 1rem;
  text-align: center;

  ul {
    li {
      a {
        padding: 0.25rem 0;
        font-size: 1rem;
        display: block;
      }
    }
  }
`
