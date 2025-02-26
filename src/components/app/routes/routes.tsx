import { FC, lazy, Suspense } from 'react'

import {
  Outlet,
  Route,
  Routes,
  useLocation,
  useNavigate,
} from 'react-router-dom'

import { IngredientDetails } from '@/components/ingredient-details/ingredient-details'
import { AuthLayout, BaseLayout } from '@/components/layout'
import { Modal } from '@/components/modal/modal'
import { OrderComposition } from '@/components/order-composition/order-composition'

import {
  feedPath,
  forgotPasswordPath,
  ingredientsPath,
  loginPath,
  logoutPath,
  ordersPath,
  profileOrdersPath,
  profilePath,
  registerPath,
  resetPasswordPath,
  rootPath,
} from '@/utils/route-paths'

import ProtectedRoute from './protected-route'

const BurgerConstructor = lazy(
  () => import('@/pages/burger-constructor-page/burger-constructor-page'),
)

const Profile = lazy(() => import('@/pages/profile-page/profile-page'))
const NotFound = lazy(() => import('@/pages/not-found-page/not-found-page'))
const LoginPage = lazy(() => import('@/pages/login-page/login-page'))
const FeedPage = lazy(() => import('@/pages/feed-page/feed-page'))
const RegisterPage = lazy(() => import('@/pages/register-page/register-page'))
const IngredientsPage = lazy(
  () => import('@/pages/ingredients-page/ingredients-page'),
)
const OrderCompositionPage = lazy(
  () => import('@/pages/order-composition-page/order-composition-page'),
)

const ResetPasswordPage = lazy(
  () => import('@/pages/reset-password-page/reset-password-page'),
)
const ForgotPasswordPage = lazy(
  () => import('@/pages/forgot-password-page/forgot-password-page'),
)

const ProfileForm = lazy(
  () => import('@/pages/profile-page/profile-form/profile-form'),
)

const ProfileOrders = lazy(() => import('@/pages/profile-page/orders/orders'))

const ProfileOrder = lazy(() => import('@/pages/profile-page/order/order'))

const ProfileLogout = lazy(() => import('@/pages/profile-page/logout/logout'))

const AllRoutes: FC = () => {
  const location = useLocation()
  const navigate = useNavigate()

  const state = location.state as { backgroundLocation?: Location }

  const closeModal = (): void => {
    navigate(-1)
  }

  return (
    <Suspense>
      <Routes location={state?.backgroundLocation || location}>
        <Route path={rootPath} element={<Outlet />}>
          <Route element={<BaseLayout />}>
            <Route index element={<BurgerConstructor />} />
            <Route
              path={`${ingredientsPath}/:id`}
              element={<IngredientsPage />}
            />

            <Route path={feedPath} element={<FeedPage />} />
            <Route
              path={`${feedPath}/:orderNumber`}
              element={<OrderCompositionPage />}
            />
          </Route>

          <Route element={<AuthLayout />}>
            <Route path={loginPath} element={<LoginPage />} />
            <Route path={registerPath} element={<RegisterPage />} />
            <Route path={forgotPasswordPath} element={<ForgotPasswordPage />} />
            <Route
              path={`${resetPasswordPath}/:token?`}
              element={<ResetPasswordPage />}
            />
          </Route>

          <Route element={<ProtectedRoute />}>
            <Route
              path={`${profileOrdersPath}/:orderNumber`}
              element={<OrderCompositionPage />}
            />
            <Route path={profilePath} element={<Profile />}>
              <Route index element={<ProfileForm />} />
              <Route path={ordersPath} element={<ProfileOrders />} />

              <Route path={`${ordersPath}/:id`} element={<ProfileOrder />} />
              <Route path={logoutPath} element={<ProfileLogout />} />
            </Route>


          </Route>
        </Route>

        <Route path="*" element={<NotFound />} />
      </Routes>

      {state?.backgroundLocation && (
        <Routes>
          <Route
            path={`${ingredientsPath}/:id`}
            element={
              <Modal
                headerText="Детали ингредиента"
                onCloseHandler={closeModal}
              >
                <IngredientDetails />
              </Modal>
            }
          />
        </Routes>
      )}

      {state?.backgroundLocation && (
        <Routes>
          <Route
            path={`${feedPath}/:orderNumber`}
            element={
              <Modal onCloseHandler={closeModal}>
                <OrderComposition />
              </Modal>
            }
          />
        </Routes>
      )}

      {state?.backgroundLocation && (
        <Routes>
          <Route
            path={`${profileOrdersPath}/:orderNumber`}
            element={
              <Modal onCloseHandler={closeModal}>
                <OrderComposition />
              </Modal>
            }
          />
        </Routes>
      )}
    </Suspense>
  )
}

export default AllRoutes
