import React from 'react'
import s from '../Form.module.scss'

const Input = ({type, value, onChange, placeholder}) => {
	return (
		<div className={s.item}>
			<input type={type} value={value} onChange={onChange} placeholder={placeholder} />
		</div>
	)
}

export default Input
