import {createContext, useContext} from 'react'

export const MonthContext = createContext('month')
export const useMonthContext = () => useContext(MonthContext)
