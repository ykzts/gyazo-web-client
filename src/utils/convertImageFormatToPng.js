import base64 from 'binary-base64';

function convertImageFormatToPng(imageFile) {
  let imageUri = URL.createObjectURL(imageFile);
  let imageElement = document.createElement('img');
  let canvasElement = document.createElement('canvas');
  let canvasContext = canvasElement.getContext('2d');
  return new Promise((resolve, reject) => {
    imageElement.addEventListener('load', function() {
      URL.revokeObjectURL(this.src);
      canvasElement.width = this.width;
      canvasElement.height = this.height;
      canvasContext.drawImage(this, 0, 0);
      try {
        let dataUri = canvasElement.toDataURL('image/png');
        let blob = dataUriToBlob(dataUri);
        resolve(blob);
      } catch (error) {
        reject(error);
      }
    });
    imageElement.addEventListener('error', reject);
    imageElement.src = imageUri;
  });
}

function dataUriToBlob(uri) {
  let colonPosition = uri.indexOf(':');
  let protocol = uri.slice(0, colonPosition + 1);
  if (protocol !== 'data:') {
    throw new Error('URI is not data URI.');
  }
  let uriWithoutProtocol = uri.slice(colonPosition + 1);
  let [ mediaType, data ] = uriWithoutProtocol.split(',', 2);
  let [ type, ...parameters ] = mediaType.split(';');
  let isEncodedBase64 = parameters.includes('base64');
  return new Blob([isEncodedBase64 ? base64.decode(data) : data], { type });
}

export default convertImageFormatToPng;
