import React, { useEffect, useRef, useState } from 'react';
import { InfoCircleOutlined, EditOutlined, SaveOutlined, PlusOutlined, LoadingOutlined, PoweroffOutlined, DeleteOutlined } from '@ant-design/icons'
import { connect } from 'react-redux';
import { Spin, Tooltip, Card, Row, Col, Select, Input, Modal, Image, Upload, Drawer, Popconfirm, Button, Tag, Space, Dropdown, Form, message } from 'antd';
import '../style.less';
import './style.less';
import moment from 'moment';
import reducerHelper from '@peace/utils/lib/src/reducerHelper';
const { Meta } = Card;
import * as qiniu from "qiniu-js"
import ImgCrop from 'antd-img-crop';
// import DefaultCover from '@assets/images/avatar/1.png';
import { push } from 'react-router-redux'
import { useRequest } from 'ahooks';


const qiniuUrl = 'http://guita.yinweiwen.cn/'

const PageSize = 100;

const GtpList = (props) => {
    const { dispatch, actions, loading, gtps, gtpcount } = props

    const { gtp } = actions;
    const [visible, setVisible] = useState(false)
    const [gtpInfo, setGtpInfo] = useState({})
    const [form] = Form.useForm()
    const [coverImage, setCoverImage] = useState();
    const [coverLoading, setCoverLoading] = useState(false);
    const [curgtps, setCurGtps] = useState([])

    // 分页请求
    const [curPage, setCurPage] = useState(0)


    useEffect(() => {
        // 在这里对表单初始化值做修改映射
        let coverOrg = gtpCover(gtpInfo)
        setCoverImage(coverOrg)
        let g = { ...gtpInfo, contentOrgs: gtpImgs(gtpInfo), coverOrg: coverOrg }
        form.setFieldsValue(g)
    }, [form, gtpInfo])

    useEffect(() => {
        if (!gtps || gtps.length == 0) return;
        let ls = curgtps || []
        setCurGtps(ls.concat(gtps.filter(a => !ls.find(ele => ele.id == a.id))))
    }, [gtps])

    useEffect(() => {
        if (curPage == 0) {
            console.log('dispatch on load')
            dispatch(gtp.getGtps({
                limit: PageSize,
                offset: curPage
            }))
        }
    }, [])

    const refresh = () => {
        setCurPage(0)
        setCurGtps([])
        dispatch(gtp.getGtps({
            limit: PageSize,
            offset: curPage * PageSize
        }))
    }

    const loadMore = () => {
        dispatch(gtp.getGtps({
            limit: PageSize,
            offset: (curPage + 1) * PageSize
        }))
        setCurPage(curPage + 1)
    }

    const onSearch = (v) => {
        setCurPage(0)
        setCurGtps([])
        dispatch(gtp.getGtps({
            limit: PageSize,
            offset: curPage * PageSize,
            search: v
        }))
    }

    function showInfo(p) {
        setGtpInfo(p);
        setVisible(true);
    }

    const onClose = () => {
        setVisible(false);
    };

    const delGtp = (p) => {
        console.log(`deleted ${p}`)
    }

    const addGtp = () => {
        setGtpInfo({});
        setVisible(true);
    }

    const formItemLayout = {
        labelCol: { span: 6 },
        wrapperCol: { span: 14 },
    };

    // 修改操作
    function isEdit() {
        return !!gtpInfo.id
    }

    // 在这里做表单提交的字段修改映射
    const onfinish = (v) => {
        if (v.contentOrgs) {
            v.content = v.contentOrgs.map(c => c.key)
            if (coverImage && coverImage.key) {
                v.cover = coverImage.key;
            }
            // v.cover = v.coverOrg ? v.coverOrg.key : null;
            delete (v, 'contentOrgs')
            if (isEdit()) {
                dispatch(gtp.editGtp(v, gtpInfo.id))
                    .then(res => {
                        if (res.success) {
                            onClose()
                            refresh()
                        }
                    })
            } else {
                dispatch(gtp.addGtp(v))
                    .then(res => {
                        if (res.success) {
                            onClose()
                            refresh()
                        }
                    })
            }
        }
    }

    const [previewVisible, setPreviewVisible] = useState(false);
    const [previewImage, setPreviewImage] = useState('');
    const [previewTitle, setPreviewTitle] = useState('');

    const handlePreviewCancel = () => setPreviewVisible(false);

    const handlePreview = async (file) => {
        console.log(file)
        if (!file.url && !file.preview) {
            file.preview = await getBase64(file.originFileObj);
        }

        setPreviewImage(file.url || file.preview);
        setPreviewVisible(true);
        setPreviewTitle(file.name || file.url.substring(file.url.lastIndexOf('/') + 1));
    };

    const uploadButton = (
        <div>
            <PlusOutlined />
            <div
                style={{
                    marginTop: 8,
                }}
            >
                Upload
            </div>
        </div>
    );
    const uploadCoverButton = (
        <div>
            {coverLoading ? <LoadingOutlined /> : <PlusOutlined />}
            <div
                style={{
                    marginTop: 8,
                }}
            >
                Upload
            </div>
        </div>
    );

    const normFile = (e) => {
        if (Array.isArray(e)) {
            return e
        }
        return e && e.fileList
    }

    const gtpCover = (gi) => gi.cover ? { key: gi.cover, url: `${qiniuUrl}${gi.cover}` } : {}

    const gtpImgs = (gi) => {
        if (gi.content) {
            let a = gi.content.map(c => {
                return {
                    key: c,
                    url: `${qiniuUrl}${c}`
                }
            })
            console.log(a)
            return a
        } else {
            return []
        }
    }

    const customRequest = (detail) => {
        dispatch(gtp.getQiniuToken()).then(res => {
            if (res.success) {
                const token = res.payload.data.token;
                const file = detail.file //Blob 对象，上传的文件
                const key = file.name  // 上传后文件资源名以设置的 key 为主，如果 key 为 null 或者 undefined，则文件资源名会以 hash 值作为资源名。

                let config = {
                    useCdnDomain: true,   //表示是否使用 cdn 加速域名，为布尔值，true 表示使用，默认为 false。
                    region: null     // 根据具体提示修改上传地区,当为 null 或 undefined 时，自动分析上传域名区域
                };

                let putExtra = {
                    fname: detail.file.name,  //文件原文件名
                    params: {}, //用来放置自定义变量
                    mimeType: null  //用来限制上传文件类型，为 null 时表示不对文件类型限制；限制类型放到数组里： ["image/png", "image/jpeg", "image/gif"]
                };

                let observable = qiniu.upload(file, key, token, putExtra, config);
                observable.subscribe({
                    next: (res) => {
                        // 主要用来展示进度
                        let total = res.total
                        detail.onProgress({ percent: parseInt(total.percent) })
                    },
                    error: (err) => {
                        // 失败报错信息
                        console.log(err)
                        message.error("上传失败");
                    },
                    complete: (response) => {
                        // 接收成功后返回的信息
                        file.url = `${qiniuUrl}${response.key}`
                        file.key = response.key
                        detail.onSuccess(response, file)
                    }
                })
            } else {
                message.error('获取七牛token失败')
            }
        })
    }

    const getBase64 = (img, callback) => {
        const reader = new FileReader();
        reader.addEventListener('load', () => callback(reader.result));
        reader.readAsDataURL(img);
    };


    const beforeUploadCover = (file) => {
        const isJpgOrPng = file.type === 'image/jpeg' || file.type === 'image/png';

        if (!isJpgOrPng) {
            message.error('You can only upload JPG/PNG file!');
        }

        const isLt2M = file.size / 1024 / 1024 < 20;

        if (!isLt2M) {
            message.error('Image must smaller than 20MB!');
        }

        return isJpgOrPng && isLt2M;
    };

    const handleCoverDone = (e) => {
        console.log(e)
        if (e.file.status === 'done') {// 状态有：uploading done error removed，被 beforeUpload 拦截的文件没有 status 属性
            getBase64(e.file.originFileObj, (url) => {
                setCoverLoading(false);
                setCoverImage({ url: url, key: e.file.name });
            });
        } else if (e.file.status === 'uploading') {
            setCoverLoading(true);
        }
    }

    function drawerContent(p) {
        return (
            <>
                <Drawer
                    title={isEdit() ? '编辑吉他谱' : '新增吉他谱'}
                    width={480}
                    placement="right"
                    // closable={false}
                    onClose={onClose}
                    visible={visible}
                    extra={
                        <Space>
                            {
                                isEdit() &&
                                <Popconfirm
                                    placement="topRight"
                                    title={"确认删除吉他谱吗?"}
                                    onConfirm={() => {
                                        delGtp(p)
                                    }}>
                                    <Tooltip title="删除吉他谱">
                                        <Button shape="circle" type="primary" danger icon={<DeleteOutlined />} />
                                    </Tooltip>
                                </Popconfirm>
                            }
                        </Space>
                    }
                >
                    <Form
                        name='gtpinfo'
                        form={form}
                        {...formItemLayout}
                        onFinish={onfinish}
                        initialValues={gtpInfo}
                    >
                        <Form.Item
                            label='歌曲名'
                            name='name'
                            rules={[
                                {
                                    required: true,
                                    message: '请输入歌曲名'
                                }
                            ]}
                        >
                            <Input placeholder="请输入歌曲名20字以内" maxLength="20" />
                        </Form.Item>
                        <Form.Item
                            label='演奏家'
                            name='artist'
                        >
                            <Input placeholder="20字以内" maxLength="20" />
                        </Form.Item>
                        <Form.Item
                            name="coverOrg"
                            label="封面"
                            getValueFromEvent={(e) => e.file}
                            valuePropName="file"
                        >
                            <ImgCrop rotate
                                quality={0.4}>
                                <Upload
                                    name="cover"
                                    action="https://qiniup.com"
                                    listType="picture-card"
                                    showUploadList={false}
                                    accept="image/png, image/jpeg, image/jpg"
                                    customRequest={customRequest}
                                    onPreview={handlePreview}
                                    beforeUpload={beforeUploadCover}
                                    onChange={handleCoverDone}
                                >
                                    {(coverImage && coverImage.key) ? (
                                        <img
                                            src={coverImage.url}
                                            alt={coverImage.key}
                                            style={{
                                                width: '100%',
                                            }}
                                        />
                                    ) : (
                                        uploadCoverButton
                                    )}
                                </Upload></ImgCrop>
                        </Form.Item>
                        <Form.Item
                            name="contentOrgs"
                            label="吉他谱"
                            getValueFromEvent={normFile}
                            valuePropName="fileList"
                            // initialValue={gtpImgs(p)}
                            rules={[{
                                required: true, message: '请上传至少一页吉他谱',
                            }]}
                        >
                            <Upload
                                name="contentList"
                                action="https://qiniup.com"
                                listType="picture-card"
                                accept="image/png, image/jpeg, image/jpg"
                                customRequest={customRequest}
                                onPreview={handlePreview}
                                multiple
                            >
                                {uploadButton}
                            </Upload>
                        </Form.Item>
                        <Form.Item
                            wrapperCol={{
                                offset: 8,
                                span: 16,
                            }}
                        >
                            <Space>
                                <Button type="primary" htmlType="submit">
                                    提交
                                </Button>
                                <Button htmlType="button" onClick={() => setGtpInfo({})}>
                                    重置
                                </Button>
                            </Space>
                        </Form.Item>
                    </Form>
                </Drawer>
                <Modal visible={previewVisible} title={previewTitle} footer={null} onCancel={handlePreviewCancel}>
                    <img alt="preview" style={{ width: '100%' }} src={previewImage} />
                </Modal>
            </>
        )
    }

    const linkToGtpView = (p) => {
        dispatch(push(`/gtp/view/${p.id}`, { gtpview: p }))
    }
    return (
        <>
            <div className='search'>
                <Input.Search
                    placeholder="搜索歌曲名、艺术家、其他备注文本"
                    allowClear
                    enterButton="搜索"
                    style={{
                        width: 500,
                        marginBottom: 16,
                    }}
                    loading={loading}
                    onSearch={onSearch}>

                </Input.Search>
                <Button type="primary" style={{ marginLeft: "20px", marginBottom: 16, }} onClick={addGtp}>添加</Button>
            </div>
            <Spin tip='loading' spinning={loading}>
                <Row
                    gutter={[16, 16]}
                >
                    {
                        curgtps.map(p => (
                            <Col span={4} key={p.id}>
                                <Card
                                    hoverable
                                    actions={[
                                        <InfoCircleOutlined key='info' onClick={() => { linkToGtpView(p) }} />,
                                        <EditOutlined key='edit' onClick={() => showInfo(p)} />
                                    ]}
                                    cover={<img alt="cover" src={gtpCover(p).url || 'http://guita.yinweiwen.cn/default_cover.jpg'} onClick={() => linkToGtpView(p)} />}
                                >
                                    <Meta title={p.name} description={p.desc} />
                                </Card>
                            </Col>
                        ))
                    }
                </Row>
                {((curPage + 1) * PageSize < gtpcount) ? <Button type="primary" onClick={loadMore}>加载更多</Button> : null}
                {drawerContent(gtpInfo)}
            </Spin></>
    )
    // https://blog.csdn.net/wscwj8/article/details/105691170

    // https://github.com/die-welle/tiny-qiniu-request

    // https://ant.design/components/upload-cn/#components-upload-demo-picture-card

    // https://developer.qiniu.com/kodo/1289/nodejs#5

    {/* <Form.Item
   label='文件上传'
   name='uploadFile'
   valuePropName='fileList'
   getValueFromEvent={normFile}
   rules={[
     { required: true, message: '必填' }
   ]}
>
  <Upload
     {...uploadProps}
  >
    <Button><UploadOutlined />Upload</Button>
  </Upload>
</Form.Item> */}

    const maxSize = 20
    const uploadProps = {
        accept: '.jpg,.png',
        maxCount: 10,
        beforeUpload: (file) => {
            const isMAX = file.size / 1024 / 1024 < maxSize
            if (!isMAX) {
                message.error(`上传的图片文件不能超过${maxSize}M！`)
            }
            return isMAX
        },
        customRequest: async (options) => {
            const formData = new FormData()
            formData.append('file', options.file)
            const { data } = await giftUploadSvgaApi(formData, ({ total, loaded }) => {
                options.onProgress(
                    { percent: Math.round((loaded / total) * 100).toFixed(2) }, options.file
                )
            })
            if (data.retCode === 0) {
                setSvgaMd5(result.md5)
                options.onSuccess(data, options.file)
                message.success(`${options.file.name} 上传成功!`)
            }
        }
    }

}

function mapStateToProps(state) {
    const { auth, global, gtps } = state;
    const { count, rows } = gtps.data || {}
    console.log(rows)
    return {
        loading: false,
        user: auth.user,
        actions: global.actions,
        gtps: rows || [],
        gtpcount: count,
    };
}

export default connect(mapStateToProps)(GtpList);
