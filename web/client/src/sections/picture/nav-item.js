import React from 'react';
import { Link } from 'react-router-dom';
import { Menu } from 'antd';
import { RocketOutlined } from '@ant-design/icons';

const SubMenu = Menu.SubMenu;

export function getNavItem(user, dispatch) {
    return (
        <SubMenu key="pic" icon={<RocketOutlined />} title={'图片库'}>
            <Menu.Item key="listp">
                <Link to="/pic/listp">列表</Link>
            </Menu.Item>
            <Menu.Item key="listpc">
                <Link to="/pic/listpc">Scroll</Link>
            </Menu.Item>
        </SubMenu>
    );
}