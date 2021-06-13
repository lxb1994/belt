import * as React from 'react'
import { MovableArea, MovableView } from 'remax/ali';

const Area = (props) => {
	return (
		<MovableArea {...props}></MovableArea>
	)
}

const View = (props) => {
	return (
		<MovableView {...props}></MovableView>
	)
}

export default {Area, View}