import {useState, useEffect} from "react"

const UserView = ({user, whoDidWhat, setUser, setWhoDidWhat}) => {
	const [whatIDid, setWhatIDid] = useState({user, chore: ""})

	// const postWhatIDid = async () => {
	// 	try {
	// 		const response = await fetch(`/api/whoDidWhatLast.json,`, {
	// 			method: "POST",
	// 			headers: new Headers({
	// 				"Content-Type": "application/json",
	// 			}),
	// 			body: JSON.stringify(whatIDid),
	// 		})

	// 		if (!response.ok) {
	// 			throw new Error(`${response.status} (${response.statusText})`)
	// 		}
	// 		const body = await response.json()
	// 		setWhoDidWhat(body)
	// 	} catch (error) {
	// 		console.log(error)
	// 	}
	// }

	
	return (
		<>
			<h1>What's up {user}</h1>
			<h1>Which did you do?</h1>
			<button onClick={() => setWhatIDid({user, chore: "dishes" })} className="ryan">
				Dishes
			</button>
			<button onClick={() => setWhatIDid({user, chore: "trash"})} className="eden">
				Trash
			</button>
			<button onClick={() => setWhatIDid({user, chore: "recycling"})} className="dan">
				Recycling
			</button>
		</>
	)
}

export default UserView
