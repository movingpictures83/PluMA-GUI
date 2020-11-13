var local = localStorage.getItem('favorites');
var favoritePlugins = local.split(',');
var expanded = false;
local = localStorage.getItem('recentlyUsed');
var recentPlugins = new Queue();
if(local){
  local = local.split(',');
  for(var i in local){
    recentPlugins.addToRecentlyUsed(i);
  }
}

function Queue() { 
  var a = [], 
  b = 0; 
  this.getLength = function () { return a.length - b }; 
  this.isEmpty = function () { return 0 == a.length }; 
  this.enqueue = function (b) { a.push(b) }; 
  this.dequeue = function () { 
      if (0 != a.length) { 
          var c = a[b]; 
          2 * ++b >= a.length && (a = a.slice(b), b = 0); 
          return c 
      } 
  }; 
  this.peek = function () { 
      return 0 < a.length ? a[b] : void 0 
  } 
};

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

function showRecentlyUsed(){
  var table_data = '';
  if(recentPlugins.getLength() == 0){
    table_data += '<tr><td>Start using plugins to fill up this table!</td></tr>';
  }
  else{
    for(var i=0; i<3; i++){
      table_data += `<tr><td>${recentPlugins[i]}</td></tr>`;
    }
  }
						// <tr>
						// 	<td>This will be a plugin using C++ for synthesizers.</td>
						// </tr>
						// <tr>
						// 	<td>This will be a plugin using C++ for synthesizers.</td>
						// </tr>
  $('#recentlyUsed').html(table_data);
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
				table_data += `<td class='starFavorites' id=${cell_data[cell_count]}>` + `<button onclick="return favorite(${cell_data[cell_count]})"> <img src='starFavorites.png' height="15" width="15"></img></button>` + '</td>';
              table_data += `<td><a onclick="addToRecentlyUsed('${cell_data[cell_count]}');">` + cell_data[cell_count] + '</a></td>';     
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

 function addToRecentlyUsed(plugin) {
   if(recentPlugins.length == 3){
     recentPlugins.dequeue();
   }
  recentPlugins.enqueue(plugin.id);
  showRecentlyUsed();
  return false;
// const child_process = require("child_process");
//   child_process.exec(`git clone ${url}`, {
//     cwd: "/Users/edwardpalermo/Desktop/seniorProject/PluMA/plugins"
//   }, (error, stdout, stderr) => {
    
//     if (error) {
//       dialog.showMessageBox({
//         type: "error",
//         title: "Plugin download error",
//         message: `Plugin was already downloaded at ${url} \n\n ${stderr} ${error}`
//       })
//       return;
//     }

//     dialog.showMessageBox({
//       type: "info",
//       title: "Plugin download success",
//       message: "Plugin was successfully downloaded in the installed plugin list!"
//     });
//   });
}//we don't need this

// url: "PluMA/PluMA-GUI/Web_Scraping/PluMA/fileCleaning.py ", 
// Update Data in search.
//this should work, but I am getting a stupid function not defined error
// function update() {
//   $(document).ready(function () {
//     $("#load_data").click(function () {
//       $.ajax({
//         method: "POST",
//         url: "PluMA/PluMA-GUI/Web_Scraping/PluMA/fileCleaning.py ",
//         data: { "place": value },
//         dataType: "text",
//         success: function (result) {
//           var data = CSV.parse(result);
//           console.log(result);
//           console.log("Button pressed")
//         }
//       });
//     });
//   })
// }


// Handling plug-ins & Description tables dynamically
//=============================================================================================



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

// Button opens down advance search
//=============================================================================================
//   let dropdownBtn = document.querySelector('.InsideSearch_menu-btn');
//   let menuContent = document.querySelector('.InsideSearch_menu-content');
//   dropdownBtn.addEventListener('click',()=>{
//      if(menuContent.style.display===""){
//         menuContent.style.display="block";
//      } else {
//         menuContent.style.display="";
//      }
//   })


//PushDown content when advanced search opens - STARTS
//=============================================================================================
// var acc = document.getElementsByClassName("accordion");
// var i;

// for (i = 0; i < acc.length; i++) {
//   acc[i].addEventListener("click", function () {
//     this.classList.toggle("Accordian_Active");
//     var panel = this.nextElementSibling;
//     if (panel.style.display === "block") {
//       panel.style.display = "none";
//     } else {
//       panel.style.display = "block";
//     }
//   });
// }


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



// Alternates color inside the table 
// var NodeGit = require("nodegit");
// var cloneURL = "https://github.com/movingpictures83/";




function updateTable(answer) {
  var table_data = 'No matches found';

  if (typeof answer[0] !== 'undefined') {
    table_data = '<table class="table table-bordered table-striped">';
    for (var j = 0; j < answer.length; j += 2) {
      table_data += '<tr>';
      table_data += `<td class='starFavorites' id=${answer[j]}>` + `<button onclick="return favorite(${answer[j]})">` + `<img src='starFavorites.png' alt="star" height="15" width="15"></img></button>` + '</td>';
      //Amanda needs to fix this table_data += `<td><a onclick="openTheWindow('${site}');">` + cell_data[cell_count] + '</a></td>';     
      table_data += '<td>' + answer[j] + '</td>';
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

      updateTable(answer);
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
        if (cell_data.length >= 3 && cell_data.some(r => checked.includes(r))) {
          cell_data[1] = cell_data[1].replace(/^"|"$/g, '');
          dataArray.push(cell_data[0]);
          dataArray.push(cell_data[1]);
        }
        if(checked.includes("Favorites") && cell_data.some(f => favoritePlugins.includes(f))){
          cell_data[1] = cell_data[1].replace(/^"|"$/g, '');
          dataArray.push(cell_data[0]);
          dataArray.push(cell_data[1]);
        }
      }

      if(dataArray === undefined || dataArray.length == 0){
        writeFullTable();
      }
      else{
        updateTable(dataArray);
      }
    }
  });
}

function favorite(plugin){
  favoritePlugins.push(plugin.id);
  return false;
}

window.onbeforeunload = closingCode;
function closingCode(){
  localStorage.setItem('favorites', favoritePlugins);
  localStorage.setItem('recentlyUsed', recentPlugins);
   return null;
}
