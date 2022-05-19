import React, { useEffect, useRef, useState } from 'react';
import { connect } from 'react-redux';
import { Spin, Card } from 'antd';
import { Button, Tag, Space, Popconfirm, Dropdown } from 'antd';
import '../style.less';
import moment from 'moment';
import ConfigModal  from './ConfigModal'
import ProTable, { TableDropdown } from '@ant-design/pro-table';
import { triggerFocus } from 'antd/lib/input/Input';

const TaskList = (props) => {
    const { dispatch, actions, user, loading, taskList, catalogs, types, taskCatalogs, taskTypes } = props
    const { task } = actions;
    const [configModalVis, setConfigModalVis] = useState(false)
    const [editData, setEditData] = useState(null)

    useEffect(() => {
        dispatch(task.getTaskCatalogs())
        dispatch(task.getTaskTypes())
        // dispatch(task.getTaskList())
    }, [])

    // Success
    // Error
    // Default
    // Processing
    // Warning
    const columns = [{
        dataIndex: 'id',
        valueType: 'indexBorder',
        width: 48,
    }, {
        title: '名称',
        dataIndex: 'name',
        copyable: true,
        ellipsis: true,
        formItemProps: {
            label: "名称",
        },
        fieldProps: {
            placeholder: '输入名称筛选'
        }
    },
    {
        title: '状态',
        dataIndex: 'state',
        filters: true,
        onFilter: true,
        valueType: 'select',
        valueEnum: {
            all: { text: '全部', status: 'Default' },
            open: {
                text: '未解决',
                status: 'Error',
            },
            closed: {
                text: '已解决',
                status: 'Success',
            },
            processing: {
                text: '解决中',
                status: 'Processing',
            },
        },
    }, {
        title: '分类',
        dataIndex: 'catalog',
        valueType: 'select',
        initialValue: -1,
        fieldProps: {
            label: null,
            options: [{
                label: '全部',
                value: -1
            }].concat(catalogs)
        },
        render: (dom, row) => {
            return row.taskCatalog ? row.taskCatalog.name : ""
        }
    }, {
        title: '类型',
        dataIndex: 'type',
        valueType: 'select',
        initialValue: -1,
        fieldProps: {
            label: null,
            options: [{
                label: '全部',
                value: -1
            }].concat(types)
        },
        render: (dom, row) => {
            return row.taskType ? row.taskType.name : ""
        }
    }, {
        title: '创建时间',
        dataIndex: 'createdAt',
        valueType: 'dateTimeRange',
        render: (dom, row) => {
            return moment(row.createdAt).format('YYYY-MM-DD HH:mm')
        }
    },
    {
        title: '截止日期',
        key: 'deadlineAt',
        dataIndex: 'deadlineAt',
        valueType: 'dateTime',
        sorter: true,
        hideInSearch: true,
    }, {
        disable: true,
        title: '标签',
        dataIndex: 'tags',
        search: false,
        renderFormItem: (_, { defaultRender }) => {
            return defaultRender(_);
        },
        render: (_, row) => (
            row.tags?
            <Space>
                {row.tags.map(name => (
                    <Tag color='geekblue'>{name}</Tag>
                ))}
            </Space>:
            ''
        ),
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
                    dispatch(task.delTask(row.id))
                        .then(res => {
                            if (res.success) {
                                dispatch(task.getTaskList())
                            }
                        })
                }}>
                <Button type="primary" danger>删除</Button>
            </Popconfirm>,
            <TableDropdown key="actionGroup"
                onSelect={() => action?.reload()}
                menus={[
                    { key: 'copy', name: '复制' },
                    { key: 'delete', name: '删除' },
                ]}
            />
        ],
    }]

    const actionRef = useRef();
    return (
        <Spin tip="biubiubiu~" spinning={loading}>
            <ProTable
                columns={columns}
                actionRef={actionRef}
                toolbar={{
                    settings: []
                }}
                search={{
                    collapsed: false,
                }}
                dataSource={taskList}
                request={async (params) => {
                    const query = {
                        limit: params.pageSize,
                        offset: params.pageSize * (params.current - 1),
                        createdAt: params.createdAt,
                        taskName: params.taskName,
                        catalog: params.catalog,
                        state: params.state,
                        type: params.type
                    }
                    const res = await dispatch(task.getTaskList(query));
                    console.log(res)
                    return {
                        ...res,
                        total: res.payload.data ? res.payload.data.count : 0
                    }
                }}
                options={false}
                toolBarRender={() => [
                    <Button type="primary" key="primary" onClick={() => { setConfigModalVis(true) }}>
                        添加任务
                    </Button>,
                ]}
            >
            </ProTable>

            {
                configModalVis ?
                    <ConfigModal
                        visible={true}
                        close={() => {
                            setConfigModalVis(false)
                            setEditData(null)
                        }}
                        editData={editData}
                        types={types}
                        catalogs={catalogs}
                    /> : ''
            }
        </Spin>
    )
}

function mapStateToProps(state) {
    const { auth, global, taskList, taskCatalogs, taskTypes } = state;
    let catalogs = [];
    let types = [];
    if (taskCatalogs.data && taskCatalogs.data.length > 0) {
        catalogs = taskCatalogs.data.map(c => {
            return {
                label: c.name,
                value: c.id
            }
        })
    }
    const { count, rows } = taskList.data || {};
    if (taskTypes.data && taskTypes.data.length > 0) {
        types = taskTypes.data.map(c => {
            return {
                label: c.name,
                value: c.id
            }
        })
    }
    return {
        loading: taskList.isRequesting || taskCatalogs.isRequesting || taskTypes.isRequesting,
        user: auth.user,
        actions: global.actions,
        taskList: rows || [],
        taskCatalogs: taskCatalogs.data || [],
        taskTypes: taskTypes.data || [],
        catalogs: catalogs,
        types: types
    };
}

export default connect(mapStateToProps)(TaskList);
