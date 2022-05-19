import React, { useEffect, useState } from 'react';
import { connect } from 'react-redux';
import ConfigModal from '../components/configModal'
import { Spin, Button, Space, Popconfirm, Switch } from 'antd';
import ProTable from '@ant-design/pro-table';
import '../style.less';
import Pinyin from '../../../utils/pinyin'
const reportType = [{
    value: 1,
    label: '县区排查整治汇总表',
}, {
    value: 2,
    label: '各县区每日汇总表',
}, {
    value: 3,
    label: '隐患场所汇总表',
},]
var pinyin = null
var as = null
var bs = null
const Config = (props) => {
    const { dispatch, actions, loading, reportConfig, allAreas } = props
    const [configModalVis, setConfigModalVis] = useState(false)
    const [editData, setEditData] = useState(null)
    const { report } = actions
    useEffect(() => {
        dispatch(report.getReportConfig())
        dispatch(report.allAreas())

    }, [])
    useEffect(()=>{
        pinyin=new Pinyin()
    })
    return (
        <Spin spinning={loading}>
            <ProTable
                columns={[{
                    title: '报表名称',
                    dataIndex: 'reportName',
                }, {
                    title: '区域名称',
                    dataIndex: 'region',
                    sorter: (a, b) => {
                        let regionOne = allAreas.find(item => item.id == a.regionId)
                        let regionTwo = allAreas.find(item => item.id == b.regionId)

                        if (regionOne) {
                            as = pinyin.getCamelChars(regionOne.name).toLowerCase()

                        } if (regionTwo) {
                            bs = pinyin.getCamelChars(regionTwo.name).toLowerCase()

                        } else {
                            return ''
                        }
                       let codeOne=as.substr(0,1).charCodeAt()
                       let codeTwo=bs.substr(0,1).charCodeAt()
               return codeOne-codeTwo
                    },
                    render: (_, row, index, action) => {
                        let curRegion = allAreas.find(a => a.id == row.regionId)
                        return curRegion ? curRegion.name : ''
                    },
                }, {
                    title: '类型',
                    dataIndex: 'reportType',

                    render: (_, r) => {
                        let curType = reportType.find(t => t.value == r.reportTypeId)
                        return curType ? curType.label : ''
                    },

                }, {
                    title: '生成时间',
                    dataIndex: 'index',
                    render: (_, row) => {
                        return `每日 ${row.excuteTime.indexOf(':') > -1 ? row.excuteTime : row.excuteTime + ':00'}`
                    }
                }, {
                    title: '启用状态',
                    dataIndex: 'isEnable',
                    render: (_, row) => {
                        return <Switch checkedChildren="启用" unCheckedChildren="禁用" disabled defaultChecked={row.isEnable} />

                    }
                }, {
                    title: '操作',
                    dataIndex: 'option',
                    render: (_, row) => {
                        return [
                            <Space>
                                <Button type="primary"
                                    onClick={() => {
                                        setConfigModalVis(true)
                                        setEditData({
                                            ...row,
                                            excuteTime: row.excuteTime.indexOf(':') > -1 ? row.excuteTime : row.excuteTime + ':00'
                                        })
                                    }}
                                >编辑</Button>
                                <Popconfirm
                                    placement="topRight"
                                    title={'确认删除此报备表配置？'}
                                    onConfirm={() => {
                                        dispatch(report.delReportConfig(row.id)).then(res => {
                                            if (res.success) {
                                                dispatch(report.getReportConfig())
                                            }
                                        })
                                    }}
                                >
                                    <Button type="primary" danger>删除</Button>
                                </Popconfirm>
                            </Space>
                        ]
                    }
                },]}
                dataSource={reportConfig}
                rowKey="id"
                search={false}
                options={false}
                toolBarRender={() => [
                    <Button type="primary" key="primary" onClick={() => { setConfigModalVis(true) }}>
                        添加报表配置
                    </Button>,
                ]}
            >

            </ProTable>
            {
                configModalVis ?
                    <ConfigModal
                        visible={true}
                        close={() => {
                            setConfigModalVis(false)
                            setEditData(null)
                        }}
                        reportType={reportType}
                        editData={editData}
                    /> : ''
            }
        </Spin>
    )
}

function mapStateToProps(state) {
    const { auth, global, reportConfig, allAreas } = state;
    return {
        loading: reportConfig.isRequesting,
        user: auth.user,
        actions: global.actions,
        reportConfig: reportConfig.data || [],
        allAreas: allAreas.data || []
    };
}

export default connect(mapStateToProps)(Config);
