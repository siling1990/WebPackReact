import React, { Component } from 'react';
import { connect } from 'dva';
import { Layout, Menu, Icon } from 'antd';
import storage from "../util/storage";
import ReactEcharts from 'echarts-for-react';
@connect(state => ({ home: state.home }))
export class Home extends Component {
	constructor(props) {
		super(props);
		this.data = [];
		this.state = this.getInitialState();
	}
	getInitialState = () => ({
        currentMenu:1,
        option: this.getOptionByIndex(this.state.currentMenu) })

	componentDidMount() {
	}
	
	componentWillUnmount() {
	}
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
        }
        
        return option
    }
    setMenu = (index)=>{
            this.setState({
                currentMenu
            })
    }
	render() {
		if (storage.get('data')) {
			this.data = storage.get('data').split(',');
			console.log(this.data);
		}
		return (<Layout className="home">
			<Sider breakpoint="lg" collapsedWidth="0" onBreakpoint={broken => {
				console.log(broken);
			}} onCollapse={(collapsed, type) => {
				console.log(collapsed, type);
			}}>
				<div className="logo" />
				<Menu theme="dark" mode="inline" defaultSelectedKeys={['2']} onClick={(index)=>{
                    console.log(index)
                }}>
					<Menu.Item key="1">
						<Icon type="user" />
						<span className="nav-text">页面渲染耗时</span>
					</Menu.Item>
					<Menu.Item key="2">
						<Icon type="video-camera" />
						<span className="nav-text">SCU耗时比例</span>
					</Menu.Item>
					<Menu.Item key="3">
						<Icon type="upload" />
						<span className="nav-text">其他</span>
					</Menu.Item>
					<Menu.Item key="4">
						<Icon type="user" />
						<span className="nav-text">nav 4</span>
					</Menu.Item>
				</Menu>
			</Sider>
			<Layout>
				<Header style={{ background: '#fff', padding: 0 }} />
				<Content style={{ margin: '24px 16px 0' }}>
					<div style={{ padding: 24, background: '#fff', minHeight: 360 }}>
						<ReactEcharts option={this.state.option} style={{ height: 360, width: '100%' }} />
					</div>
				</Content>
				<Footer style={{ textAlign: 'center' }}>Ant Design ©2018 Created by Ant UED</Footer>
			</Layout>
		</Layout>);
	}
}
