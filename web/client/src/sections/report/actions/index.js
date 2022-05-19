'use strict';

import * as config from './config'
import * as download from './download'
import * as compile from './compile'

export default {
    ...config,
    ...download,
    ...compile,
}