export const itemReplacer = (array, oldItem, newItem) => {
  array.map(item=> item === oldItem? newItem : item);
}

export const replacedList = (array, oldItem, newItem) => {
  return array.map(item=> item === oldItem? newItem : item);
}

export const preloadImage  = (url: string)=>{
  try{
    const img = new Image();
    img.src = url;
  } catch(e){
    console.log(e);
  }
}

export async function resizeImageFn(file, maxWidth: number, maxHeight: number, quality = 1) {
  const Compress = require('compress.js');
  const compress = new Compress();
  const resizedImage = await compress.compress([file], {
    size: 1,
    quality: quality, 
    maxWidth: maxWidth, 
    maxHeight: maxHeight, 
    resize: true
  })
  const img = resizedImage[0];
  const base64str = img.data;
  const imgExt = img.ext;
  const resizedFiile = Compress.convertBase64ToFile(base64str, imgExt);
  return resizedFiile;
}