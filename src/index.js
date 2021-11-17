import DataFromAPI from './js/data-from-api'


const refs= {
    form: document.querySelector('#search-form'),
    button: document.querySelector('button[type="submit"]'),
    gallery: document.querySelector('.gallery'),
    input: document.querySelector('input[name="searchQuery"]'),
}
const dataFromApi = new DataFromAPI;

refs.form.addEventListener('submit', onFormSubmit);

function onFormSubmit(evt) {
    evt.preventDefault();
    dataFromApi.value = evt.currentTarget.elements.searchQuery.value;
    console.log(dataFromApi.getDataFromAPI(dataFromApi.value))
    dataFromApi.getDataFromAPI(dataFromApi.value);
   
}

function createCardMarkup(hits) {
   const markup = hits.map(hit => {
        return `<a href="${hit.largeImageURL}" class="photo-card">
  <img src="${hit.webformatURL}" alt="${hit.tags}" loading="lazy" />
  <div class="info">
    <p class="info-item">
      <b>Likes</b>
      <span>${hit.likes}</span>
    </p>
    <p class="info-item">
      <b>Views</b>
      <span>${hit.views}</span>
    </p>
    <p class="info-item">
      <b>Comments</b>
      <span>${hit.comments}</span>
    </p>
    <p class="info-item">
      <b>Downloads</b>
      <span>${hit.downloads}</span>
    </p>
  </div>
</a>`
   })
    
    gallery.insertAdjacentHTML('beforeend', markup);

    
}


