import axios from 'axios';
import { Notify } from 'notiflix/build/notiflix-notify-aio';

export default class DataFromAPI{
    constructor() {
        this.value = '';
    }

    getDataFromAPI() {
    
    const URL = 'https://pixabay.com/api/';
    const searchParams = new URLSearchParams({
        key: '24371502-78d84e7e9c9a76cd0b2a52a11',
        q: `${this.value}`,
        image_type: 'photo',
        orientation: 'horizontal',
        safesearch: true,
    })

        return axios.get(`${URL}?${searchParams}`)
            .then(response => {
                  if (response.data.hits.length === 0) {
                return Notify.failure("Sorry, there are no images matching your search query. Please try again.");
                }
                
                return response.json();
            })
        .then(response => {
            return response.data.hits
                .forEach(({ webformatURL, largeImageURL, tags, likes, views, comments, downloads }) => {
                return ({webformatURL,largeImageURL,tags,likes,views,comments,downloads})
            });
        })
        .catch(error=>console.log(error))
}
}