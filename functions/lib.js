const  { AsYouType } = require('libphonenumber-js')
const asYouType = new AsYouType()
asYouType.input('+18890200198')
console.log(asYouType.getNumber().country)