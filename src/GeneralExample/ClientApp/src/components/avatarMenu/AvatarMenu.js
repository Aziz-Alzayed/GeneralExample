import React, { useState, useEffect } from 'react';
import { Card, Avatar, Divider, Row, Col, Popover } from 'antd';
import { LogoutOutlined } from '@ant-design/icons';
import { logout } from '../users/Logout';
import { getUser } from '../../utils/Helpers';
import styles from './AvatarMenu.module.css';

const { Meta } = Card;

function AvatarMenu() {
    const [user, setUser] = useState([]);
    const [firstLetter, setFirstLetter] = useState(true);

    useEffect(() => {
        setUser(getUser());
        setFirstLetter(getUser().charAt(0).toUpperCase());
    }, []);

    const menu = (
        <Card style={{ width: 300 }}>
            <Row>
                <Col>
                    <Meta
                        avatar={<Avatar style={{ backgroundColor: '#f56a00' }}> {firstLetter} </Avatar>}
                        title={user}
                    />
                </Col>
            </Row>
            <Divider />
            <Row >
                <Col offset={5}><a onClick={logout}> <LogoutOutlined key="setting" title="Signout" /> Signout </a></Col>
            </Row>
        </Card>
    );
    return (
        <Popover content={menu} trigger="hover" placement="bottomRight">
            <Avatar size="large" className={styles.avatarMenu} >
                {firstLetter }
            </Avatar>
        </Popover>
    );
}
export default AvatarMenu;