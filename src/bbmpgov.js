// this script parses the data from bbmpgov.com for bangalore
// load jquery since it is being used below
var script = document.createElement('script');
script.src = 'https://code.jquery.com/jquery-3.4.1.min.js';
script.type = 'text/javascript';
document.getElementsByTagName('head')[0].appendChild(script);

var outputJsonArray = [];
var htmlSource;

window.onload = function () {
  $.getJSON('http://www.whateverorigin.org/get?url=' + encodeURIComponent('http://bbmpgov.com/chbms/') + '&callback=?', function (data) {
    var parser = new DOMParser();
    htmlSource = parser.parseFromString(data.contents, 'text/html');
    parseHTML();
  });
};

var url = "http://127.0.0.1:5000/update";
var xhr = new XMLHttpRequest();
xhr.withCredentials = "true";

function parseHTML() {
  // console.log(htmlSource);
  var lastUpdated = htmlSource.querySelector("h5").innerText.substring(7, 19);
  // get the data for Government Hospitals
  var rows = htmlSource.querySelectorAll("#GovernmentHospitalsDetail tbody tr");

  for (var i = 0; i < rows.length - 1; i++) {
    var rowJson = {};
    // console.log(rows[i]);
    var columnData = rows[i].querySelectorAll("td");
    rowJson["Name"] = columnData[1].innerText;
    rowJson["COVID Beds"] = columnData[12].innerText + "/" + columnData[2].innerText;
    rowJson["HDU Beds"] = columnData[13].innerText + "/" + columnData[3].innerText;
    rowJson["ICU"] = columnData[14].innerText + "/" + columnData[4].innerText;
    rowJson["Ventilator Beds"] = columnData[15].innerText + "/" + columnData[5].innerText;
    rowJson["LAST UPDATED"] = lastUpdated;
    rowJson["Sheet Name"] = "Bangalore Beds";
    console.log(rowJson);
    outputJsonArray.push(rowJson);

    xhr.open("POST", url, true);
    //Send the proper header information along with the request
    xhr.setRequestHeader("Content-type", "application/x-www-form-urlencoded");
    xhr.send(rowJson);
  }

  rows = htmlSource.querySelectorAll("#GovernmentMedical tbody");
  // get the data for Government Medical Colleges
  var medCollegeData = rows[1].querySelectorAll("tr");
  for (var i = 0; i < medCollegeData.length - 1; i++) {
    var rowJson = {};
    // console.log(medCollegeData[i]);
    var columnData = medCollegeData[i].querySelectorAll("td");
    rowJson["Name"] = columnData[1].innerText;
    rowJson["COVID Beds"] = columnData[12].innerText + "/" + columnData[2].innerText;
    rowJson["HDU Beds"] = columnData[13].innerText + "/" + columnData[3].innerText;
    rowJson["ICU"] = columnData[14].innerText + "/" + columnData[4].innerText;
    rowJson["Ventilator Beds"] = columnData[15].innerText + "/" + columnData[5].innerText;
    rowJson["LAST UPDATED"] = lastUpdated;
    rowJson["Sheet Name"] = "Bangalore Beds";
    outputJsonArray.push(rowJson);
  }

  // get the data for Private hospitals
  var pvtHospData = rows[2].querySelectorAll("tr");
  for (var i = 0; i < pvtHospData.length - 1; i++) {
    var rowJson = {};
    // console.log(pvtHospData[i]);
    var columnData = pvtHospData[i].querySelectorAll("td");
    rowJson["Name"] = columnData[1].innerText;
    rowJson["COVID Beds"] = columnData[12].innerText + "/" + columnData[2].innerText;
    rowJson["HDU Beds"] = columnData[13].innerText + "/" + columnData[3].innerText;
    rowJson["ICU"] = columnData[14].innerText + "/" + columnData[4].innerText;
    rowJson["Ventilator Beds"] = columnData[15].innerText + "/" + columnData[5].innerText;
    rowJson["LAST UPDATED"] = lastUpdated;
    rowJson["Sheet Name"] = "Bangalore Beds";
    outputJsonArray.push(rowJson);
  }

  // get the data for Private medical colleges
  var pvtMedCollegeData = rows[3].querySelectorAll("tr");
  for (var i = 0; i < pvtMedCollegeData.length - 1; i++) {
    var rowJson = {};
    // console.log(pvtMedCollegeData[i]);
    var columnData = pvtMedCollegeData[i].querySelectorAll("td");
    rowJson["Name"] = columnData[1].innerText;
    rowJson["COVID_beds"] = columnData[3].innerText + "/" + columnData[2].innerText;
    rowJson["LAST UPDATED"] = lastUpdated;
    rowJson["Sheet Name"] = "Bangalore Beds";
    outputJsonArray.push(rowJson);
  }
  console.log(JSON.stringify(outputJsonArray));
}

