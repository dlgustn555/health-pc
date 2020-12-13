import React from 'react'
import classNames from 'classnames/bind'

import styles from './ProgramImage.module.scss'
const cx = classNames.bind(styles)

// import emptyImg from 'images/empty.JPG'

const ProgramImage = () => {
    const handleChangeImage = ({currentTarget}) => {
        console.log(currentTarget.value)
    }
    return (
        <div className={cx('image_wrapper')}>
            <input id="fileInput" type="file" onChange={handleChangeImage} style={{display: 'none'}} />
            <label htmlFor="fileInput">
                {/* <img src={emptyImg} /> */}
                <img src="C:\fakepath\앞.jpg" />
                <div>+ 이미지업로드</div>
            </label>
        </div>
    )
}

export default ProgramImage
