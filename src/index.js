import getDataFromAPI from './js/api-sources';
import 'simplelightbox/dist/simple-lightbox.min.css';
import SimpleLightbox from 'simplelightbox';
import QueryToApi from "./js/api-sources";

const queryToApi = new QueryToApi();
console.log(queryToApi)

const refs= {
    form: document.querySelector('#search-form'),
    button: document.querySelector('button[type="submit"]'),
    gallery: document.querySelector('.gallery'),
    input: document.querySelector('input[name="searchQuery"]'),
    loadMoreBtn: document.querySelector('.load-more'),
}



refs.form.addEventListener('submit', onFormSubmit);
refs.loadMoreBtn.addEventListener('click', onLoadMoreClick)

function onFormSubmit(evt) {
  
  evt.preventDefault(evt);
  refs.gallery.innerHTML = '';
  queryToApi.query = evt.currentTarget.elements.searchQuery.value;
  queryToApi.resetPage();
  queryToApi.getDataFromAPI().then(createCardMarkup)
    .then(() => {
      let gallery = new SimpleLightbox('.gallery a');
      refs.loadMoreBtn.classList.remove('disabled')
      return gallery;
    });
  refs.form.reset();
 
}



function createCardMarkup({ hits }) {
  
  const markup = hits.map(hit => {
    return `<a href="${hit.largeImageURL}" class='gallery-item'>
              <div class="photo-card">
                <img src="${hit.webformatURL}" alt="${hit.tags}" class='gallery-img' loading="lazy" />
                <div class="info">
                    <p class="info-item">
                      <b class="info-description">Likes</b>
                      <span class="info-number">${hit.likes}</span>
                    </p>
                    <p class="info-item">
                      <b class="info-description">Views</b>
                      <span class="info-number">${hit.views}</span>
                    </p>
                    <p class="info-item">
                      <b class="info-description">Comments</b>
                      <span class="info-number">${hit.comments}</span>
                    </p>
                    <p class="info-item">
                      <b class="info-description">Downloads</b>
                      <span class="info-number">${hit.downloads}</span>
                    </p>
                </div>
              </div>
          </a>`
  }).join('');
    
    refs.gallery.insertAdjacentHTML('beforeend', markup);
   

}

function onLoadMoreClick() {
  
  queryToApi.getDataFromAPI().then(createCardMarkup)
    .then(() => {
      let gallery = new SimpleLightbox('.gallery a');
      return gallery;
    });
}
