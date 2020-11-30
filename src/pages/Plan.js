import React, {useEffect, useState} from 'react';
import queryStrign from 'query-string'
import {useLocation} from 'react-router-dom'

import api from 'utils/api'

import ProgramName from 'components/month/ProgramName'

const Plan = () => {
    const {search} = useLocation()
    const {year, month, date} = queryStrign.parse(search)

    const [diary, setDiary] = useState({
        program: '',
        plan: ''
    })

    useEffect(() => {
        api.get('/diary', {
            params: {year, month, date}
        }).then(({success, result: {data}}) => {
            if (!success) {
                return
            }
            setDiary(data)
        })
    }, [])

    return (
        <div>
            <p>{year}. {month}. {date}</p>
            <div>
                <label>
                    운동명
                </label>
                :
                <ProgramName diary={diary} />
            </div>
            <div>
                <label>PLAN</label>
                :
                <span>{diary.plan}</span>
                <textarea />
            </div>
        </div>
    )
}
export default Plan;