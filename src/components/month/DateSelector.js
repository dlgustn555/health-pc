import React from 'react'
import classNames from 'classnames/bind'
import calendar from 'utils/calendar'

import {useRecoilState} from 'recoil'
import {selectedMonthState} from 'stores/DiaryStore'

import styles from 'scss/Month.module.scss'

const cx = classNames.bind(styles)

const DateSelector = () => {
    const {getPrevMonth, getNextMonth} = calendar
    const [selectedMonth, setSelectedMonth] = useRecoilState(selectedMonthState)
    const {year, month} = selectedMonth

    const handleMonthChange = ({currentTarget}) => {
        const {dataset} = currentTarget
        const changeMonth = dataset.month === 'preve' ? getPrevMonth(year, month) : getNextMonth(year, month)
        setSelectedMonth({year: changeMonth.year, month: changeMonth.month})
    }

    return (
        <div className={cx('dateSelector')}>
            <button data-month="preve" onClick={handleMonthChange}>◀</button>
            <span>
                <span className={cx('year')}>{year}</span>
                <span>.</span>
                <span className={cx('month')}>{month + 1}</span>
                <span className={cx('monthText')}>월</span>
            </span>

            <button data-month="next" onClick={handleMonthChange}>▶</button>
        </div>
    )
}

export default DateSelector
