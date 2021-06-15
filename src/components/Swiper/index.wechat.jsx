import * as React from 'react'
import { Swiper, SwiperItem } from 'remax/wechat';

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