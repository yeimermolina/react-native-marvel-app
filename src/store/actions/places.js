import { 
    SET_PLACES,
    DELETE_PLACE,
    PLACED_ADDED,
    START_ADD_PLACE
} from './actionTypes';

import {
    uiStartLoading,
    uiStopLoading,
    authGetToken
} from './index';

const URL = 'https://findplaces-1552244770863.firebaseio.com';

export const startAddPlace = () => {
    return {
        type: START_ADD_PLACE
    }
}

export const addPlace = (placeName, location, image) => {
    return dispatch => {
        let authToken;
        dispatch(uiStartLoading());
        dispatch(authGetToken())
            .then((token) => {
                authToken = token;
                return fetch("https://us-central1-findplaces-1552244770863.cloudfunctions.net/storeImage", {
                    method: 'POST',
                    body: JSON.stringify({
                        image: image.base64
                    }),
                    headers: {
                        "Authorization": "Bearer " + authToken
                    }
                });
            })
            .catch(() => {
                alert("No valid token")
            })
            .catch(err => {
                alert("Something went wrong");
                dispatch(uiStopLoading());
            })
            .then(res => {
                if(res.ok) {
                    return res.json()
                } else {
                    throw(new Error());
                }
            })
            .then(parsedRes => {
                const placeData = {
                    name: placeName,
                    location: location,
                    image: parsedRes.imageUrl
                };

                return fetch(`${URL}/places.json?auth=${authToken}`, {
                    method: 'POST',
                    body: JSON.stringify(placeData)
                });
            })
            .catch(err => {
                alert("Something went wrong");
                dispatch(uiStopLoading());
            })
            .then(res => res.json())
            .then(parsedRes => {
                console.log(parsedRes);
                dispatch(uiStopLoading());
                dispatch(placeAdded());
            })
        
    }
}

export const setPlaces = places => {
    return {
        type: SET_PLACES,
        places
    }
}

export const getPlaces = () => {
    return dispatch => {
        dispatch(authGetToken())
            .then((token) => {
                return fetch(`${URL}/places.json?auth=${token}`);
            })
            .catch(() => {
                alert("No valid token")
            })
            .then(res => res.json())
            .then(parsedRes => {
                if (parsedRes.error) {
                    alert("Something went wrong");
                } else {
                    const places = [];
                    for (let key in parsedRes) {
                        places.push(
                            {
                                ...parsedRes[key],
                                image: {
                                    uri: parsedRes[key].image
                                },
                                key
                            }
                        )
                    }
                    dispatch(setPlaces(places));
                }
            })
            .catch(err => {
                alert("Something went wrong");
            })
        
        ;
    }
}

export const placeAdded = () => {
    return {
        type: PLACED_ADDED
    };
}

const removePlace = key => {
    return {
        type: DELETE_PLACE,
        key
    }
}

export const deletePlace = (placeId) => {
    return dispatch => {
        dispatch(authGetToken())
            .then((token) => {
                return fetch(`${URL}/places/${placeId}.json?auth=${token}`, {
                    method: 'DELETE'
                });
            })
            .catch(() => {
                alert("No valid token")
            })
            .catch(err => {
                alert("Something went wrong");
            })
            .then(res => res.json())
            .then(parsedRes => {
                dispatch(removePlace(placeId));
            });
    }
}
