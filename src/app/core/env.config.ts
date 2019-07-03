const _isDev = window.location.port.indexOf('4200') > -1;

const getHost = () => {
    const protocol = window.location.protocol;
    const host = window.location.host;
    return _isDev ? `http://localhost:3000/api/` : `${protocol}//${host}:3000/api`;
};

const TEST_NET = true;
const apiURI = getHost() + '/v1/';
console.log(apiURI);
export const ENV = {
    BASE_URI: getHost(),
    LOGIN: apiURI + 'admin/login',
    CONTRACT_URI: apiURI + 'admin/contracts',
    CONTRACT_DELETE_URI: apiURI + 'admin/contract/delete',
};
