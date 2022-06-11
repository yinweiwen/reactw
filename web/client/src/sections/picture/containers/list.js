import React, { useEffect, useRef, useState } from 'react';
import { connect } from 'react-redux';
import { Spin, Card } from 'antd';
import { Button, Tag, Space, Popconfirm, Dropdown } from 'antd';
import '../style.less';
import moment from 'moment';
import ProTable, { TableDropdown } from '@ant-design/pro-table';
import { triggerFocus } from 'antd/lib/input/Input';

const PicList = (props) => {
    const { dispatch, actions, loading } = props
    return (
        <Spin tip='loading' spinning={loading}>
            <div>Hello U</div>
        </Spin>
    )
}

function mapStateToProps(state) {
    const { auth, global, picList } = state;
    return {
        loading: false,
        user: auth.user,
        actions: global.actions,
        picList: [] || picList.data || []
    };
}

export default connect(mapStateToProps)(PicList);
