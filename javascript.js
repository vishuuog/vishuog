 window.onload = function() {
    if(!window.location.hash) {
        window.location = window.location + '#loaded';
        window.location.reload();
    }
}
const html = document.documentElement;
const canvas = document.getElementById("canvas");
const context = canvas.getContext("2d");

let framecount = 383;
let currentframe = index => (
    `./trauma/frame_${index.toString().padStart(4 , "0" )}.png`
);

const preloadimages = () =>{
    for(i=1 ; i<framecount;  i++){
        const img = new Image();
        img.src = currentframe(i);
    }
};

const img = new Image();
img.src = currentframe(1);
canvas.width = img.width;
canvas.height = img.height;
img.onload = function(){
    context.drawImage(img , 0 ,0);
}

const updateImage = index =>{
    img.src = currentframe(index);
    context.drawImage(img , 0 ,0);
    context.imageSmoothingEnabled = true;
    context.imageSmoothingQuality = "high";
}

window.addEventListener('scroll', () => {  
    const scrollTop = html.scrollTop;
    const maxScrollTop = html.scrollHeight - window.innerHeight;
    const scrollFraction = scrollTop / maxScrollTop;
    const frameIndex = Math.min(
      framecount - 1,
      Math.ceil(scrollFraction * framecount)
    );
    
    requestAnimationFrame(() => updateImage(frameIndex + 1))
  });
  
  

preloadimages();
