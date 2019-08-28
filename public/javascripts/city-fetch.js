let BASE_URL = "http://localhost:3010";

// display my data recommended
let citiesToDisplay = document.querySelector('#recommend');
// fetch my data from website
fetch(BASE_URL + "/landing/db/reco-fetch")
    .then(response => response.json())
    .then((data) => {
        data.forEach((recCity) => {
            const recomList = `
                        <div class="container" style="width: 23rem;">
                            <a href="${BASE_URL}/city/${recCity.city}">
                                <img src="${recCity.pictureUrl}" class="card-img" alt="">
                            </a>

                            <div class="text-body">
                                <p id="bewhite">${recCity.title}</p>
                                
                            </div>
                        </div>
                    `;
            citiesToDisplay.insertAdjacentHTML("beforeend", recomList);
        });
    });





// display my data world-list
let worldCities = document.querySelector('#city-list');
// fetch my data from website
fetch(BASE_URL + "/landing/db/dest-fetch")
    .then(response => response.json())
    .then((data) => {
        data.sort(() => Math.random() - 0.5);
        data.forEach((aroundWorld) => {
            const worldList = `
                        <div class="card" style="width: 25rem;">
                            <a href="${BASE_URL}/city/${aroundWorld.city}">
                                <img src="${aroundWorld.pictureUrl}" class="card-img-top" alt="pic">
                            </a>

                            <div class="card-body">
                                <h6>${aroundWorld.title}</h6>
                                <p class="card-text">${aroundWorld.description}</p>
                            </div>
                        </div>
                    `;
            worldCities.insertAdjacentHTML("beforeend", worldList);
        });
    });





// display my data carusel
let carousel = document.querySelector('.carousel-inner');
let carouselIndic = document.querySelector('.carousel-indicators');
// fetch my data from website
fetch(BASE_URL + "/landing/db/reco-fetch")
    .then(response => response.json())
    .then((data) => {
        let it = 0;
        data.forEach((carusCity) => {
            const carusList = `
                <div class="carousel-item ${it == 0 ? "active": ""}">
                    <a href="${BASE_URL}/city/${carusCity.city}">
                        <img src="${carusCity.pictureUrl}" class="d-block w-100" alt="...">
                    </a> 
                    <div class="carousel-caption d-none d-md-block">
                        <h5>${carusCity.title}</h5>
                        <p>Nulla vitae elit libero, a pharetra augue mollis interdum.</p>
                    </div>
                </div>`;
            carousel.insertAdjacentHTML("beforeend", carusList);
            const carusInd =
                `<li data-target="#carouselExampleCaptions" data-slide-to="${it}" ${it == 0 ? "class='active'": ""}"></li>`;
            carouselIndic.insertAdjacentHTML("beforeend", carusInd);
            it++;
        });
    });