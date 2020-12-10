import React, {useState, useRef, useEffect} from 'react'
import classNames from 'classnames/bind'

import {useDiaryStore} from 'contexts'

import styles from './Program.module.scss'
const cx = classNames.bind(styles)

const Program = ({order, program = '', type}) => {
    const {updateProgram} = useDiaryStore()

    const [hide, setHide] = useState(true)
    const [programText, setProgramText] = useState(program)

    const inputRef = useRef(null)

    const handleToggleHide = () => {
        setHide(!hide)
    }

    const handleBlur = async () => {
        if (programText.length > 0 && programText !== program) {
            await updateProgram({order, program: programText, type})
        }
        handleToggleHide()
    }

    const handleKeyUp = ({keyCode}) => {
        if (keyCode === 13) {
            inputRef.current.blur()
        }
    }

    const handleChageText = ({currentTarget}) => {
        setProgramText(currentTarget.value)
    }

    useEffect(() => {
        if (!inputRef || inputRef.current.classList.contains(cx('hide'))) {
            return
        }

        inputRef.current.focus()
    }, [hide])

    return (
        <div className={cx('program')}>
            <div className={cx('field', {hide: !hide})} onClick={handleToggleHide}>
                <span>{programText}</span>
            </div>
            <input
                ref={inputRef}
                className={cx({hide})}
                type="text"
                value={programText}
                onKeyUp={handleKeyUp}
                onBlur={handleBlur}
                onChange={handleChageText}
            />
        </div>
    )
}

export default Program
