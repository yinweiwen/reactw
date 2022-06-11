'use strict';
import React from 'react';
import { Menu } from 'antd';
import { Link } from 'react-router-dom';
import { connect } from 'react-redux';
import darkVars from '$themes/dark.json';
import lightVars from '$themes/light.json';
import exampleVars from '$themes/example.json'
import styles from './style.css';
import {
    MenuFoldOutlined, MenuUnfoldOutlined, UserOutlined, LogoutOutlined
} from '@ant-design/icons';

const themeMap = {
    light: lightVars,
    dark: darkVars,
    example: exampleVars
}

const Header = props => {
    const { dispatch, changeTheme, history, user, pathname, toggleCollapsed, collapsed, actions } = props

    const changeTheme_ = (themeKey) => {
        localStorage.setItem("theme-name", themeKey);
        window.less.modifyVars(themeMap[themeKey]).catch(error => {
            message.error(`Failed to reset theme`);
        });
        changeTheme(themeKey)
    }

    const handelClick = item => {
        if (item.key == 'logout') {
            dispatch(actions.auth.logout(user));
            history.push(`/signin`);
        } else if (item.key == 'themeLight') {
            changeTheme_('light')
        } else if (item.key == 'themeDark') {
            changeTheme_('dark')
        } else if (item.key == 'themeExample') {
            changeTheme_('example')
        }
    }


    let current = pathname;
    if (pathname == '/' || pathname == '') {
        current = 'default';
    } else if (pathname.charAt(0) == '/') {
        current = pathname.substring(1);
    }

    if (current.indexOf('/') != -1) {
        current = current.substring(0, current.indexOf('/'));
    }

    return (
        <div className={styles.header}>
            <div className={styles['header-fold']}>
                <span onClick={toggleCollapsed} style={{ marginRight: 20 }}>
                    {collapsed ? <MenuUnfoldOutlined /> : <MenuFoldOutlined />}
                </span>
                <div className={styles['header-title']} style={{}}>
                    Peter's Demon
                    {/* <span>{user.orgName}</span> */}
                </div>
            </div>
            <div id="nav" className={styles['header-nav']}>
                <Menu
                    mode='horizontal'
                    selectedKeys={[current]} style={{ border: 0 }}
                    onClick={handelClick}
                >
                    {/* <Menu.SubMenu key="theme" title={<div style={{ margin: '0 8px' }}>主题切换</div>}  >
                        <Menu.Item key="themeLight" >
                            <span>亮色风格</span>
                        </Menu.Item>
                        <Menu.Item key="themeDark" >
                            <span>暗色风格</span>
                        </Menu.Item>
                        <Menu.Item key="themeExample" >
                            <span>示例风格</span>
                        </Menu.Item>
                    </Menu.SubMenu> */}
                    <Menu.SubMenu key="user" title={
                        <div style={{
                            margin: '0 8px'
                        }}>
                            <div className={styles['header-nav-user-img-wrapper']}>
                                <UserOutlined />
                            </div>
                            <div style={{ display: 'inline-block' }}>{user.name}</div>
                        </div>}
                    >
                        {/* <Menu.Item key="profile" icon={<UserOutlined />}>
                                <Link to="/profile">个人设置</Link>
                            </Menu.Item> */}
                        <Menu.Item key="logout" icon={<LogoutOutlined />}>
                            <span>退出</span>
                        </Menu.Item>
                    </Menu.SubMenu>
                </Menu>
            </div>
        </div>
    );
};

function mapStateToProps(state) {
    const { global, auth } = state;
    return {
        actions: global.actions,
        user: auth.user
    };
}

export default connect(mapStateToProps)(Header);