const image_container = document.getElementById('image-container');
const loader = document.getElementById('loader');

var ready = false;
var images = 0;
var totalImages = 0;
var photoArray = [];

const count = 30;
const apiKey = 'KKpFbYa7Zl3mRXI5qtVxjW7a5jYowWTy58PpJSOK_1o';

const apiURL = `https://api.unsplash.com/photos/random/?client_id=${apiKey}&count=${count}`;


//  Helper Function
function setAttributes(element,attributes){
    for (const key in attributes){
        element.setAttribute(key,attributes[key]);
    };
}

function imageLoaded(){
    imageLoaded++;
    if(imageLoaded === totalImages){
        loader.hidden = true;
        ready = true;
        imageLoaded = 0;
    }
}

function displayPhoto(){
    totalImages = photoArray.length
    photoArray.forEach((photo) => {
        const item = document.createElement('a');
        // item.setAttribute('href', photo.links.html);
        // item.setAttribute('target', '_blank');
        setAttributes(item,{
            'href' : photo.links.html,
            'target' : '_blank'
        });

        const img = document.createElement('img');
        // img.setAttribute('src',photo.urls.regular);
        // img.setAttribute('alt',photo.alt_description);
        // img.setAttribute('title',photo.alt_description);
        setAttributes(img,{
            'src' : photo.urls.regular,
            'alt' : photo.alt_description,
            'titile' : photo.alt_description
        });

        img.addEventListener('load',imageLoaded);
        item.appendChild(img);
        image_container.appendChild(item);
    });
}

async function getPhotos(){
    try{
        const response = await fetch(apiURL);
        photoArray = await response.json();
        displayPhoto();
    } catch(error){
        console.log(error);
    }
}

window.addEventListener('scroll',() => {
    if(window.innerHeight + window.scrollY >= document.body.offsetHeight - 1000 && ready){
        ready = false;
        getPhotos();
    };
})

getPhotos();