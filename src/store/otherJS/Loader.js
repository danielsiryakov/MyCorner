import {Loading} from 'quasar-framework'
const Loader = {
  show: () => {
    Loading.show(
      {
        delay: 300,
        message: 'Loading...',
        messageColor: '#169c68',
        spinner: 'tail',
        spinnerSize: 60, // in pixels
        spinnerColor: '#169c68'
      }
    )
  },
  hide: () => {
    Loading.hide()
  }
}
export default Loader
