import { useEffect, useState } from 'react'
import { Navigate } from 'react-router-dom'
import { RouteItem } from '../types/common'
import { useLocale } from './useLocale'
import { Dashboard } from '../pages/Dashboard'
import { Categories } from '../pages/Categories'
import { Collections } from '../pages/Collections'
import { Collection } from '../pages/Collection'
import { Category } from '../pages/Category'

export const useRoutes = () => {
  const { currentLocale, localize } = useLocale()
  const routeList: RouteItem[] = [
    {
      path: '/',
      element: <Dashboard />,
      title: localize('routes.dashboard')
    },
    {
      path: '/categories',
      element: <Categories />,
      title: localize('routes.categories')
    },
    {
      path: '/categories/:id',
      element: <Category />
    },
    {
      path: '/collections',
      element: <Collections />,
      title: localize('routes.collections')
    },
    {
      path: '/collections/:id',
      element: <Collection />
    }
  ]

  const [routes, setRoutes] = useState<RouteItem[]>(routeList)

  useEffect(() => {
    setRoutes(routeList)
  }, [currentLocale])

  return routes
}