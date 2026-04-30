import axios from 'axios'
import iziToast from 'izitoast'
import 'izitoast/dist/css/iziToast.min.css'
import errorIcon from '../img/bi_x-octagon.svg'

const API_KEY = '55650977-325eb2c5dbf82028ab6c3840d'
const BASE_URL = 'https://pixabay.com/api/'
const ERROR_MESSAGE_NO_IMAGE =
  'Sorry, there are no images matching your search query. Please try again!'

export default function getImagesByQuery(query) {
  return axios
    .get(BASE_URL, {
      params: {
        key: API_KEY,
        q: query,
        image_type: 'photo',
        orientation: 'horizontal',
        safesearch: true
      }
    })
    .then((response) => {
      const data = response.data
      if (data.hits.length === 0) {
        iziToast.show({
          position: 'topRight',
          message: ERROR_MESSAGE_NO_IMAGE,
          messageColor: 'white',
          color: '#EF4040',
          iconUrl: errorIcon,
          iconColor: '#FFFFFF'
        })
      }
      return data
    })
    .catch(() => {
      iziToast.show({
        position: 'topRight',
        message: 'Something went wrong. Please try again later.',
        messageColor: 'white',
        color: '#EF4040',
        iconUrl: errorIcon
      })
    })
}
