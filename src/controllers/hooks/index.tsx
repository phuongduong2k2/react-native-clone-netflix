import {useDispatch, useSelector, useStore} from 'react-redux';
import type {AppDispatch, RootState, AppStore} from '../redux/AppStore';

export const useAppDispatch = useDispatch.withTypes<AppDispatch>();
export const useAppSelector = useSelector.withTypes<RootState>();
export const useAppStore = useStore.withTypes<AppStore>();

export const useMovies = () => useAppSelector(state => state.movie);
