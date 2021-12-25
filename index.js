 
let apiGet =async (url)=>{
    return await fetch(url).then(response=>response.json());
 }
const apiMusic = 'https://mp3.zing.vn/xhr/chart-realtime?songId=0&videoId=0&albumId=0&chart=song&time=-1';
const audioUrl = 'https://api.mp3.zing.vn/api/streaming/audio/'
const domListMusic = document.querySelector('.list-music-items');
let audioMain = document.querySelector('#main__audio')
let main_render= document.querySelector('#main__music')
 let rengerMusic =document.querySelector('#rengerMusic')
let dataSong = [];
let domRenger={};
let renderListMusic= (data)=>{
    dataSong =data;
 var html = '';
  data.forEach((e,index )=> {
     html+=`
     <div class="row music__list d-flex align-content-center">
     <div class="col-md-2">
         <button class="btn btn-primary " onclick="playSong(${index})">
             <i class="fa fa-play"></i>
           </button>
     </div>
     <div class="col-md-8 d-flex justify-content-start">
             <h5 class="card-title music__name">${e.name}</h5>
     </div>
     <div class="col-md-2">
         <img src="${e.thumbnail}" alt="" style="width: 100%;">
     </div>
 </div>
     `;
 });
 domListMusic.innerHTML=html
}
function playSong (index){
    
    var img='';
 
    try {
        img = dataSong[index].album.thumbnail_medium;
    } catch (error) {
        img= dataSong[index].thumbnail
    }
    var html = `
    
    <div class="card" style="width: 30rem;">
        <img src="${img}" class="card-img-top" alt="...">
        <div class="card-body">
          <h5 class="card-title music__name">${dataSong[index].name}</h5>
         <div class="row d-flex justify-content-center">
             <div class="col-sm d-flex justify-content-center">
               <input type="range" value="0" class="form-range" id="rengerMusic" style="width: 80%;">
             <audio src="${audioUrl+dataSong[index].id+'/320'}" autoplay id="main__audio"></audio>           
             </div>
         </div>
         <div class="row">
             <div class="col-sm">
               <p class="card-text">${dataSong[index].performer}</p>
             </div>
         </div>
         <div class="row">
             <div class="col-sm d-flex justify-content-center">
                 <button class="btn btn-primary"onclick="playSong(${index-1})">
                   <i class="fa fa-backward"></i>
                 </button>
                 <button class="btn btn-primary play__button" onclick=playMusicCurrent()>
                 <i class="fa fa-pause"></i>
                 </button>
                 <button class="btn btn-primary" onclick="playSong(${index+1})">
                   <i class="fas fa-forward"></i>
                 </button>
             </div>
           
           
         </div>
      
        </div>
      </div>

    `;
    rengerMusic =document.querySelector('#rengerMusic')
    main_render.innerHTML= html
    document.querySelector('#main__audio').addEventListener('timeupdate',(e)=>{
       var reg = document.querySelector('#rengerMusic')
        var audioCurrent = document.querySelector('#main__audio')
        reg.value=(audioCurrent.currentTime)/(audioCurrent.duration)*100;
    })
  

}
document.querySelector('#main__audio').addEventListener('timeupdate',(e)=>{
       
    var audioCurrent = document.querySelector('#main__audio')
    rengerMusic.value=(audioCurrent.currentTime)/(audioCurrent.duration)*100;
})

let renderIconPlay =(status)=>{
    var domIcon = document.querySelector(".play__button")
   if(status){
      domIcon.innerHTML=' <i class="fa fa-pause"></i>'
   }else{
    domIcon.innerHTML = ' <i class="fa fa-play"></i>'
   }
   
}

let playMusicCurrent = ()=>{
    var audioStatus = document.getElementById('main__audio');

    if(!audioStatus.paused){
        
        audioStatus.pause()
        renderIconPlay(false)
    }else{
        audioStatus.play()
        renderIconPlay(true)
    }
}

let start = ()=>{
     var result =  apiGet(apiMusic).then(data=>renderListMusic(data.data.song))
}

document.querySelector('#rengerMusic').addEventListener('change',(e)=>{
    console.log(e.target.value)
})
start()
document.querySelector(".night-model").addEventListener('click',(e)=>{
    document.body.style.backgroundImage = "url('beautiful-shining-stars-night-sky.jpg')";
});