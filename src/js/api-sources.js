import axios from 'axios';
import { Notify } from 'notiflix/build/notiflix-notify-aio';




export default async function getDataFromAPI(evt) {
    
    const URL = 'https://pixabay.com/api/';
    const searchParams = new URLSearchParams({
        key: '24371502-78d84e7e9c9a76cd0b2a52a11',
        q: `${evt.currentTarget.elements.searchQuery.value}`,
        image_type: 'photo',
        orientation: 'horizontal',
        safesearch: true,
        page:1,
        per_page:40,
    })
 
    const response = await axios.get(`${URL}?${searchParams}`)
    try {
         if (response.data.hits.length === 0) {
            return Notify.failure("Sorry, there are no images matching your search query. Please try again.");
        }
        console.log(response.data)
        return await response.data;
    }
    catch (error) {
       console.log(error.message)
    }
}


