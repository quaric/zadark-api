const languages = require('../constants/languages')

module.exports = {
  getLanguageName: (code) => {
    return 'Tiếng ' + languages.find(language => language.code === code).name
  }
}
