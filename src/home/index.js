import React, {Component} from 'react';
import {connect} from 'dva';
import {Layout, Menu, Icon} from 'antd';
import './index.less';
import storage from "../util/storage";
import cloneDeep from 'lodash.clonedeep';
//不是按需加载的话文件太大
//import echarts from 'echarts'
//下面是按需加载
import echarts from 'echarts/lib/echarts'
//导入折线图
import 'echarts/lib/chart/line';  //折线图是line,饼图改为pie,柱形图改为bar
import 'echarts/lib/component/tooltip';
import 'echarts/lib/component/title';
import 'echarts/lib/component/legend';
import 'echarts/lib/component/markPoint';
import ReactEcharts from 'echarts-for-react';

const {Header, Content, Footer, Sider} = Layout;
@connect(state => ({home: state.home}))
class Home extends Component {
	constructor(props) {
		super(props);
		this.data = []
		this.state = this.getInitialState();
	}
	timeTicket = null;
	count = 51;
	getInitialState = () => ({
		currentMenu:1,
		option: this.getOptionByIndex(1)});
	getOptionByIndex = (currentMenu)=>{
		let option = {
			xAxis: {
				type: 'category',
				data: ['Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat', 'Sun']
			},
			yAxis: {
				type: 'value'
			},
			series: [{
				data: [820, 932, 901, 934, 1290, 1330, 1320],
				type: 'line'
			}]
		};
		switch(currentMenu){
			case 1:
				option = {
					xAxis: {
						type: 'category',
						data: ['Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat', 'Sun']
					},
					yAxis: {
						type: 'value'
					},
					series: [{
						data: [820, 932, 901, 934, 1290, 1330, 1320],
						type: 'line'
					}]
				};
				break;
			case 2:
				option = {
					tooltip: {
						trigger: 'item',
						formatter: '{a} <br/>{b}: {c} ({d}%)'
					},
					legend: {
						orient: 'vertical',
						left: 10,
						data: ['直接访问', '邮件营销', '联盟广告', '视频广告', '搜索引擎']
					},
					series: [
						{
							name: '访问来源',
							type: 'pie',
							radius: ['50%', '70%'],
							avoidLabelOverlap: false,
							label: {
								show: false,
								position: 'center'
							},
							emphasis: {
								label: {
									show: true,
									fontSize: '30',
									fontWeight: 'bold'
								}
							},
							labelLine: {
								show: false
							},
							data: [
								{value: 335, name: '直接访问'},
								{value: 310, name: '邮件营销'},
								{value: 234, name: '联盟广告'},
								{value: 135, name: '视频广告'},
								{value: 1548, name: '搜索引擎'}
							]
						}
					]
				};
		}

		return option
	}
	setMenu = (index)=>{
		this.setState({
			currentMenu:index
		})
	}
	fetchNewDate = () => {
		let axisData = (new Date()).toLocaleTimeString().replace(/^\D*/,'');
		const option = cloneDeep(this.state.option); // immutable
		option.title.text = 'RN界面实时渲染监控.' + new Date().getSeconds();
		let data0 = option.series[0].data;
		let data1 = option.series[1].data;
		data0.shift();
		data0.push(Math.round(Math.random() * 1000));
		data1.shift();
		data1.push((Math.random() * 10 + 5).toFixed(1) - 0);

		option.xAxis[0].data.shift();
		option.xAxis[0].data.push(axisData);
		option.xAxis[1].data.shift();
		option.xAxis[1].data.push(this.count++);

		this.setState({
			option,
		});
	};

	componentDidMount() {
		// if (this.timeTicket) {
		// 	clearInterval(this.timeTicket);
		// }
		// this.timeTicket = setInterval(this.fetchNewDate, 1000);
	};

	componentWillUnmount() {
		if (this.timeTicket) {
			clearInterval(this.timeTicket);
		}
	};

	getOption = () => ({
		title: {
			text:'RN界面实时渲染监控.',
		},
		tooltip: {
			trigger: 'axis'
		},
		legend: {
			data:['渲染耗时', '单次渲染耗时']
		},
		toolbox: {
			show: true,
			feature: {
				dataView: {readOnly: false},
				restore: {},
				saveAsImage: {}
			}
		},
		grid: {
			top: 60,
			left: 30,
			right: 60,
			bottom:30
		},
		dataZoom: {
			show: false,
			start: 0,
			end: 100
		},
		visualMap: {
			show: false,
			min: 0,
			max: 1000,
			color: ['#BE002F', '#F20C00', '#F00056', '#FF2D51', '#FF2121', '#FF4C00', '#FF7500',
				'#FF8936', '#FFA400', '#F0C239', '#FFF143', '#FAFF72', '#C9DD22', '#AFDD22',
				'#9ED900', '#00E500', '#0EB83A', '#0AA344', '#0C8918', '#057748', '#177CB0']
		},
		xAxis: [
			{
				type: 'category',
				boundaryGap: true,
				data: (function (){
					let now = new Date();
					let res = [];
					let len = 50;
					while (len--) {
						res.unshift(now.toLocaleTimeString().replace(/^\D*/,''));
						now = new Date(now - 2000);
					}
					return res;
				})()
			},
			{
				type: 'category',
				boundaryGap: true,
				data: (function (){
					let res = [];
					let len = 50;
					while (len--) {
						res.push(50 - len + 1);
					}
					return res;
				})()
			}
		],
		yAxis: [
			{
				type: 'value',
				scale: true,
				name: '时间（秒）',
				max: 20,
				min: 0,
				boundaryGap: [0.2, 0.2]
			},
			{
				type: 'value',
				scale: true,
				name: '时间（毫秒）',
				max: 1200,
				min: 0,
				boundaryGap: [0.2, 0.2]
			}
		],
		series: [
			{
				name:'单次渲染耗时',
				type:'bar',
				xAxisIndex: 1,
				yAxisIndex: 1,
				itemStyle: {
					normal: {
						barBorderRadius: 4,
					}
				},
				animationEasing: 'elasticOut',
				animationDelay: function (idx) {
					return idx * 10;
				},
				animationDelayUpdate: function (idx) {
					return idx * 10;
				},
				data:(function (){
					let res = [];
					let len = 50;
					while (len--) {
						res.push(Math.round(Math.random() * 1000));
					}
					return res;
				})()
			},
			{
				name:'渲染耗时',
				type:'line',
				data:(function (){
					let res = [];
					let len = 0;
					while (len < 50) {
						res.push((Math.random()*10 + 5).toFixed(1) - 0);
						len++;
					}
					return res;
				})()
			}
		]
	});

	render() {
		if(storage.get('data')){
			this.data = storage.get('data').split(',')
			console.log(this.data)
		}
		return (
			<Layout className="home">
				<Sider
					breakpoint="lg"
					collapsedWidth="0"
					onBreakpoint={broken => {
						console.log(broken);
					}}
					onCollapse={(collapsed, type) => {
						console.log(collapsed, type);
					}}
				>
					<div className="logo" />
					<Menu theme="dark" mode="inline" defaultSelectedKeys={['4']}>
						<Menu.Item key="1">
							<Icon type="user" />
							<span className="nav-text">寿命周期渲染</span>
						</Menu.Item>
						<Menu.Item key="2">
							<Icon type="video-camera" />
							<span className="nav-text">nav 2</span>
						</Menu.Item>
						<Menu.Item key="3">
							<Icon type="upload" />
							<span className="nav-text">nav 3</span>
						</Menu.Item>
						<Menu.Item key="4">
							<Icon type="user" />
							<span className="nav-text">nav 4</span>
						</Menu.Item>
					</Menu>
				</Sider>
				<Layout>
					<Header style={{background: '#fff', padding: 0}} />
					<Content style={{margin: '24px 16px 0'}}>
						<div style={{padding: 24, background: '#fff', minHeight: 360}}>
							<ReactEcharts option={this.state.option}  style={{height: 360, width: '100%'}}/>
						</div>
					</Content>
					<Footer style={{textAlign: 'center'}}>Ant Design ©2018 Created by Ant UED</Footer>
				</Layout>
			</Layout>
		);
	}
}

export default Home;
