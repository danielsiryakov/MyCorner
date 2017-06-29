import {Loading} from 'quasar-framework'
const Loader = {
  show: () => {
    Loading.show(
      {
        delay: 300,
        message: 'Loading...',
        messageColor: '#C86F51',
        spinner: 'tail',
        spinnerSize: 60, // in pixels
        spinnerColor: '#C86F51'
      }
    )
  },
  hide: () => {
    Loading.hide()
  }
}
export default Loader
