//search="https://api.themoviedb.org/3/search/movie?query=Jack+Reacher&api_key=21056213030f2cd553936946c0de1024"
//image="https://image.tmdb.org/t/p/w500/1E5baAaEse26fej7uHcjOgEE2t2.jpg"
//curl --request GET \--url 'https://api.themoviedb.org/3/discover/movie?include_adult=false&include_video=false&language=en-US&page=1&sort_by=popularity.desc&with_release_type=2|3&release_date.gte={min_date}&release_date.lte={max_date}' \
//--header 'Authorization: Bearer eyJhbGciOiJIUzI1NiJ9.eyJhdWQiOiIyMTA1NjIxMzAzMGYyY2Q1NTM5MzY5NDZjMGRlMTAyNCIsInN1YiI6IjY1ZjMwNzllYzQ5MDQ4MDE2MzE5ZTJjNCIsInNjb3BlcyI6WyJhcGlfcmVhZCJdLCJ2ZXJzaW9uIjoxfQ.jCJw_FZd-qxXpqf5BzU89gUw0AGFQJOWyIixr6tRfpw' \
//--header 'accept: application/json'
//const popularurl=    "https://api.themoviedb.org/3/discover/movie?sort_by=popularity.desc&api_key=04c35731a5ee918f014970082a0088b1&page=1";
const imagepath="https://image.tmdb.org/t/p/w1280";
//const searchurl=    "https://api.themoviedb.org/3/search/movie?&api_key=04c35731a5ee918f014970082a0088b1&certification_country=US&certification.lte=PG-13&query=";


const popularurl = "https://api.themoviedb.org/3/discover/movie?sort_by=popularity.desc&api_key=04c35731a5ee918f014970082a0088b1&page=1&certification_country=US&certification.lte=PG-13";

const searchurl = "https://api.themoviedb.org/3/search/movie?api_key=04c35731a5ee918f014970082a0088b1&certification_country=US&certification.lte=PG-13&query=";

const forbiddenKeywords = ["adult", "18+", "porn","ko","sex"];

const moviebox=document.querySelector("#movie_box")
const getmovies= async (popularurl)=>{
    const responce=await fetch(popularurl)
    const data= await responce.json()
    console.log(data)
    showmovies(data)
}

getmovies(popularurl);

const showmovies=(data)=>{
    moviebox.innerHTML=""
    data.results.forEach(
        (result)=>{const containsForbiddenKeyword = forbiddenKeywords.some(keyword => 
            result.original_title.toLowerCase().includes(keyword) ||
            (result.overview && result.overview.toLowerCase().includes(keyword))
        );
        const containsForbiddenGenre = result.genre_ids.includes(18);
        // If the movie contains any forbidden keyword, skip displaying it
        if (!containsForbiddenKeyword&& !containsForbiddenGenre  ) {
         const imgpath= result.poster_path ===null?"image-missing.png": imagepath+result.poster_path;
         const box=document.createElement("div")
         box.classList.add("box")
         box.innerHTML=`
         <img src="${imgpath}" alt="" />
         <div class="overlay">
             <div class="title"> 
                <h2> ${result.original_title}  </h2> 
                <br>
                <span> ${Math.round (result.vote_average)} <span>
              </div>
              <h3>Overview:</h3>
              <p> 
                ${result.overview}
              </p>
         </div>

         `
            moviebox.appendChild(box)
        }
    })
}
document.querySelector("#search").addEventListener(
    "keyup",
    function(event){
        if(event.target.value!=""){
            getmovies(searchurl+ event.target.value)
        }else{
            getmovies(popularurl)
        }
    }
)
