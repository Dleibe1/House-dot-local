import {useState} from "react"
import "./App.css"
import WelcomePage from "./Components/WelcomePage"
import {WhoseDoneWhatProvider} from "./contexts/WhoseDoneWhatContext"
import {BrowserRouter as Router, Routes, Route} from "react-router-dom"
import WhichDidYouDo from "./Components/WhichDidYouDo"
import AreYouSure from "./Components/AreYouSure"
const App = () => {
	const [user, setUser] = useState("")
	return (
		<WhoseDoneWhatProvider>
			<Router>
				<Routes>
					<Route
						path="/"
						element={<WelcomePage user={user} setUser={setUser} />}
					/>
					<Route path="/me" element={<WhichDidYouDo user={user} />} />
					<Route
						path="/are-you-sure/:chore"
						element={<AreYouSure user={user} setUser={setUser} />}
					/>
				</Routes>
			</Router>
		</WhoseDoneWhatProvider>
	)
}

export default App
