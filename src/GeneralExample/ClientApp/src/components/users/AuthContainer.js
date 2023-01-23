import React, { useState } from 'react';
import { Tabs, Card } from 'antd';
import Login from './Login';
import Register from './Register';
import styles from './AuthContainer.module.css';

function AuthContainer() {


    return(
        <div className={styles.AuthContainer}>
            <Card hoverable title="Welcome to Aziz Code Example" bordered={false} className={styles.Card}>
                <Tabs
                    type="card"
                    items={[{
                        label: 'Login',
                        key: 'Login',
                        children: <Login />
                    },
                        {
                            label: 'Register',
                            key: 'Register',
                            children: <Register />
                    }
                    ]}
                />
            </Card>
        </div>
    );
}

export default AuthContainer;