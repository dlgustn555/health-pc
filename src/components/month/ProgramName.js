import React, {useState, useRef, useEffect, useContext} from 'react'
import api from 'utils/api'
import className from 'classnames/bind'

import styles from './ProgramName.module.scss'

const cx = className.bind(styles)

const ProgramName = ({diary: {program = ''} = {}, date}) => {
    const year = 2020
    const month = 11
    const [hide, setHide] = useState(true)
    const [updatedProgram, setUpdatedProgram] = useState()

    const inputRef = useRef(null)
    let timeoutId = 0

    // dispaly 상태를 토글한다.
    const handleToggleProramArea = () => {
        setHide(!hide)
    }

    // 프로그램명 텍스트 변경을 처리한다.
    const handleProgramChange = ({currentTarget: {value}}) => {
        setUpdatedProgram(value)
        clearTimeout(timeoutId)
        timeoutId = setTimeout(() => {
            handleProramPatch(value)
        }, 500)
    }

    // 프로그래명 DB 업데이트를 한다
    const handleProramPatch = async (program) => {
        const {success} = await api.patch('/diary/program', {
            program,
            year,
            month,
            date
        })

        if (!success) {
            alert('업데이트 실패')
            return
        }
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
        <div onClick={handleToggleProramArea} className={cx('program')}>
            <span className={cx({hide: !hide})}>{updatedProgram || program}</span>
            <input
                data-year={year}
                data-month={month}
                ref={inputRef}
                className={cx('input', {hide: hide})}
                type="text"
                value={updatedProgram || program}
                onBlur={handleProgramBlur}
                onChange={handleProgramChange}
                onKeyUp={handleKeyUp}
            />
        </div>
    )
}

export default ProgramName
