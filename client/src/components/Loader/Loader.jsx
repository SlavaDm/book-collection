import React from 'react'
import s from './Loader.module.scss'

const Loader = () => {
	return (
		<div className={s['spin-wrapper']}>
			<div className={s['spinner']}>
			</div>
		</div>
	)
}

export default Loader
