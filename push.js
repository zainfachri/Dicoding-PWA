var webPush = require('web-push');

const vapidKeys = {
    "publicKey": "BDuef21cQLfaUTBSQop0epoyqelDiVifGy3kw7I9qfk6ULu_sKpLZXN1oKfArwU4usbZ98mWUyf8hiFhrSQUnQo",
    "privateKey": "3KIUUKya9nNxT4bTzC27UOT9yCb3lDUy7lKU9ftVuZI"
};


webPush.setVapidDetails(
    'mailto:zainfachri23@gmail.com',
    vapidKeys.publicKey,
    vapidKeys.privateKey
)
var pushSubscription = {
    "endpoint": "https://fcm.googleapis.com/fcm/send/ewn0tcPOkWQ:APA91bHIjF63akAb1jm6FwmEW1iCjHASJ35lMSwE1-_sSd9TZTiiDgyd6FC7wV9CUB1IHdLLH6Ec8_OTB74XfDRZwNThx-EGIUybA6KYFPb4-zyOrxWt-Ft7nRJUqSuMTtmpW_OoCkS4",
    "keys": {
        "p256dh": "BPX/ygOL57fXJkfUwsdTPwmpRVEe1vhhmsCDcRSJgFrxI+Y+pFNtwQFdZWSw4bedzAKbLUZrGwKoutSUYBfF6NI=",
        "auth": "ksFpZcn/bE9ntyaqmpA2KQ=="
    }
};
var payload = 'Selamat! Aplikasi Anda sudah dapat menerima push notifikasi!';

var options = {
    gcmAPIKey: '802526570155',
    TTL: 60
};
webPush.sendNotification(
    pushSubscription,
    payload,
    options
);