import axios from 'axios';




export default function getDataFromAPI(evt) {

    const URL = 'https://pixabay.com/api/';
    const searchParams = new URLSearchParams({
        key: '24371502-78d84e7e9c9a76cd0b2a52a11',
        q: `${evt.currentTarget.elements.searchQuery.value}`,
        image_type: 'photo',
        orientation: 'horizontal',
        safesearch: true,
    })

    axios.get(`${URL}?${searchParams}`)
        .then(response => {
            return response.data;
        })
        .then(console.log)
        .catch(error=>console.log(error))
}


