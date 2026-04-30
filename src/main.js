import iziToast from 'izitoast'
import 'izitoast/dist/css/iziToast.min.css'
import getImagesByQuery from './js/pixabay-api'
import {
  createGallery,
  clearGallery,
  showLoader,
  hideLoader
} from './js/render-functions'
import errorIcon from './img/bi_x-octagon.svg'

const form = document.querySelector('.form')
const input = document.querySelector('[name="search-text"]')
const ERROR_MESSAGE_EMPTY_FIELD =
  'The input field cannot be empty. Please paste the value!'

form.addEventListener('submit', handleSubmit)

function handleSubmit(event) {
  event.preventDefault()
  clearGallery()

  const keyword = input.value.trim()
  if (keyword === '') {
    iziToast.show({
      position: 'topRight',
      message: ERROR_MESSAGE_EMPTY_FIELD,
      messageColor: 'white',
      color: '#EF4040',
      iconUrl: errorIcon,
      iconColor: '#FFFFFF'
    })
    form.reset()
    return
  }

  showLoader()
  getImagesByQuery(keyword)
    .then((response) => {
      createGallery(response.hits)
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
    .finally(() => {
      hideLoader()
      form.reset()
    })
}
