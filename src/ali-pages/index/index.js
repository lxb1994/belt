import * as React from 'react';
import { View, Text } from 'remax/one';
import Styles from './index.css';

export default class Index extends React.Component {
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
				<Text>123</Text>
			</View>
		)
  }
}
