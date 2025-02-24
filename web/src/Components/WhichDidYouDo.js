import {Link, Navigate, useNavigate} from "react-router-dom"
import "../App.css"

const WhichDidYouDo = ({user}) => {
	const navigate = useNavigate()
	
	if (!user.length) {
		return <Navigate to="/" />
	}

	const handleNewChoreDone = (chore) => {
		navigate(`/are-you-sure/${chore}`)
	}

	return (
		<div className="which-did-you-do">
			<h1>Which did you do {user}?</h1>
			<section className="chores-buttons">
				<button
					onClick={() => handleNewChoreDone("dishes")}
					className="red-btn"
				>
					Dishes
				</button>
				<button
					onClick={() => handleNewChoreDone("trash")}
					className="pink-btn"
				>
					Trash
				</button>
				<button
					onClick={() => handleNewChoreDone("recycling")}
					className="blue-btn"
				>
					Recycling
				</button>
				<Link to="/" className="go-back">
					<button>Go Back</button>
				</Link>
			</section>
		</div>
	)
}

export default WhichDidYouDo
