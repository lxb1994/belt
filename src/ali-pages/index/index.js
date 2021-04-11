import * as React from 'react';
import { View, Text, Image, Button, navigateTo } from 'remax/one';
import Styles from './index.css';

export default class Mine extends React.Component {
	constructor(props) {
		super(props)
		this.state = {
		}
	}
	
  componentDidMount() {
  }

  render() {
    return (
			<View className={Styles.user}>
				123
			</View>
		)
  }
}
