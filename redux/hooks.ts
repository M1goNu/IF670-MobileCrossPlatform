import { useDispatch } from 'react-redux';
import type { AppDispatch } from './store';

// It provides the correct type for the dispatch function, which is AppDispatch.
// useAppDispatch is a custom hook that wraps the useDispatch hook from react-redux.
export const useAppDispatch = () => useDispatch<AppDispatch>();