let cl = console.log;

const spinner = document.getElementById("spinner");
const movieInfo = document.getElementById('movieInfo');
const movieForm = document.getElementById("movieForm")

let BASE_URL =
  "https://fetch-api-crud-c0cc4-default-rtdb.asia-southeast1.firebasedatabase.app";

let MOVIE_URL = `${BASE_URL}/movies2.json`;

//state
let state = {
    movieArr2 : [],
    editId : null
}

//snakBar
function snakBar(msg, icon) {
  Swal.fire({
    title: msg,
    icon: icon,
    timer: 3000,
  });
}

//showHideSpinner
function showHideSpinner() {
  spinner.classList.toggle("d-none");
}


//rating
function setRating(){
    if(5 && 4){
        return "badge-success"
    }else if( 2 && 3){
        return "badge-warning"
    }else{
        return "badge-danger"
    }
}


//generic function
function makeApiCall(url, methodType, msgbody = null) {
  let body = msgbody ? JSON.stringify(msgbody) : null;
  return fetch(url, {
    method: methodType,
    body: body,
    headers: {
      "content-type": "application/json",
      Authorization: "JWT TOKEN",
    },
  })
    .then((res) => {
      if (!res.ok) {
        throw new Error("API req failed");
      }
      return res.json();
    })
    .catch((err) => {
      snakBar("Something went wrong", "error");
    })
    .finally(() => {
      showHideSpinner();
    });
}

//read
function showUi() {
  showHideSpinner();
  makeApiCall(MOVIE_URL, "GET")
    .then((data) => {
      cl(data);
       let arr = Object.entries(data);
       let arr2 = arr.map(ele=> {
        return ({...ele[1], id:ele[0]})
    })
    
    state.movieArr2 = arr2;
      templetingUi(state.movieArr2)

    })
    .catch((err) => {
      cl(err);
      snakBar("Something went wrong", "error");
    });
}


//templeting 
function templetingUi(arr){
    let result = "";
    arr.forEach((ele)=>{
        result += ` <div class="col-md-3">
          <div class="card movieCard">
            <div class="card-header">
                <div class="row">
                    <div class="col-10">
                        <h3 class="m-0">${ele.movieName}</h3>
                        <small class="releaseDate">Release Date:${ele.releasDate}</small><br>
                        <small class="updatedAt">Updated At:345435</small>
                    </div>
                    <div class="col-2">
                        <h4 class="m-0"><span class="badge ${setRating(ele.movieRating)}">${ele.movieRating}</span></h4>
                    </div>
                </div>
            </div>
            <div class="card-body">
              <figure>
                <img
                  src="${ele.movieImg}"
                  alt=""
                />
                <figcaption>
                  <h3 class="m-0">${ele.movieName}</h3>
                  <strong>Genre : ${ele.genre}</strong>
                  <p class="m-0">
                    ${ele.movieDescription}
                  </p>
                </figcaption>
              </figure>
            </div>
            <div class="card-footer d-flex justify-content-between">
              <button class="btn btn-sm netflix-pri-Color">Edit</button>
              <button class="btn btn-sm netflix-sec-color">Delete</button>
            </div>
          </div>
        </div>`
    })
    movieInfo.innerHTML = result;
}

showUi();




