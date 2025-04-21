//判断是否是手机端
export const isMobile = /Mobi|Android/i.test(navigator.userAgent)

//图片预加载
export function preloadImgs(list) {
  list.forEach((url) => {
    let image = new Image()
    image.src = url
    image.onload = () => {}
    image.onerror = () => {}
  })
}

//视频预加载
export function preloadVideos(list) {
  list.forEach((url) => {
    const video = document.createElement('video');
    video.src = url;
    video.preload = 'auto';
  })
}


export const publicKey = 'MIGfMA0GCSqGSIb3DQEBAQUAA4GNADCBiQKBgQC7mUaaYP9yhi0YKtByDE/Fdx++EIhMG2ObTz6CQ1PAGZ5TCMkgT+qZ8BDvRMBp8PQGKWWhyFfBANi0DObs4ub4xVTyS1oWLcO3r2PztU9JIVYE2Dc5dTDsNyPS7wm9+i0qewQohDTocfyXiRVG73c/ihRBvUJbgzw1mBYFTFwRnwIDAQAB'
 
