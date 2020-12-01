import React, {useState, useRef, useEffect, useContext} from 'react'
import api from 'utils/api'
import className from 'classnames/bind'

import {MonthContext} from 'contexts'

import styles from './Date.module.scss'

const cx = className.bind(styles)

const ProgramName = ({diary: {program = ''} = {}, date}) => {
    const {year, month} = useContext(MonthContext)

    const [hide, setHide] = useState(true)
    const [updatdProgram, setUpdatedProgram] = useState(program)

    const inputRef = useRef(null)
    let timeoutId = 0

    // dispaly 상태를 토글한다.
    const handleToggleProramArea = () => {
        setHide(!hide)
    }

    // 프로그램명 텍스트 변경을 처리한다.
    const handleProgramChange = ({currentTarget: {value}}) => {
        clearTimeout(timeoutId)
        timeoutId = setTimeout(() => {
            handleProramPatch(value)
        }, 500)
    }

    // 프로그래명 DB 업데이트를 한다
    const handleProramPatch = async (program) => {
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
        <div onClick={handleToggleProramArea}>
            <span className={cx({hide: !hide})}>{updatdProgram}</span>
            <input
                data-year={year}
                data-month={month}
                ref={inputRef}
                className={cx('input', {hide: hide})}
                type="text"
                value={updatdProgram}
                onBlur={handleProgramBlur}
                onChange={handleProgramChange}
                onKeyUp={handleKeyUp}
            />
        </div>
    )
}

export default ProgramName
