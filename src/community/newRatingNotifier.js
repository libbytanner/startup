class Rating {
    constructor(value) {
        this.id = value.id;
        this.user = value.user;
        this.title = value.title;
        this.artist = value.artist;
        this.rating = value.rating;
        this.release_date = value.release_date;
        this.rating_date = value.rating_date;
        this.cover = value.cover;
    }
}


class NewRatingNotifier {
    ratings = [];
    handlers = [];

    constructor() {
        let port = window.location.port;
        const protocol = window.location.protocol === 'http:' ? 'ws' : 'wss';
        this.socket = new WebSocket(`${protocol}://${window.location.hostname}:${port}/ws`);
        this.socket.onmessage = async (msg) => {
            try {
                const rating = JSON.parse(await msg.data.text());
                this.receiveEvent(rating);
            } catch {}
        };
    }

    broadcastEvent(value) {
        const newRating = new Rating(value);
        this.socket.send(JSON.stringify(newRating));
    }

    addHandler(handler) {
        this.handlers.push(handler);
    }

    removeHandler(handler) {
        this.handlers.filter((h) => h !== handler);
    }
    

    receiveEvent(newRating) {
        this.ratings.push(newRating);

        this.ratings.forEach((rating) => {
            this.handlers.forEach((handler) => {
            handler(rating);
          });
        });
    }
}

const RatingNotifier = new NewRatingNotifier();
export { RatingNotifier };