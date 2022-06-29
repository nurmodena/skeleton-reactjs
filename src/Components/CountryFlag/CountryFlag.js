import React from 'react'

const CountryFlag = (props) => {
    const { code, style } = props;
    const c = code == 'en' ? 'gb' : code;
    return (
        <img src={`https://flagcdn.com/48x36/${c || 'id'}.png`} style={{ width: 30, height: 20, marginRight: 20, ...style }} />
    )
}

export default CountryFlag;