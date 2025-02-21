import { useState } from "react"
import "./App.css"
import WhoseTurn from "./Components/WhoseTurn"
const App = () => {
	const [user, setUser] = useState("")
console.log(user, user.length)
	return (
		<div className="App">
			{!user.length && <WhoseTurn user={user} setUser={setUser} />}
		</div>
	)
}

export default App
