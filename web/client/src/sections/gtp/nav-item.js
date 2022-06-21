import React from 'react';
import { Link } from 'react-router-dom';
import { Menu } from 'antd';
import { ReadOutlined } from '@ant-design/icons';

const SubMenu = Menu.SubMenu;

export function getNavItem(user, dispatch) {
    return (
        <SubMenu key="gtp" icon={<ReadOutlined />} title={'吉他谱'}>
            <Menu.Item key="gtpls">
                <Link to="/gtp/gtpls">列表</Link>
            </Menu.Item>
        </SubMenu>
    );
}