import {
  cutCircle,
  angularVelocity,
  velocity,
  drawVideo,
  setVendorCss,
  getCursorPosition,
  orbit,
  paste,
  bounce
} from './funcStore';

function filterListener(vid, whoisFilter, currFilter, whoisBool, channel, func) {
  document.getElementById(whoisFilter).addEventListener('click', () => {
    let filterDataObj;
    // sends boolean data about remote filter application and adds filter on your side
    filterDataObj = JSON.stringify({
      local: whoisBool,
      filterType: currFilter.innerHTML
    });
    func(vid, currFilter.innerHTML);
    channel.send(filterDataObj);
  }, false)
}


function animationListener(canvas, img, animeObj, animeEle, context, reqAnim, array, channel, local, func) {

  canvas.addEventListener('click', (event) => {
    let position = func(canvas, event);

    let emoImage = new Image();
    emoImage.src = img.src;

    // let currImg = 
    let animation = animeObj[animeEle.innerHTML]
    //animation for local display and data transmission to peer
    animation(canvas, context, event, position, emoImage, reqAnim, array);

    let canvasObj = JSON.stringify({
      animation: animation.toString(),
      localEmoji: local,
      currentImg: emoImage.src,
      position: {
        x: position.x,
        y: position.y
      }
    });

  console.log(channel);
    channel.send(canvasObj);
  }, false)
}

export {
  filterListener,
  animationListener
};
