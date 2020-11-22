var webPush = require('web-push');

const vapidKeys = {
    "publicKey": "BHEiCZ2RmOTvHyzyo1mbiGbrLvKOvHAMh1YNRDrNIw74_PR8BGoqCxQQmpDVDxC6L6-X167iQTu1MxJRMqF7GLc",
    "privateKey": "CAj40vf9mxVtUUyID8iwOv6vVDA5KQwoBa7Z4kAZ6vA"
};


webPush.setVapidDetails(
    'mailto:zainfachri23@gmail.com',
    vapidKeys.publicKey,
    vapidKeys.privateKey
)
var pushSubscription = {
    "endpoint": "https://sg2p.notify.windows.com/w/?token=BQYAAACg92Whw85xRT1wMu0Z0Sq%2bOIVuBTiutBSZrBpeGCHqHfPAeA9nISftxOOqal8LcwhC0h5vpvwv%2fxavvDn6MZU4mxGZip%2bmULOrq15GwX9DtM%2ftwTGZ%2fvqmwIMRHfXIZXK02TaK%2bpcce4Zbw3JTW5R%2bbJ0tmMIF3q3VKWQUA2PXjnz2uF0Sasm4L0DeCOaS2JdxkpvR5bafof5s9P3ccueYu%2fUAUgBc6P%2bjWBT9oLegvLUYeE74eqZrODt5N41V%2fBqSy7uOsokfS05mrrm%2fePvythi6AFgPHm0yLSc3wzuOiLCD32iXat1g3v5O%2f%2bw0vJpZ1eQmuuffGiZBZXRnmLEg",
    "keys": {
        "p256dh": "BJouM08DWQ44mKyV/UbBY3bGW3KU4TlrpI8Uyu+X/tkxzqzovzXZ+Rgb1VnqRT3kG0LtTeSCvgPMhFg1EHN3baE=",
        "auth": "9hqGn9LMOKqeD+0mjmwuAA=="
    }
};
var payload = 'Horeee';

var options = {
    gcmAPIKey: '732212738186',
    TTL: 60
};
webPush.sendNotification(
    pushSubscription,
    payload,
    options
);