import axios from 'axios';
import { Notify } from 'notiflix/build/notiflix-notify-aio';



export default class QueryToApi{
    constructor() {
        this.query = "";
        this.page = 1;
    }

    async getDataFromAPI() {
    
    const URL = 'https://pixabay.com/api/';
    const searchParams = new URLSearchParams({
        key: '24371502-78d84e7e9c9a76cd0b2a52a11',
        q: `${this.query}`,
        image_type: 'photo',
        orientation: 'horizontal',
        safesearch: true,
        page:`${this.page}`,
        per_page:40,
    })
 
    const response = await axios.get(`${URL}?${searchParams}`)
    try {
         if (response.data.hits.length === 0) {
            return Notify.failure("Sorry, there are no images matching your search query. Please try again.");
        }
       this.page += 1;
        return await response.data;
    }
    catch (error) {
       console.log(error.message)
    }
    }

    resetPage() {
        this.page = 1;
    }

    hideBtn() {
        this.refs.loadMoreBtn.classList.add('disabled');
    }
    showBtn() {
        this.refs.loadMoreBtn.classList.remove('disabled');
    }
}