import { useDispatch } from 'react-redux'

import { AppDispatch } from '../../components/app/store/store'

type DispatchFunc = () => AppDispatch
export const useAppDispatch: DispatchFunc = useDispatch
