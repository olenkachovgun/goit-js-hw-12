import axios from 'axios';
import iziToast from 'izitoast';
import 'izitoast/dist/css/iziToast.min.css';

import SimpleLightbox from 'simplelightbox';
import 'simplelightbox/dist/simple-lightbox.min.css';

import { serviceImages } from './js/pixabay-api';
import {
  createMarkUp,
  showLoadingMessage,
  hideLoadingMessage,
  showEror,
} from './js/render-functions';

const form = document.querySelector('.form');
const gallery = document.querySelector('.gallery');
const loadingMessage = document.querySelector('.loading-message');
const loadMore = document.querySelector('.js-load-more');
form.addEventListener('submit', handleSearch);
loadMore.addEventListener('click', onLoadMore);
let search = '';
let page = 1;

function handleSearch(event) {
  page = 1;
  gallery.innerHTML = '';
  event.preventDefault();
  search = event.target.elements.search.value.trim();
  searchImages();
}

function searchImages() {
  showLoadingMessage(loadingMessage);

  serviceImages(search, page)
    .then(data => {
      hideLoadingMessage(loadingMessage);
      if (data.hits.length === 0) {
        loadMore.classList.replace('load-more', 'load-more-hidden');
        gallery.innerHTML = '';
        showEror(
          'Sorry, there are no images matching your search query. Please try again!'
        );
      } else {
        gallery.innerHTML = createMarkUp(data.hits);
        galleryLightbox.refresh();
      }
      if (page < Math.ceil(data.totalHits / 15)) {
        loadMore.classList.replace('load-more-hidden', 'load-more');
      }
    })
    .catch(error => {
      hideLoadingMessage(loadingMessage);
      gallery.innerHTML = '';
      showEror(error.message);
    })
    .finally(() => {
      setTimeout(() => {
        form.reset();
      }, 1000);
    });
}

async function onLoadMore() {
  page++;

  loadMore.disabled = true;
  try {
    const data = await serviceImages(search, page);
    gallery.insertAdjacentHTML('beforeend', createMarkUp(data.hits));
    galleryLightbox.refresh();
    if (page >= Math.ceil(data.totalHits / 15)) {
      loadMore.classList.replace('load-more', 'load-more-hidden');
      //користувач дійшов до кінця колекції!
      setTimeout(() => {
        showEror("We're sorry, but you've reached the end of search results.");
      }, 2000);
    }
    //scroll:
    const img = document.querySelector('.gallery-item');
    const imgHeight = Math.ceil(img.getBoundingClientRect().height);
    window.scrollBy({
      left: 0,
      top: imgHeight * 2,
      behavior: 'smooth',
    });
  } catch (error) {
    showEror(error.message);
  } finally {
    loadMore.disabled = false;
  }
}

// Ініціалізація SimpleLightbox
let galleryLightbox = new SimpleLightbox('.gallery a', {
  captions: true,
  captionsData: 'alt',
  captionDelay: 250,
  captionPosition: 'bottom',
});

galleryLightbox.on('error.simplelightbox', function (error) {
  showEror(error);
});
