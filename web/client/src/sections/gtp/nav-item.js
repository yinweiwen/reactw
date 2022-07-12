import React from 'react';
import { Link } from 'react-router-dom';
import { Menu } from 'antd';
import { ReadOutlined } from '@ant-design/icons';

const SubMenu = Menu.SubMenu;

export function getNavItem(user, dispatch) {
    return (
        <Menu.Item key="gtpls" label="吉他谱">
            <ReadOutlined />
            <Link to="/gtp"></Link>
        </Menu.Item>
    );
}