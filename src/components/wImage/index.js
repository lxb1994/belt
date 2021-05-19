import * as React from 'react'
import { View, Image } from 'remax/one';

import Styles from './index.css';
import { IMG_URL } from '../../api/config'

export default class WImage extends React.Component {
	constructor(props) {
		super(props)
		this.state = {
			showLarge: false
		}
	}

	componentWillReceiveProps(nextProps) {
		if (this.props.src !== nextProps.src && this.state.showLarge) {
			this.setState({showLarge: false})
		}
	}

	render() {
		const { className, style, src, previewSrc, mode } = this.props
		const { showLarge } = this.state
		return (
			<View className={className} style={style}>
				<Image className={`${Styles.image} ${showLarge ? Styles.hidden : ''}`} src={IMG_URL + previewSrc} mode={mode}/>
				<Image className={`${Styles.image} ${!showLarge ? Styles.hidden : ''}`} src={IMG_URL + src} mode={mode} onLoad={this.onLoad} onError={this.onError}/>
			</View>
		)
	}

	onLoad = () => {
		this.setState({showLarge: true})
	}

	onError = () => {

	}
}