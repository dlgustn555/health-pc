import React from 'react'
import {
    atom,
    selectorFamily,
    useRecoilValue,
    useRecoilState,
    useSetRecoilState
} from 'recoil'

const myNumberState = atom({
    key: 'MyNumber',
    default: 2
})

const myMultipliedState = selectorFamily({
    key: 'MyMultipliedNumber',
    get: (multiplier) => ({get}) => {
        console.log('multiplier: ', multiplier)
        console.log(get(myNumberState))
        return get(myNumberState) * multiplier
    },

    // optional set
    set: (multiplier) => ({set, get}) => {
        console.log(get(myMultipliedState)) // 100
        set(myNumberState, get(myMultipliedState) / multiplier)
    }
})

function MyComponent() {
    // defaults to 2
    const number = useRecoilValue(myNumberState)
    // defaults to 200
    const multipliedNumber = useRecoilValue(myMultipliedState(100))

    return (
        <div>
            <p>number: {number}</p>
            <p>multipliedNumber: {multipliedNumber}</p>
        </div>
    )
}

const Test = () => {
    // const [value, setValue] = useRecoilState(myMultipliedState(50))
    const setValue = useSetRecoilState(myMultipliedState(50))

    setTimeout(() => {
        setValue(3)
    }, 5000)

    return (
        <div>
            <MyComponent />
        </div>
    )
}

export default Test
