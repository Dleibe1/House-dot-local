import React, {createContext, useState} from "react"

const WhoseDoneWhatContext = createContext()

const WhoseDoneWhatProvider = ({children}) => {
	const [whoseDoneWhat, setWhoseDoneWhat] = useState({
		ryan: {chores: {dishes: false, trash: false, recycling: false}},
		eden: {chores: {dishes: false, trash: false, recycling: false}},
		dan: {chores: {dishes: false, trash: false, recycling: false}},
	})
	return (
		<WhoseDoneWhatContext.Provider value={{whoseDoneWhat, setWhoseDoneWhat}}>
			{children}
		</WhoseDoneWhatContext.Provider>
	)
}

export {WhoseDoneWhatContext, WhoseDoneWhatProvider}
