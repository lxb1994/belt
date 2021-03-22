import * as React from 'react';
import { View, Text, Image, Button, navigateTo } from 'remax/one';
import { hideLoading, showLoading } from 'remax/wechat';
import Styles from './index.css';

const pageSize = 10
export default class Mine extends React.Component {
	constructor(props) {
		super(props)
		this.state = {
			list: []
		}
		this.hasMore = true
		this.pageNo = 1
	}
	
  componentDidMount() {
		this.getList()
  }

	getList() {
		let { list } = this.state
		showLoading({title: '正在加载...'})
		const data = [
			{ title: '方案1', itemNo: 'fsfacsc32424', createTime: 'scafsaf', productNo: 'ffasd12312312312', productName: '马蹄扣腰带' }
		]
		list = this.pageNo > 1
			? list.concat(data)
			: data
		this.pageNo++
		this.setState({list: list}, () => hideLoading())
  }

	onLoadMore = () => {
		if (this.hasMore) this.getList()
	}

  render() {
		const { list } = this.state
    return (
			<View className={Styles.container}>
				<View className={Styles.list}>
					{
						list.map((item, index) => <View key={item.id} className={`${Styles.item} ${index === 0 ? Styles['no-border'] : ''} flex-row`}>
							<View className='flex-1'>
								<View className={`${Styles.title} limit-line`}>{item.title}</View>
								<View className={`${Styles.row} limit-line`}>设计单号:{item.itemNo}</View>
								<View className={`${Styles.row} limit-line`}>时间:{item.createTime}</View>
								<View className={`${Styles.row} limit-line`}>产品编号:{item.productNo}</View>
								<View className={`${Styles.row} limit-line`}>产品名称:{item.productName}</View>
							</View>
							<Image className={Styles.image} src={'https://gimg2.baidu.com/image_search/src=http%3A%2F%2Fwww.sinaimg.cn%2Fqc%2Fmodel_lib%2Fphoto%2F70%2F15%2F09%2F59662_src.jpg&refer=http%3A%2F%2Fwww.sinaimg.cn&app=2002&size=f9999,10000&q=a80&n=0&g=0n&fmt=jpeg?sec=1618843111&t=b98e25c10c4589a5365d6243aef5dbfc'} />
						</View>)
					}
					<View className={Styles.more} onClick={this.onLoadMore}>查看更多</View>
				</View>
			</View>
		)
  }
}
