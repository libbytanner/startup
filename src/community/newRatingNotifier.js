class Rating {
    constructor(value) {
        this.id = value.id;
        this.user = value.name;
        this.title = value.title;
        this.rating = value.rating;
    }
}


class NewRatingNotifier {
    ratings = [];
    handlers = [];

    constructor() {
        setInterval(() => {
            const rating = Math.floor(Math.random() * 30);
            const date = new Date().toLocaleDateString();
            const username = 'Libby';

            const newAlbum = {
                id: Date.now(),
                name: username,
                title: "Good Album",
                artist: 'idkhow',
                rating: rating,
                date: date,
            };

            this.broadcastEvent(newAlbum)
        }, 20000);
    }

    broadcastEvent(value) {
        const newRating = new Rating(value);
        this.receiveEvent(newRating);
    }

    addHandler(handler) {
        this.handlers.push(handler);
    }

    removeHandler(handler) {
        this.handlers.filter((h) => h !== handler);
    }
    

    receiveEvent(newRating) {
        this.ratings.push(newRating);

        this.handlers.forEach((handler) => {
            handler(newRating);
          });
    }
}

const RatingNotifier = new NewRatingNotifier();
export { RatingNotifier };