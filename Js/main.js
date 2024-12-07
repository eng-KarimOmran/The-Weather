'use strict'
function btmFind(){
    btmFind = document.querySelectorAll('.Find')
    for(var i = 0;i < btmFind.length;i++){
        btmFind[i].addEventListener('click',function(){
            search()
        })
    }
}
function DisplayLocation(){
        navigator.geolocation.getCurrentPosition(
        async function(positione){
            var latitude = positione.coords.latitude;
            var longitude = positione.coords.longitude;
            display(await GetData(`${latitude},${longitude}`))
        },async function(){
            var response = await fetch('https://api.ipgeolocation.io/ipgeo?apiKey=b4f3ac49de0f401480cdd80a0b9889cc');
            var IpLocation = await response.json();
            display(await GetData(IpLocation.city))
        })
}
function DateNow(TheDate){
    if(TheDate != undefined){
        var CurrentDate = new Date(TheDate);
        var DayName = new Intl.DateTimeFormat('en-US', { weekday: 'long' }).format(CurrentDate);
        var MonthName = new Intl.DateTimeFormat('en-US', { month: 'long' }).format(CurrentDate);
        var DateNow = {
            Day:DayName,
            Month:MonthName
        }
        return DateNow
    }
}
async function GetData(state) {
        var Request = await fetch(`https://api.weatherapi.com/v1/forecast.json?key=7d77b96c972b4d119a3151101212704&q=${state}&days=3`);
        var data = await Request.json();
        if(data.error != undefined){
            DisplayLocation()
        }else{
            return data;
        }
}
function search(){
    var InputSearch = document.querySelectorAll('[placeholder="Find your locathion"]')
    for(var i = 0;i < InputSearch.length;i++){
        InputSearch[i].addEventListener('input',async function(){
            if(this.value.length < 3){
                DisplayLocation();
            }else{
                var data = await GetData(this.value)
                if(data.error == undefined){
                    display(data)
                }
            }
        })
    }
}
function display(ArryData){
    var contant = `<div class="col-12 col-lg-4">
                    <div class="head-card rounded-top-3 d-flex align-items-center">
                        <div class="container d-flex justify-content-between align-items-center">
                            <div>${DateNow(ArryData.current?.last_updated)?.Day}</div>
                            <div>${DateNow(ArryData.current?.last_updated)?.Month}</div>
                        </div>
                    </div>
                    <div class="body-card py-3">
                        <div class="container d-flex flex-column justify-content-around card-weather">
                            <div class="head-body">${ArryData.location?.name}</div>
                            <div class="d-flex justify-content-start align-items-center col-12 flex-wrap">
                                <div class="text-white degree my-0 ps-0 text-nowrap">${ArryData.current?.temp_c}<sup>o</sup> C</div>
                                <div class="col-3"><img class="col-12 d-block" src="${ArryData.current?.condition.icon}" alt=""></div>
                            </div>
                            <div class="Mist my-2">${ArryData.current?.condition.text}</div>
                            <div class="d-flex justify-content-start align-items-center col-12 icon-degree">
                                <div class="d-flex justify-content-center align-items-center"><img class="col-2 me-1 d-block" src="imgs/icon-umberella@2x.png" alt=""><span>${ArryData.current?.humidity} %</span></div>
                                <div class="d-flex justify-content-center align-items-center"><img class="col-2 me-1 d-block" src="imgs/icon-wind@2x.png" alt=""><span>${ArryData.current?.gust_kph} km/h</span></div>
                                <div class="d-flex justify-content-center align-items-center"><img class="col-2 me-1 d-block" src="imgs/icon-compass@2x.png" alt=""><span>${ArryData.current?.condition.text}</span></div>
                            </div>
                        </div>
                    </div>
                </div>
                <div class="col-12 col-lg-4">
                    <div class="head-card rounded-top-3 d-flex align-items-center bg-head-card">
                        <div class="container d-flex justify-content-center align-items-center">
                            <div>${DateNow(ArryData.forecast?.forecastday[1].date)?.Day}</div>
                        </div>
                    </div>
                    <div class="body-card bg-body-card py-3">
                        <div class="container d-flex flex-column justify-content-center align-items-center card-weather">
                            <div class="mx-auto col-2"><img class="w-100" src="${ArryData.forecast?.forecastday[1].day.condition.icon}" alt=""></div>
                            <div class="mx-auto text-white degree-tom">${ArryData.forecast?.forecastday[1].day.maxtemp_c}<sup>o</sup>C</div>
                            <small>${ArryData.forecast?.forecastday[1].day.mintemp_c}<sup>o</sup></small>
                            <div class="Mist my-2">${ArryData.forecast?.forecastday[1].day.condition.text}</div>
                        </div>
                    </div>
                </div>
                <div class="col-12 col-lg-4">
                    <div class="head-card rounded-top-2 d-flex align-items-center">
                        <div class="container d-flex justify-content-center align-items-center">
                            <div>${DateNow(ArryData.forecast?.forecastday[2].date)?.Day}</div>
                        </div>
                    </div>
                    <div class="body-card py-3">
                        <div class="container d-flex flex-column justify-content-center align-items-center card-weather">
                            <div class="mx-auto col-2"><img class="w-100" src="${ArryData.forecast?.forecastday[2].day.condition.icon}" alt=""></div>
                            <div class="mx-auto text-white degree-tom">${ArryData.forecast?.forecastday[2].day.maxtemp_c}<sup>o</sup>C</div>
                            <small>${ArryData.forecast?.forecastday[2].day.mintemp_c}<sup>o</sup></small>
                            <div class="Mist my-2">${ArryData.forecast?.forecastday[2].day.condition.text}</div>
                        </div>
                    </div>
                </div>`
    document.getElementById('CardsDisplay').innerHTML = contant
}
document.getElementById('navbar-link').addEventListener('click',function(){
    var checkbox = document.getElementById('LinkNav');
    checkbox.checked = !checkbox.checked;})
search()
btmFind()
DisplayLocation()