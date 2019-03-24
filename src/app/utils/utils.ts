/**
 * Created by Brunet Sylvain on 07/03/2019.
 */

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

export function mediasToJsonBase64(medias: any[]){
  return "data:text/json;charset=utf8," + btoa(JSON.stringify(medias.map(media => media.imdbID)));
}

export function mediasToCSVBase64(medias: any[]) {
  return "data:text/csv;charset=utf8," + btoa(medias.map(media => media.imdbID).join("\r"));
}
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
