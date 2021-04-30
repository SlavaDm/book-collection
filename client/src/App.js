import { BrowserRouter } from 'react-router-dom'
import Navbar from './components/Navbar/Navbar'
import AppRouter from './components/AppRouter/AppRouter'
import s from './App.module.scss'

function App() {
	return (
		<BrowserRouter>
			<Navbar />
			<div className={s.wrapper}>
				<AppRouter />
			</div>
		</BrowserRouter>
	)
}

export default App