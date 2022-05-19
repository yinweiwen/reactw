import React from 'react';
import { connect } from 'react-redux';
import { Spin, Card, Modal, TreeSelect } from 'antd';
import ProForm, { ProFormText, ModalForm, ProFormSwitch, ProFormTreeSelect } from '@ant-design/pro-form';

const UserModal = (props) => {
    const { visible, modalType, depData, onVisibleChange, onConfirm, editData } = props

    const onFinish = (values) => {
        if (onConfirm) {
            onConfirm(values);
        }
    }

    return (
        <Spin spinning={false}>
            <ModalForm
                title={modalType == 'edit' ? '编辑用户' : '新建用户'}
                visible={visible}
                onVisibleChange={onVisibleChange}
                onFinish={onFinish}
                destroyOnClose
                initialValues={
                    modalType == 'edit' ?
                        {
                            contract: editData
                        } :
                        {
                            contract: {
                                enable: true
                            }
                        }
                }
            >
                <ProForm.Group>
                    <ProFormText
                        name={['contract', 'name']}
                        maxLength={24}
                        width="md"
                        label="姓名"
                        required
                        placeholder="请输入姓名"
                        rules={[{ required: true, message: '请输入姓名' }]}
                    />
                    <ProFormText
                        name={['contract', 'phone']}
                        width="md"
                        label="用户名(手机号)"
                        required
                        placeholder="请输入用户名(手机号)"
                        rules={[{ required: true, message: '请填写用户名' }]}
                    />
                </ProForm.Group>
                <ProForm.Group>
                    <ProFormTreeSelect
                        name={['contract', 'departmentId']}
                        placeholder="请选择所属部门"
                        width="md"
                        label="所属部门"
                        required
                        fieldNames={{
                            title: 'name',
                            key: 'id',
                            children: 'subordinate'
                        }}
                        onSelect={(selectedKeys, { selected, selectedNodes }) => {
                            if (selected) {
                                setDepSelectedKeys(selectedKeys)
                                setDepSelected(selectedNodes[0].name || "")
                                dispatch(getDepUser(selectedKeys[0]))
                            }
                        }}
                        fieldProps={{
                            fieldNames: {
                                label: 'title',
                            },
                            treeDefaultExpandAll: false,
                        }}
                        rules={[{ required: true, message: '请选择所属部门' }]}
                        request={async () => {
                            console.log(depData);
                            return depData
                        }}
                        expandedKeys={["title"]}
                    />
                    < ProFormText
                        name={['contract', 'post']}
                        width="md"
                        label="职位"
                        // required
                        placeholder="请输入职位"
                    />
                </ProForm.Group>
                <ProForm.Group>
                    <ProFormText
                        name={['contract', 'email']}
                        width="md"
                        label="邮箱"
                        // required
                        placeholder="请输入邮箱"
                        rules={[
                            // { required: true, message: '请输入邮箱' },
                            { type: 'email', message: '请输入正确格式的邮箱' },
                        ]}
                    />
                    {modalType == 'edit' ? null : <ProFormText.Password
                        name={['contract', 'password']}
                        width="md"
                        label="密码"
                        required
                        placeholder="请输入密码"
                        fieldProps={{
                            autocomplete: 'new-password'
                        }}
                        rules={[
                            { required: true, message: '请填写密码' },
                            { min: 6, message: '请填写至少6位密码' },
                        ]}
                    />}
                </ProForm.Group>
                <ProForm.Group>
                    <ProFormSwitch
                        name={['contract', 'enable']}
                        width="md"
                        label="是否启用"
                        placeholder="请选择"
                        // defaultChecked
                        valuePropName="checked"
                    />
                </ProForm.Group>
            </ModalForm>
        </Spin>
    )
}

function mapStateToProps(state) {
    const { depMessage } = state;

    const pakData = (dep) => {
        // console.log(dep);
        return dep.map((d) => {
            return {
                title: d.name,
                value: d.id,
                // key: d.id,
                children: pakData(d.subordinate)
            }
        })
    }
    let depData = pakData(depMessage.data || [])

    return {
        loading: depMessage.isRequesting,
        depData,
    };
}

export default connect(mapStateToProps)(UserModal);