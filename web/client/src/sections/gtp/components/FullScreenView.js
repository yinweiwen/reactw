import React, { useEffect, useRef, useState } from 'react';
import { InfoCircleOutlined } from '@ant-design/icons'
import { connect } from 'react-redux';
import { Row, Col, Modal } from 'antd';
import "./style.less";

const FullScreenView = (props) => {

    const { visible, gtpInfo } = props

    const handleOk = () => {

    }

    const handleCancel = () => {
    }

    return (
        <>
            <Modal
                title="Basic Modal"
                visible={visible}
                onOk={handleOk}
                onCancel={handleCancel}
            >
                <p>{gtpInfo?.name}</p>
            </Modal>
        </>)
}

export default FullScreenView;