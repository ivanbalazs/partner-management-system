const request = (path, method = 'GET') => new Promise(async (resolve, reject) => {
    try {
        const resp = await fetch(process.env.REACT_APP_SERVER_URL + path, { method });
        if (resp.ok) {
            const data = await resp.json();
            resolve(data);
        } else {
            reject(resp);
        }
    } catch (e) {
        reject(e);
    }
});

const get = path => request(path);
const remove = path => request(path, 'DELETE');

export {
    get,
    remove,
};
