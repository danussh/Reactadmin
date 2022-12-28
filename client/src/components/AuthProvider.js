// Authenticated by default
export default {
    login: ({ username, password }) => {
        if (username === 'admin' && password === 'password') {
            localStorage.setItem('role', 'admin');
            localStorage.removeItem('not_authenticated');
            localStorage.setItem('login', 'admin');
            localStorage.setItem('user', 'Admin');
            return Promise.resolve();
        }
        localStorage.setItem('not_authenticated', 'true');
        return new Promise((resolve, reject) => setTimeout(reject, 1000));
    },
    logout: () => {
        localStorage.setItem('not_authenticated', 'true');
        localStorage.removeItem('role');
        localStorage.removeItem('login');
        localStorage.removeItem('user');
        localStorage.removeItem('avatar');
        return Promise.resolve();
    },
    checkError: ({ status }) => {
        return status === 401 || status === 403
            ? Promise.reject()
            : Promise.resolve();
    },
    checkAuth: () => {
        return localStorage.getItem('not_authenticated')
            ? Promise.reject()
            : Promise.resolve();
    },
    getPermissions: () => {
        const role = localStorage.getItem('role');
        return Promise.resolve(role);
    },
    getIdentity: () => {
        return Promise.resolve({
            id: localStorage.getItem('login'),
            fullName: localStorage.getItem('user'),
            avatar: localStorage.getItem('avatar'),
        });
    },
};
