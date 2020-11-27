import React, {useEffect, useRef, useState} from 'react';
import classNames from 'classnames/bind'

import api from 'utils/api'
import calendar from 'utils/calendar'
import {DAY} from 'constants/calendar'

import styles from './Month.module.scss'

import Header from 'components/month/Header'
import Date from 'components/month/Date'
import FixedArea from 'components/common/FixedArea'

const cx = classNames.bind(styles)

const Month = () => {
    const bodyRef = useRef(null)
    const [paddingBottom, setPaddingBottom] = useState('')

    const {thisMonth: {first, last, total, year, month}, prevMonth, nextMonth} = calendar
    
    useEffect(() => {
        const {offsetHeight} = bodyRef.current
        setPaddingBottom(Math.floor(offsetHeight))
    }, [])

    useEffect(() => {
        api.get(`/diary/month`, {params: {
            prevMonth: `${prevMonth.year}.${prevMonth.month}`,
            thisMonth: `${year}.${month}`,
            nextMonth: `${nextMonth.year}.${nextMonth.month}`
        }}).then(({success, result: {data}}) => {
            if (!success) {
                return
            }
        })
    }, [])

    return (
        <div ref={bodyRef} className={cx('month-wrapper')} style={{paddingBottom: paddingBottom}}>
            <FixedArea>
                <Header start={DAY.SUNDAY} />
            </FixedArea>
            {Array.from(Array(total)).map((_, index) => {
                const date = first.day <= index ? first.date + index : null

                return (
                    <Date key={index} date={date > last.date ? null : date} />
                )
            })}
        </div>
    );
};

export default Month;