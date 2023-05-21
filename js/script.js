const popularMovie = () => {
  const options = {
    method: 'GET',
    headers: {
      accept: 'application/json',
      Authorization: 'Bearer eyJhbGciOiJIUzI1NiJ9.eyJhdWQiOiIwMGYxZWFlMzUxZGFkMjllNDgxNzA5ZjIyNjBhYTViMyIsInN1YiI6IjY0NjMyNWFiYTY3MjU0MDBlM2QzMDA4MyIsInNjb3BlcyI6WyJhcGlfcmVhZCJdLCJ2ZXJzaW9uIjoxfQ.8iQQTLq_3yCYEScKzNSen2JLKFENRNRuh7rW86cq40A'
    }
  };
  
  fetch('https://api.themoviedb.org/3/movie/popular?language=en-US&page=1', options)
    .then(response => response.json())
    .then(response => displayMovies(response))
    .catch(err => console.error(err));
}

const displayMovies = (movies) => {
  console.log(movies.results);
  movies.results.forEach( m => {
    console.log(m.title);
    document.getElementById('popular-movies').appendChild(movieCard(m));
  }
  )
}

const movieCard = (data) => {
  // <div class="card">
  //         <a href="movie-details.html?id=1">
  //           <img
  //             src="images/no-image.jpg"
  //             class="card-img-top"
  //             alt="Movie Title"
  //           />
  //         </a>
  //         <div class="card-body">
  //           <h5 class="card-title">Movie Title</h5>
  //           <p class="card-text">
  //             <small class="text-muted">Release: XX/XX/XXXX</small>
  //           </p>
  //         </div>
  //       </div>
  const card = document.createElement('div');
  card.classList.add('card');
  // card.appendChild(document.createElement('a').setAttribute('href',''));
  
  const a = document.createElement('a');
  a.setAttribute('href','movie-details.html?id=1');
  const img = document.createElement('img');
  img.setAttribute('src','https://www.themoviedb.org/t/p/w600_and_h900_bestv2' + data.poster_path);
  img.setAttribute('alt',data.title);
  img.classList.add('card-img-top');
  a.appendChild(img);

  const divBody = document.createElement('div');
  divBody.classList.add('card-body');
  const h5 = document.createElement('h5');
  h5.classList.add('card-title');
  h5.innerHTML = data.title;
  const p = document.createElement('p');
  p.classList.add('card-text');
  const small = document.createElement('small');
  small.classList.add('text-muted');
  small.innerHTML = `Release: ${data.release_date}`;
  p.appendChild(small);
  divBody.appendChild(h5);
  divBody.appendChild(p);

  card.appendChild(a);
  card.appendChild(divBody);
  return card;
}

const global = {
    currentPath: window.location.pathname
};

function init() {
  switch(global.currentPath) {
    case ('/'):
      console.log('main page');
      popularMovie();
      break;
    case ('/movies'):
      console.log('movie');
      break;
    case ('/shows.html'):
      console.log('tv shows');
      break;
    default:
      console.log('none');
  }
  console.log(global.currentPath);
}

document.getElementById('logo').addEventListener( (e) => {
  popularMovie();
});

init();
