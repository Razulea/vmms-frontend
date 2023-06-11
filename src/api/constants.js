import environment from '../environments/environment';

const ENDPOINTS = {
    LOGIN: `${environment.backendUrl}/v1/login`,
    REGISTER: `${environment.backendUrl}/v1/register`,
    FORGOT_PASSWORD: `${environment.backendUrl}/v1/forgot-password`,
    WHO_AM_I: `${environment.backendUrl}/v1/who-am-i`,
    SUBJECTS: `${environment.backendUrl}/v1/subjects`,
    VIRTUAL_MACHINES: `${environment.backendUrl}/v1/virtual-machines`,
    VIRTUAL_MACHINES_ACTION: `${environment.backendUrl}/v1/virtual-machines/action`,
    USERS: `${environment.backendUrl}/v1/users`,
};

export {ENDPOINTS}