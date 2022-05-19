import React, { useRef } from 'react';
import { connect } from 'react-redux';
import { Modal } from 'antd';
import ProForm, { ProFormText } from '@ant-design/pro-form';

const CatalogModal = (props) => {
    const { dispatch, actions, visible, close, editData } = props
    const formRef = useRef()
    const { task } = actions

    return <Modal
        title={`${editData ? '编辑' : '新增'}任务分组配置`}
        visible={visible}
        onOk={() => {
            formRef.current.validateFields()
                .then(v => {
                    dispatch(editData ? task.editTaskCatalog(v, editData.id) : task.addTaskCatalog(v))
                        .then(res => {
                            if (res.success) {
                                dispatch(task.getTaskCatalogs())
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
            initialValues={
                editData ?
                    editData :
                    {
                    }
            }
            submitter={false}
            formKey='config-form'
        >
            <ProFormText
                label="任务分组名称"
                name={'name'}
                placeholder="请输入名称"
                required
                rules={[{ required: true, message: '请输入名称' }]}
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

export default connect(mapStateToProps)(CatalogModal);
