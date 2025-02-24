import React, { useEffect } from "react"
import "./SetUser.css"

const WelcomePage = ({user, setUser, whoDidWhatLast}) => {

	return (
		<>
			<p>Dan did {whoDidWhatLast.dan.map((thingDanDid) => thingDanDid)}</p>
			<p>Ryan did {whoDidWhatLast.ryan.map((thingRyanDid) => thingRyanDid)}</p>
			<p>Eden did {whoDidWhatLast.eden.map((thingEdenDid) => thingEdenDid)}</p>
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

export default WelcomePage
