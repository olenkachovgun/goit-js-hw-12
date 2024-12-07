import axios from 'axios';
import iziToast from 'izitoast';
import 'izitoast/dist/css/iziToast.min.css';

import SimpleLightbox from 'simplelightbox';
import 'simplelightbox/dist/simple-lightbox.min.css';

import errorImage from './img/error.svg';
import { serviceImages } from './js/pixabay-api';
import {
  createMarkUp,
  showLoadingMessage,
  hideLoadingMessage,
} from './js/render-functions';

const form = document.querySelector('.form');
const gallery = document.querySelector('.gallery');
const loadingMessage = document.querySelector('.loading-message');
const loadMore = document.querySelector('.js-load-more');

form.addEventListener('submit', handleSearch);
// loadMore.addEventListener('click', onLoadMore);
let search = '';
let page = 1;

function handleSearch(event) {
  event.preventDefault();
  search = event.target.elements.search.value.trim();
  searchImages();
}

// serviceImages(search, page)
//   .then(data => {
//     console.log(data);
//     console.log(Math.ceil(data.totalHits / 15)); //total page
//   })
//   .catch(error => console.log(error.message));

function searchImages() {
  showLoadingMessage(loadingMessage);

  serviceImages(search, page)
    .then(data => {
      hideLoadingMessage(loadingMessage);
      gallery.insertAdjacentHTML('beforeend', createMarkUp(data.hits));
      if (page < Math.ceil(data.totalHits / 15)) {
        loadMore.classList.replace('load-more-hidden', 'load-more');
      }
    })
    .catch(error => alert(error.message));
}

// function searchImages() {
//   showLoadingMessage(loadingMessage);

//   fetchImages(search)
//     .then(data => {
//       hideLoadingMessage(loadingMessage);
//       if (data.hits.length === 0) {
//         gallery.innerHTML = '';

//         iziToast.show({
//           title: '',
//           iconUrl: `${errorImage}`,
//           message:
//             'Sorry, there are no images matching your search query. Please try again!',
//           messageColor: 'white',
//           messageSize: '16px',
//           backgroundColor: 'red',
//           position: 'topRight',
//         });
//       } else {
//         gallery.innerHTML = createMarkUp(data.hits);
//         galleryLightbox.refresh();
//       }
//     })
//     .catch(error => {
//       hideLoadingMessage(loadingMessage);
//       console.log(error.message);
//       iziToast.show({
//         title: 'Error',
//         iconUrl: `${errorImage}`,
//         message: 'The link provided is incorrect.',
//         messageColor: 'white',
//         messageSize: '18px',
//         backgroundColor: 'red',
//         position: 'topRight',
//       });
//     })
//     .finally(() => {
//       setTimeout(() => {
//         form.reset();
//       }, 1000);
//     });
// }

//

// Ініціалізація SimpleLightbox
let galleryLightbox = new SimpleLightbox('.gallery a', {
  captions: true,
  captionsData: 'alt',
  captionDelay: 250,
  captionPosition: 'bottom',
});

galleryLightbox.on('error.simplelightbox', function (e) {
  console.log(e);
});
