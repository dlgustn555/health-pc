import React, {useEffect, useState} from 'react';
import queryStrign from 'query-string'
import {useLocation} from 'react-router-dom'

import api from 'utils/api'

const Plan = () => {
    const {search} = useLocation()
    const {year, month, date} = queryStrign.parse(search)

    const [diary, setDiary] = useState(null)

    useEffect(() => {
        api.get('/diary', {
            paramse: {year, month, date}
        }).then(({success, result: {data}}) => {
            if (!success) {
                return
            }
            setDiary(data)
        })
    }, [])

    return (<div>{year}, {month}, {date}</div>)
}
export default Plan;