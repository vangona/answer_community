import firebase from "firebase"

export const setToken = async () => {
    if (firebase.messaging.isSupported() === false) {
        console.log("isSupported: ", firebase.messaging.isSupported())
        return null;
    } else {
        const messaging = firebase.messaging();
        const token = await messaging.getToken()
        .then(() => {
            return messaging.getToken()
        }).catch((err) => {
            console.log('error : ', err);
            return null;
        })
        .then((token) => {
            messaging.onMessage(payload => {
                alert(payload.notification.body)
            })
            return token;
        })
        .catch((err) => {
            console.log('error : ', err);
            return null;
        })
        return token;
    }
}