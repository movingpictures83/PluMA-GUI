var expanded = false;
function showCheckboxes(){
    var checkboxes = document.getElementById("checkboxes");
    if (!expanded) {
        checkboxes.style.display = "block";
        expanded = true;
    }else{
        checkboxes.style.display = "none";
        expanded = false;
    }
}





// Handling plug-ins & Description tables dynamically
//=============================================================================================



// Recently Used Plugins
//=============================================================================================
/* When the user clicks on the button, 
toggle between hiding and showing the dropdown content */
function myFunction() {
    document.getElementById("myDropdown").classList.toggle("RUT_show");
  }
  
  // Close the dropdown if the user clicks outside of it
  window.onclick = function(event) {
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
    acc[i].addEventListener("click", function() {
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


