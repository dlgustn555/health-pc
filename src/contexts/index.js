import React, {createContext, useContext} from 'react'
import {useLocalStore} from 'mobx-react-lite'

import {createDiaryStore} from 'stores/DiaryStore'

const RootContext = createContext()

// Provider
export const RootProvider = ({children}) => {
    return (
        <RootContext.Provider
            value={{
                DiaryStore: useLocalStore(createDiaryStore),
            }}>
            {children}
        </RootContext.Provider>
    )
}

// Consumer
export const useDiaryStore = () => useContext(RootContext).DiaryStore
