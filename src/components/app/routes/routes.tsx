import { FC, lazy, Suspense } from 'react'
import {
  BrowserRouter as Router,
  Outlet,
  Route,
  Routes,
} from 'react-router-dom'

import { AuthLayout, BaseLayout } from 'components/layout'

import ForgotPasswordPage from '@/pages/forgot-password-page/forgot-password-page'
import ResetPasswordPage from '@/pages/reset-password-page/reset-password-page'
import {
  forgotPasswordPath,
  loginPath,
  orders,
  profilePath,
  registerPath,
  resetPasswordPath,
  rootPath,
} from '@/utils/route-paths'

import ProtectedRoute from './protected-route'

const BurgerConstructor = lazy(
  () => import('@/pages/burger-constructor-page/burger-constructor-page'),
)
const OrdersPage = lazy(() => import('@/pages/orders-page/orders-page'))

const NotFound = lazy(() => import('@/pages/not-found-page/not-found-page'))

const Profile = lazy(() => import('@/pages/profile-page/profile-page'))
const LoginPage = lazy(() => import('@/pages/login-page/login-page'))
const RegisterPage = lazy(() => import('@/pages/register-page/register-page'))

const AllRoutes: FC = () => (
  <Suspense fallback="Загрузка...">
    <Router>
      <Routes>
        <Route path={rootPath} element={<Outlet />}>
          <Route element={<BaseLayout />}>
            <Route index element={<BurgerConstructor />} />
          </Route>

          <Route element={<AuthLayout />}>
            <Route path={loginPath} element={<LoginPage />} />
            <Route path={registerPath} element={<RegisterPage />} />
            <Route path={forgotPasswordPath} element={<ForgotPasswordPage />} />
            <Route path={resetPasswordPath} element={<ResetPasswordPage />} />
          </Route>

          <Route element={<ProtectedRoute />}>
            <Route path={profilePath} element={<Profile />} />
            <Route path={orders} element={<OrdersPage />} />
          </Route>
        </Route>

        <Route path="*" element={<NotFound />} />
      </Routes>
    </Router>
  </Suspense>
)

export default AllRoutes
