const { ipcRenderer } = require("electron");

const ingrediente = document.querySelector("#ingredient");
const amount = document.querySelector("#amount");
const listIngredient = document.querySelector("#listIngredient");

listIngredient

let ingredients = [];

function addTotal(event) {
    event.preventDefault()
    const a = ingredients.find(e => {
        if (e.name === ingrediente.value) {
            return e
        }
    })

    mult = amount.value * a.price

    listIngredient.innerHTML += `
        <li>${a.name} $${a.price} * ${amount.value} = ${mult}</li>
    `

    ingrediente.value = "";
    amount.value = ""
    console.log(a.price);
}

function renderIngredients(ingredients) {

    ingredients.map(e => {
        // console.log(e);
        ingrediente.innerHTML += `
            <option value="${e.name}">${e.name}</option> 
            `
    })


}


ipcRenderer.send('get-ingredient');

ipcRenderer.on('get-ingredients', (e, ingredient) => {
    const ingredientes = JSON.parse(ingredient)
    // console.log(ingredient);
    ingredients = ingredientes;
    renderIngredients(ingredientes)
});

