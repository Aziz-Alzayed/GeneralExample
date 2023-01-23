import { removeAccessToken } from '../../utils/Helpers';

export function logout() {
    fetch('users/logout', { method: 'POST' })
        .then(res => {
            if (res.status >= 200 && res.status < 300) {
                // Remove token of logged in user from local storage
                removeAccessToken();
                window.location.reload(false);
            } else {
                window.location.hash = '/error';
            }
        });
}