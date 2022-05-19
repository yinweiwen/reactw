import React, { useEffect } from 'react';
import { connect } from 'react-redux';
import { Spin, Button } from 'antd';
import ProTable from '@ant-design/pro-table';
import '../style.less';
import moment from 'moment';
import { Func } from '$utils';

const Download = (props) => {
    const { dispatch, actions, reportList, regionList, user } = props

    useEffect(() => {
        dispatch(actions.report.getRegionList());
    }, []);

    const columns = [{
        title: '报表名称',
        dataIndex: 'reportName',
        formItemProps: {
            label: null,
        },
        fieldProps: {
            placeholder: '输入报表名称'
        }
    }, {
        title: '区域名称',
        dataIndex: 'regionName',
        valueType: 'select',
        initialValue: -1,
        fieldProps: {
            label: null,
            options: [{
                label: '全部',
                value: -1
            }].concat(regionList)
        },
        order: 5,
        render: (dom, record) => {
            return record.department ? record.department.name : null
        }
    }, {
        title: '类型',
        dataIndex: 'reportType',
        hideInSearch: true,
        render: (dom, record) => {
            return record.reportType ? record.reportType.name : null
        }
    }, {
        title: '生成时间',
        dataIndex: 'creatTime',
        valueType: 'dateTimeRange',
        order: 4,
        render: (dom, record) => {
            return moment(record.creatTime).format('YYYY-MM-DD HH:mm')
        }
    }]
    if (Func.isAuthorized("REPORT_DOWN")) {
        columns.push({
            title: '操作',
            key: 'option',
            hideInSearch: true,
            render: (dom, record) => {
                // const ApiRoot = localStorage.getItem('tyApiRoot');
                const filePathArr = record.filePath.split('/')
                const fileName = filePathArr.pop()
                return [
                    // <a key="download" href={ApiRoot + '' + record.filePath}>下载</a>
                    <a href={
                        '/_api/' +
                        // 'http://10.8.30.157:8439/'+
                        `attachments?src=files/${fileName}&filename=${encodeURIComponent(fileName)}&token=${user.token}`} >
                        下载
                    </a>
                ]
            }
        })
    }

    return (
        <Spin spinning={false}>
            <ProTable
                columns={columns}
                toolbar={{
                    settings: []
                }}
                dataSource={reportList}
                request={async (params) => {
                    const query = {
                        limit: params.pageSize,
                        offset: params.pageSize * (params.current - 1),
                        creatTime: params.creatTime,
                        reportName: params.reportName,
                        regionName: params.regionName
                    }
                    const res = await dispatch(actions.report.getReportList(query));
                    console.log(res);
                    return {
                        ...res,
                        total: res.payload.data ? res.payload.data.count : 0
                    }
                }}
            >
            </ProTable>
        </Spin >
    )
}

function mapStateToProps (state) {
    const { auth, global, reportList, regionList } = state;
    const { count, rows } = reportList.data || {};
    let regions = [];
    if (regionList.data && regionList.data.length > 0) {
        regions = regionList.data.map(v => {
            return {
                label: v.name,
                value: v.id,
            }
        });
    }
    return {
        user: auth.user,
        actions: global.actions,
        reportList: rows || [],
        regionList: regions
    };
}

export default connect(mapStateToProps)(Download);