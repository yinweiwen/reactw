import React, { useEffect, useRef, useState } from 'react';
import { InfoCircleOutlined } from '@ant-design/icons'
import { connect } from 'react-redux';
import { Spin, Card, Row, Col, Image, Drawer, Popconfirm } from 'antd';
import { Button, Tag, Space, Dropdown } from 'antd';
import '../style.less';
import moment from 'moment';
import ProTable, { TableDropdown } from '@ant-design/pro-table';
import { triggerFocus } from 'antd/lib/input/Input';
import { ScrollList } from '$components'
import { icons } from 'antd/lib/image/PreviewGroup';

const { Meta } = Card;

const DescriptionItem = ({ title, content }) => (
    <div className="site-description-item-profile-wrapper">
        <p className="site-description-item-profile-p-label">{title}:</p>
        {content}
    </div>
)

const PicList = (props) => {
    const { dispatch, actions, loading, picList, marker } = props

    const { pic } = actions;
    const [visible, setVisible] = useState(false)
    const [pics, setPics] = useState([])
    const [picInfo, setPicInfo] = useState({})

    const picTotalList = useRef([])

    useEffect(() => {
        dispatch(pic.getPicList({
            marker: marker
        }))
    }, [])

    useEffect(() => {
        picTotalList.current = (picTotalList.current || []).concat(picList)
        setPics(picTotalList.current)
    }, [picList])

    function fileNameOfPath(path) {
        if (path)
            return path.slice(path.indexOf("/") + 1)
        else return ""
    }

    function showInfo(p) {
        setPicInfo(p || {});
        setVisible(true);
    }

    const onClose = () => {
        setVisible(false);
    };

    async function delPic(p) {
        dispatch(pic.delQiniuPic(p)).then(res => {
            if (res.success) {
                picTotalList.current = picTotalList.current.filter(s => s.key !== p.key)
                setPics(picTotalList.current)
                onClose()
            }
        })
    }

    const drawerContent = (p) => {
        return (
            <>
                <Drawer width={480} placement="right" closable={false} onClose={onClose} visible={visible}>
                    <p
                        className="site-description-item-profile-p"
                        style={{
                            marginBottom: 24,
                        }}
                    >
                        ????????????
                    </p>
                    <p className="site-description-item-profile-p">Qiniu</p>
                    <DescriptionItem title="????????????" content={p.key} />
                    <DescriptionItem title="????????????" content={p.putTime} />
                    <DescriptionItem title="Hash???" content={p.hash} />
                    <DescriptionItem title="????????????" content={p.fsize} />
                    <DescriptionItem title="MIME??????" content={p.mimeType} />
                    <DescriptionItem title="????????????" content={p.endUser} />
                    <DescriptionItem title="??????" content={p.type} />
                    <p>
                        <Image
                            src={`http://wallhaven.yinweiwen.cn/${p.key}`}

                            preview={{
                                src: `http://wallhaven.yinweiwen.cn/${fileNameOfPath(p.key)}`,
                            }}
                        />
                    </p>

                    <Popconfirm
                        placement="topRight"
                        title={"????????????????????????????"}
                        onConfirm={() => {
                            delPic(p)
                        }}>
                        <Button ype="primary" danger>??????????????????</Button>
                    </Popconfirm>
                </Drawer>
            </>
        )
    }

    function loadMore() {
        dispatch(pic.getPicList({
            marker: marker
        }))
    }

    return (
        <Spin tip='loading' spinning={loading}>
            {
                <Row
                    gutter={[16, 16]}
                >
                    {
                        pics.map(p => {
                            let fn = fileNameOfPath(p.key)
                            return (
                                <Col span={4} key={p.key}>
                                    <Card
                                        hoverable
                                        actions={[
                                            <InfoCircleOutlined key='info' onClick={() => showInfo(p)} />
                                        ]}
                                    // style={{ width: "100%" }}
                                    // cover={<img alt="example" src={`http://wallhaven.yinweiwen.cn/${p.key}`} />}
                                    >
                                        <Image
                                            // width={200}
                                            src={`http://wallhaven.yinweiwen.cn/${p.key}`}

                                            preview={{
                                                src: `http://wallhaven.yinweiwen.cn/${fn}`,
                                            }}
                                        />
                                        <Meta title="wallhaven.yinweiwen.cn" description={fn} />
                                    </Card>
                                </Col>
                            )
                        })
                    }
                </Row>
            }
            <Button type="primary" onClick={loadMore}>????????????</Button>
            {drawerContent(picInfo)}
        </Spin>
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
        picList: arr || [],
        marker: marker,
    };
}

export default connect(mapStateToProps)(PicList);
