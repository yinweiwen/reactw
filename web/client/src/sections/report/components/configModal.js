import React, { useEffect, useRef } from 'react';
import { connect } from 'react-redux';
import { Spin, Button, Modal, Form, Switch } from 'antd';
import ProForm, { ProFormText, ProFormSelect } from '@ant-design/pro-form';
import { useState } from 'react';

const ConfigModal = (props) => {
    const { dispatch, actions, user, loading, visible, close, editData, allAreas, reportType } = props
    const [excuteTimeOptions, setExcuteTimeOptions] = useState([])
    const formRef = useRef()
    const { report } = actions

    useEffect(() => {
        let excuteTimeOptions = []
        for (let i = 0; i < 24; i++) {
            let curT = i
            if (curT < 10) {
                curT = '0' + curT
            }
            excuteTimeOptions.push({
                value: curT + ':00',
                label: curT + ':00',
            })
            excuteTimeOptions.push({
                value: curT + ':30',
                label: curT + ':30',
            })
        }
        setExcuteTimeOptions(excuteTimeOptions);
    }, [])

    return (
        <Modal
            title={`${editData ? '编辑' : '新增'}报表配置`}
            visible={visible}
            onOk={() => {
                formRef.current.validateFields().then(v => {
                    v.excuteTime = String(v.excuteTime)
                    console.log(v);
                    dispatch(editData ? report.editReportConfig(v, editData.id) : report.addReportConfig(v)).then(res => {
                        if (res.success) {
                            dispatch(report.getReportConfig())
                            close()
                        }
                    })
                })
            }}
            onCancel={() => {
                close()
            }}
        >
            <ProForm
                formRef={formRef}
                autoFocusFirstInput
                layout={'horizontal'}
                labelCol={{ span: 4 }}
                wrapperCol={{ span: 18 }}
                initialValues={
                    editData ?
                        editData :
                        {
                            excuteTime: '00:00',
                            isEnable: true
                        }
                }
                submitter={false}
                formKey='config-form'
            >
                <ProFormText
                    name={'reportName'}
                    label="报表名称"
                    placeholder="请输入名称"
                    required
                    rules={[{ required: true, message: '请输入名称' }]}
                />
                <ProFormSelect
                    options={reportType}
                    cacheForSwr
                    name="reportTypeId"
                    label="报表类型"
                    required
                    rules={[{ required: true, message: '请选择报表类型' }]}
                />
                <ProFormSelect
                    options={
                        allAreas.map(a => {
                            return {
                                value: a.id,
                                label: a.name,
                            }
                        })}
                    cacheForSwr
                    name="regionId"
                    label="区域"
                    required
                    rules={[{ required: true, message: '请选择区域' }]}
                />
                <Form.Item name="isEnable" label="状态" valuePropName="checked">
                    <Switch checkedChildren="启用" unCheckedChildren="禁用" />
                </Form.Item>
                <ProFormSelect
                    options={excuteTimeOptions}
                    addonBefore={'每天'}
                    addonAfter={'时'}
                    cacheForSwr
                    name="excuteTime"
                    label="生成时间"
                />
            </ProForm>
        </Modal>
    )
}

function mapStateToProps (state) {
    const { auth, global, allAreas } = state;
    console.log(allAreas);
    return {
        user: auth.user,
        actions: global.actions,
        allAreas: allAreas.data || []
    };
}

export default connect(mapStateToProps)(ConfigModal);
