function showSuggestions(data) {
      var languages = ['te','tj','tf'];
      var suggestions = document.getElementById('searchResults');
      
      document.getElementById('searchResults').innerHTML = '';
      document.getElementById('searchResults').classList.add('active');

      if(data.length < 1) {
        var list = document.createElement('li');
        var span = document.createElement('span');

        span.innerText = 'No results';
        list.appendChild(span);
        suggestions.appendChild(list);
      }
      data.forEach(function(response){
        var links = [];
        var imageHolder = document.createElement('div');
        var infoHolder = document.createElement('div');
        var list = document.createElement('li');
        var image = document.createElement('img');
        var a = document.createElement('a');

        image.src = response.i.trim();
        a.innerText = response.tt.trim();
        infoHolder.appendChild(a);
        links.push(a);
        languages.forEach(function(language){
          if(language in response){
            var a = document.createElement('a');
            a.innerHTML = response[language].trim();
            infoHolder.appendChild(a);
          }
        })
        links.forEach(function(a){
          a.addEventListener("click",function(event){
            document.getElementById('input').value = event.target.innerText;
            search(document.getElementById('input').value);
          })
        })
        list.appendChild(imageHolder);
        list.appendChild(infoHolder);
        imageHolder.appendChild(image);
        suggestions.appendChild(list);
      })
}


function search(value) {
  var timestamp = Date.now();
    if(value !== ''){
      var url = 'https://api.viki.io/v4/search.json?c=' + value + '&per_page=5&with_people=true&app=100266a&t=' + timestamp;
      fetch(url, {
        method: 'GET',
        header: {
          'Accept': 'application/json'
        },
        cache: 'default'
      }).then(function(response){
        if(response.ok){
          return response.json()
        }
      }).then(function(data){
        showSuggestions(data);
      })
    }
    else {
      document.getElementById('searchResults').classList.remove('active');
      } 
}