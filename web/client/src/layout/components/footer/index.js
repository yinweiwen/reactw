'use strict';
import React from 'react';
import style from './style.css';

export default class Footer extends React.Component {
    render() {
        const { footerProps } = this.props;

        return (
            <div className={style.footer} {...footerProps}>
                {this.props.children}
            </div>
        );
    }
};