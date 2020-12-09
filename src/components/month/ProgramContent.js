import React from 'react'
import {observer} from 'mobx-react-lite'
import Program from 'components/month/Program'

import {useDiaryStore} from 'contexts'

const ProgramContent = observer(({type}) => {
    const {diary} = useDiaryStore()
    const programs = diary[type].slice() || []
    programs.push('')
    
    return (
        <>
            {programs.map((program, order) => (
                <Program key={order} order={order} program={program} type={type} />
            ))}
        </>
    )
})

export default ProgramContent
