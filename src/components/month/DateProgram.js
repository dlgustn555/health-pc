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

    const handleToggleProramArea = () => {
        setHide(!hide)
    }

    const handleProgramChange = ({currentTarget}) => {
        clearTimeout(timeoutId)
        timeoutId = setTimeout(() => {
            handleProramPatch(currentTarget.value)
        }, 500)
    }

    const handleProramPatch = async (program) => {
        const {
            data: {success, result}
        } = await api.patch('/diary/program', {
            program,
            todoDate: `${year}-${month}-${date}`
        })

        if (!success) {
            alert('업데이트 실패')
            return
        }

        setProgram(result.data.program)
    }

    const handleProgramBlur = async ({currentTarget}) => {
        clearTimeout(timeoutId)
        await handleProramPatch(currentTarget.value)
        handleToggleProramArea()
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
                />
            </div>
        </div>
    )
}

export default DateProgram
