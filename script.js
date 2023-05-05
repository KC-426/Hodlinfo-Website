var dynamic = document.getElementById('dynamic_data')

const dropdown = document.getElementById("drpdwn");
const perentage5mins = document.getElementById("perentage5mins");
const perentage1hr = document.getElementById("perentage1hr");
const perentage1day = document.getElementById("perentage1day");
const perentage7days = document.getElementById("perentage7days");


dropdown.addEventListener("change", (event) => {
  const min = 0.3;
  const max = 0.7;
  const randomValue = Math.random() * (max - min) + min;
  // Handle the change event here
  var value = randomValue.toFixed(2)
  console.log("Dropdown value changed to: ", value);
  perentage5mins.innerHTML = value + "%"
  perentage1hr.innerHTML = (value*12).toFixed(2) + "%"
  perentage1day.innerHTML = (parseFloat(value)+0.12).toFixed(2) + "%"
  perentage7days.innerHTML = ((parseFloat(value)+0.12)*7).toFixed(2) + "%"

});

fetch('http://localhost:3000/fetch-api')
  .then(response => response.json())
  .then(data => {
    var result = data.res 

    for (let i= 0; i< data.res.length ; i++){
        var diff = ((result[i].buy - result[i].sell)*100)/result[i].buy
        dynamic.innerHTML += `<div class="fetched-data">
        <div class="no">${i+1}</div>
        
        <div class="platform">WazirX</div>
        <div class="last-traded-price"> <i class="fa fa-inr" aria-hidden="true"></i> ${result[i].last}</div>
        
        <div class="buy-price"> <i class="fa fa-inr" aria-hidden="true"></i> ${result[i].buy.toFixed(2)}/${result[i].sell.toFixed(2)}</div>
        
        <div class="difference">${diff.toFixed(2)}%</div>
        
        <div class="savings"> <i class="fa fa-inr" aria-hidden="true"></i> ${(result[i].buy - result[i].sell).toFixed(2)} </div>
        
        </div>`
    }

      console.log(data.res.length)
  })
    
    
    
    
  .catch(error => console.error(error));


  const timer = document.getElementById('timer');
let timeLeft = 60;

const countdown = setInterval(() => {
  if (timeLeft <= 0) {
    clearInterval(countdown);
    timer.innerHTML = " ";
  } else {
    timer.innerHTML = timeLeft;
    timeLeft--;
  }
}, 1000);

const toggleBtn = document.getElementById('toggle-btn');
const body = document.body;

toggleBtn.addEventListener('click', function() {
  body.classList.toggle('dark-mode');
});


