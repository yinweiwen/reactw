import React, { useRef, useState } from 'react';
import { connect } from 'react-redux';
import { Spin, Card, Modal, TreeSelect } from 'antd';
import ProForm, { ProFormText, ModalForm, ProFormSwitch, ProFormTreeSelect } from '@ant-design/pro-form';

const ResetPwd = (props) => {
    const { visible, onVisibleChange, onConfirm } = props;
    const formRef = useRef();

    const onFinish = (values) => {
        if (onConfirm) {
            onConfirm(values);
        }
    }

    return (
        <Spin spinning={false}>
            <ModalForm
                title={'重置密码'}
                visible={visible}
                onVisibleChange={onVisibleChange}
                onFinish={onFinish}
                formRef={formRef}
                destroyOnClose
            >
                <ProFormText.Password
                    name={['password']}
                    width="md"
                    label="新密码"
                    required
                    placeholder="请输入密码"
                    fieldProps={{
                        autocomplete: 'new-password'
                    }}
                    rules={[
                        { required: true, message: '请填写密码' },
                        { min: 6, message: '请填写至少6位密码' },
                    ]}
                />
                <ProFormText.Password
                    name={['checkPassword']}
                    width="md"
                    label="确认密码"
                    required
                    autocomplete='off'
                    placeholder="请输入密码"
                    rules={[
                        { required: true, message: '请再次填写密码' },
                        { min: 6, message: '请填写至少6位密码' },
                        {
                            validator: (rule, value, callback) => {
                                const pwd = formRef.current.getFieldValue('password');
                                if (!value) {
                                    callback();
                                }
                                if (pwd == value) {
                                    callback();
                                } else {
                                    callback('两次输入的密码不一致');
                                }
                            }
                        }
                    ]}
                />
            </ModalForm>
        </Spin>
    )
}

function mapStateToProps(state) {
    return {};
}

export default connect(mapStateToProps)(ResetPwd);