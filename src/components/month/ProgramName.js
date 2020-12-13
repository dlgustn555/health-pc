import React, {useState, useRef, useEffect} from 'react'
import className from 'classnames/bind'

import {useDiaryStore} from 'contexts'

import styles from './ProgramName.module.scss'

const cx = className.bind(styles)

const ProgramName = ({diary}) => {
    const {_id, year, month, date, program, order} = diary
    const {updateProgramName, addProgramName} = useDiaryStore()

    const [hide, setHide] = useState(true)
    const [programName, setProgramName] = useState('')
    const inputRef = useRef(null)

    const isNewDiary = !_id

    // display 상태를 토글한다.
    const handleToggleProramArea = () => {
        if (hide) {
            setTimeout(() => {
                setHide(!hide)
            }, 200)
        } else {
            setHide(!hide)
        }
    }

    // 프로그램명 텍스트 변경을 처리한다.
    const handleProgramChange = ({currentTarget: {value}}) => {
        setProgramName(value)
    }

    // 프로그래명 DB 업데이트를 한다
    const handleProramPatch = async () => {
        if (programName.length === 0 || programName === program) {
            return
        }

        const executeFn = isNewDiary ? addProgramName : updateProgramName
        await executeFn({
            _id,
            year,
            month,
            date,
            program: programName,
            order,
        })
    }

    // input 태그 포커스 아웃이벤트를 처리한다.
    const handleProgramBlur = async () => {
        await handleProramPatch()
        handleToggleProramArea()
        if (programName.length === 0) {
            setProgramName(program)
        }
    }

    const handleKeyUp = ({keyCode}) => {
        if (keyCode === 13) {
            inputRef.current.blur()
        }
    }

    const handleMouseOver = () => {
        if (!hide) {
            return
        }
        console.log('handleMouseOver: ', hide)
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

    useEffect(() => {
        setProgramName(program)
    }, [year, month, date, program])

    return (
        <div onClick={handleToggleProramArea} onMouseOver={handleMouseOver} className={cx('program')}>
            <span className={cx({hide: !hide})}>{programName}</span>
            <input
                ref={inputRef}
                className={cx('input', {hide: hide})}
                type="text"
                value={programName}
                onBlur={handleProgramBlur}
                onChange={handleProgramChange}
                onKeyUp={handleKeyUp}
            />
        </div>
    )
}

export default ProgramName
