// 报表编辑

import React, { useEffect, useState } from 'react';
import { connect } from 'react-redux';
import moment from 'moment'
import CompileDrawer from '../components/compileDrawer'
import { Spin, Button, DatePicker, Space, Switch } from 'antd';
import ProTable from '@ant-design/pro-table';
import { Func } from '$utils';

const { RangePicker } = DatePicker;

const Compile = (props) => {
    const { dispatch, actions, user, loading, reportRectify } = props
    const [searchTime, setSearchTime] = useState([moment(), moment()])
    const [compileDrawerVis, setCompileDrawerVis] = useState(false)
    const [checkRow, setCheckRow] = useState({})
    const [checkAction, setCheckAction] = useState('')
    const { report } = actions

    const getReportRectify = (searchTime) => {
        dispatch(report.reportRectify([moment(searchTime[0]).format('YYYY-MM-DD'), moment(searchTime[1]).format('YYYY-MM-DD')]))
    }

    useEffect(() => {
        getReportRectify(searchTime)
    }, [])

    const showCompileDrawerVis = (row, action) => {
        setCompileDrawerVis(true)
        setCheckRow(row)
        setCheckAction(action)
    }

    return (
        <Spin spinning={loading}>
            <ProTable
                columns={[{
                    title: '日期',
                    dataIndex: 'day',
                }, {
                    title: '名称',
                    dataIndex: 'name',
                }, {
                    title: '是否提交',
                    dataIndex: 'reportBool',
                    render: (_, r) => {
                        return <Switch disabled={true} checked={r.reportBool} />
                    }
                }, {
                    title: '操作',
                    dataIndex: 'option',
                    render: (_, r) => {
                        return [
                            <Space>
                                {/* {Func.isAuthorized("REPORT_EDIT") &&
                                    <Button type="primary" onClick={() => {
                                        showCompileDrawerVis(r, 'edit')
                                    }}>编辑</Button>
                                } */}
                                <Button type="primary" onClick={() => {
                                    showCompileDrawerVis(r, 'check')
                                }}>查看</Button>
                            </Space>
                        ]
                    }
                },]}
                dataSource={reportRectify}
                rowKey="index"
                search={false}
                options={false}
                headerTitle="合用场所安全隐患排查整治汇总表"
                toolBarRender={() => [
                    <RangePicker allowClear={false} value={searchTime}
                        onChange={(date, dateString) => {
                            setSearchTime(date)
                            getReportRectify(dateString)
                        }}
                    />,
                ]}
            >

            </ProTable>
            <CompileDrawer
                visible={compileDrawerVis}
                close={() => {
                    setCompileDrawerVis(false)
                    setCheckRow({})
                    setCheckAction('')

                    getReportRectify(searchTime)
                }}
                checkRow={checkRow}
                checkAction={checkAction}
            />
        </Spin>
    )
}

function mapStateToProps(state) {
    const { auth, global, reportRectify } = state;
    console.log(reportRectify);
    return {
        user: auth.user,
        actions: global.actions,
        loading: reportRectify.isRequesting,
        reportRectify: reportRectify.data || []
    };
}

export default connect(mapStateToProps)(Compile);
