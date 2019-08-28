let BASE_URL = "http://localhost:3010";

// display my data recommended
let flatsToDisplay = document.querySelector('#flat');
// fetch my data from website
fetch(BASE_URL + "/landing/db/flats-fetch")
    .then(response => response.json())
    .then((data) => {
        data.forEach((flat) => {
            const flatsList = `
                        
                    <div class="card">
                        <a href="${BASE_URL}/city/${flat._id}" >
                            <img src="${flat.picture1}" class="card-img" alt="flat-img">
                        </a>
                        <p class="card-text">${flat.title}</p>
                        
                    </div>
                      
                    `;
            flatsToDisplay.insertAdjacentHTML("beforeend", flatsList);
        });
    });