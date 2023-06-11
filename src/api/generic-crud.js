import {performRequest} from './rest-call'

function getItems(endpoint, page, pageSize, filter, sort, expand, onSuccess, onError) {
    let params = `page=${page}&pageSize=${pageSize}`;
    if (filter != null && filter.length > 0) {
        params += `&filter=${encodeURIComponent(filter)}`;
    }
    if (sort != null && sort.length > 0) {
        params += `&sort=${encodeURIComponent(sort)}`
    }

    if (expand != null && expand.length > 0) {
        params += `&expand=${encodeURIComponent(expand)}`
    }

    let request = new Request(`${endpoint}?${params}`, {
        method: 'GET',
    });
    performRequest(request, onSuccess, onError)
}

function createItem(endpoint, item, onSuccess, onError) {
    let request = new Request(endpoint, {
        method: 'POST',
        body: JSON.stringify({...item})
    });
    performRequest(request, onSuccess, onError)
}


function updateItem(endpoint, itemId, item, onSuccess, onError) {
    let request = new Request(`${endpoint}/${itemId}`, {
        method: 'PUT',
        body: JSON.stringify({...item})
    });
    performRequest(request, onSuccess, onError)
}

function deleteItem(endpoint, itemId, onSuccess, onError) {
    let request = new Request(`${endpoint}/${itemId}`, {
        method: 'DELETE',
    });
    performRequest(request, onSuccess, onError)
}

function activateItem(endpoint, itemId, onSuccess, onError) {
    let request = new Request(`${endpoint}/${itemId}`, {
        method: 'POST',
    });
    performRequest(request, onSuccess, onError)
}

export {createItem, getItems, updateItem, deleteItem, activateItem};