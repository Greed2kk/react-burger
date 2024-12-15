import { FC, lazy, Suspense } from 'react'
import {
  BrowserRouter as Router,
  Outlet,
  Route,
  Routes,
} from 'react-router-dom'

import Layout from '@/pages/layout/layout'

import ProtectedRoute from './protected-route'
import { profilePath, rootPath } from './route-paths'

const BurgerConstructor = lazy(
  () => import('@/pages/burger-constructor-page/burger-constructor-page'),
)

const NotFound = lazy(
  () => import('@/pages/not-found-page/not-found-page'),
)

const Profile = lazy(() => import('@/pages/profile-page/profile-page'))

const AllRoutes: FC = () => (
  <Suspense fallback="Загрузка...">
    <Router>
      <Routes>
        <Route path={rootPath} element={<Outlet />}>
          <Route element={<Layout />}>
            <Route index element={<BurgerConstructor />} />
          </Route>

          <Route element={<ProtectedRoute />}>
            <Route path={profilePath} element={<Profile />} />
          </Route>

          <Route path="*" element={<NotFound />} />
        </Route>
      </Routes>
    </Router>
  </Suspense>
)

export default AllRoutes
