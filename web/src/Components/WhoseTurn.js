import React, {useEffect, useState} from "react"
import "./WhoseTurn.css"

const WhoseTurn = ({user, setUser}) => {
	const [whoDidWhat, setWhoDidWhat] = useState({ryan: [], eden: [], dan: []})
	const whoDidWhatLast = async () => {
		try {
			const response = await fetch("/api/who-did-what-last")
			if (!response.ok) {
				throw new Error(`${response.status} (${response.statusText})`)
			}
			const body = await response.json()
			setWhoDidWhat(body)
		} catch (error) {
			console.log(error)
		}
	}

	useEffect(() => {
		whoDidWhatLast()
	}, [])

	return (
		<>
			<p>Dan did {whoDidWhat.dan.map((thingDanDid) => thingDanDid)}</p>
			<p>Ryan did {whoDidWhat.ryan.map((thingRyanDid) => thingRyanDid)}</p>
			<p>Eden did {whoDidWhat.eden.map((thingEdenDid) => thingEdenDid)}</p>
			<h1>Who are You?</h1>
			<div className="name-buttons">
				<button onClick={() => setUser("ryan")} className="ryan">
					Ryan
				</button>
				<button onClick={() => setUser("eden")} className="eden">
					Eden
				</button>
				<button onClick={() => setUser("dan")} className="dan">
					Dan
				</button>
			</div>
		</>
	)
}

export default WhoseTurn
