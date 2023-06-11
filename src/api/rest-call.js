import {COOKIES} from "../constants";
import Cookies from 'universal-cookie';
import {v4 as uuidv4} from 'uuid';
import {useHistory} from "react-router-dom";

const cookies = new Cookies();

function performRequest(request, onSuccess, onError) {
    let headers = request.headers;
    headers.set('request-id', uuidv4());
    headers.set('Content-Type', 'application/json');
    if (!headers.has('Authorization')) {
        headers.append('Authorization', `Bearer ${cookies.get(COOKIES.TOKEN_KEY)}`);
    }

    fetch(request)
        .then(
            function (response) {
                if (response.status === 401) {
                    cookies.remove(COOKIES.TOKEN_KEY);
                    window.location.reload();
                }

                if (response.ok) {
                    response.json().then(json => onSuccess(json, response.status));
                } else {
                    response.json().then(err => onError(err, response.status));
                }

            })
        .catch(function (err) {
            console.log(`Perform request catch of ${err}`);
            onError(err, 503)
        });
}

function performVoidRequest(request, onSuccess, onError) {
    let headers = request.headers;
    headers.set('request-id', uuidv4());
    headers.set('Content-Type', 'application/json');
    if (!headers.has('Authorization')) {
        headers.append('Authorization', `Bearer ${cookies.get(COOKIES.TOKEN_KEY)}`);
    }

    fetch(request)
        .then(
            function (response) {
                if (response.status === 401) {
                    cookies.remove(COOKIES.TOKEN_KEY);
                    window.location.reload();
                }
                if (response.ok) {
                    onSuccess(response.status);
                } else {
                    onError(null, response.status);
                }

            })
        .catch(function (err) {
            console.log(`Perform request catch of ${err}`);
            onError(err, 503)
        });
}

function downloadFileSecured(request, onSuccess, onError) {
    let headers = request.headers;
    headers.set('request-id', uuidv4());
    if (!headers.has('Authorization')) {
        headers.append('Authorization', `Bearer ${cookies.get(COOKIES.TOKEN_KEY)}`);
    }

    fetch(request)
        .then(
            function (response) {
                if (response.status === 401) {
                    cookies.remove(COOKIES.TOKEN_KEY);
                    window.location.reload();
                }
                if (response.ok) {
                    response.blob().then(blob => onSuccess(blob, response.status));
                } else {
                    onError(null, response.status);
                }

            })
        .catch(function (err) {
            console.log(`Perform request catch of ${err}`);
            onError(err, 503)
        });
}

export {performRequest, performVoidRequest, downloadFileSecured}