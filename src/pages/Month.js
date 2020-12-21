import React, {useEffect, useRef, useState} from 'react'
import {observer} from 'mobx-react-lite'
import classNames from 'classnames/bind'

import calendar from 'utils/calendar'
import {DAY} from 'constants/calendar'

import FixedArea from 'components/common/FixedArea'
import DateSelector from 'components/month/DateSelector'
import Header from 'components/month/Header'
import Date from 'components/month/Date'
import {ImageSlideButton} from 'components/month/ImageSlide'

import {useDiaryStore} from 'contexts'

import styles from './Month.module.scss'
const cx = classNames.bind(styles)

const Month = observer(() => {
    const {
        selectedMonth: {year, month},
        getMonthDiaries,
    } = useDiaryStore()

    const bodyRef = useRef(null)
    const [paddingBottom, setPaddingBottom] = useState('')
    const [isLoaing, setIsLoading] = useState(true)

    const {getMonthInfo} = calendar
    const {first, last, total} = getMonthInfo(year, month)

    useEffect(() => {
        const {offsetHeight} = bodyRef.current
        setPaddingBottom(Math.floor(offsetHeight))
    }, [isLoaing])

    useEffect(() => {
        getMonthDiaries().finally(() => {
            setIsLoading(false)
        })
    }, [getMonthDiaries, year, month])

    return (
        <div ref={bodyRef} className={cx('month-wrapper')} style={{paddingBottom}}>
            <FixedArea>
                <DateSelector />
                <ImageSlideButton>이미지 슬라이드</ImageSlideButton>
                <Header start={DAY.SUNDAY} />
            </FixedArea>
            {Array.from(Array(total)).map((_, index) => {
                const date = index < first.day ? null : index === first.day ? 1 : index - first.day + 1
                return <Date key={index} date={date > last.date ? null : date} />
            })}
        </div>
    )
})

export default Month
