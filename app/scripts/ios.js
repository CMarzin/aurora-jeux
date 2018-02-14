import pop from './audio'

export default () => {
//////////////////////////////////////////////////////////////////////////////////
//		Event						//
//////////////////////////////////////////////////////////////////////////////////
var audio = pop()

// NEED to trigger a user action in order to play the sound on IOS ....
const button = document.querySelector('button');

button.addEventListener('click', () => {
  audio.play();
  var timeleft = 10;
  var downloadTimer = setInterval(function () {
    timeleft--;
    document.getElementById("countdowntimer").textContent = timeleft;
    if (timeleft <= 0)
      clearInterval(downloadTimer);
  }, 1000);
})
}