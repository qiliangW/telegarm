import { type FC, useEffect, useState } from 'react';
import './index.scss';
import Table from 'rc-table';
export const PlanTable = () => {
  const columns = [
    {
      title: 'Name',
      dataIndex: 'name',
      key: 'name',
      align: 'center',
      className: 'name-cell',
    },
    {
      title: 'Age',
      dataIndex: 'age',
      key: 'age',
      className: 'name-cell',
      align: 'center',
    },
    {
      title: 'Address',
      dataIndex: 'address',
      key: 'address',
      className: 'name-cell',
      align: 'center',
    },
    {
      title: 'Operations',
      dataIndex: '',
      key: 'operations',
      className: 'name-cell',
      align: 'center',
      render: () => <a href="#">Delete</a>,
    },
  ];
  const data: any = [
    // { name: 'Jack', age: 28, address: 'some where', key: '1' },
    // { name: 'Rose', age: 36, address: 'some where', key: '2' },
  ];
  return (
    <div className="plan-table">
      <div className="header-title">Running Attacks</div>
      <div className="table_content">
        <Table
          emptyText="No data available."
          columns={columns}
          data={data}
          scroll={{ x: true }}
        />
      </div>
    </div>
  );
};
