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
    const bodyRef = useRef(null)
    const [paddingBottom, setPaddingBottom] = useState('')
    const [diaries, setDiaries] = useState([])

    const {
        thisMonth: {first, last, total, year, month}
    } = calendar

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
    }, [year, month])

    return (
        <MonthContext.Provider value={diaries}>
            <div
                ref={bodyRef}
                className={cx('month-wrapper')}
                style={{paddingBottom: paddingBottom}}
            >
                <FixedArea>
                    <DateSelector />
                    <Header start={DAY.SUNDAY} />
                </FixedArea>
                {Array.from(Array(total)).map((_, index) => {
                    const date = first.day <= index ? first.date + index : null

                    return <Date key={index} date={date > last.date ? null : date} />
                })}
            </div>
        </MonthContext.Provider>
    )
}

export default Month
