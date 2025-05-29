import { useDispatch, useSelector } from 'react-redux'
import type { RootState, AppDispatch } from './store'
import { useEffect, useState } from 'react'

type TDebounced = {
    searchQuery: string;
    delay: number;
}

export const useAppDispatch = useDispatch.withTypes<AppDispatch>()
export const useAppSelector = useSelector.withTypes<RootState>()

export const useDebounced = ({ searchQuery, delay }: TDebounced) => {
    const [debouncedValue, setDebouncedValue] = useState<string>(searchQuery);

    useEffect(() => {
        const handler = setTimeout(() => {
            setDebouncedValue(searchQuery);
        }, delay);

        return () => {
            clearTimeout(handler);
        }
    }, [searchQuery, delay])

    return debouncedValue;
}