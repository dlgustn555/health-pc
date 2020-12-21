import React from 'react'
import classNames from 'classnames/bind'

import styles from './DimemdLayer.module.scss'
const cx = classNames.bind(styles)

const DimemdLayer = ({children, closeButton}) => {
    return (
        <div className={cx('dimed')}>
            <button onClick={closeButton}>닫기</button>
            <div className={cx('content')}>{children}</div>
        </div>
    )
}

export default DimemdLayer
