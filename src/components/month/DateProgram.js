import React, {useState, useRef, useEffect} from 'react'
import api from 'utils/api'
import className from 'classnames/bind'

import {MonthContext} from 'contexts'
import calendar from 'utils/calendar'

import styles from './Date.module.scss'

const cx = className.bind(styles)

const DateProgram = ({date}) => {
    const {date: toDate} = calendar
    const isToDate = toDate === date

    const [hide, setHide] = useState(true)
    const [updatdProgram, setUpdatedProgram] = useState('')
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
        const {dataset: {year, month}} = inputRef.current
        const {
            success,
            result: {data}
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

        setUpdatedProgram(data.program)
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
        <MonthContext.Consumer>
            {({diaries, year, month}) => {
                const {program} = diaries.find((diary) => diary.date === date) || {
                    program: ''
                }

                return (
                    <div className={cx('program')}>
                        <span className={cx({toDate: isToDate})}>{date}</span>
                        <div onClick={handleToggleProramArea}>
                            <span className={cx({hide: !hide})}>
                                {program || updatdProgram}
                            </span>
                            <input
                                data-year={year}
                                data-month={month}
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
            }}
        </MonthContext.Consumer>
    )
}

export default DateProgram
