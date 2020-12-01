


const weatherForm = document.querySelector('#form');
const searchInput = document.querySelector('#input')
const div = document.querySelector('#div');
const msg1 = document.querySelector('#message-1')
const msg2 = document.querySelector('#message-2')

weatherForm.addEventListener('submit', (e) => {
    msg1.className = ".design"
    msg1.textContent = "Loading"
    msg2.textContent = ".....";
    e.preventDefault();
    const address = searchInput.value;
    const url = "/weather?address=" + address;
    fetch(url).then((response) => {

        response.json().then((data) => {
            if (data.error) {
                msg1.textContent = data.error;


            }
            else {
                msg1.textContent = "";
                msg2.textContent = "";

                let output = `
            <p class="design">Address:${data[0].Address}</p>
            <p class="design">City:${data[0].city}</p>
            <p class="design">Country:${data[0].country}</p>

            <p class="design">It is ${data[0].foreCastd}.The Temperature is   ${data[0].Temperature}. The pressure is  ${data[0].pressure}</p>
            `;
                div.innerHTML = output;
            }


        })
    })
        .catch((err) => {
            console.log(err.message)
        })
})

weatherForm.addEventListener('dblclick', (e) => {
    msg1.textContent = "Loading"
    msg2.textContent = ".....";
})