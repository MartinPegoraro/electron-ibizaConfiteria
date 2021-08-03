const { BrowserWindow, app, ipcMain, Menu } = require('electron');

const Ingredient = require('./models/ingredient');
const Product = require('./models/product');

let templateMenu = [
    {
        label: 'Archivo',
        submenu: [
            {
                label: 'Cerrar programa',
                accelerator: 'Ctrl+Q',
                click() {
                    app.quit()
                }
            }
        ]
    },
    {
        label: 'Productos',
        submenu: [
            {
                label: 'Productos',
                click() {
                    createProduct()
                }
            }
        ]

    },
    {
        label: 'DevTools',
        submenu: [
            {
                label: 'Show/Hide Dev Tools',
                click(item, focusedWindow) {
                    focusedWindow.toggleDevTools()
                }
            },
            {
                role: 'reload'
            }
        ]
    }
]

const createWindow = () => {
    const win = new BrowserWindow({
        width: 800,
        height: 700,
        webPreferences: {
            nodeIntegration: true,
            contextIsolation: false
        }
    })
    win.loadFile('src/index.html');
    let mainMenu = Menu.buildFromTemplate(templateMenu);
    win.setMenu(mainMenu);


    win.on('closed', () => {
        app.quit();
    })
}

function createProduct() {
    const winProduct = new BrowserWindow({
        width: 1500,
        height: 700,

        webPreferences: {
            nodeIntegration: true,
            contextIsolation: false
        }
    })
    winProduct.loadFile('src/product.html')
}


ipcMain.on('new-ingredient', async (e, ingredient) => {
    console.log(ingredient);
    const createdIngredient = await Ingredient.create(ingredient)
    e.reply('new-ingredient', JSON.stringify(createdIngredient))
})

ipcMain.on('get-ingredient', async (e) => {
    const ingredient = await Ingredient.find().sort({ name: 1 });
    e.reply('get-ingredients', JSON.stringify(ingredient));
})

//acutalizar ingrediente
ipcMain.on('update-ingredient', async (e, ingredient) => {
    const updateIngredient = await Ingredient.findByIdAndUpdate(
        ingredient.idUpdate,
        {
            name: ingredient.name,
            price: ingredient.price,
            unit: ingredient.unit,
        }, { new: true })
    e.reply('update-ingredient', JSON.stringify(updateIngredient))
})

module.exports = { createWindow, createProduct }