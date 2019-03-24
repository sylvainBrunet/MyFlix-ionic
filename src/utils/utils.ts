
export function download(fileName: string, baseData) {
  const data = baseData.split(";");
  const type = data[0].split(":")[1];
  const realData = data[1].split(",")[1];

  const blob: Blob = b64toBlob(realData, type);
  const objectUrl: string = URL.createObjectURL(blob);
  const a: HTMLAnchorElement = document.createElement('a') as HTMLAnchorElement;
  a.setAttribute('href', objectUrl);
  a.setAttribute('download', fileName);
  document.body.appendChild(a);
  a.click();
  a.remove();
  URL.revokeObjectURL(objectUrl);
}

export function mediasToBlob(medias: any[], extension: string): Blob {
  if (extension === 'csv') {
    return mediasToCSVBlob(medias);
  } else {
    return mediasToJsonBlob(medias);
  }
}
export function mediasToJsonBlob(medias: any[]): Blob {
  return new Blob([JSON.stringify(medias.map(media => media.imdbID))], {
    type: 'text/json'
  });
}
export function mediasToCSVBlob(medias: any[]): Blob {
  return new Blob([medias.map(media => media.imdbID).join("\r\n")], {
    type: 'text/csv'
  });
}
/**
 * Convert a base64 string in a Blob according to the data and contentType.
 *
 * @param b64Data {String} Pure base64 string without contentType
 * @param contentType {String} the content type of the file i.e (image/jpeg - image/png - text/plain)
 * @param sliceSize {Int} SliceSize to process the byteCharacters
 *
 * @see http://stackoverflow.com/questions/16245767/creating-a-blob-from-a-base64-string-in-javascript
 * @return Blob
 */
export function b64toBlob(b64Data, contentType = '', sliceSize = 512) {
  const byteCharacters = atob(b64Data);
  const byteArrays = [];

  for (let offset = 0; offset < byteCharacters.length; offset += sliceSize) {
    const slice = byteCharacters.slice(offset, offset + sliceSize);

    const byteNumbers = new Array(slice.length);
    for (let i = 0; i < slice.length; i++) {
      byteNumbers[i] = slice.charCodeAt(i);
    }

    const byteArray = new Uint8Array(byteNumbers);

    byteArrays.push(byteArray);
  }

  return new Blob(byteArrays, {type: contentType});
}

