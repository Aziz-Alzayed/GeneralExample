import React, { useState, useEffect } from 'react';
import { Table } from 'antd';

const columns= [
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
    const [loading, setLoading] = useState(true);
    useEffect(() => {
        populateWeatherData();
    }, []);


    const populateWeatherData = async () => {
        fetch('weatherforecast')
            .then(response => response.json())
            .then(data => {
                setForecasts(data);
                setLoading(false);
            });
    };

    return (
        <div>
            <h1 id="tableLabel">Weather forecast</h1>
            <p>This component demonstrates fetching data from the server.</p>
            <Table key="fetchTable" columns={columns} dataSource={forecasts} loading={loading} />
        </div>
    );
}
export default FetchData;
