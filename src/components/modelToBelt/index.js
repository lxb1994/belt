import * as React from 'react'
import { View, Image } from 'remax/one';
import { MovableArea, MovableView } from 'remax/wechat';

import Styles from './index.css';

import { IMG_URL } from '../../api/config'
export default class Model extends React.Component {
	constructor(props) {
		super(props)
		this.state = {}
	}

	onChange = (e) => {
		const { x, y, source } = e.detail
		if (source !== 'touch') return
		this.props.onChange && this.props.onChange(x, y)
	}

	onScale = (e) => {
		const { x, y, scale } = e.detail
		this.props.onChange && this.props.onChange(x, y, scale)
	}

	render() {
		const { model, belt, scaleValue, turnDirection, beltLeft, beltTop, beltWidth, beltHeight } = this.props
		return (
			<MovableArea id="model-container" className={Styles.modelContainer}>
				{model.image1 && <Image className={Styles.model} src={IMG_URL + model[`image${turnDirection}`].image} mode="widthFix"/>}
				<MovableView
					style={{width: beltWidth + 'px', height: beltHeight + 'px'}}
					direction="all"
					x={beltLeft}
					y={beltTop}
					onChange={this.onChange}
					onScale={this.onScale}
					scale
					scale-value={scaleValue}
				>
					{
						belt.image1 &&
						<Image
							className={Styles.belt}
							style={{width: beltWidth + 'px'}}
							src={IMG_URL + belt[`image${turnDirection}`]}
							mode="widthFix"
						/>
					}
				</MovableView>
			</MovableArea>
		)
	}
}