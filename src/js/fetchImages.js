const BASE_URL = 'https://pixabay.com/api/';
const API_KEY = '32846684-9759f804fcaf49bb92c6f21b5';

export const fetchImages = async (inputValue, pageNr) => {
  const searchParams = new URLSearchParams({
    q: inputValue,
    image_type: 'photo',
    orientation: 'horizontal',
    safesearch: 'true',
    per_page: '40',
    page: pageNr,
    key: API_KEY,
  });
  return await fetch(`${BASE_URL}?&${searchParams}`)
    .then(async response => {
      if (!response.ok) {
        if (response.status === 404) {
          return [];
        }
        throw new Error(response.status);
      }
      return await response.json();
    })
    .catch(error => {
      console.error(error);
    });
};

//? Variant 1
// export const fetchImages = async (inputValue, pageNr) => {
//     return await fetch(
//         `https://pixabay.com/api/?key=32846684-9759f804fcaf49bb92c6f21b5&q=${inputValue}&image_type=photo&orientation=horizontal&safesearch=true&per_page=40&page=${pageNr}`
//     )
//         .then(async response => {
//             if (!response.ok) {
//                 if (response.status === 404) {
//                     return [];
//                 }
//                 throw new Error(response.status);
//             }
//             return await response.json();
//         })
//         .catch(error => {
//             console.error(error);
//         });
// };

// fetchImages('cat', 2).then(data => {
//     console.log(data);
// });
