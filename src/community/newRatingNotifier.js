class Rating {
    constructor(value) {
        this.id = value.id;
        this.user = value.name;
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
        setInterval(() => {
            const rating = Math.floor(Math.random() * 10) + 1;
            const date = new Date().toLocaleDateString();
            const username = 'cool person';

            const newAlbum = {
                title: "Good Album",
                id: Date.now(), 
                cover: "placeholder.png", 
                artist: "good band", 
                release_date: "2025", 
                rating: rating, 
                rating_date: date, 
                url: "www.spotify.com", 
                user: "cool person"
            };

            this.broadcastEvent(newAlbum)
        }, 15000);
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