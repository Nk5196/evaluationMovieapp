// Implement debouncing for network request
// On clicking book now store the selected movie in localstorage as key "movie"
// so that you can retrive it on checkout.html page
// alert ("hello")
let movie_box=document.getElementById("movies");

let id;
async function getMovies(){
    try{
        const search= document.getElementById("search").value

        const res =  await fetch(`https://www.omdbapi.com/?i=tt3896198&apikey=75a1f7a4&s=${search}`)

        let data = await res.json();

        const movies=data.Search;
        // console.log("data",data)

        return movies;
    }

    catch(err){
       console.log("err:",err)
    }
}
function appendMovies(data){
    movie_box.innerHTML=null;

    data.forEach(function(el){
        let box= document.createElement("div");
        let p =document.createElement("p")
        p.innerText=el.Title;
        let image =document.createElement("img")
        image.src=el.Poster;
        let button=document.createElement("button")
        button.innerText="Book Now"
        button.setAttribute=("class","Book_now")
        button.addEventListener("click",function(){
            gotocheckout(el)
        })
       box.append(image,p,button)
        movie_box.append(box)
   })
}
    async function main(){
        let data = await getMovies();
        if(data===undefined){
            return false;
        }
     appendMovies(data)

    }

    function debounce(func,delay){
        if(id){
            clearTimeout(id)
        }
        id=setTimeout(function(){
            func()
        },delay);
    }
