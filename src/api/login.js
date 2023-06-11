import {ENDPOINTS} from "./constants";
import {performRequest} from "./rest-call";

function login(username, password, onSuccess, onError) {
    let request = new Request(ENDPOINTS.LOGIN, {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
        },
        body: JSON.stringify({
            loginId: username,
            password: password,
        })
    });
    fetch(request).then(response => {
        if (response.ok) {
            response.json()
                .then(json => onSuccess(json, response.status));
        } else {
            onError(response.status);
        }
    })
        .catch(function (err) {
            console.log(`Perform request catch of ${err}`);
            onError(503)
        });
}

function forgotPassword(username, onSuccess, onError) {
    let request = new Request(ENDPOINTS.FORGOT_PASSWORD + "/" + username, {
        method: 'POST',
    });
    fetch(request).then(response => {
        if (response.ok) {
            onSuccess(response.status)
        } else {
            onError(response.status);
        }
    })
        .catch(function (err) {
            console.log(`Perform request catch of ${err}`);
            onError(503)
        });
}

function register(item, onSuccess, onError) {
    let request = new Request(ENDPOINTS.REGISTER, {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
        },
        body: JSON.stringify({...item})
    });
    fetch(request).then(response => {
        if (response.ok) {
            onSuccess(response.status)
        } else {
            onError(response.status);
        }
    })
        .catch(function (err) {
            console.log(`Perform request catch of ${err}`);
            onError(503)
        });
}


export {login, forgotPassword, register};