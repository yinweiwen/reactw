import React, { useEffect, useState } from 'react';
import { connect } from 'react-redux';
import { EllipsisOutlined } from '@ant-design/icons';
import { Spin, Space, Button, Popconfirm, Row, Col, Tree, Table, Card, Switch } from 'antd';
import ProTable from '@ant-design/pro-table';
import { getDepMessage, getDepUser, createUser, updateUser, delUser, resetPwd } from '../actions/user';
import UserModal from '../components/userModal';
import ResetPwd from '../components/resetPwd';

const TreeNode = Tree.TreeNode;

const UserManage = (props) => {
    const { dispatch, loading, depMessage, depUser, clientHeight } = props
    const [modalVisible, setModalVisible] = useState(false);
    const [modalType, setModalType] = useState();
    const [modalRecord, setModalRecord] = useState();
    const [pwdModalVisible, setPwdModalVisible] = useState(false);
    const [depSelectedKeys, setDepSelectedKeys] = useState([])
    const [rowSelected, setRowSelected] = useState([])

    useEffect(() => {
        dispatch(getDepMessage())
    }, [])

    useEffect(() => {
        if (depMessage.length) {
            setDepSelectedKeys([depMessage[0].id])
            dispatch(getDepUser(depMessage[0].id))
        }
    }, [depMessage])

    const columns =
        [
            {
                title: '姓名',
                dataIndex: 'name',
            }, {
                title: '用户名(手机号)',
                dataIndex: 'username',
            },
            {
                title: '职位',
                dataIndex: 'post',
            }, {
                title: '邮箱',
                dataIndex: 'email',
            }, {
                title: '启用状态',
                dataIndex: 'enable',
                render: (_, r) => {
                    return <Switch checkedChildren="启用" unCheckedChildren="禁用" disabled defaultChecked={r.enable} />
                }
            }, {
                title: '操作',
                dataIndex: 'action',
                render: (dom, record) => {

                    return record.username == 'SuperAdmin' ? '' : [
                        <Button type="link" onClick={() => { openModal('edit', record) }}>编辑</Button>,
                        <Popconfirm
                            title="确认删除?"
                            onConfirm={() => {
                                delUsers([record.id])
                            }}
                        >
                            <Button type="link">删除</Button>
                        </Popconfirm>,
                        <Button
                            type="link"
                            onClick={() => {
                                setModalRecord(record);
                                setPwdModalVisible(true);
                            }}
                        >重置密码</Button>
                    ]
                },
            },
        ];

    //弹窗确认
    const onConfirm = (values) => {
        if (modalType == 'edit') {
            dispatch(updateUser(modalRecord.id, values.contract)).then(res => {
                if (res.success) {
                    setModalVisible(false);
                    dispatch(getDepUser(depSelectedKeys[0]));
                }
            });
        } else {
            dispatch(createUser(values.contract)).then(res => {
                if (res.success) {
                    setModalVisible(false);
                    dispatch(getDepUser(depSelectedKeys[0]));
                }
            });
        }

    }

    //打开弹窗
    const openModal = (type, record) => {
        setModalVisible(true);
        setModalType(type);
        if (type == 'edit') {
            setModalRecord(record);
        } else {
            setModalRecord(null);
        }
    }

    //删除用户
    const delUsers = (ids, type) => {
        dispatch(delUser(ids)).then(res => {
            dispatch(getDepUser(depSelectedKeys[0]));
            if (type == 'batch') {
                setRowSelected([]);
            }
        });
    }

    //重置密码
    const onPwdConfirm = (values) => {
        dispatch(resetPwd(modalRecord.id, { password: values.password })).then(res => {
            if (res.success) {
                setPwdModalVisible(false);
                dispatch(getDepUser(depSelectedKeys[0]));
            }
        });
    }

    return (<div >
        <Spin spinning={loading} /* style={{ height: "calc(100vh - 70px)" }} */>
            <Row gutter={16} /* style={{ overflow: "scroll" }} */>
                <Col flex="260px" style={{ height: '100%' }}>
                    <Card title="部门" bordered={false} bodyStyle={{ padding: 8, paddingTop: 24, }}>
                        {
                            depMessage.length ?
                                <Tree
                                    height={clientHeight - 95}
                                    defaultExpandedKeys={[depMessage[0].id]}
                                    selectedKeys={depSelectedKeys}
                                    onSelect={(selectedKeys, e) => {
                                        if (e.selected) {
                                            setDepSelectedKeys(selectedKeys)
                                            dispatch(getDepUser(selectedKeys[0]))
                                        }
                                    }}
                                    treeData={depMessage}
                                    fieldNames={{
                                        title: 'name',
                                        key: 'id',
                                        children: 'subordinate'
                                    }}
                                /> : ''
                        }
                    </Card>
                </Col>

                <Col /* flex="auto" */ style={{ width: "calc(100% - 260px)", height: '100%', display: "black" }}>
                    <Card title="用户" bordered={false} height={clientHeight} bodyStyle={{ padding: 8, paddingTop: 24, overflow: "hidden", width: "100%" }}>
                        <ProTable
                            columns={columns}
                            dataSource={depUser}
                            style={{ width: "100% ", /* backgroundColor: "red", */ height: clientHeight - 95 /* "calc(100vh - 190px)" */, overflow: "auto" }}
                            rowSelection={{
                                selectedRowKeys: rowSelected,
                                onChange: (selectedRowKeys) => {
                                    setRowSelected(selectedRowKeys);
                                },
                                getCheckboxProps: (record) => {
                                    return {
                                        disabled: record.username === 'SuperAdmin',
                                    }
                                },
                            }}
                            options={false}
                            search={false}
                            rowKey="id"
                            toolBarRender={() => [
                                <span>
                                    <Button
                                        type="primary"
                                        key="primary"
                                        style={{ marginRight: 10 }}
                                        onClick={() => openModal('create')}
                                    >新建用户</Button>
                                    <Button style={{ marginRight: 10 }} onClick={() => { dispatch(getDepUser(depSelectedKeys[0])); }}>刷新</Button>
                                    <Popconfirm title="确认删除?" onConfirm={() => { delUsers(rowSelected, 'batch') }}>
                                        <Button>批量删除</Button>
                                    </Popconfirm>
                                </span>
                            ]}
                        />
                    </Card>

                    {
                        depMessage.length && modalVisible ?
                            <UserModal
                                visible={modalVisible}
                                onVisibleChange={setModalVisible}
                                modalType={modalType}
                                onConfirm={onConfirm}
                                editData={modalRecord}
                            />
                            : ''
                    }
                    {pwdModalVisible ? <ResetPwd visible={pwdModalVisible}
                        onVisibleChange={setPwdModalVisible}
                        onConfirm={onPwdConfirm} /> : ''}

                </Col>
            </Row>
        </Spin>
    </div>

    )
}

function mapStateToProps(state) {
    const { depMessage, depUser, global } = state;
    return {
        clientHeight: global.clientHeight,
        loading: depMessage.isRequesting,
        depMessage: depMessage.data || [],
        depUser: depUser.data || []
    };
}

export default connect(mapStateToProps)(UserManage);