import {ENDPOINTS} from "./constants";
import {performRequest} from './rest-call'

function whoAmI(onSuccess, onError) {
    let request = new Request(ENDPOINTS.WHO_AM_I, {
        method: 'GET',
    });
    performRequest(request, onSuccess, onError)
}


export {whoAmI};