import React, { useState, useEffect } from 'react';
import { Table } from 'antd';

const columns = [
    {
        title: 'Email',
        dataIndex: 'email',
        key: 'email',

    },
    {
        title: 'Full Name',
        dataIndex: 'fullName',
        key: 'fullName',
        sorter: true,
    },
    {
        title: 'User Name',
        dataIndex: 'userName',
        key: 'userName',
        sorter: true,
    }
];
function AllUsers(){

    const [users, setUsers] = useState([]);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        allUsersData();        
    }, []);

        
    const allUsersData = async () => {
        fetch('users/all')
            .then(response => response.json())
            .then(data => {
                console.log(data);
                setUsers(data);
                setLoading(false);
            });
    };
        return (
            <div>
                <h1 id="tableLabel">All Users' Data</h1>
                <p>This are all users' data.</p>
                <Table key="fetchTable" columns={columns} dataSource={users} loading={loading} />
            </div>
        );    
}
export default AllUsers;