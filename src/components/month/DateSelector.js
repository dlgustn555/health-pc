import React from 'react'
import classNames from 'classnames/bind'

import styles from 'scss/Month.module.scss'

const cx = classNames.bind(styles)

const DateSelector = () => {
    return (
        <div className={cx('dateSelector')}>
            <button>◀</button>
            <span>
                <span className={cx('year')}>2020</span>
                <span>.</span>
                <span className={cx('month')}>11</span>
                <span className={cx('monthText')}>월</span>
            </span>

            <button>▶</button>
        </div>
    )
}

export default DateSelector
