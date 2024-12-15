import { FC, lazy, Suspense } from 'react'
import {
  BrowserRouter as Router,
  Outlet,
  Route,
  Routes,
} from 'react-router-dom'

import Layout from '@/pages/layout/layout'

import { rootPath } from './routePaths'

const BurgerConstructor = lazy(
  () => import('@/pages/burger-constructor-page/burger-constructor-page'),
)

const AllRoutes: FC = () => (
  <Suspense fallback={'Загрузка...'}>
    <Router>
      <Routes>
        <Route path={rootPath} element={<Outlet />} />

        <Route element={<Layout />}>
          <Route index element={<BurgerConstructor />} />
        </Route>
      </Routes>
    </Router>
  </Suspense>
)

export default AllRoutes
