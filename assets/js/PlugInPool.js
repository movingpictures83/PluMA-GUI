var expanded = false;
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


// url: "PluMA/PluMA-GUI/Web_Scraping/PluMA/fileCleaning.py ", 
// Update Data in search.
//this should work, but I am getting a stupid function not defined error
function update() {
  $(document).ready(function () {
    $("#load_data").click(function () {
      $.ajax({
        method: "POST",
        url: "PluMA/PluMA-GUI/Web_Scraping/PluMA/fileCleaning.py ",
        data: { "place": value },
        dataType: "text",
        success: function (result) {
          var data = CSV.parse(result);
          console.log(result);
          console.log("Button pressed")
        }
      });
    });
  })
}


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


//PushDown content when advanced search opens.
//=============================================================================================
var acc = document.getElementsByClassName("accordion");
var i;

for (i = 0; i < acc.length; i++) {
  acc[i].addEventListener("click", function () {
    this.classList.toggle("Accordian_Active");
    var panel = this.nextElementSibling;
    if (panel.style.display === "block") {
      panel.style.display = "none";
    } else {
      panel.style.display = "block";
    }
  });
}

// Accordian button size
function myFunction(id) {
  var x = document.getElementById(id);
  if (x.className.indexOf("w3-show") == -1) {
    x.className += " w3-show";
  } else {
    x.className = x.className.replace(" w3-show", "");
  }
}

// Filters out the text as user types in search 
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
      var table_data = 'there are no matches';
      if (typeof answer[0] !== 'undefined') {
        table_data = '<table class="table table-bordered table-striped">';
        for (var j = 0; j < answer.length; j+= 2) {
          table_data += '<tr>';
          table_data += '<td>' + answer[j] + '</td>';
          table_data += '<td>' + answer[j+1] + '</td>';
          table_data += '</tr>';
        }
        table_data += '</table>';
      }

      $('#details_table').html(table_data);


      // return dataArray;
    }
  });
}




