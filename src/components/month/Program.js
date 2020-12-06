import React, {useState, useRef, useEffect} from 'react';
import classNames from 'classnames/bind'

import styles from './Program.module.scss'
const cx = classNames.bind(styles)

const Program = ({program = ''}) => {
    const [hide, setHide] = useState(true)
    const [programText, setProgramText] = useState(program)

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
    );
};

export default Program;
