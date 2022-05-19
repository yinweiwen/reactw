'use strict';
const isAuthorized = (authcode) => {
    if (JSON.parse(sessionStorage.getItem('user'))) {
        const { userResources } = JSON.parse(sessionStorage.getItem('user'));
        return userResources.includes(authcode);
    } else {
        return false;
    }

}
export default {
    isAuthorized
}