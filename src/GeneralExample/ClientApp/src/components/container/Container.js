import React, { useState } from 'react';
import { Layout, theme } from 'antd';
import NavMenu from '../navMenu/NavMenu';
import SideMenu from '../sideMenu/SideMenu';
import {
    MenuFoldOutlined,
    MenuUnfoldOutlined,
} from '@ant-design/icons';
import style from './Container.module.css';

const { Header, Content, Footer } = Layout;

function Container(props) {

    const [collapsed, setCollapsed] = useState(false);
    const { token: { colorBgContainer }, } = theme.useToken();

    return (
        <Layout className={style.mainLayout}>
            <SideMenu collapsed={collapsed} />
            <Layout >

                <Header style={{ padding: 0, background: colorBgContainer, display: 'flex' }}>
                    {React.createElement(collapsed ? MenuUnfoldOutlined : MenuFoldOutlined, {
                        className: style.trigger,
                        onClick: () => setCollapsed(!collapsed),
                    })}
                    <NavMenu />
                </Header>
                <Content
                    className={style.content}
                    style={{ background: colorBgContainer, }}
                >

                    {props.children}
                </Content>
                <Footer className={style.footer}>Aziz Alzayed - Abdul.aziz.alzayed@gmail.com</Footer>
            </Layout>

        </Layout>
    );
};
export default Container;
