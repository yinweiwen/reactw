import React, { useEffect } from 'react';
import { connect } from 'react-redux';
import { Spin, Card } from 'antd';
import '../style.less';
import ProTable, { TableDropdown } from '@ant-design/pro-table';

const Example = (props) => {
    const { dispatch, actions, user, loading } = props

    useEffect(() => {
        dispatch(actions.example.getMembers(user.orgId))
    }, [])

    return (
        <Spin tip="biubiubiu~" spinning={loading}>
            <div id='example'>
                <p>STYLE EXAMPLE</p>
            </div>
            <ProTable
                columns={[{
                    dataIndex: 'index',
                    valueType: 'indexBorder',
                    width: 48,
                }]}
                defaultData={[{ index: 1, key: 1 }]}
            >

            </ProTable>
        </Spin>
    )
}

function mapStateToProps(state) {
    const { auth, global, members } = state;
    return {
        loading: members.isRequesting,
        user: auth.user,
        actions: global.actions,
        members: members.data
    };
}

export default connect(mapStateToProps)(Example);
