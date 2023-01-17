import { fetchImages } from './fetchImages';
import Notiflix from 'notiflix';
import simpleLightbox from 'simplelightbox';
import 'simplelightbox/dist/simple-lightbox.min.css';
// import { createImageCard } from './image-card';

const refs = {
  inputSearchImgEl: document.querySelector('.search-form-input'),
  btnSearchImgEl: document.querySelector('.search-form-btn'),
  btnLoadMoreEl: document.querySelector('.load-more'),
  listGalleryEl: document.querySelector('.gallery'),
};

let gallerySimpleLightbox = new SimpleLightbox('.gallery a');

refs.btnLoadMoreEl.style.display = 'none';

let pageNumber = 1;

refs.btnSearchImgEl.addEventListener('click', e => {
  e.preventDefault();
  cleanGallery();
  const trimmedValue = refs.inputSearchImgEl.value.trim();
  if (trimmedValue !== '') {
    fetchImages(trimmedValue, pageNumber).then(foundData => {
      if (foundData.hits.length === 0) {
        Notiflix.Notify.failure(
          'Sorry, there are no images matching your search query. Please try again.'
        );
      } else {
        renderImagesList(foundData.hits);
        Notiflix.Notify.success(
          `Hooray! We found ${foundData.totalHits} images.`
        );
        refs.btnLoadMoreEl.style.display = 'block';
        gallerySimpleLightbox.refresh();
      }
    });
  }
});

refs.btnLoadMoreEl.addEventListener('click', () => {
  pageNumber += 1;
  const trimmedValue = refs.inputSearchImgEl.value.trim();
  refs.btnLoadMoreEl.style.display = 'none';
  fetchImages(trimmedValue, pageNumber).then(foundData => {
    if (foundData.hits.length === 0) {
      Notiflix.Notify.failure(
        'Sorry, there are no images matching your search query. Please try again.'
      );
    } else {
      renderImagesList(foundData.hits);
      Notiflix.Notify.success(
        `Hooray! We found ${foundData.totalHits} images.`
      );
      refs.btnLoadMoreEl.style.display = 'block';
    }
  });
});

function renderImagesList(images) {
  console.log(images, 'images');
  const markup = images
    .map(image => {
      console.log('img', image);
      return `
        <div class="photo-card">
         <a href="${image.largeImageURL}">
         <img class="photo" src="${image.webformatURL}" 
         alt="${image.tags}" title="${image.tags}" 
         loading="lazy"/></a>
    <div class="info">
    <p class="info-item">
      <b>Likes</b><span class="info-item-api">${image.likes}</span>
    </p>
    <p class="info-item">
      <b>Views</b><span class="info-item-api">${image.views}</span>
    </p>
    <p class="info-item">
      <b>Comments</b><span class="info-item-api">${image.comments}</span>
    </p>
    <p class="info-item">
      <b>Downloads</b><span class="info-item-api">${image.downloads}</span>
    </p>
  </div>
</div>`;
    })
    .join('');
  refs.listGalleryEl.innerHTML += markup;
}

function cleanGallery() {
  refs.listGalleryEl.innerHTML = '';
  pageNumber = 1;
  refs.btnLoadMoreEl.style.display = 'none';
}
