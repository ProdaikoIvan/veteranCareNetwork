/**
 * Created by Enot on 05.12.2016.
 */
let markersArr = [];
let map;

document.addEventListener("DOMContentLoaded", function () {

    /*Отображение модальнымх окон*/
    /*Legend*/
    let controlContainer = document.getElementById('containerControl');
    let modeControl = document.getElementById("modeBtn");
    modeControl.onclick = function () {
        visibleModeControl(controlContainer);
    };
    controlContainer.onclick = function (event) {
        if (event.target == this) {
            visibleModeControl(controlContainer);
        }
    }
    /*Video*/
    let containerHelp = document.getElementById('containerHelp');
    let helpControl = document.getElementById("helpBtn");
    helpControl.onclick = function () {
        visibleModeControl(containerHelp);
    };
    containerHelp.onclick = function (event) {
        if (event.target == this) {
            visibleModeControl(containerHelp);
        }
    }


    /*Отображение маркеров*/
    let inputsControlPanel = controlContainer.getElementsByTagName('input');
    for (let i = 0; i < inputsControlPanel.length; i++) {
        inputsControlPanel[i].onchange = function () {
            visibleMarkers.call(this, markersArr, this.getAttribute('data-type'));
        }
    }
    /*Переключение Legend/Switch*/
    let switchTab = document.getElementById('switchTab');
    let tabContent = document.getElementById("tabContent")
    switchTab.onclick = function () {
        toggle.call(this,tabContent);
    }

    let legendTab = document.getElementById('legendTab');
    legendTab.onclick = function () {
        toggle.call(this,tabContent);
    }
})

function initMap() {
    let uluru = {lat: 49.5937300, lng: 34.5507300};
    map = new google.maps.Map(document.getElementById('map'), {
        zoom: 12,
        center: uluru,
        disableDefaultUI: true
    });

    for (key in coordinatesObjects) {
        for (let i = 0; i < coordinatesObjects[key].length; i++) {
            let pos = {
                lat: coordinatesObjects[key][i]['lat'],
                lng: coordinatesObjects[key][i]['lng']
            };
            let marker = new google.maps.Marker({
                position: pos,
                map: map,
                type: key,
                title: coordinatesObjects[key][i]['name'],
                icon: '../common/img/' + key + '.png'
            });
            markersArr.push(marker);
        }
    }
}

function visibleModeControl(containerControl) {
   /* let modalContainer = containerControl.parentNode;
    for(let i = 0;i < modalContainer.children.length;i++){
        modalContainer.children[0].style.display = "none";
    }*/
    if (getComputedStyle(containerControl).visibility == "hidden") {
        containerControl.style.visibility = "visible";
        containerControl.style.opacity = "1";
    }
    else {
        containerControl.style.opacity = "0";
        containerControl.style.visibility = "hidden";
    }
}

function visibleMarkers(markers, MarkersType) {
    if (this.checked) {
        for (let i = 0; i < markers.length; i++) {
            if (markersArr[i].type == MarkersType) {
                markersArr[i].setMap(map);
            }
        }
    }
    else {
        for (let i = 0; i < markers.length; i++) {
            if (markersArr[i].type == MarkersType) {
                markersArr[i].setMap(null);
            }
        }
    }
}

function toggle(tabContent) {
    let tabs = this.parentNode.getElementsByTagName("li");
    let dataToggle = this.getAttribute("data-toggle");
    let thisStyle = this.style;

    for(var i = 0; i< tabs.length;i++){
        if(this ==  tabs[i]){
            thisStyle.border = "1px solid rgb(221,221,221)";
            thisStyle.borderBottom = "none";
            thisStyle.color = "rgb(0,0,0)";
            thisStyle.fontWeight = "bold";
        }
        else{
            tabs[i].style.border = "none";
            tabs[i].style.borderBottom = "1px solid rgb(221,221,221)";
            tabs[i].style.color = "rgb(150,150,150)";
            tabs[i].style.fontWeight = "normal";
        }
    }

    for(var i = 0; i< tabContent.children.length;i++){
        if(tabContent.children[i].getAttribute("id") == dataToggle){
            tabContent.children[i].style.display = "block";
        }
        else{
            tabContent.children[i].style.display = "none";
        }
    }


}


