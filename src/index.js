import axios from 'axios';
import Notiflix from 'notiflix';
import SimpleLightbox from 'simplelightbox';
import 'simplelightbox/dist/simple-lightbox.min.css';



const allReferences = {
    form: document.querySelector('.search-form'),
    gallery: document.querySelector('.gallery')
} 


const allParameters = {
    BASE_URL: 'https://pixabay.com/api/',
    API_KEY: '41201179-9e6e53d17bde192e39b3718f4',
    q: '',
    image_type: 'photo',
    orientation: 'horizontal',
    safesearch : true,
    
}
allReferences.form.addEventListener('submit', onValueSubmit)


function onValueSubmit (event) {
    event.preventDefault();


    const searchValue = event.currentTarget[0].value;
    const value = formattedValue(searchValue)
}




// форматування
function formattedValue (str) {
    const splitString = str.split(' ');
    const joinString = splitString.join('+')
    return joinString
}


async function getGallery (value) {
    const response = await axios(allParameters.BASE_URL, {
        params: {
            api_key: '41201179-9e6e53d17bde192e39b3718f4',
            image_type: 'photo',
            orientation: 'horizontal',
            safesearch : true,
            q: value,
        }
    })
}