import * as React from 'react';
import { View, Text, Image } from 'remax/one';
import { Canvas, showLoading, getImageInfo, hideLoading, canvasToTempFilePath, chooseImage, createCanvasContext } from 'remax/wechat';
import styles from './index.css';

export default class IndexPage extends React.Component {
	constructor(props) {
		super(props)
		this.state = {
			image: ''
		}
	}

  componentDidMount() {
    console.log('IndexPage load');
  }

  render() {
		const { image } = this.state
    return (
			<View className={styles.page}>
				<View onClick={this.save.bind(this)}>测试一下</View>
				<Canvas canvasId={'shareCanvas'} style="width: 300px;height: 300px;"></Canvas>
			</View>
		)
  }

	save() {
    let that = this;
		const ctx = createCanvasContext('shareCanvas')
		chooseImage({
			success: (res) => {
				ctx.drawImage(res.tempFilePaths[0], 0, 0, 136 * 2, 204 * 2)
				chooseImage({
					success: (res2) => {
						ctx.drawImage(res2.tempFilePaths[0], 120, 120, 27 * 2, 10 * 2)
						ctx.draw()
						setTimeout(() => {
							// code_url = this.canvasToTempImage(); 
							//获取临时缓存合成照片路径，存入data中
							canvasToTempFilePath({
								canvasId: 'shareCanvas',
								success: function (res) {
									var tempFilePath = res.tempFilePath;
									that.setState({
										image: tempFilePath
									})
									console.log(tempFilePath)
								},
								fail: function (res) {
									console.log(res);
								}
							});
						}, 1000);
					}
				})
			}
		})
	}
}
