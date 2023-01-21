import React, { useState } from 'react';
import { useSelector, useDispatch } from 'react-redux'
import {
    decrement,
    increment,
    incrementByAmount,
    selectCount
} from './CounterSlice'
import { MinusOutlined, PlusOutlined, AppstoreAddOutlined } from '@ant-design/icons';
import { Switch, Skeleton, Card, Space, Button, InputNumber } from 'antd';

import styles from './Counter.module.css';

function Counter() {
    const count = useSelector(selectCount);
    const dispatch = useDispatch();
    const [incrementAmount, setIncrementAmount] = useState('2');
    const [loading, setLoading] = useState(false);
    const onChange = (checked: boolean) => {
        setLoading(!checked);
    };
    return (
        <>
            <Switch checked={!loading} onChange={onChange} className={styles.switch} />

            <div className={styles.box} >
                <Skeleton loading={loading} avatar active>
                    <Card
                        hoverable
                        className={styles.card}
                        actions={[
                            <Button key="increment" type="primary" icon={<PlusOutlined />} onClick={() => dispatch(increment())} />,
                            <Button key="decrement" type="primary" icon={<MinusOutlined />} onClick={() => dispatch(decrement())} />,
                            <Space.Compact block >
                                <InputNumber size="large" value={incrementAmount} onChange={setIncrementAmount} />
                                <Button key="incrementAmount" type="primary" onClick={() => dispatch(incrementByAmount(Number(incrementAmount) || 0))} icon={<AppstoreAddOutlined />}></Button>
                            </Space.Compact>

                        ]}
                        cover={<span className={styles.value}>{count}</span>}
                    >

                    </Card>
                </Skeleton>
            </div>
        </>
    )
}
export default Counter;