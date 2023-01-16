import { fetchImages } from "./fetchImages";
import Notiflix from "notiflix";
import simpleLightbox from "simplelightbox";
import "simplelightbox/dist/simple-lightbox.min.css";
import { createImageCard} from "./image-card";

const refs = {
    inputSearchImgEl: document.querySelector('.search-form-input'),
    btnSearchImgEl: document.querySelector('.search-form-btn'),
    btnLoadMoreEl: document.querySelector('.load-more'),
    listGalleryEl: document.querySelector('.gallery'),
}

let gallerySimpleLightbox = new SimpleLightbox('.gallery a');

refs.btnLoadMoreEl.style.display = 'none';

let pageNumber = 1;

refs.btnSearchImgEl.addEventListener('click', e => {
    e.preventDefault();
    cleanGallery();
    const trimmedValue = refs.inputSearchImgEl.value.trim();
    if (trimmedValue !== '') {
        fetchImages(trimmedValue, pageNumber).then(foundData => {
            if (foundData.hits.legth === 0) {
                Notiflix.Notify.failure(
                    "Sorry, there are no images matching your search query. Please try again."
                );
            } else {
                renderImageList(foundData.hits);
                Notiflix.Notify.success(
                    `Hooray! We found ${foundData.totalHits} images.`
                );
                refs.btnLoadMoreEl.style.display = 'block';
                gallerySimpleLightbox.refresh()
            }
        });
    }
});

function cleanGallery() {
    refs.listGalleryEl.innerHTML = '';
    pageNumber = 1;
    refs.btnLoadMoreEl.style.display = 'none';    
}