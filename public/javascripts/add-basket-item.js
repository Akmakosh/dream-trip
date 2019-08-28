let BASE_URL = "http://localhost:3010";

function onload() {
    const addItemBtn = document.getElementById('addItemBtn');

    addItemBtn.addEventListener("click", (event) => {
        // $("#addItem").ajaxSubmit({ url: '/basket/add', type: 'post' })
        let form = document.getElementById('add-item-form');

        event.preventDefault();
        fetch(BASE_URL + "/basket/add", {
            method: "POST",
            body: new URLSearchParams(new FormData(form))
        }).then(data => data.json()).then((response) => {
            if (response.result) {
                window.location.href = BASE_URL + "/basket";
            } else {
                alert("Unable to save the booking, try again later!");
            }
        });
    })
}