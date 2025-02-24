import React, {useEffect, useContext} from "react"
import {WhoseDoneWhatContext} from "../contexts/WhoseDoneWhatContext"
import {Link} from "react-router-dom"
import "../App.css"

const WelcomePage = ({user, setUser}) => {
	const {whoseDoneWhat, setWhoseDoneWhat} = useContext(WhoseDoneWhatContext)

	useEffect(() => {
		getWhoDidWhatLast()
	}, [])

	const getWhoDidWhatLast = async () => {
		try {
			const response = await fetch("/api/who-did-what-last")
			if (!response.ok) {
				throw new Error(`${response.status} (${response.statusText})`)
			}
			const body = await response.json()
			console.log(body)
			setWhoseDoneWhat(body)
		} catch (error) {
			console.log(error)
		}
	}
	const whatDanDid = Object.entries(whoseDoneWhat.dan.chores)
	.filter(([chore, value]) => value)
	.map(([chore, value]) => ` ${chore}, `)
	const whatRyanDid = Object.entries(whoseDoneWhat.ryan.chores)
	.filter(([chore, value]) => value)
	.map(([chore, value]) => ` ${chore}, `)
	const whatEdenDid = Object.entries(whoseDoneWhat.eden.chores)
	.filter(([chore, value]) => value)
	.map(([chore, value]) => ` ${chore}, `)
	return (
		<div className="welcome-page">
			<section className="who-did-what">
				<p>
					Dan did
					{whatDanDid}
				</p>
				<p>
					Ryan did
					{whatRyanDid}
				</p>
				<p>
					Eden did
					{whatEdenDid}
				</p>
			</section>
			<section className="name-buttons">
				<h1>Who are You?</h1>
				<Link onClick={() => setUser("ryan")}  to="/me">
					<button className="red-btn">
						Ryan
					</button>
				</Link>
				<Link onClick={() => setUser("eden")}  to="/me">
					<button className="pink-btn">
						Eden
					</button>
				</Link>
				<Link onClick={() => setUser("dan")}  to="/me">
					<button className="blue-btn">
						Dan
					</button>
				</Link>
			</section>
		</div>
	)
}

export default WelcomePage
