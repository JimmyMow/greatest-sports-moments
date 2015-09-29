var api = {
   getMoment() {
      var url = `http://localhost:3000/api/v1/moments/rand`;
      return fetch(url).then((res) => res.json());
   },
   getSnippet(id) {
      var url = `https://www.googleapis.com/youtube/v3/videos?part=snippet&id=${id}&key=AIzaSyBMORjRhcjNl9j7p1soN2ML_QHBo1kVR4Q`;
      return fetch(url).then((res) => res.json());
   },
   getWiki(title) {
      var url = encodeURI(`https://en.wikipedia.org/w/api.php?format=json&action=query&prop=extracts&exintro=&explaintext=&titles=${title}`);
      return fetch(url).then((res) => res.json());
   },
   searchGoogle(title) {
      var base_url = "https://www.google.com/#q=";
      var queryString = encodeURI(title+" site:wikipedia.org");
      var url = base_url + queryString;
      console.log("url: ", url);
      var myHeaders = new Headers();
      myHeaders.set("Content-Type", "text/html");
      var myInit = { method: 'GET',
                     headers: myHeaders,
                     mode: 'cors',
                     cache: 'default' };
      return fetch(url, myInit);
   }
};

module.exports = api;
