import {performVoidRequest} from "./rest-call";
import {ENDPOINTS} from "./constants";

function vmAction(item, onSuccess, onError) {
    let request = new Request(ENDPOINTS.VIRTUAL_MACHINES_ACTION, {
        method: 'POST',
        body: JSON.stringify({...item})
    });
    performVoidRequest(request, onSuccess, onError)
}

export {vmAction};
