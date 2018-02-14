const pop = () => {
  var audio = new Audio();
  audio.addEventListener('canplaythrough', audio.play, false);
  audio.src = '../vendor/bulles.mp3';

  return audio;
}

export default pop