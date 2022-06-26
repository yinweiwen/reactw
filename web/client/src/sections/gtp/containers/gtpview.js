import React, { useEffect, useRef, useState } from 'react';
import { InfoCircleOutlined, FileTextOutlined, SaveOutlined, PlusOutlined, LoadingOutlined, PoweroffOutlined, DeleteOutlined } from '@ant-design/icons'
import { connect } from 'react-redux';
import { Segmented, Spin, Tooltip, Card, Row, Col, Select, Input, Affix, Image, Upload, Drawer, Popconfirm, Button, Tag, Space, Dropdown, Form, message } from 'antd';
import '../style.less';
import moment from 'moment';
import reducerHelper from '@peace/utils/lib/src/reducerHelper';
const { Meta } = Card;
import * as qiniu from "qiniu-js"
import ImgCrop from 'antd-img-crop';
// import DefaultCover from '../../../../assets/images/avatar/1.png';
import { push } from 'react-router-redux'
import ReactPlayer from 'react-player'


import './style.less';

const qiniuUrl = 'http://guita.yinweiwen.cn/'

const VideoTypes = ['mp4', 'mov', 'wmv', 'avi', 'flv', 'avchd', 'mkv', 'f4v', 'swf']

const JudgeIsVideo = (filename) => {
    return VideoTypes.includes(filename.split('.').pop().toLowerCase())
}

const GtpView = (props) => {
    const { dispatch, actions, loading } = props
    const { gtp } = actions;

    // if(!props.location.state || !props.location.state.gtpview){ // undefined
    //     dispatch(push('/gtp/gtpls'))
    //     return (<></>)
    // }

    // params
    const id = props.match?.params?.id
    const { gv } = props.location?.state ?? {};
    const [gtpview, setGtpview] = useState(gv);
    const [pageSize, setPageSize] = useState(2)
    const [pages, setPages] = useState([])
    const [allImages, setAllImages] = useState([])
    const [previewVisible, setPreviewVisible] = useState(false)
    const [segValue, setSegValue] = useState(1);
    // const [curPage, setCurPage ] = useState({})

    useEffect(() => {
        if (gtpview) {
            console.log('load from state')
            // 直接传值 props.location.state
            setPages(getContentPages(gtpview))
            setAllImages(getAllImages(gtpview))
        } else {
            // 通过url中params查询
            console.log('load from remote')
            dispatch(gtp.getGtp(id)).then(res => {
                if (res.success) {
                    let gv = res.payload.data;
                    setGtpview(gv);
                }
            })
        }
    }, [gtpview])

    useEffect(() => {
        if (!gtpview || !gtpview.id) {

        }
    })

    // useEffect(() => {
    //     if (pages) {
    //         setCurPage(pages.slice((segValue - 1) * pageSize, segValue * pageSize))
    //     }
    // }, [pages, segValue, pageSize])

    const getContentPages = (gtp) => {
        if (gtp.content && Array.isArray(gtp.content) && gtp.content.length > 0) {
            let len = gtp.content.length
            let pageCount = Math.ceil(len * 1.0 / pageSize)
            let pages = []
            for (let i = 0; i < pageCount; i++) {
                let contents =
                    gtp.content.slice(i * pageSize, (i + 1) * pageSize)
                        .map(key => ({
                            key: key,
                            url: `${qiniuUrl}${key}`
                        }))
                pages.push({
                    index: i + 1,
                    contents: contents,

                })
            }
            return pages;
        } else return []
    }

    const getAllImages = (gtp) => {
        if (gtp.content && Array.isArray(gtp.content) && gtp.content.length > 0) {
            return gtp.content.map(key => ({
                key: key,
                url: `${qiniuUrl}${key}`
            }))
        } else return []
    }

    const getSegmentOptions = () => {
        return pages.map(p => (
            {
                label: (
                    <div style={{ padding: 4 }}>
                        <FileTextOutlined twoToneColor="#eb2f96" />
                        <div>第 {p.index} 页</div>
                    </div>
                ),
                value: p.index,
            }
        ))
    }

    const PreviewGroup = (
        <div
            style={{
                display: 'none',
            }}
        >
            <Image.PreviewGroup
                preview={{
                    visible: previewVisible,
                    onVisibleChange: (vis) => setPreviewVisible(vis),
                }}
            >
                {allImages?.map(img => <Image key={img.key} src={img.url}></Image>)}
            </Image.PreviewGroup>
        </div>
    )

    function getInnerPage() {
        return (
            pages[segValue - 1]?.contents?.map(p => {
                if (!JudgeIsVideo(p.url)) {
                    return (
                        // <div
                        //     className='two'>
                        <Image
                            key={p.key}
                            preview={{
                                visible: false,
                            }}
                            height="800px"
                            width="50%"
                            style={{
                                padding: "0 20px"
                            }}
                            src={p.url}
                            onClick={() => setPreviewVisible(true)}
                        />
                        // </div>

                        // <img
                        //     // width="50%"
                        //     height="800px"
                        //     style={{
                        //         padding: "0 20px"
                        //     }}
                        //     key={p.key}
                        //     src={p.url}></img>
                    )
                } else {
                    return <ReactPlayer
                        url={p.url}
                        width="100%"
                        height="100%"
                        controls={true} />
                }
            }))
    }

    return (
        <>
            <div style={{
                height: "100%",
                textAlign: "center"
            }}>
                {getInnerPage()}
            </div>
            <div width="100%" style={{
                textAlign: "center"
            }}>
                <Affix offsetBottom={5}>
                    <Segmented
                        value={segValue} onChange={setSegValue}
                        options={getSegmentOptions()}
                    >
                    </Segmented>
                </Affix>
            </div>
            {PreviewGroup}
        </>
        // <div>Hello Info {gtpview?.name} {id}</div>
    )
}

function mapStateToProps(state) {
    const { auth, global } = state;
    return {
        loading: false,
        user: auth.user,
        actions: global.actions
    }
}

export default connect(mapStateToProps)(GtpView)