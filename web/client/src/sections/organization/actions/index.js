'use strict';

import * as authority from './authority'
import { getDepMessage, getDepUser, createUser } from './user'

export default {
    ...authority,
    getDepMessage,
    getDepUser,
    createUser,
}