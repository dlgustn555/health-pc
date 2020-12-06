import React, {useEffect, useState} from 'react';
import {useDiaryStore} from 'contexts'

import ProgramName from 'components/month/ProgramName'
import Program from 'components/month/Program'

const ProgramDetail = ({match}) => {
    const {_id} = match.params
    const {diary, getDiary} = useDiaryStore()

    const [isLoading, setIsLoading] = useState(true)

    useEffect(() => {
        getDiary({_id}).finally(() => {
            setIsLoading(false)
        })
    }, [_id])

    if (isLoading) {
        return null
    }

    return (
        <>
            <ProgramName diary={diary} />
            <div>
                <Program diary={diary} />
            </div>
        </>
    );
};

export default ProgramDetail