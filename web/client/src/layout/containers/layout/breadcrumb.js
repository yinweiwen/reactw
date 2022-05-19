import React from 'react';
import { Breadcrumb } from 'antd';
import withBreadcrumbs from 'react-router-breadcrumbs-hoc';
import { Link } from 'react-router-dom';

const Breadcrumbs = (props) => {
    const excludePaths = ['/'];
    const { routes } = props;

    const Bread = withBreadcrumbs(routes, { excludePaths })(({ breadcrumbs }) => {
        return (
            <Breadcrumb separator="/" style={{ height: 25 }}>
                {
                    breadcrumbs.map((bc, index) => {
                        return (
                            <Breadcrumb.Item key={index}>
                                {
                                    bc.component ?
                                        <Link
                                            to={{
                                                pathname: bc.match.url,
                                                state: bc.match.params ? bc.match.params : {},
                                                query: bc.location.query ? bc.location.query : {},
                                            }}
                                        >
                                            {bc.breadcrumb}
                                        </Link> :
                                        bc.breadcrumb
                                }
                            </Breadcrumb.Item>
                        )
                    })
                }
            </Breadcrumb>
        )
    });

    return (
        <Bread />
    );
}

export default Breadcrumbs;
