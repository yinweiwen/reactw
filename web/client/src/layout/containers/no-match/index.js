'use strict';

import React from 'react';
import moment from 'moment'

const NoMatch = props => {
    return (
        <div style={{ textAlign: 'center', padding: 120 }}>
            <p style={{ fontSize: 80, lineHeight: 1.5 }}>404</p>
            <p style={{ fontSize: 32, lineHeight: 2 }}>PAGE NOT FOUND</p>
            <p>很遗憾，您暂时无法访问该页面。</p>
            <p>请检查您访问的链接地址是否正确。</p>
            <p style={{ marginTop: 80 }}>Copyright © {moment().year()} 飞尚</p>
        </div>
    )
}

export default NoMatch;