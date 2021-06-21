import { Component } from 'react'

import './app.css'

class App extends Component {
	constructor(props) {
		super(props)
		this.state = {}
	}

	render() {
		const { children } = this.props
		return children
	}
}

export default App
