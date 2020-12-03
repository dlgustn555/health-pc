import React, {useEffect, useRef, useState, Suspense} from 'react'
import classNames from 'classnames/bind'

import {useRecoilValue, useSetRecoilState} from 'recoil'
import {getMonthDiaryState, diariesState, selectedMonthState} from 'stores/DiaryStore'

import calendar from 'utils/calendar'
import {DAY} from 'constants/calendar'

import styles from 'scss/Month.module.scss'

import DateSelector from 'components/month/DateSelector'
import Header from 'components/month/Header'
import Date from 'components/month/Date'
import FixedArea from 'components/common/FixedArea'

const cx = classNames.bind(styles)

const Month = () => {
    const {getMonthInfo} = calendar

    const bodyRef = useRef(null)
    const [paddingBottom, setPaddingBottom] = useState('')

    const {year, month} = useRecoilValue(selectedMonthState)
    const diaries = useRecoilValue(getMonthDiaryState({year, month}))
    useSetRecoilState(diariesState)(diaries)

    const {first, last, total} = getMonthInfo(year, month)

    useEffect(() => {
        const {offsetHeight} = bodyRef.current
        setPaddingBottom(Math.floor(offsetHeight))
    }, [])

    return (
        <Suspense fallback={<>Data Loading...!!</>}>
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
                    const date =
                        index < first.day
                            ? null
                            : index === first.day
                            ? 1
                            : index - first.day + 1
                    return <Date key={index} date={date > last.date ? null : date} />
                })}
            </div>
        </Suspense>
    )
}

export default Month
