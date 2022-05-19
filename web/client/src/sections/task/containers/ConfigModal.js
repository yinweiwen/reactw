import React, { useEffect, useRef } from 'react';
import { connect } from 'react-redux';
import { Spin, Button, Modal, Form, Switch } from 'antd';
import ProForm, { ProFormText, ProFormSelect, ProFormDateTimePicker } from '@ant-design/pro-form';
import { useState } from 'react';

const ConfigModal = (props) => {
    const { dispatch, actions, visible, close, editData, types, catalogs } = props
    const formRef = useRef()
    const { task } = actions

    return <Modal
        title={`${editData ? '编辑' : '新增'}任务配置`}
        visible={visible}
        onOk={() => {
            formRef.current.validateFields()
                .then(v => {
                    dispatch(editData ? task.editTask(v, editData.id) : task.addTask(v))
                        .then(res => {
                            if (res.success) {
                                dispatch(task.getTaskList())
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
                label="任务名称"
                name={'name'}
                placeholder="请输入名称"
                required
                rules={[{ required: true, message: '请输入名称' }]}
            />
            <ProFormSelect
                options={catalogs}
                cacheForSwr
                name="catalog"
                label="分类"
                required
                rules={[{ required: true, message: '请选择任务分类' }]}
            />
            <ProFormSelect
                options={types}
                cacheForSwr
                name="type"
                label="类型"
                required
                rules={[{ required: true, message: '请选择任务类型' }]}
            />
            <ProFormDateTimePicker
                label="截止日期"
                name="deadlineAt"
            />
        </ProForm>
    </Modal>
}

function mapStateToProps(state) {
    const { auth, global, } = state;
    return {
        user: auth.user,
        actions: global.actions
    };
}

export default connect(mapStateToProps)(ConfigModal);
