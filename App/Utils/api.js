var api = {
   getMoments() {
      var url = `https://shrouded-mountain-1579.herokuapp.com/api/v1/moments/rand/5`;
      // var url = `http://localhost:3000/api/v1/moments/rand/5`;
      return fetch(url).then((res) => res.json());
   },
   getMoment() {
      var url = `https://shrouded-mountain-1579.herokuapp.com/api/v1/moments/rand/1`;
      // var url = `http://localhost:3000/api/v1/moments/rand/1`;
      return fetch(url).then((res) => res.json());
   },
   editMoment(id, data) {
      var url = `https://shrouded-mountain-1579.herokuapp.com/moments/${id}`;
      // var url = `http://localhost:3000/moments/${id}`;
      return fetch(url, {
         method: 'patch',
         headers: {
          'Accept': 'application/json',
          'Content-Type': 'application/json'
         },
         body: JSON.stringify(data)
      }).then((res) => res.json());
   }
};

module.exports = api;
