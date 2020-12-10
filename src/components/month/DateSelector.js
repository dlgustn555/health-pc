import React from 'react'
import {observer} from 'mobx-react-lite'
import classNames from 'classnames/bind'
import calendar from 'utils/calendar'

import {useDiaryStore} from 'contexts'

import styles from 'pages/Month.module.scss'

const cx = classNames.bind(styles)

const DateSelector = observer(() => {
    const {
        selectedMonth: {year, month},
        changeSelectedMonth,
    } = useDiaryStore()
    const {getPrevMonth, getNextMonth} = calendar

    const handleMonthChange = ({currentTarget}) => {
        const {dataset} = currentTarget
        const changeMonth = dataset.month === 'preve' ? getPrevMonth(year, month) : getNextMonth(year, month)
        changeSelectedMonth(changeMonth)
    }

    return (
        <div className={cx('dateSelector')}>
            <button data-month="preve" onClick={handleMonthChange}>
                ◀
            </button>
            <span>
                <span className={cx('year')}>{year}</span>
                <span>.</span>
                <span className={cx('month')}>{month + 1}</span>
                <span className={cx('monthText')}>월</span>
            </span>

            <button data-month="next" onClick={handleMonthChange}>
                ▶
            </button>
        </div>
    )
})

export default DateSelector
