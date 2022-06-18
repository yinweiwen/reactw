import React, { useEffect, useRef, useState } from 'react';
import { connect } from 'react-redux';
import { Spin, Card, Row, Col, Image } from 'antd';
import { Button, Tag, Space, Popconfirm, Dropdown } from 'antd';
import '../style.less';
import moment from 'moment';
import ProTable, { TableDropdown } from '@ant-design/pro-table';
import { triggerFocus } from 'antd/lib/input/Input';
import { ScrollList } from '$components'
import './style.less'

const { Meta } = Card;
const PicListScroll = (props) => {
    const containerRef = useRef();
    const { dispatch, actions, loading, picList } = props

    const { pic } = actions;
    const [visual, setVisual] = useState(false)
    const [end, setEnd] = useState(false)

    useEffect(() => {
        dispatch(pic.getPicList())
    }, [])

    useEffect(() => {
        console.log('init ref value:')
        containerRef.current = document.getElementsByClassName("PicList")[0]
    }, [])


    function fileNameOfPath(path) {
        return path.slice(path.indexOf("/") + 1)
    }

    let content = () => {
        return picList.map(p => {
            let fn = fileNameOfPath(p.key)
            return (
                <Card
                    hoverable
                    width={200}
                    key={p.key}
                >
                    <Image
                        // width={200}
                        src={`http://wallhaven.yinweiwen.cn/${p.key}`}

                        preview={{
                            src: `http://wallhaven.yinweiwen.cn/${fn}`,
                        }}
                    />
                    <Meta title="Europe Street beat" description="www.instagram.com" />
                </Card>
            )
        })
    }

    function loadMore() {
        console.log("load more.............")
    }

    return (
        <div className='PicList'>
            <ScrollList
                loading={loading}
                scrollEl={containerRef.current}
                end={end}
                componentList={content()}
                loaderMore={() => loadMore()} />
        </div>
    )
}

function mapStateToProps(state) {
    const { auth, global, picList } = state;
    let arr = []
    let marker = null
    if (picList.data) {
        arr = picList.data.arr
        marker = picList.data.marker
    }
    return {
        loading: false,
        user: auth.user,
        actions: global.actions,
        picList: arr || []
    };
}

export default connect(mapStateToProps)(PicListScroll);
