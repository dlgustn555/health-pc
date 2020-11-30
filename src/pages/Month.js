import React, {useEffect, useRef, useState} from 'react'
import classNames from 'classnames/bind'

import {MonthContext} from 'contexts'

import api from 'utils/api'
import calendar from 'utils/calendar'
import {DAY} from 'constants/calendar'

import styles from 'scss/Month.module.scss'

import DateSelector from 'components/month/DateSelector'
import Header from 'components/month/Header'
import Date from 'components/month/Date'
import FixedArea from 'components/common/FixedArea'

const cx = classNames.bind(styles)

const Month = () => {
    const {toDate, getMonthInfo} = calendar

    const bodyRef = useRef(null)
    const [paddingBottom, setPaddingBottom] = useState('')
    const [diaries, setDiaries] = useState([])

    const [year, setYear] = useState(toDate.getFullYear())
    const [month, setMonth] = useState(toDate.getMonth())

    useEffect(() => {
        const {offsetHeight} = bodyRef.current
        setPaddingBottom(Math.floor(offsetHeight))
    }, [])

    useEffect(() => {
        api.get(`/diary/month`, {
            params: {year, month}
        }).then(({success, result: {data}}) => {
            if (!success) {
                return
            }
            setDiaries(data)
        })

        return () => {
            setDiaries([])
        }
    }, [year, month])

    const {first, last, total} = getMonthInfo(year, month)

    const action = {
        setYear,
        setMonth
    }

    return (
        <MonthContext.Provider value={{
            year,
            month,
            diaries,
            action
        }}>
            <div
                ref={bodyRef}
                className={cx('month-wrapper')}
                style={{paddingBottom: paddingBottom}}
            >
                <FixedArea>
                    <DateSelector year={year} month={month} action={action} />
                    <Header start={DAY.SUNDAY} />
                </FixedArea>

                {Array.from(Array(total)).map((_, index) => {
                    const date = index < first.day ? null : index === first.day ? 1 : index - first.day + 1
                

                    return <Date key={index} date={date > last.date ? null : date} />
                })}
            </div>
        </MonthContext.Provider>
    )
}

export default Month
