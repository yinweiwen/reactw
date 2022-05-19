import React from 'react';
import { Link } from 'react-router-dom';
import { Menu } from 'antd';
import { FileTextOutlined } from '@ant-design/icons';
import { Func } from '$utils';

const SubMenu = Menu.SubMenu;

export function getNavItem(user, dispatch) {
    if (!Func.isAuthorized("REPORT_MANAGE")) {
        return null
    }
    return (
        <SubMenu key="report" icon={<FileTextOutlined />} title={'报表管理'}>
            {Func.isAuthorized("REPROT_CONFIG") && <Menu.Item key="reportConfig">
                <Link to="/report/config">报表配置</Link>
            </Menu.Item>}
            {Func.isAuthorized("REPORT_DOWN") && <Menu.Item key="reportDownload">
                <Link to="/report/download">报表下载</Link>
            </Menu.Item>}
            {Func.isAuthorized("REPORT_LIST") &&
                <Menu.Item key="reportCompile">
                    <Link to="/report/compile">整治汇总表</Link>
                </Menu.Item>
            }
        </SubMenu>

    );
}