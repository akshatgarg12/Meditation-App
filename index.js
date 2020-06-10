const app = ()=>{
  var song = document.querySelector('.song');
  const play = document.querySelector('.play');
  const outline = document.querySelector('.moving-outline circle');
  const video = document.querySelector('.vid-container video ')

  // sounds
  const sounds = document.querySelectorAll('.sound-picker button');
  // time-display
  const timeDisplay = document.querySelector('.time-display');
  // get the length of outline
  const outlineLength = outline.getTotalLength();
  console.log(outlineLength);
  // duration
  let fakeDuration = 600;
  const timeSelect = document.querySelectorAll('.time-select button');

  timeSelect.forEach((option, i) => {
    option.addEventListener("click", function(){
      if(!song.paused){
      checkPlaying(song);
      song.currentTime=0;
      }
      var time = this.getAttribute('data-time');
      fakeDuration = time;
      console.log(fakeDuration);
      timeDisplay.innerText = `${Math.floor(fakeDuration/60)}:${Math.floor(fakeDuration%60)}`;
    });
  });
 // set the time-Display


  // outline animation
  outline.style.strokeDashoffset = outlineLength;
  outline.style.strokeDasharray = outlineLength;


  //  selecting the music and video with the sound picker
    sounds.forEach((sound)=>{
      sound.addEventListener('click', function(){
        if(!song.paused){
          play.src = 'svg/play.svg';
        }
        song.src = this.getAttribute('data-sound');
        video.src = this.getAttribute('data-video');
        console.log(song)

      })
    })

// play sound when play butoon is clicked
  play.addEventListener('click', ()=>{
    checkPlaying(song)
  });

// check whether mucic is already being played

function checkPlaying(song){
  if(song.paused){
     song.play();
     video.play();
     play.src = 'svg/pause.svg'
}
  else{
    song.pause();
    video.pause();
    play.src = 'svg/play.svg'
  }
}


//  getting time updates to modify display text and animated circle;
song.ontimeupdate = ()=>{
  let currentTime = song.currentTime;
  let elapsed = fakeDuration- currentTime;
  let seconds = Math.floor(elapsed%60);  let minutes = Math.floor(elapsed/60);
  timeDisplay.innerText = `${minutes}:${seconds}`;
  if(elapsed<=0){
    song.pause();
    song.currentTime=0;
    video.pause();
    play.src = "./svg/play.svg";
  }

//  animating the player button circle;
let progress = outlineLength - (currentTime/fakeDuration)*outlineLength;
outline.style.strokeDashoffset = progress;

}
}



app();
