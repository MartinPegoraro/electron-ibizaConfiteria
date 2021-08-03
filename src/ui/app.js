const { ipcRenderer } = require("electron");

const ingredientForm = document.querySelector("#ingredient");
const ingredientName = document.querySelector('#name');
const ingredientPrice = document.querySelector('#price');
const ingredientUnit = document.querySelector('#unit');
const viewIngredient = document.querySelector('#viewIngredient');
const add = document.querySelector('#add');
const ingreXamount = document.querySelector('#ingreXamount');


let updateStatus = false;
let idUpdate = ''

let ingredients = [];

function sumar() {
    const a = document.getElementById(newId).value
    const b = document.getElementById(newIdSelect).value
    console.log(a, b);
}

// console.log(ingredients);

// ingreXamount.innerHTML += `
//     <div> 
//         <select id="select">
//         <option value="" disable selected>Seleccione el ingrediente</option>
//         </select>
//         <input type="text" placeholder="Ingrese la cantidad" id="amount">
//         <button id="sumar" onclick = sumar()>Sumar</button>
//     </div>
//     `
// const select = document.querySelector("#select")

// ingredients.map(e => {
//     console.log(e);
//     select.innerHTML += `
//         <option value="${e.name}">${e.name}</option>
//         `
// })



// newId = 100;
// newIdSelect = 0
// add.addEventListener('click', e => {
//     newId = newId + 100;
//     newIdSelect = newIdSelect + 1;
//     ingreXamount.innerHTML += `
//     <div> 
//         <select id="${newIdSelect}">
//         <option value="" disable selected>Seleccione el ingrediente</option>
//         </select>
//         <input type="text" placeholder="Ingrese la cantidad" ${newId}" id="${newId}">
//         <button id="sumar" onclick = sumar()>Sumar</button>
//     </div>
//     `
//     const idSelect = document.getElementById(newIdSelect)

//     ingredients.map(e => {
//         idSelect.innerHTML += `
//         <option value="${e.name}">${e.name}</option>
//         `
//     })

// })

ipcRenderer.send('get-ingredient');

ipcRenderer.on('get-ingredients', (e, ingredient) => {
    const ingredientes = JSON.parse(ingredient)
    ingredients = ingredientes;
    renderIngredient(ingredientes)
});

ingredientForm.addEventListener('submit', (e) => {
    e.preventDefault()

    const ingredient = {
        name: ingredientName.value,
        price: ingredientPrice.value,
        unit: ingredientUnit.value
    }

    if (!updateStatus) {
        ipcRenderer.send('new-ingredient', ingredient)
    } else {
        console.log('abc');
        ipcRenderer.send('update-ingredient', { ...ingredient, idUpdate })
    }
    updateStatus = false
    ingredientForm.reset()
});

ipcRenderer.on('new-ingredient', (e, ingredient) => {
    const newIngredient = JSON.parse(ingredient);
    ingredients.push(newIngredient);
    renderIngredient(ingredients)
});

//Actualizar la vista con la tarea ya actualizada
ipcRenderer.on('update-ingredient', (e, ingredient) => {
    const updatedIngredient = JSON.parse(ingredient);
    ingredients = ingredients.map(i => {
        if (i._id === updatedIngredient._id) {
            i.name = updatedIngredient.name;
            i.price = updatedIngredient.price;
            i.unit = updatedIngredient.unit;

        }
        return i;
    })
    renderIngredient(ingredients)
});

function updatedIngedient(id) {
    ingredientPrice.focus();
    updateStatus = true;
    idUpdate = id;
    const ingredient = ingredients.find(ingrediente => ingrediente._id === id)

    ingredientName.value = ingredient.name;
    ingredientPrice.value = ingredient.price;
    ingredientUnit.value = ingredient.unit;

};

function renderIngredient(ingredient) {


    viewIngredient.innerHTML = ''

    ingredient.map(ingrediente => {

        const button = document.createElement('button');

        const pa = document.createElement('p')
        const p = document.createElement('p')
        const par = document.createElement('p')

        const li = document.createElement('li')

        pa.innerText = ("nombre: " + ingrediente.name)
        par.innerText = ("precio: " + ingrediente.price)
        p.innerText = ("unidad: " + ingrediente.unit)

        button.innerText = 'Editar', button.id = "editar", button.onclick = e => { updatedIngedient(ingrediente._id) }

        li.append(pa, par, p, button)
        li.id = 'getIngedients'
        viewIngredient.append(li);

    });

}
