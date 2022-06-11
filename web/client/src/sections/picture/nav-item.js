import React from 'react';
import { Link } from 'react-router-dom';
import { Menu } from 'antd';
import { SettingOutlined } from '@ant-design/icons';

const SubMenu = Menu.SubMenu;

export function getNavItem(user, dispatch) {
    return (
        <SubMenu key="pic" icon={<SettingOutlined />} title={'图片库'}>
            <Menu.Item key="listp">
                <Link to="/pic/listp">列表</Link>
            </Menu.Item>
        </SubMenu>
    );
}