'use strict';
import React, { Component } from 'react';
import { Table } from 'antd';
import './index.less';
import moment from 'moment';

class FlowRecordTable extends Component {
    constructor(props) {
        super(props);
        this.state = {
            isRequesting: false,
            pagination: {
                showTotal: total => `共${total}条`,
                responsive: true,
                defaultPageSize: 10,
            },
            data: []
        }
        this.token = JSON.parse(sessionStorage.getItem('user')).token;
    }


    getPagination = () => {
        const { pagination, data } = this.state;
        const { actiPage } = this.props;
        pagination.total = data.length > 0 ? data.length : 0;
        pagination.current = actiPage;
        return pagination;
    };

    onTableChange = (pagination, filters, sorter) => {
        this.props.onPageChange(pagination.current)
    }
    componentDidMount() {
    }
    render() {
        const { flowRecord } = this.props;
        const tableColumnAttrs = [
            {
                title: '序号',
                dataIndex: 'id',
                width: '12%',
                render: (text, record, index) => { return index + 1 }
            },
            {
                title: '操作人',
                dataIndex: 'processBy',
                width: '25%',
            },
            {
                title: '操作时间',
                dataIndex: 'processAt',
                width: '25%',
                render: (text, record, index) => { return moment(text).format('YYYY-MM-DD HH:mm') }
            }, {
                title: '操作内容',
                dataIndex: 'processContent',
                width: '38%',
            },
        ];
        return (
            <Table
                rowKey="id"
                className={'fs-table'}
                dataSource={flowRecord}
                columns={tableColumnAttrs}
                onChange={this.onTableChange}
                pagination={this.getPagination()}
            />
        );
    }
}

export default FlowRecordTable;