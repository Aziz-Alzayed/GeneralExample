import React, { useState } from 'react';
import { Link } from 'react-router-dom'
import { PlusSquareOutlined, HomeOutlined, DatabaseOutlined, BarChartOutlined } from '@ant-design/icons';
import { Menu, MenuProps } from 'antd';
import AvatarMenu from '../avatarMenu/AvatarMenu';


const NavMenu = () => {
    const [current, setCurrent] = useState('home');
    const onClick: MenuProps['onClick'] = (e) => {
        console.log('click ', e);
        setCurrent(e.key);
    };

    const items: MenuProps['items'] = [
        {
            label: (
                <Link to='/' >
                    Home
                </Link>
            ),
            key: 'home',
            icon: <HomeOutlined />,

        },
        {
            label: (
                <Link to='/counter' >
                    Counter
                </Link>
            ),
            key: 'counter',
            icon: <PlusSquareOutlined />,
        },
        {
            label: (
                <Link to='/fetch-data' >
                    Fetch data
                </Link>
            ),
            key: 'fetch-data',
            icon: <DatabaseOutlined />,
        }
        ,
        {
            label: (
                <Link to='/fetch-database' >
                    Fetch database
                </Link>
            ),
            key: 'fetch-database',
            icon: <BarChartOutlined />,
        }
    ];
    return (<>
        <Menu onClick={onClick} selectedKeys={[current]} mode="horizontal" items={items} style={{ width: '90%' }} />
        <AvatarMenu style={{ width: '10%' }} />
    </>)
};

export default NavMenu;


