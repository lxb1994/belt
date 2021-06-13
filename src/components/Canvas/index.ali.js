import * as React from 'react'
import { Canvas } from 'remax/ali';

const CanvasBox = (props) => {
	const {canvasId} = props
	return (
		<Canvas id={canvasId} {...props}></Canvas>
	)
}

export default CanvasBox