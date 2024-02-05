fetch("https://restcountries.com/v2/all")
.then(res=>res.json())
.then(data=>{
  let restCountries=[];
  for(var key in data){
    let Countryobj={
      countryName: data[key].name, countryFlag: data[key].flags.svg, countryNativeName: data[key].nativeName, countryCapital: data[key].capital, countryRegion: data[key].region,countryPopulation: data[key].population, countryCode: data[key].alpha3Code, countryLatlng: data[key].latlng
    };
    restCountries.push(Countryobj);
  }
  return restCountries;
})
.then(data=>{
let countryCount = data.length;
let model = document.createElement("div");
model.setAttribute('class', 'modal fade');
model.setAttribute('id', 'weatherModal');
model.setAttribute('tabindex', '-1');
model.setAttribute('aria-labelledby', 'weatherModelTitle');
model.setAttribute('aria-hidden', 'true');
model.style.display = "none";
let modelDialog = document.createElement("div");
modelDialog.setAttribute('class', 'modal-dialog modal-dialog-centered');
let modelContent = document.createElement("div");
modelContent.setAttribute('class', 'modal-content bg-info');
let modelHeader = document.createElement("div");
modelHeader.setAttribute('class', 'modal-header position-relative');
let modelTitle = document.createElement("h5");
modelTitle.setAttribute('class', 'modal-title col-12 text-center');
modelTitle.setAttribute('id', 'weatherModelTitle');
let modelCloseButton = document.createElement("button");
modelCloseButton.setAttribute('type', 'button');
modelCloseButton.setAttribute('class', 'btn-close position-absolute');
modelCloseButton.setAttribute('data-bs-dismiss', 'modal');
modelCloseButton.setAttribute('aria-label', 'Close');
let modelBody = document.createElement("div");
modelBody.setAttribute('class', 'modal-body text-center');
let modelPara = document.createElement("p");
modelBody.appendChild(modelPara);
modelHeader.append(modelTitle, modelCloseButton);
modelContent.append(modelHeader, modelBody);
modelDialog.appendChild(modelContent);
model.appendChild(modelDialog);
const container = document.createElement("div");
container.setAttribute('class', 'container');
const heading1 = document.createElement("h1");
heading1.setAttribute('class', 'text-center');
heading1.setAttribute('id', 'title');
heading1.innerText = "Rest Countries";
const row = document.createElement("div");
row.setAttribute('class', 'row');

for(let i=0;i<countryCount;i++){
  let col=document.createElement("div");
  col.setAttribute('class','col-sm-6 col-md-4 col-lg-4 col-xl-4 col-div');
  let card=document.createElement("div");
  card.setAttribute("class","card h-100");
  card.setAttribute("id",data[i].countryName);
  let cardHeader=document.createElement('div');
  cardHeader.setAttribute('class','card-header');
  let cardTitle=document.createElement('h5');
  cardTitle.setAttribute('class','card-title w-100 text-center bg-dark text-white');
  cardTitle.innerText=data[i].countryName;
  let cardBody = document.createElement("div");
  cardBody.setAttribute('class', 'card-body d-flex flex-column justify-content-center align-items-center text-center');
  let cardImg = document.createElement("img");
  cardImg.setAttribute('class', 'card-img-top');
  cardImg.setAttribute('alt', `${data[i].countryName} flag`);
  cardImg.setAttribute('src', `${data[i].countryFlag}`);
  let countryDetailsDiv = document.createElement("div");
  countryDetailsDiv.setAttribute('class', 'card-text');
  countryDetailsDiv.innerHTML = `<p>Native Name : ${data[i].countryNativeName}</p>
  <p>Capital : ${data[i].countryCapital}</p>
  <p>Region : ${data[i].countryRegion}</p>
  <p>Latlng: ${data[i].countryLatlng}</p>
  <p>Population : ${data[i].countryPopulation}</p>
  <p>Country Code : ${data[i].countryCode}</p>`;
  let button=document.createElement("a");
  button.setAttribute('class', 'btn btn-primary');
  button.setAttribute('href', `#${data[i].countryName}`);
  button.setAttribute('onClick', `press('${data[i].countryName}', '${data[i].countryCapital}', '${data[i].countryCode}')`);
  button.setAttribute('data-bs-toggle', 'modal');
  button.setAttribute('data-bs-target', '#weatherModal');
  button.innerText = `Click for Weather`;
  cardBody.append(cardImg, countryDetailsDiv, button);
  cardHeader.appendChild(cardTitle);
  card.append(cardHeader, cardBody);
  col.appendChild(card);
  row.appendChild(col);
}
container.append(heading1,row);
document.body.append(model,container);
})
.catch(error=>console.log(error))

let press=(country,city,code)=>{
  const apikey="c82aa09b7e3bdf979f522b8c15309966";
  let mod=document.getElementById("weatherModal");
  mod.removeAttribute("aria-hidden");
  mod.setAttribute('class','modal fade show');
  mod.setAttribute('aria-modal','true');
  mod.setAttribute('role','dialog');
  mod.style.display='block';
  let url=`https://api.openweathermap.org/data/2.5/weather?q=${city},${code}&appid=${apikey}&units=metric`;
  fetch(url)
  .then(res=>res.json())
  .then(data=>{
    let weatherObj={weather:data.weather[0].main,weatherDes: data.weather[0].description, weatherIcon: data.weather[0].icon, temp: data.main.temp, airPressure: data.main.pressure, humidity: data.main.humidity, windSpeed: data.wind.speed, windDirection: data.wind.deg };
    return weatherObj;
  })
  .then(data=>{
    let weatherObj=data;
    document.getElementById('weatherModelTitle').innerText=`Weather in ${country}`;
    let modalContent=document.querySelector('.modal-body');
    modalContent.innerHTML=`<img src="http://openweathermap.org/img/w/${weatherObj.weatherIcon}.png" alt="Weather Icon" class="img-fluid">
    <p>Weather: ${weatherObj.weather}</p>
    <p>Description: ${weatherObj.weatherDes}</p>
    <p>Temperature: ${weatherObj.temp}°C</p>
    <p>Air Pressure: ${weatherObj.airPressure} hPa</p>
    <p>Humidity: ${weatherObj.humidity}%</p>
    <p>Wind Speed: ${weatherObj.windSpeed} m/s</p>
    <p>Wind Direction: ${weatherObj.windDirection}°</p>`;
  })
  .catch(error => console.log(error))
}
