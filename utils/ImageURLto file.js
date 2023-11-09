export async function ImageURLtofile(file) {
  // ***Here is the code for converting "image source" (url) to "Base64".***

  let url = `${process.env.NEXT_PUBLIC_API_URL}/${file}`;

  const toDataURL = (url) =>
    fetch(url)
      .then((response) => response.blob())
      .then(
        (blob) =>
          new Promise((resolve, reject) => {
            const reader = new FileReader();
            reader.onloadend = () => resolve(reader.result);
            reader.onerror = reject;
            reader.readAsDataURL(blob);
          })
      );

  // ***Here is code for converting "Base64" to javascript "File Object".***

  function dataURLtoFile(dataurl, filename) {
    var arr = dataurl.split(","),
      mime = arr[0].match(/:(.*?);/)[1],
      bstr = atob(arr[1]),
      n = bstr.length,
      u8arr = new Uint8Array(n);
    while (n--) {
      u8arr[n] = bstr.charCodeAt(n);
    }
    return new File([u8arr], filename, { type: mime });
  }

  // *** Calling both function ***

  const fileData = await toDataURL(url).then((dataUrl) => {
    var fileData = dataURLtoFile(dataUrl, "imageName.jpg");
    return fileData;
  });
  return fileData;
}
