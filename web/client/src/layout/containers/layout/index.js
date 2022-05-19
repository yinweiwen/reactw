'use strict';

import './index.less';
import darkVars from '$themes/dark.json';
import lightVars from '$themes/light.json';
import React, { useState, useEffect } from 'react';
import { connect } from 'react-redux';
import { message, Layout, Breadcrumb, Badge } from 'antd';
import Sider from '../../components/sider';
import Header from '../../components/header';
import Footer from '../../components/footer';
import Breadcrumbs from './breadcrumb';
import { resize } from '../../actions/global';
import * as NProgress from 'nprogress';
import PerfectScrollbar from 'perfect-scrollbar';

NProgress.configure({
    template: `
    <div class="bar" style="height:2px" role="bar">
        <div class="peg"></div>
    </div>
    <div class="spinner" role="spinner">
        <div class="spinner-icon"></div>
    </div>
    `
});
const headerHeight = 64
const footerHeight = 0
let scrollbar

const LayoutContainer = props => {
    const { dispatch, msg, user, copyright, children, sections, clientWidth, clientHeight,
        location, match, routes, history } = props
    const [themeName, setThemeName] = useState(localStorage.getItem("theme-name") || 'light')
    const [collapsed, setCollapsed] = useState(false)

    NProgress.start();

    const resize_ = (collapsed) => {
        const extraHeight = headerHeight + footerHeight;
        dispatch(resize(
            document.body.clientHeight - extraHeight - 68,
            document.body.clientWidth - (collapsed ? 120 : 220)
        ));
    }

    useEffect(() => {
        window.less.modifyVars(themeName == 'light' ? lightVars : darkVars).then(() => {
            resize_(collapsed)
        }).catch(error => {
            resize_(collapsed)
            message.error(`主题切换失败`);
        });
        scrollbar = new PerfectScrollbar('#page-content', { suppressScrollX: true });
    }, [])

    useEffect(() => {
        NProgress.done();
        if (!user || !user.authorized) {
            history.push('/signin');
        }
        if (msg) {
            message.destroy();
            if (msg.done) {
                message.success(msg.done);
            }
            if (msg.error) {
                message.error(msg.error);
            }
        }
        const dom = document.getElementById('page-content');
        if (dom) {
            scrollbar.update();
            dom.scrollTop = 0;
        }
    })

    let contentStyle = {
        position: 'relative',
        margin: '12px 12px 0px',
        padding: '8px',
        height: clientHeight - 16 + 68,
    }
    if (themeName == 'light') {
        contentStyle.background = '#fff';
    }

    return (
        <Layout id="layout">
            <Layout.Header style={{ padding: 0 }} >
                <Header
                    user={user}
                    pathname={location.pathname}
                    toggleCollapsed={() => {
                        setCollapsed(!collapsed);
                        resize(!collapsed)
                    }}
                    changeTheme={(themeName) => {
                        setThemeName(themeName)
                    }}
                    collapsed={collapsed}
                    history={history}
                />
            </Layout.Header>
            <Layout>
                <Layout.Sider trigger={null} collapsible collapsed={collapsed} theme={themeName}>
                    <Sider
                        sections={sections}
                        dispatch={dispatch}
                        user={user}
                        pathname={location.pathname}
                        collapsed={collapsed}
                        themeName={themeName}
                    />
                </Layout.Sider>
                <Layout.Content id="page-content" style={contentStyle}>
                    <div style={{ minWidth: 520 }}>
                        <div style={{ padding: '0px 16px 4px', borderBottom: '1px solid #e8e8e8' }}>
                            <Breadcrumbs routes={routes} />
                        </div>
                        <div style={{ paddingTop: 12 }}>
                            {children}
                        </div>
                    </div>
                </Layout.Content>
            </Layout>
        </Layout>
    )
}

function mapStateToProps(state) {
    const { global, auth, ajaxResponse } = state;
    return {
        title: global.title,
        copyright: global.copyright,
        sections: global.sections,
        actions: global.actions,
        clientWidth: global.clientWidth,
        clientHeight: global.clientHeight,
        msg: ajaxResponse.msg,
        user: auth.user
    };
}

export default connect(mapStateToProps)(LayoutContainer);