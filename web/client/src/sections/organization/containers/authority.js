import React, { useEffect, useState } from 'react';
import { connect } from 'react-redux';
import { Spin, Row, Col, Card, Button, Tree, Empty } from 'antd';
import { getDepMessage, getDepUser } from '../actions/user';
import { getResource, getUserResource, postUserRes } from '../actions/authority';
import Resource from '../components/resource';

const Authority = (props) => {
    const { dispatch, loading, depMessage, depUser, resource, userResource, clientHeight } = props

    const [depSelectedKeys, setDepSelectedKeys] = useState([])
    const [userSelectedKeys, setUserSelectedKeys] = useState([])
    const [depSelected, setDepSelected] = useState()
    const [userSelected, setUserSelected] = useState()
    const [resCode, setResCode] = useState({})

    useEffect(() => {
        dispatch(getResource())
        if (!(depMessage && depMessage.length)) {
            dispatch(getDepMessage())
        }
    }, [])
    useEffect(() => {
        if (depMessage.length) {
            setDepSelectedKeys([depMessage[0].id])
            setDepSelected([depMessage[0].name])
            dispatch(getDepUser(depMessage[0].id))
        }
    }, [depMessage])
    useEffect(() => {
        if (depUser.length) {
            setUserSelectedKeys([depUser[0].id])
            setUserSelected(depUser[0].username)
            dispatch(getUserResource(depUser[0].id))
        }
    }, [depUser])

    const handleSave = () => {
        dispatch(postUserRes({ userId: userSelectedKeys[0], resCode: resCode })).then(res => {
            if (res.success) {
                dispatch(getUserResource(userSelectedKeys[0]))
            }
        })
    }
    return (
        <Spin spinning={loading}>
            <Row gutter={16}>
                <Col span={4} style={{ height: '100%' }}>
                    <Card title="部门" bordered={false} bodyStyle={{ padding: 8, paddingTop: 24 }}>
                        {
                            depMessage.length ?
                                <Tree
                                    height={clientHeight - 100}
                                    defaultExpandedKeys={[depMessage[0].id]}
                                    selectedKeys={depSelectedKeys}
                                    onSelect={(selectedKeys, { selected, selectedNodes }) => {
                                        if (selected) {
                                            setDepSelectedKeys(selectedKeys)
                                            setDepSelected(selectedNodes[0].name || "")
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
                <Col span={4} style={{ height: '100%', }}>
                    <Card title={`[${depSelected}] 用户列表`} bordered={false} bodyStyle={{ padding: 8, paddingTop: 24 }}>
                        {
                            depUser.length ?
                                <Tree
                                    height={clientHeight - 100}
                                    defaultSelectedKeys={[depUser[0].id]}
                                    selectedKeys={userSelectedKeys}
                                    onSelect={(selectedKeys, { selected, selectedNodes }) => {
                                        if (selected) {
                                            setUserSelectedKeys(selectedKeys)
                                            setUserSelected(selectedNodes[0].username || '')
                                            dispatch(getUserResource(selectedKeys[0]))
                                        }
                                    }}
                                    treeData={depUser}
                                    fieldNames={{
                                        title: 'name',
                                        key: 'id'
                                    }}
                                /> : <Empty />
                        }
                    </Card>
                </Col>
                <Col span={16} style={{ height: '100%', }}>
                    {depUser.length ?
                        <Card title={`[${depUser[0] && depUser[0].name || ''}] 功能范围`} bordered={false} bodyStyle={{ padding: 8, paddingTop: 24 }}>
                            <Resource
                                userSelected={userSelected}
                                roleData={resource}
                                userRole={userResource}
                                setResCode={setResCode}
                            />
                            <Row type="flex" justify="center" style={{ marginBottom: 16, marginTop: 16, textAlign: 'center' }}>
                                <Col span="24">
                                    <Button
                                        disabled={userSelected === "SuperAdmin"}
                                        onClick={handleSave}
                                        style={{ width: '60%' }}
                                        type='primary'>保存修改</Button>
                                </Col></Row>
                        </Card>
                        : <Card title={`[]功能范围`} bordered={false} bodyStyle={{ padding: 8, paddingTop: 24 }}>
                            <Empty />
                        </Card>
                    }
                </Col>
            </Row>
        </Spin >
    )
}

function mapStateToProps(state) {
    const { userResource, resource, depMessage, depUser, global } = state;
    return {
        clientHeight: global.clientHeight,
        loading: depMessage.isRequesting || depUser.isRequesting || resource.isRequesting,
        userResource: userResource.data || [],
        resource: resource.data || [],
        depMessage: depMessage.data || [],
        depUser: depUser.data || []
    };
}

export default connect(mapStateToProps)(Authority);