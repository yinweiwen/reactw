import React, { useEffect, useState } from 'react';
import { connect } from 'react-redux';
import { Spin, Drawer, Button } from 'antd';
import '../style.less';
import { EditableProTable } from '@ant-design/pro-table';

const CompileDrawer = (props) => {
    const { dispatch, actions, user, loading, visible, checkRow, close, reportRectifyDetail, checkAction } = props
    const [requesting, setRequesting] = useState(false)
    const [dataSource, setDataSource] = useState([])
    const { report } = actions
    const isCheck = checkAction == 'check'

    useEffect(() => {
        if (checkRow.day) {
            dispatch(report.reportRectifyDetail(checkRow.day, checkRow.depId))
        }
    }, [checkRow])

    useEffect(() => {
        let data = reportRectifyDetail
        let i = 1
        for (let d of data) {
            d.index_ = i++
        }
        setDataSource(data)
    }, [reportRectifyDetail])

    return (
        <Drawer
            title={"合用场所安全隐患排查整治汇总表"}
            placement="right"
            onClose={() => {
                close()
            }}
            visible={visible}
            width={'82%'}
        >
            <Spin spinning={loading || requesting}>
                <EditableProTable
                    columns={[
                        {
                            title: '序号',
                            dataIndex: 'index_',
                            readonly: true,
                        },
                        {
                            title: '名称',
                            dataIndex: 'name',
                            readonly: true,
                        }, {
                            title: '地址',
                            dataIndex: 'address',
                            readonly: true,
                        }, {
                            title: '排查发现隐患',
                            dataIndex: 'hiddenDanger',
                            readonly: true,
                        }, {
                            title: '采取整改措施',
                            dataIndex: 'correctiveAction',
                        }, {
                            title: '实施处罚、强制措施情况',
                            dataIndex: 'punishment',
                        },
                    ]}
                    controlled={true}
                    value={dataSource}
                    onChange={setDataSource}
                    rowKey="id"
                    headerTitle={`填报单位：${checkRow.region}；时间：${checkRow.day}`}
                    maxLength={5}
                    recordCreatorProps={false}
                    editable={{
                        type: 'multiple',
                        editableKeys: isCheck ? [] : dataSource.map(r => r.id)
                    }}
                    toolBarRender={() => [
                        isCheck ? '' :
                            <Button
                                type="primary"
                                key="save"
                                onClick={() => {
                                    // dataSource 就是当前数据，可以调用 api 将其保存
                                    setRequesting(true)
                                    const data = dataSource
                                    for (let d of data) {
                                        d.userId = user.id
                                        delete d.index_
                                    }
                                    dispatch(report.compileReportRectifyDetail(dataSource)).then(res => {
                                        setRequesting(false)
                                    })
                                }}
                            >
                                保存数据
                            </Button>
                    ]}
                >

                </EditableProTable>
            </Spin>
        </Drawer >
    )
}

function mapStateToProps (state) {
    const { auth, global, members, reportRectifyDetail } = state;
    return {
        loading: reportRectifyDetail.isRequesting,
        user: auth.user,
        actions: global.actions,
        members: members.data,
        reportRectifyDetail: reportRectifyDetail.data || []
    };
}

export default connect(mapStateToProps)(CompileDrawer);
