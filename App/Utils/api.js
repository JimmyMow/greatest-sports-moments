var api = {
   getMoments() {
      var url = `https://shrouded-mountain-1579.herokuapp.com/api/v1/moments/rand/5`;
      return fetch(url).then((res) => res.json());
   },
   getMoment() {
      var url = `https://shrouded-mountain-1579.herokuapp.com/api/v1/moments/rand/1`;
      return fetch(url).then((res) => res.json());
   }
};

module.exports = api;
