import {ENDPOINTS} from "./constants";
import {performRequest} from './rest-call'

function enrollSubject(subjectId, onSuccess, onError) {
    let request = new Request(ENDPOINTS.SUBJECTS + "/" + subjectId + "/enroll", {
        method: 'POST',
    });
    performRequest(request, onSuccess, onError)
}


export {enrollSubject};