import axios from 'axios';
import Notiflix from 'notiflix';
import SimpleLightbox from 'simplelightbox';
import 'simplelightbox/dist/simple-lightbox.min.css';
import { createMarkup } from './markup';

const form = document.querySelector('.search-form');
const gallery = document.querySelector('.gallery');
const loadMore = document.querySelector('.load-more-hidden');
let page = 1;

//

form.addEventListener('submit', onValueSubmit);

function onValueSubmit(event) {
  event.preventDefault();
  gallery.innerHTML = '';
  localStorage.clear();
  // lightbox.refresh();

  enteredValue = event.currentTarget[0].value.trim();
  if (enteredValue === '') {
    return Notiflix.Notify.failure('All fields must be filled!');
  }
  localStorage.setItem('key', enteredValue);
  render();

  loadMore.classList.replace('load-more-hidden', 'load-more');
  loadMore.addEventListener('click', onLoadMore);

  const lightbox = new SimpleLightbox('.gallery a', {
    captionsData: 'alt',
    captionDelay: 250,
    captionPosition: 'bottom',
  });

  form.reset();
}

//
// Запит на сервер
async function getGallery(page = 2) {
  const BASE_URL = 'https://pixabay.com/api/';
  const API_KEY = '41201179-9e6e53d17bde192e39b3718f4';
  const q = localStorage.getItem('key');
  const image_type = 'photo';
  const orientation = 'horizontal';
  const safesearch = 'true';
  const per_page = 4;

  const queryParams = new URLSearchParams({
    key: API_KEY,
    q,
    image_type,
    page,
    per_page,
    orientation,
    safesearch,
  });
  try {
    const res = await axios.get(`${BASE_URL}?${queryParams}`);
    return await res.data;
  } catch (error) {
    throw new Error(error);
  }
}
//
//
async function render() {
  try {
    const data = await getGallery(page);

    if (!data.hits.length > 0) {
      return Notiflix.Notify.failure(
        'Sorry, there are no images matching your search query. Please try again.'
      );
    }
    Notiflix.Notify.success(`Hooray! We found ${data.totalHits} images.`);
    console.log(data);
    gallery.insertAdjacentHTML('beforeend', createMarkup(data.hits));
  } catch (error) {
    console.log('error!', error);
  }
}

async function onLoadMore() {
  try {
    page += 1;
    console.dir(page);

    const data = await render();
  } catch (error) {
    console.log('error!', error);
  }
  lightbox.refresh();
}
