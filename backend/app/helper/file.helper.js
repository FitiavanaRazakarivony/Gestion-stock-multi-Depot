const fs = require("fs");  /// pour lire et ecrire dans un fichier 

// Uploader un fichier base64 vers le serveur
function uploadFile(content, path){
    let writeStream = fs.createWriteStream(path);
    let base64result = content.substr(content.indexOf(',') + 1);
    // write some data with a base64 encoding
    writeStream.write(base64result, 'base64');
    writeStream.on('finish', () => {
        console.log('wrote all data to file');
    });

    // 'error' event: emitted if an error occurs during the writing process
    writeStream.on('error', (err) => {
        console.error('Error writing data:', err);
    });
    writeStream.end();
}


 // Upload file base 64, promise
  function uploadFileAsync(content, path) {
    return new Promise((resolve, reject) => { //asynchrone
      let writeStream = fs.createWriteStream(path);
      let base64result = content.substr(content.indexOf(',') + 1);
  
      // 'error' event: emitted if an error occurs during the writing process
      writeStream.on('error', (err) => {
        console.error('Error writing data:', err);
        reject(err); // Rejeter la promesse en cas d'erreur
      });
  
      // 'finish' event: emitted when the writing is complete
      writeStream.on('finish', () => {
        console.log('wrote all data to file');
        resolve(); // Résoudre la promesse lorsque l'écriture est terminée
      });
  
      // write some data with a base64 encoding
      writeStream.write(base64result, 'base64');
      writeStream.end();
    });
  }

module.exports = {uploadFileAsync,uploadFile}