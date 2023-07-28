import { Routes, Route } from 'react-router-dom'
import { useRoutes } from '../hooks/useRoutes'

export const RoutesAuthorized = () => {
  const routes = useRoutes()

  return (
    <Routes>
      {
        routes.map(({ path, element }) => (
          <Route
            key={path}
            path={path}
            element={element}
          />
        ))
      }
    </Routes>
  )
}
