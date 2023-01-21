import React from 'react';
import { Card, Avatar, Divider, Row, Col, Popover } from 'antd';
import { UserOutlined, LogoutOutlined } from '@ant-design/icons';
import styles from './AvatarMenu.module.css';

const { Meta } = Card;

function AvatarMenu() {

    const menu = (
        <Card style={{ width: 300 }}>
            <Row>
                <Col>
                    <Meta
                        avatar={<Avatar style={{ backgroundColor: '#f56a00' }}> AA </Avatar>}
                        title="Aziz Alzayed"
                        description="aziz.alzayed@sympa.com"
                    />
                </Col>
            </Row>
            <Divider />
            <Row>
                <Col offset={5}><a><UserOutlined key="setting" title="My profile" /> My profile</a></Col>
            </Row>
            <Divider />
            <Row >
                <Col offset={5}><a> <LogoutOutlined key="setting" title="Signout" /> Signout </a></Col>
            </Row>
        </Card>
    );
    return (
        <Popover content={menu} trigger="hover" placement="bottomRight">
            <Avatar size="large" className={styles.avatarMenu} >
                AA
            </Avatar>
        </Popover>
    );
}
export default AvatarMenu;