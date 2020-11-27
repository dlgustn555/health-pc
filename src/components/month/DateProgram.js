import React, {useState, useRef, useEffect} from 'react'
import api from 'utils/api'
import className from 'classnames/bind'

import calendar from 'utils/calendar'

import styles from './Date.module.scss'

const cx = className.bind(styles)

const DateProgram = ({date}) => {
    const {year, month, date: toDate} = calendar
    const isToDate = toDate === date

    const [program, setProgram] = useState('')
    const [hide, setHide] = useState(true)
    const inputRef = useRef(null)
    let timeoutId = 0

    // dispaly 상태를 토글한다.
    const handleToggleProramArea = () => {
        setHide(!hide)
    }

    // 프로그램명 텍스트 변경을 처리한다.
    const handleProgramChange = ({currentTarget}) => {
        clearTimeout(timeoutId)
        timeoutId = setTimeout(() => {
            handleProramPatch(currentTarget.value)
        }, 500)
    }

    // 프로그래명 DB 업데이트를 한다
    const handleProramPatch = async (program) => {
        const {
            data: {success, result}
        } = await api.patch('/diary/program', {
            program,
            year,
            month,
            date
        })

        if (!success) {
            alert('업데이트 실패')
            return
        }

        setProgram(result.data.program)
    }

    // input 태그 포커스 아웃이벤트를 처리한다.
    const handleProgramBlur = async ({currentTarget}) => {
        clearTimeout(timeoutId)
        await handleProramPatch(currentTarget.value)
        handleToggleProramArea()
    }

    const handleKeyUp = ({keyCode}) => {
        if (keyCode === 13) {
            inputRef.current.blur()
        }
    }

    // input 태그 Show > input 태그에 auto focusing
    useEffect(() => {
        if (!inputRef) {
            return
        }

        const isInputHide = inputRef.current.classList.contains(cx('hide'))
        if (!isInputHide) {
            inputRef.current.focus()
        }
    }, [hide])

    return (
        <div className={cx('program')}>
            <span className={cx({toDate: isToDate})}>{date}</span>
            <div onClick={handleToggleProramArea}>
                <span className={cx({hide: !hide})}>{program}</span>
                <input
                    ref={inputRef}
                    className={cx('input', {hide: hide})}
                    type="text"
                    onBlur={handleProgramBlur}
                    onChange={handleProgramChange}
                    onKeyUp={handleKeyUp}
                />
            </div>
        </div>
    )
}

export default DateProgram
