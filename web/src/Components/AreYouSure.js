import React, {useContext, useState, useEffect, useRef} from "react"
import {useParams, Navigate} from "react-router-dom"
import {WhoseDoneWhatContext} from "../contexts/WhoseDoneWhatContext"

const AreYouSure = ({user, setUser}) => {
	const {whoseDoneWhat, setWhoseDoneWhat} = useContext(WhoseDoneWhatContext)
	const [successShouldRedirect, setSuccessShouldRedirect] = useState(false)
	const params = useParams()
	const {chore} = params
	const isInitialMount = useRef(true)
	const handleYes = () => {
		const userKey = user
		setWhoseDoneWhat((prevState) => {
			const updatedState = Object.keys(prevState).reduce((acc, key) => {
				acc[key] = {
					...prevState[key],
					chores: {
						...prevState[key].chores,
						[chore]: key === userKey,
					},
				}
				return acc
			}, {})
			return updatedState
		})
	}

	const handleNo = () => {
		setUser("")
	}

	useEffect(() => {
		if (isInitialMount.current) {
			isInitialMount.current = false
		} else {
			postWhatIDid(whoseDoneWhat)
		}
	}, [whoseDoneWhat])

	const postWhatIDid = async (choresData) => {
		console.log(choresData)
		try {
			const response = await fetch(`/api/who-did-what-last`, {
				method: "POST",
				headers: {"Content-Type": "application/json"},
				body: JSON.stringify(choresData),
			})
			if (!response.ok) {
				throw new Error(`${response.status} (${response.statusText})`)
			}
			const body = await response.json()
			console.log(body)
			setSuccessShouldRedirect(true)
			setUser("")
		} catch (error) {
			console.log(error)
		}
	}

	if (!user.length || successShouldRedirect) {
		return <Navigate to="/" />
	}

	return (
		<div className="which-did-you-do">
			<h1>
				{user} are you sure you did {chore}?
			</h1>
			<section className="chores-buttons confirm">
				<button onClick={() => handleYes()} className="green-btn">
					Yes
				</button>
				<button onClick={() => handleNo()} className="red-btn">
					no
				</button>
			</section>
		</div>
	)
}

export default AreYouSure
