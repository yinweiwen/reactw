import React from 'react';
import { Link } from 'react-router-dom';
import { Menu } from 'antd';
import { SettingOutlined } from '@ant-design/icons';
import { Func } from '$utils';

const SubMenu = Menu.SubMenu;

export function getNavItem(user, dispatch) {
    if (!Func.isAuthorized("ORG_MANAGE")) {
        return null
    }
    return (
        <SubMenu key="organization" icon={<SettingOutlined />} title={'组织管理'}>
            {Func.isAuthorized("ORG_MEMBER") && <Menu.Item key="userManage">
                <Link to="/organization/user">用户管理</Link>
            </Menu.Item>
            }
            {Func.isAuthorized("ORG_AUTH") && <Menu.Item key="authority">
                <Link to="/organization/authority">权限配置</Link>
            </Menu.Item>}
        </SubMenu>
    );
}