import { Component } from 'react'
import cloud from '@tbmp/mp-cloud-sdk'

import { ISALI } from './common/constants'

import './app.css'

class App extends Component {
	constructor(props) {
		super(props)
		this.state = {}
		if (ISALI) {
			this.cloud = cloud.init({ env: 'test' })
			console.info(this.cloud)
			console.info(getApp().cloud)
		}
	}

	render() {
		const { children } = this.props
		return children
	}
}

export default App
