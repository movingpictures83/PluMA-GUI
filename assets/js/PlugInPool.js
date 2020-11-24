var local = localStorage.getItem('favorites');
var favoritePlugins = [];
if (local != undefined || local != null) {
  favoritePlugins = local.split(',');
}
var expanded = false;
var recentPlugins = [];

function showCheckboxes() {
  var checkboxes = document.getElementById("checkboxes");

  if (!expanded) {
    checkboxes.style.display = "block";
    expanded = true;

  } else {
    checkboxes.style.display = "none";
    expanded = false;
  }
}

function openTheWindow(){
  var exec = require('child_process').exec;

  // child = exec('cd ./Web_Scraping/PluMA/ & python fileCleaning.py',
  //     function (error, stdout, stderr) {
  //         console.log('stdout: ' + stdout);
  //         console.log('stderr: ' + stderr);
  //         if (error !== null) {
  //              console.log('exec error: ' + error);
  //         }
  //     });

  exec('cd ../../ & git clone https://github.com/movingpictures83/PluMA-GUI.git')

}


function showRecentlyUsed() {
  if (recentPlugins == undefined || recentPlugins.length === 0) { //first time opening app
    local = localStorage.getItem('recentlyUsed'); //load up the saved content
    if (local != undefined || local != null) { //if there is saved content
      local = local.split(',');
      for (var i = 0; i < local.length; i++) {
        addToRecentlyUsed(local[i]); //update the class array
      }
    }
  }
  //when we finish loading
  var table_data = '';
  if (recentPlugins === undefined || recentPlugins.length == 0) {
    table_data += '<tr><td>Start using plugins to fill up this table!</td></tr>'; //if there is no content
  }
  else {
    for (var i = 0; i < 3; i++) {
      if (recentPlugins[i] === undefined) {
        table_data += '<tr><td>Start using plugins to fill up this row!</td></tr>'; //some content is not present
      }
      else {
        table_data += `<tr><td>${recentPlugins[i]}</td></tr>`; //content is present
      }
    }
  }
  $('#recentlyUsed').html(table_data); //show data
}

function writeFullTable() {
  $.ajax({
    url: "./Web_Scraping/PluMA/results.csv",
    dataType: "text",
    success: function (data) {
      var pluginDetails = data.split(/\r?\n|\r/);
      var date;

      var table_data = '<table class="table table-bordered table-striped">';

      for (var count = 0; count < pluginDetails.length; count++) {
        if (count == pluginDetails.length - 1) {
          date = pluginDetails[count]
          break;
        }
        var cell_data = pluginDetails[count].split(/[,]+/)
        table_data += '<tr>';
        if (cell_data.length >= 3) {
          cell_data[1] = cell_data[1].replace(/^"|"$/g, '');
          var site = cell_data[3] + '.git'; //need to use this to clone repo
          cell_data = cell_data.splice(0, 2);

          for (var cell_count = 0; cell_count < cell_data.length; cell_count++) {
            if (cell_count == 0) {
              if (favoritePlugins.includes(cell_data[cell_count])) {
                table_data += `<td class='starFavorites' id=${cell_data[cell_count]}>` + `<button onclick="return favorite(${cell_data[cell_count]})"> <img src='starFavorites.png' height="15" width="15"></img></button>` + '</td>';
              }
              else {
                table_data += `<td class='starFavorites' id=${cell_data[cell_count]}>` + `<button onclick="return favorite(${cell_data[cell_count]})"> <img src='star-image.png' height="15" width="15"></img></button>` + '</td>';
              }
              table_data += `<td draggable="true" ondragstart="dragPlugin(event)"><a onclick="addToRecentlyUsed('${cell_data[cell_count]}', '${site}');">` + cell_data[cell_count] + '</a></td>';
            }
            else {
              table_data += '<td>' + cell_data[cell_count] + '</td>';
            }
          }
          table_data += '</tr>';
        }
      }

      table_data += '</table>';
      $('#details_table').html(table_data);
      document.getElementById("getMeTime").innerHTML = date;
    }
  });
}

function addToRecentlyUsed(plugin, site = "") {
  if (recentPlugins != undefined && !recentPlugins.includes(plugin)) { //if there is content
    recentPlugins.push(plugin); //push new content in
    if (recentPlugins.length == 4) {
      recentPlugins.shift(); //delete old content 
    }
  }
  else { //if there isnt content 
    recentPlugins = [plugin]; //make new content
  }
  showRecentlyUsed();

  //download plugin
  if (site != "") {
    //here is where the ajax code will go
    console.log('request');
  }
  return false;
}

// Recently Used Plugins
//=============================================================================================
/* When the user clicks on the button, 
toggle between hiding and showing the dropdown content */
function RUT() {
  document.getElementById("myDropdown").classList.toggle("RUT_show");
}

// Close the dropdown if the user clicks outside of it
window.onclick = function (event) {
  if (!event.target.matches('.RUT_dropbtn')) {
    var dropdowns = document.getElementsByClassName("RUT_dropdown-content");
    var i;
    for (i = 0; i < dropdowns.length; i++) {
      var openDropdown = dropdowns[i];
      if (openDropdown.classList.contains('RUT_show')) {
        openDropdown.classList.remove('RUT_show');
      }
    }
  }
}

//PushDown content - ENDS
//=============================================================================================

// Accordion button size
function iPushContent(id) {
  var x = document.getElementById(id);
  if (x.className.indexOf("w3-show") == -1) {
    x.className += " w3-show";
  } else {
    x.className = x.className.replace(" w3-show", "");
  }
}


function updateTable(answer, flag = false) {
  var table_data = 'No matches found';

  if (typeof answer[0] !== 'undefined') {
    table_data = '<table class="table table-bordered table-striped">';
    for (var j = 0; j < answer.length; j += 2) {
      table_data += '<tr>';
      if (favoritePlugins.includes("")) {
        favoritePlugins.splice(favoritePlugins.indexOf(""), 1);
      }
      if (flag && favoritePlugins.includes(answer[j]) && answer[j] != "") {
        table_data += `<td class='starFavorites' id=${answer[j]}>` + `<button onclick="return favorite(${answer[j]})"> <img src='starFavorites.png' height="15" width="15"></img></button>` + '</td>';
      }
      else if (!flag && favoritePlugins.includes(answer[j][0]) && answer[j] != [""]) {
        table_data += `<td class='starFavorites' id=${answer[j]}>` + `<button onclick="return favorite(${answer[j]})"> <img src='starFavorites.png' height="15" width="15"></img></button>` + '</td>';
      }
      else {
        table_data += `<td class='starFavorites' id=${answer[j]}>` + `<button onclick="return favorite(${answer[j]})"> <img src='star-image.png' height="15" width="15"></img></button>` + '</td>';
      }
      table_data += `<td draggable="true" ondragstart="dragPlugin(event)"><a onclick="addToRecentlyUsed('${answer[j]}');">` + answer[j] + '</a></td>';
      table_data += '<td>' + answer[j + 1] + '</td>';
      table_data += '</tr>';
    }
    table_data += '</table>';
  }
  $('#details_table').html(table_data);
}

// Filters out the text as user types in search 
//=============================================================================================
function startFiltering() {
  var dataArray = [];
  $.ajax({
    url: "Web_Scraping/PluMA/results.csv",
    dataType: "text",
    success: function (data) {
      var pluginDetails = data.split(/\r?\n|\r/);
      for (var count = 0; count < pluginDetails.length; count++) {
        var cell_data = pluginDetails[count].split(/[/,]+/)
        if (cell_data.length >= 3) {
          cell_data[1] = cell_data[1].replace(/^"|"$/g, '');
          var names = cell_data.splice(0, 1);
          dataArray.push(names);
          var descriptions = cell_data.splice(0, 1);
          dataArray.push(descriptions);
        }
      }

      var input;
      input = document.getElementById("myInput");

      var found = dataArray.filter(el => String(el).toLowerCase().includes(input.value.toLowerCase()));

      var answer = [];

      for (var i = 0; i < found.length; i++) {
        if (dataArray.indexOf(found[i]) % 2 == 0) { //it is a name
          answer.push(dataArray[dataArray.indexOf(found[i])])
          answer.push(dataArray[dataArray.indexOf(found[i]) + 1])
        }
        else { //it is a description
          answer.push(dataArray[dataArray.indexOf(found[i]) - 1])
          answer.push(dataArray[dataArray.indexOf(found[i])])
        }
      }

      let uniqueAnswers = answer.filter((c, index) => {
        return answer.indexOf(c) === index;
      });

      updateTable(uniqueAnswers);
    }
  });
}

// Check box >> trigger filter
//=============================================================================================
function checkboxClicked() {
  var fileconverters = document.getElementById("fileconverters");
  var transformations = document.getElementById("transformations");
  var correlation = document.getElementById("correlation");
  var visualization = document.getElementById("visualization");
  var dissimilarity = document.getElementById("dissimilarity");
  var centrality = document.getElementById("centrality");
  var clustering = document.getElementById("clustering");
  var timeseries = document.getElementById("timeseries");
  var externaltools = document.getElementById("externaltools");
  var statistics = document.getElementById("statistics");
  var miscellaneous = document.getElementById("miscellaneous");
  var favorites = document.getElementById("favorites");

  var checked = [];

  // If the checkbox is checked, display the output text
  if (fileconverters.checked) {
    checked.push("File Converters");
  }
  if (transformations.checked) {
    checked.push("Transformations");
  }
  if (correlation.checked) {
    checked.push("Correlation");
  }
  if (visualization.checked) {
    checked.push("Visualization");
  }
  if (dissimilarity.checked) {
    checked.push("Dissimilarity");
  }
  if (centrality.checked) {
    checked.push("Centrality");
  }
  if (clustering.checked) {
    checked.push("Clustering");
  }
  if (timeseries.checked) {
    checked.push("Time Series");
  }
  if (externaltools.checked) {
    checked.push("External Tools");
  }
  if (statistics.checked) {
    checked.push("Statistics");
  }
  if (miscellaneous.checked == true) {
    checked.push("Miscellaneous");
  }
  if (favorites.checked == true) {
    checked.push("Favorites");
  }

  var dataArray = []
  $.ajax({
    url: "Web_Scraping/PluMA/results.csv",
    dataType: "text",
    success: function (data) {
      var pluginDetails = data.split(/\r?\n|\r/);
      for (var count = 0; count < pluginDetails.length; count++) {
        var cell_data = pluginDetails[count].split(/[,]+/)
        cell_data[1] = cell_data[1].replace(/^"|"$/g, '');
        if (cell_data.length >= 3 && cell_data.some(r => checked.includes(r))) {
          dataArray.push(cell_data[0]);
          dataArray.push(cell_data[1]);
        }
        if (checked.includes("Favorites") && cell_data.some(f => favoritePlugins.includes(f))) {
          dataArray.push(cell_data[0]);
          dataArray.push(cell_data[1]);
        }
      }

      if (dataArray === undefined || dataArray.length == 0) {
        writeFullTable();
      }
      else {
        updateTable(dataArray, true);
      }
    }
  });
}

function favorite(plugin) {
  if (!favoritePlugins.includes(plugin.id)) {
    favoritePlugins.push(plugin.id);
  }
  else {
    favoritePlugins.splice(favoritePlugins.indexOf(plugin.id), 1);
  }
  return false;
}

window.onbeforeunload = closingCode;
function closingCode() {
  localStorage.setItem('favorites', favoritePlugins);
  localStorage.setItem('recentlyUsed', recentPlugins);
  return null;
}
