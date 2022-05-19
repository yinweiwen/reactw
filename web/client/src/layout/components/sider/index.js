import React, { Component, useEffect, useState } from 'react';
import { Menu } from 'antd';

const Sider = props => {
    const { themeName, sections, user, dispatch } = props
    const [items, setItems] = useState([])
    const [selectedKeys, setSelectedKeys] = useState([])
    const [openKeys, setOpenKeys] = useState([])

    useEffect(() => {
        let items = sections.filter(s => typeof s.getNavItem == 'function')
            .reduce((p, c) => {
                let s = c.getNavItem(user, dispatch, 0);
                if (s != null) {
                    if (Array.isArray(s)) {
                        p = p.concat(s);
                    } else {
                        p.push(s);
                    }
                }
                return p;
            }, []);
        setItems(items);
        setSelectedKeys(items.length && [items[0].key] || []);
    }, [])
    useEffect(() => {
        const test = window.location.pathname;
        sections.forEach(e => {
            e.routes.forEach(i => {
                if (test.includes(i.route.path)) {
                    if (i.route.childRoutes.length > 0) {
                        i.route.childRoutes.forEach(v => {
                            if (test.includes(v.path)) {
                                setOpenKeys(i.route.menuOpenKeys);
                                setSelectedKeys(v.menuSelectKeys)
                            }
                        })
                    } else {
                        setOpenKeys([]);
                        setSelectedKeys(e.key)
                    }
                }
            })
        });
    }, [items])


    return (
        <Menu id="sider" mode="inline"
            theme={themeName || 'dark'}
            selectedKeys={selectedKeys}
            openKeys={openKeys}
            onSelect={(e) => {
                const { selectedKeys } = e;
                setSelectedKeys(selectedKeys)
            }}
            onOpenChange={(ks) => {
                setOpenKeys(ks)
            }}
        >
            {items}
        </Menu>
    )
}

export default Sider;