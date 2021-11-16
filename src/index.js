import getDataFromAPI from './js/api-sources'

const refs= {
    form: document.querySelector('#search-form'),
    button: document.querySelector('button[type="submit"]'),
}

refs.form.addEventListener('submit', onFormSubmit);

function onFormSubmit(evt) {
    evt.preventDefault();
    
    getDataFromAPI(evt);
}




