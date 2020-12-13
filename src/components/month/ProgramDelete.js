import React from 'react'

import {useDiaryStore} from 'contexts'

const ProgramDelete = ({_id}) => {
    const {deleteProgram} = useDiaryStore()

    const handleDeleteProgram = async () => {
        await deleteProgram({_id})
    }

    return <button onClick={handleDeleteProgram}>X</button>
}

export default ProgramDelete
