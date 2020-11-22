import React, {useEffect, useRef, useState} from 'react';
import classNames from 'classnames/bind'

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

    const {thisMonth: {first, last, total}} = calendar
    
    useEffect(() => {
        const {offsetHeight} = bodyRef.current
        setPaddingBottom(Math.floor(offsetHeight/2))
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