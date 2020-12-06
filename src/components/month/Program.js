import React, {useState, useRef, useEffect} from 'react'
import className from 'classnames/bind'
import queryStrign from 'query-string'
import {useLocation} from 'react-router-dom'

import api from 'utils/api'

import styles from './Program.module.scss'

const cx = className.bind(styles)

const Program = ({program, type}) => {
    const {search} = useLocation()
    const {year, month, date} = queryStrign.parse(search)

    const [hide, setHide] = useState(true)
    const [text, setText] = useState(program || '')
    console.log(program || '')

    const inputRef = useRef(null)

    const handleToggleHide = () => {
        setHide(!hide)
    }

    const handleBlur = async () => {
        handleToggleHide()
    }

    const handleKeyUp = ({keyCode}) => {
        if (keyCode === 13) {
            inputRef.current.blur()
            // handleAddDiary()
        }
    }

    const handleChageText = ({currentTarget}) => {
        setText(currentTarget.value)
    }

    useEffect(() => {
        if (!inputRef || inputRef.current.classList.contains(cx('hide'))) {
            return
        }

        inputRef.current.focus()
    }, [hide])

    console.log(text)
    return (
        <div className={cx('diary')}>
            <div className={cx('field', {hide: !hide})} onClick={handleToggleHide}>
                <span>{text}</span>
            </div>
            <input
                ref={inputRef}
                className={cx({hide})}
                type="text"
                value={text}
                onKeyUp={handleKeyUp}
                onBlur={handleBlur}
                onChange={handleChageText}
            />
        </div>
    )
}

export default Program
