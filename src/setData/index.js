import React, {Component} from 'react';
import {connect} from 'dva';
import {Layout, Menu, Icon} from 'antd';
import './index.less';

import storage from '../util/storage'
@connect(state => ({setData: state.setData}))
class SetData extends Component {

	componentDidMount() {
		document.title = this.props.setData.title
		let data = this.getUrlToken('data',this.props.location.search)
		if(data){
			this.data = data
			storage.set('data',data)
		}
	}
	getUrlToken(name, str) {
		const reg = new RegExp(`(^|&)${ name}=([^&]*)(&|$)`);
		const r = str.substr(1).match(reg);
		if (r != null) return  decodeURIComponent(r[2]); return null;
	}
	render() {
		return (
			<Layout className="home">
				{this.props.data}
			</Layout>
		);
	}
}

export default SetData;
