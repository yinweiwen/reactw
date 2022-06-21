import React from 'react';
import { Link } from 'react-router-dom';
import { Menu } from 'antd';
import { HeartOutlined } from '@ant-design/icons';

const SubMenu = Menu.SubMenu;

export function getNavItem(user, dispatch) {
    return (
        <SubMenu key="task" icon={<HeartOutlined />} title={'举个栗子'}>
            <Menu.Item key="list">
                <Link to="/task/list">举个棒子</Link>
            </Menu.Item>
            <Menu.Item key="catalogs">
                <Link to="/task/catalogs">任务分类</Link>
            </Menu.Item>
        </SubMenu>
    );
}