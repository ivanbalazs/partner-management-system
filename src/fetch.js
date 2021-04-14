const get = path => new Promise(async (resolve, reject) => {
    try {
        const resp = await fetch(process.env.REACT_APP_SERVER_URL + path);
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

export {
    get,
}
