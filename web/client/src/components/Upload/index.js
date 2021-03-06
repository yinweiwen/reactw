'use strict';

import React, { Component } from 'react';
import { connect } from 'react-redux';
import { Spin, Upload, message, Modal, Card, Button } from 'antd';
import moment from 'moment';
import { PlusOutlined, UploadOutlined, CloseOutlined } from '@ant-design/icons';

class Uploads extends Component {
    constructor(props) {
        super(props);
        this.ApiRoot = localStorage.getItem('tyApiRoot')
        this.state = {
            fileUploading: false,
            fileList: [],
            curPreviewPic: '',
            delPicIng: false,
            removeFilesList: []
        };
    }

    dealName = (uploaded) => {
        let realName = uploaded.split('/')[2]
        let x1 = realName.split('.')
        let x2 = x1[0].split('_')
        let showName = `${x2[0]}.${x1[1]}`
        return showName
    }

    // setFileList = (value) => {
    //     let defaultFileList = [];
    //     defaultFileList = value.map((u, index) => {
    //         let fileUrl = `${this.ApiRoot}/${u.url}`;
    //         return {
    //             uid: -index - 1,
    //             name: this.dealName(u.url),
    //             status: 'done',
    //             storageUrl: u.url,
    //             url: fileUrl
    //         };
    //     });
    //     onChange(defaultFileList)
    //     this.setState({
    //         fileList: defaultFileList
    //     });
    // };

    componentDidMount() {
        const { value } = this.props;
        if (value) {
            this.setState(value);
        }
    }

    componentWillReceiveProps(np) {
        const { dispatch, value: thisEditData, onChange } = this.props;
        const { value: nextEditData } = np;

        const setFileList = () => {
            let defaultFileList = [];
            defaultFileList = nextEditData.map((u, index) => {
                let fileUrl = `${this.ApiRoot}/${u.storageUrl}`;
                return {
                    uid: -index - 1,
                    name: this.dealName(u.storageUrl),
                    status: 'done',
                    storageUrl: u.storageUrl,
                    url: fileUrl,
                    size: u.size || -1
                };
            });
            this.setState({
                fileList: defaultFileList
            });
        };

        if (nextEditData && nextEditData.length) {
            if (!thisEditData || !this.state.fileList.length) {
                setFileList();
            } else if (nextEditData.length != thisEditData.length) {
                setFileList();
            } else {
                let repeat = true;
                for (let i = 0; i < thisEditData.length; i++) {
                    if (thisEditData[i] != nextEditData[i]) {
                        repeat = false;
                        break;
                    }
                }
                if (!repeat) {
                    setFileList();
                }
            }
        }
        // else{
        //     this.setState({
        //         fileList:[],
        //     })
        // }
    }

    render() {
        const UploadPath = {
            project: ['txt', 'dwg', 'doc', 'docx', 'xls', 'xlsx', 'pdf', 'png', 'jpg', 'rar', 'zip'],
            report: ['doc', 'docx', 'xls', 'xlsx', 'pdf'],
            data: ['txt', 'xls', 'xlsx'],
            image: ['png', 'jpg', 'svg', 'jpeg'],
            three: ['js'],
            video: ['mp4']
        };
        /**
         * uploadType ???string??? ?????????????????????????????? ???????????? ??? web/routes/attachment/index.js ??? UploadPath ??? key ?????????????????? project???
         * disabled ???boolean??? ??????????????????
         * maxFilesNum ???number??? ??????????????????
         * fileTypes ???array[string]??? ?????????????????????????????????
         * maxFileSize ???number??? ???????????????????????? M
         * listType ???antd??? upload ???????????????
         * onChange ???function??? ?????????????????????????????? ????????????
         * value ???array[obj]??? ???????????? [{url:'xxx', [size:999]}]
         * onStateChange ???function??? ?????????????????????????????? ????????? return { uploading:true/false }
         */
        const {
            uploadType,
            disabled,
            maxFilesNum,
            fileTypes,
            maxFileSize,
            listType,
            onChange,
            value,
            showUploadList,
            onStateChange
        } = this.props;
        const { fileList, curPreviewPic, delPicIng, removeFilesList } = this.state;
        const that = this;
        let uploadType_ = uploadType || 'project';
        let maxFilesNum_ = maxFilesNum || 1;
        let defaultFileTypes = fileTypes || UploadPath[uploadType_];
        const uploadProps = {
            name: 'checkFile_',
            multiple: false,
            showUploadList: showUploadList || true,
            action: `${this.ApiRoot}/attachments/${uploadType_}`,
            listType: listType || 'text',
            disabled: disabled,
            beforeUpload: (file) => {
                if (fileList.length >= maxFilesNum_) {
                    message.warning(`????????????${maxFilesNum_}???????????????`);
                    return false;
                }
                if (file.name.length > 60) {
                    message.warning(`???????????????(??????60??????)?????????????????????`);
                    return false;
                }
                const extNames = file.name.split('.');
                var reg = /^[\.\s\u4e00-\u9fa5a-zA-Z0-9_-]{0,}$/;
                if (!reg.exec(file.name)) {
                    message.warning(`??????????????????????????????????????????????????????????????????????????????????????????????????????`);
                    return false;
                }
                let isDAE = false;
                if (extNames.length > 0) {
                    let fileType = extNames[extNames.length - 1].toLowerCase();
                    isDAE = defaultFileTypes.some((f) => f == fileType);
                }
                if (!isDAE) {
                    message.error(`???????????? ${defaultFileTypes.join()} ???????????????!`);
                    return false;
                }
                const isLt = file.size / 1024 / 1024 < (maxFileSize || 3);
                if (!isLt) {
                    message.error(`??????????????????${maxFileSize || 3}MB!`);
                    return false;
                }
                this.setState({
                    fileUploading: true
                });
                if (onStateChange) {
                    onStateChange({ uploading: true });
                }
            },
            onChange(info) {
                const status = info.file.status;
                if (status === 'uploading') {
                    that.setState({
                        fileList: info.fileList
                    });
                }
                if (status === 'done') {
                    let { uploaded, url } = info.file.response;
                    let size = info.file.size;
                    let nextFileList = fileList;
                    nextFileList[nextFileList.length - 1] = {
                        uid: -moment().unix(),
                        name: that.dealName(uploaded),
                        status: 'done',
                        storageUrl: uploaded,
                        url: url,
                        size: size
                    };
                    onChange(nextFileList);
                    that.setState({
                        fileUploading: false,
                        fileList: nextFileList
                    });
                    if (onStateChange) {
                        onStateChange({ uploading: false });
                    }
                } else if (status === 'error') {
                    that.setState({
                        fileUploading: false
                    });
                    message.error(`${info.file.name} ????????????????????????`);
                    if (onStateChange) {
                        onStateChange({ uploading: false });
                    }
                }
            },
            onRemove(file) {
                let nextFileList = [];
                fileList.map((f, i) => {
                    if (f.uid != file.uid) {
                        nextFileList.push(f);
                    }
                });
                let nextRemoveFiles = removeFilesList.concat([file.storageUrl]);
                if (curPreviewPic == file.url) {
                    that.setState({
                        curPreviewPic: ''
                    });
                }
                onChange(nextFileList);
                that.setState({
                    fileList: nextFileList,
                    removeFilesList: nextRemoveFiles
                });
            },
            onPreview(file) {
                let filePostfix = file.url.split('.').pop();
                filePostfix = filePostfix.toLowerCase();
                if (UploadPath.image.some((img) => img == filePostfix)) {
                    that.setState({
                        curPreviewPic: file.url
                    });
                } else {
                    message.warn('?????????????????????');
                }
            }
        };

        let fileList_ = fileList
        // .map(f => {
        //     if (f.storageUrl) {
        //         let realName = f.storageUrl.split('/').pop()
        //         if (f.name != realName) {
        //             f.name = realName
        //         }
        //     }
        //     return f
        // })

        return (
            <div>
                <Spin spinning={delPicIng}>
                    <Upload {...uploadProps} fileList={fileList_}>
                        {
                            disabled ? (
                                ''
                            ) :
                                listType == 'picture-card' ?
                                    (
                                        fileList.length >= maxFilesNum_ ? null : (
                                            <div style={{}}>
                                                <PlusOutlined />
                                                <div>????????????</div>
                                            </div>
                                        )
                                    ) : (
                                        <Button disabled={fileList.length >= maxFilesNum_} icon={<UploadOutlined />}>  ???????????? </Button>
                                    )
                        }
                    </Upload>
                    {
                        curPreviewPic ? (
                            <Card
                                bodyStyle={{
                                    padding: 8
                                }}
                            >
                                <div style={{ marginBottom: 8 }} >
                                    <span>????????????</span>
                                    <span
                                        style={{ float: 'right' }}
                                        onClick={() => { this.setState({ curPreviewPic: '' }); }}
                                    >
                                        <CloseOutlined style={{ fontSize: 20 }} />
                                    </span>
                                </div>
                                <img style={{ width: '100%' }} src={curPreviewPic}></img>
                            </Card>
                        ) : ''
                    }
                </Spin>
            </div>
        );
    }
}

function mapStateToProps(state) {
    const { auth } = state
    return {
        user: auth.user
    };
}

export default connect(mapStateToProps)(Uploads);
