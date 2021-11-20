import getDataFromAPI from './js/api-sources';
import 'simplelightbox/dist/simple-lightbox.min.css';
import SimpleLightbox from 'simplelightbox';



const refs= {
    form: document.querySelector('#search-form'),
    button: document.querySelector('button[type="submit"]'),
    gallery: document.querySelector('.gallery'),
    input: document.querySelector('input[name="searchQuery"]'),
}



refs.form.addEventListener('submit', onFormSubmit);

function onFormSubmit(evt) {
    evt.preventDefault();
  refs.gallery.innerHTML = '';
  getDataFromAPI(evt).then(createCardMarkup)
    .then(() => {
      let gallery = new SimpleLightbox('.gallery a');
      return gallery;
    });
  refs.form.reset();
}

function createCardMarkup({ hits }) {
  
  const markup = hits.map(hit => {
    return `<a href="${hit.largeImageURL}">
    <div class="photo-card">
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
  </div>
</a>`
  }).join('');
    
    refs.gallery.insertAdjacentHTML('beforeend', markup);
   

}


