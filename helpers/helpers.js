const { DateTime } = require("luxon");

var helpers = {
    formatDate: function (date) {
        const newDate = DateTime.fromJSDate(date);
        return newDate.toFormat("HH:mm'hs' dd/MM/yyyy");
      },
      formatDateBirthday: function (date) {
        const newDate = DateTime.fromJSDate(date);
        return newDate.toFormat("dd/MM/yyyy");
      },
      dateToday: function () {
        const newDate = new Date()
        return newDate
      },
      isImage: function (message) {
        const str = message
        console.log(str.includes("https"));
        if (message.length > 5 && str.includes("https")){
          return true
        }
        return false
      }   
};
module.exports = helpers;