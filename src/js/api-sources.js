import axios from 'axios';
import { Notify } from 'notiflix/build/notiflix-notify-aio';



export default class QueryToApi{
    constructor() {
        this.query = "";
        this.page = 1;
        this.per_page = 40;
        this.totalHits = '';
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
        per_page:`${this.per_page}`,
        })
        try {
            const response = await fetch(`${URL}?${searchParams}`);
            if (!response.ok) {
                throw new Error('Ups,something went wrong');
            }
            this.page += 1;
              
            return await response.json();
        }
        catch {
            error=>console.log(error)
        }

        
    }


    resetPage() {
        this.page = 1;
    }


}