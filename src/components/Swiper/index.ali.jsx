import * as React from 'react'
import { Swiper, SwiperItem } from 'remax/ali';

const Box = (props) => {
	return (
		<Swiper {...props}></Swiper>
	)
}

const Item = (props) => {
	return (
		<SwiperItem {...props}></SwiperItem>
	)
}

export default {Box, Item}