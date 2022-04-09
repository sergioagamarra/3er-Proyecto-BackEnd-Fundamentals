const { DateTime } = require("luxon");

var helpers = {
    formatDate: function (date) {
        const newDate = DateTime.fromJSDate(date);
        return newDate.toFormat("HH:mm'hs' dd/MM/yyyy");
      },
      dateToday: function () {
        const newDate = new Date()
        return newDate
      }  
};
module.exports = helpers;