import React, {useEffect, useState} from 'react'
import queryStrign from 'query-string'
import {useLocation} from 'react-router-dom'
import className from 'classnames/bind'

import api from 'utils/api'

import ProgramName from 'components/month/ProgramName'
import Program from 'components/month/Program'

import styles from './Program.module.scss'

import {DIARY_TYPE} from 'constants/calendar'

const cx = className.bind(styles)

const Plan = () => {
    const {search} = useLocation()
    const {year, month, date} = queryStrign.parse(search)

    const [diary, setDiary] = useState({
        program: '',
        plan: '[{}]'
    })

    const handleAddDiary = () => {
        console.log('handleAddDiary')
    }

    useEffect(() => {
        api.get('/diary', {
            params: {year, month, date}
        }).then(({success, result: {data}}) => {
            if (!success) {
                return
            }
            setDiary(data)
        })
    }, [year, month, date])

    const plans = JSON.parse(diary.plan || '')
    plans.push('')

    return (
        <div className={cx('plan')}>
            <p>
                {year}. {+month + 1}. {date}
            </p>
            <p>PLAN</p>
            <ProgramName diary={diary} />
            {plans.map((plan, index) => (
                <Program
                    key={index}
                    index={index}
                    param={plan}
                    type={DIARY_TYPE.PLAN}
                    handleAddDiary={handleAddDiary}
                />
            ))}
        </div>
    )
}
export default Plan
