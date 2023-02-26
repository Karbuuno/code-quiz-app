let lastScore = document.querySelector(".score");
let initialName = document.querySelector(".initialName");
let clearScore = document.querySelector("#clear-score");

clearScore.addEventListener("click", function (e) {
  // first we will check to really want to clear if not we will return that means we won't clear
  if (!confirm("Are you sure you want to clear all the scores?")) return;
  // we will clear the scores directly
  window.localStorage.clear("allScore");
  window.location.href = "/score.html";
});

function showHighScore() {
  var getScore = JSON.parse(localStorage.getItem("allScore")) || [];

  if (getScore.length <= 0) {
    return (lastScore.innerHTML = `<div><h2>You Don't have any score yet</h2></div>`);
  }

  for (var i = 0; i < getScore.length; i++) {
    lastScore.innerHTML += `<div>
    <p class='initialName'>Initials: ${getScore[i].initials}</p>
      <p class='lastScore'>Your Score: ${getScore[i].score}</p>
     
    </div>`;
  }
}
showHighScore();
