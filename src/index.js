import 'simplelightbox/dist/simple-lightbox.min.css';
import SimpleLightbox from 'simplelightbox';
import QueryToApi from "./js/api-sources";
import { Notify } from 'notiflix/build/notiflix-notify-aio';

const queryToApi = new QueryToApi();
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
  if (queryToApi.query === '') {
    Notify.warning('Нужно что-нибудь ввести');
    refs.loadMoreBtn.classList.add('disabled');
  } else {
    queryToApi.resetPage();

    async function getImages() {
      try {
        const images = await queryToApi.getDataFromAPI();
        return images;
      }
      catch (error) {
        console.log(error)
      }
    
    }
  
    getImages().then(response => {
    console.log(response)
      if (response.hits.length === 0) {
        
         Notify.failure("Sorry, there are no images matching your search query. Please try again.")
      } else {
          Notify.success(`Hooray! We found ${response.totalHits} images.`);
      }
    
      queryToApi.totalHits = response.totalHits;
    
      return response;
    })
    .then(createCardMarkup)
    .then(() => {
     
      let gallery = new SimpleLightbox('.gallery a');
      refs.gallery.children.length === queryToApi.totalHits ?
        refs.loadMoreBtn.classList.add('disabled') :
        refs.loadMoreBtn.classList.remove('disabled');
      return gallery;
    })
    .catch(error=>console.log(error.message))
  // queryToApi.getDataFromAPI()
  //   .then(response => {
  //     if (response.hits.length === 0) {
  //        Notify.failure("Sorry, there are no images matching your search query. Please try again.")
  //     } else {
  //         Notify.success(`Hooray! We found ${response.totalHits} images.`);
  //     }
    
  //     queryToApi.totalHits = response.totalHits;
    
  //     return response;
    // })
    // .then(createCardMarkup)
    // .then(() => {
     
    //   let gallery = new SimpleLightbox('.gallery a');
    //   refs.gallery.children.length === queryToApi.totalHits ?
    //     refs.loadMoreBtn.classList.add('disabled') :
    //     refs.loadMoreBtn.classList.remove('disabled');
    //   return gallery;
    // })
    // .catch(error=>console.log(error))
  }
  
  
  
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

  queryToApi.getDataFromAPI().then(response => {
    queryToApi.totalHits = response.totalHits;
    return response;
  })
  .then(createCardMarkup)
    .then(() => {
      let gallery = new SimpleLightbox('.gallery a');
      return gallery;
    })
    .then(response => {
      refs.gallery.children.length === queryToApi.totalHits ?
        refs.loadMoreBtn.classList.add('disabled') :
        refs.loadMoreBtn.classList.remove('disabled');
      return response;
    })
    .then(() => {
      const cardHeight = document.querySelector('.gallery').firstElementChild.getBoundingClientRect();
      window.scrollBy({
        top: cardHeight.y *(-2),
        behavior: 'smooth',
      });
    });;
  
}

