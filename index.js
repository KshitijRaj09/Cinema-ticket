const seats = document.querySelectorAll('.row .seat:not(.occupied)');
const container = document.querySelector('.container');
const total = document.getElementById('total');
const ticketcount = document.getElementById('count');
const movie = document.getElementById('movie');

let count = 0;

//Adding onchange event to Select Drop down list
movie.addEventListener('change', updateMovie);

//To populate Store Data in UI from local Stroage
function populateUI() {
    const indexofSeats = JSON.parse(localStorage.getItem('indexOfseats'));

    if (indexofSeats !== null && indexofSeats.length > 0) {
        indexofSeats.forEach(element => {
            seats[element].classList.add('selected');
        });
    }

    const selectedMovie = localStorage.getItem('selectedMovie');
    const selectedMoviePrice = localStorage.getItem('selectedMoviePrice');

    if (selectedMovie !== null) {
        movie.selectedIndex = selectedMovie;
    }

    moviePrice(selectedMoviePrice);
}

//Called on movie change
function updateMovie(element) {
    console.log(movie.selectedIndex);

    localStorage.setItem('selectedMovie', movie.selectedIndex); //Store movie index and value in local stroage
    localStorage.setItem('selectedMoviePrice', movie.value);
    moviePrice(movie.value);

}

//attaching click event on seats
container.addEventListener('click', element => {
    if (element.target.classList.contains('seat') && !(element.target.classList.contains('occupied'))) {
        element.target.classList.toggle('selected');
        ticketCount(element);
    }
})


//to count tickets selected
function ticketCount(element) {
    if (element.target.classList.contains('selected')) {
        count++;
    } else {
        count--;
    }
    moviePrice();
}


//To calculate moviePrice
function moviePrice(price = movie.value) {
    let count = document.querySelectorAll('.row .seat.selected');
    ticketcount.innerHTML = count.length;
    total.innerHTML = parseInt(price) * count.length;
    storeTickets();
}


//Storing in localStorage
function storeTickets() {
    let selectedSeats = document.querySelectorAll('.row .seat.selected');
    //ticketcount.innerHTML = seats.length;
    //console.log(seatArray);
    let indexofSeats = [...selectedSeats].map(s => [...seats].indexOf(s));
    localStorage.setItem('indexOfseats', JSON.stringify(indexofSeats));
}


populateUI();