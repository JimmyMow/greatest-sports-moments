var utils = {
   getQuery(url, name) {
       name = name.replace(/[\[]/, "\\[").replace(/[\]]/, "\\]");
       var regex = new RegExp("[\\?&]" + name + "=([^&#]*)"),
           results = regex.exec(url);
       return results === null ? "" : decodeURIComponent(results[1].replace(/\+/g, " "));
   }
};

module.exports = utils;
