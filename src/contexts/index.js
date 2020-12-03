import {createContext, useContext} from 'react'
import {useLocalObservable} from 'mobx-react-lite'

import {createDiaryStore} from 'stores/DiaryStore'

const RootContext = createContext()

// Provider
export const RootProvider = ({children}) => {
    return (
        <RootContext.Provider value={{
            DiaryStore: useLocalObservable(createDiaryStore)
        }}>
            {children}
        </RootContext.Provider>
    )
}

// Consumer
export const useDiaryStore = () => useContext(RootContext).DiaryStore