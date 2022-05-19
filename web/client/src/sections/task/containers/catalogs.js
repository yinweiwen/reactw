import React, { useEffect, useRef, useState } from 'react';
import { connect } from 'react-redux';
import { Spin } from 'antd';
import { Button, Popconfirm } from 'antd';
import '../style.less';
import CatalogModal from './CatalogModal'
import ProTable from '@ant-design/pro-table';

const TaskCatalog = (props) => {
    const { dispatch, actions, taskCatalogs } = props
    const { task } = actions;
    const [configModalVis, setConfigModalVis] = useState(false)
    const [editData, setEditData] = useState(null)

    useEffect(() => {
        dispatch(task.getTaskCatalogs())
    }, [])


    const actionRef = useRef();
    return (
        <Spin spinning={false}>
            <ProTable
                columns={[{
                    title: 'ID',
                    key: 'id',
                    dataIndex: 'id'
                }, {
                    title: '名称',
                    key: 'name',
                    dataIndex: 'name'
                }, {
                    title: '操作',
                    valueType: 'option',
                    key: 'option',
                    render: (txt, row, _, action) => [
                        <Button type="primary"
                            onClick={() => {
                                setConfigModalVis(true)
                                setEditData({ ...row })
                            }}
                        >编辑</Button>,
                        <Popconfirm
                            placement="topRight"
                            title={"确认删除此条任务吗?"}
                            onConfirm={() => {
                                dispatch(task.delTaskCatalog(row.id))
                                    .then(res => {
                                        if (res.success) {
                                            dispatch(task.getTaskCatalogs())
                                        }
                                    })
                            }}>
                            <Button type="primary" danger>删除</Button>
                        </Popconfirm>
                    ],
                }]}
                actionRef={actionRef}
                toolbar={{
                    settings: []
                }}
                search={false}
                dataSource={taskCatalogs}
                options={false}
                toolBarRender={() => [
                    <Button type="primary" key="primary" onClick={() => { setConfigModalVis(true) }}>
                        添加任务分类
                    </Button>,
                ]}
            >
            </ProTable>

            {
                configModalVis ? <CatalogModal
                    visible={true}
                    close={() => {
                        setConfigModalVis(false)
                        setEditData(null)
                    }}
                    editData={editData}
                ></CatalogModal> : ''
            }
        </Spin>
    )
}


function mapStateToProps(state) {
    const { auth, global, taskCatalogs } = state;
    return {
        user: auth.user,
        actions: global.actions,
        taskCatalogs: taskCatalogs.data || []
    };
}

export default connect(mapStateToProps)(TaskCatalog);
