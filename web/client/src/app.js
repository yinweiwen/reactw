'use strict';

import React, { useEffect } from 'react';
import Layout from './layout';
import Auth from './sections/auth';
import Report from './sections/report';
import Task from './sections/task';
import Organization from './sections/organization'

const App = props => {
    const { projectName } = props

    useEffect(() => {
        document.title = projectName;
    }, [])

    return (
        <Layout
            title={projectName}
            sections={[Auth, Task, Organization, Report]}
        />
    )
}

export default App;