var api = {
   getMoments() {
      var url = `http://localhost:3000/api/v1/moments/rand/5`;
      return fetch(url).then((res) => res.json());
   },
   getMoment() {
      var url = `http://localhost:3000/api/v1/moments/rand/1`;
      return fetch(url).then((res) => res.json());
   }
};

module.exports = api;
