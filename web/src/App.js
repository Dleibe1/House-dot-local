import {useState, useEffect} from "react"
import "./App.css"
import WelcomePage from "./Components/WelcomePage"
import UserView from "./Components/UserView"
const App = () => {
	const [whoDidWhatLast, setWhoDidWhatLast] = useState({ryan: [], eden: [], dan: []})
	const [user, setUser] = useState("")

	const getWhoDidWhatLast = async () => {
		try {
			const response = await fetch("/api/who-did-what-last")
			if (!response.ok) {
				throw new Error(`${response.status} (${response.statusText})`)
			}
			const body = await response.json()
			setWhoDidWhatLast(body)
		} catch (error) {
			console.log(error)
		}
	}

	useEffect(() => {
		getWhoDidWhatLast()
	}, [user])
console.log(user.length)
	return (
		<div className="App">
			{user.length > 0 ? (
				<UserView
					user={user}
					setUser={setUser}
					whoDidWhatLast={whoDidWhatLast}
					setWhoDidWhatLast={setWhoDidWhatLast}
				/>
			) : (
				<WelcomePage whoDidWhatLast={whoDidWhatLast} user={user} setUser={setUser} />
			)}
		</div>
	)
}

export default App
