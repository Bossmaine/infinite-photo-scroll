const count = 10;
const apiKey = 'Q5kMiaJFzQcDBekAso-zR2erE1lQ3LNAiKgEFR-Tr3s';
const url = `https://api.unsplash.com/photos/random?client_id=${apiKey}&count=${count}`
const ImageContainer = document.getElementById('image-container');
const pageLoader = document.getElementById('loader');

let page = 1;
let isLoading = false;

// get photos from API and display photos
function getPhotos() {
    isLoading = true;
    return fetch(`${url}&page=${page}`) 
      .then(response => response.json())
      .then(data => {
        pageLoader.hidden = true
        const html = data.map((photo) => {
          return `
            <img id="image" src=${photo.urls.regular} alt=${photo.description}>
            <div class="image-details" id="image-details">
              <a href=${photo.links.download} target="_blank" id="download-icon"><i class="fa-sharp fa-regular fa-circle-down"></i></a>
              <p>Description: <span id="discription">${photo.description ? photo.description : "Description is unavailable for this photo."}</span></p>
              <p>Downloads: <span id="downloads">${photo.downloads}</span></p>
              <p>Likes: <span id="likes">${photo.likes}</span></p>
            </div>
          `
        }).join('');
        ImageContainer.innerHTML += html;
        isLoading = false;
      })
      .catch(error => console.log(error));
    page++;
  }


//Listens for scroll, fect and displays more photos
window.addEventListener('scroll', () => {
    const { scrollTop, scrollHeight, clientHeight } = document.documentElement;
    if (scrollTop + clientHeight >= scrollHeight - 5 && !isLoading) {
      getPhotos();
    }
}) 

//loads photos and hides the loader
getPhotos().then(() => {
    loader.hidden = true; 
});
