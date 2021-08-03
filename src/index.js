const { createWindow, createProduct } = require('./main');
const { app } = require('electron');

require('./database')

app.whenReady().then(createWindow, createProduct)