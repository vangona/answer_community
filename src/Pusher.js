import Pusher from 'pusher';


const pusher = new Pusher({
    app_id: "1307341",
    key: "a29ad49ff431bab24e6b",
    secret: "fa932ed9f5eea758b319",
    cluster: "ap3"
});

const channel = pusher.subscribe('yourowndrawer')