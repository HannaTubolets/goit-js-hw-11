import { fetchImages } from "./fetchImages";
import Notiflix from "notiflix";
import simpleLightbox from "simplelightbox";
import "simplelightbox/dist/simple-lightbox.min.css";

const refs = {
    inputSearchImgEl: document.querySelector('.search-form-input'),
    btnSearchImgEl: document.querySelector('.search-form-btn'),
    btnLoadMoreEl: document.querySelector('.load-more'),
    listGalleryEl: document.querySelector('.gallery'),
}

refs.btnLoadMoreEl.style.display = 'none';
