import React, {useEffect, useState} from "react"

const WhoseTurn = (props) => {
	const whoDidWhat = useState({ryan: [], eden: [], dan: []})
	const whoDidWhatLast = async () => {
		try {
			const response = await fetch("/api/who-did-what-last")
			if (!response.ok) {
				throw new Error(`${response.status} (${response.statusText})`)
			}
			const body = await response.json()
			console.log(body)
		} catch (error) {
			console.log(error)
		}
	}

	useEffect(() => {
		whoDidWhatLast()
	}, [])

	return (
		<>
			<p>Dan did {whoDidWhat.dan}</p>
			<p>Ryan did {whoDidWhat.ryan}</p>
			<p>Eden did {whoDidWhat.eden}</p>
		</>
	)
}

export default WhoseTurn
