const electron = require('electron')
const fs = require('fs');
const app = electron.app
const BrowserWindow = electron.BrowserWindow


let mainWindow
let configWindow
function doConfig() {
  configWindow = new BrowserWindow({ width: 800, height: 600 , closable: false, frame: false, center: true, resizable:false });
  configWindow.loadURL(`file://${__dirname}/app/views/wizard/wizard.html`);
  configWindow.on('closed', function () {
    configWindow = null
  })
}
function createWindow() {
  mainWindow = new BrowserWindow({ width: 500, height: 700 });
  mainWindow.loadURL(`file://${__dirname}/app/views/index.html`);

  mainWindow.on('closed', function () {
    mainWindow = null
  })
}

app.on('ready', function () {
  try {
    fs.existsSync(`file://${__dirname}/config.js`)
    doConfig()
    console.log('file do not exists, create one!');
  } catch (e) {
    createWindow()
    console.log('config exists already!')
  }
})
app.on('window-all-closed', function () {
  if (process.platform !== 'darwin') {
    app.quit()
  }
})

app.on('activate', function () {
  if (mainWindow === null) {
    createWindow()
  }
})
