import React, { useState, useEffect } from 'react';
import { Table } from 'antd';
import type { ColumnsType, TableProps } from 'antd/es/table';

interface DataType {
    key: React.Key;
    date: string;
    temperatureC: number;
    temperatureF: number;
    summary: string;
}

const columns: ColumnsType<DataType> = [
    {
        title: 'Date',
        dataIndex: 'date',
        key: 'date',

    },
    {
        title: 'Temp.(C)',
        dataIndex: 'temperatureC',
        key: 'temperatureC',
        sorter: (a, b) => a.temperatureC - b.temperatureC,
    },
    {
        title: 'temperatureF',
        dataIndex: 'temperatureF',
        key: 'temperatureF',
        sorter: (a, b) => a.temperatureF - b.temperatureF,
    },
    {
        title: 'Summary',
        dataIndex: 'summary',
        key: 'summary',
    },

];
function FetchData() {
    const [forecasts, setForecasts] = useState([]);
    useEffect(() => {
        populateWeatherData();
    }, []);


    const populateWeatherData = async () => {
        const response = await fetch('weatherforecast');
        const data = await response.json();
        setForecasts(data);
    };
    const onChange: TableProps<DataType>['onChange'] = (pagination, filters, sorter, extra) => {
        console.log('params', pagination, filters, sorter, extra);
    };
    return (
        <div>
            <h1 id="tableLabel">Weather forecast</h1>
            <p>This component demonstrates fetching data from the server.</p>
            <Table key="fetchTable" columns={columns} dataSource={forecasts} onChange={onChange} />
        </div>
    );

}
export default FetchData;
