import {ENDPOINTS} from "./constants";
import {performRequest} from './rest-call'

function getUserProfile(onSuccess, onError) {
    let request = new Request(ENDPOINTS.USERS + "/profile", {
        method: 'GET',
    });
    performRequest(request, onSuccess, onError)
}


export {getUserProfile};