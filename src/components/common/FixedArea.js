import React, {useEffect, useRef, useState} from 'react';
import {useLocation} from 'react-router-dom'
import classNames from 'classnames/bind'

import styles from './FixedArea.module.scss'

const cx = classNames.bind(styles)

const FixedArea = ({children}) => {
    const fixedRef = useRef(null)
    const initPaddingTop = useRef('')
    const [offsetHeight, setOffsetHeight] = useState(0)
    const {pathname} = useLocation()
    
    useEffect(() => {
        const {parentElement} = fixedRef.current
        setOffsetHeight(fixedRef.current.offsetHeight)
        initPaddingTop.current = parentElement.style.paddingTop
        parentElement.style.paddingTop = `${offsetHeight}px`

        return () => {
            parentElement.style.paddingTop = initPaddingTop.current
        }
    }, [offsetHeight, pathname])

    return (
        <div ref={fixedRef} className={cx('fixed-area')}>
            {children}
        </div>
    );
};

export default FixedArea;