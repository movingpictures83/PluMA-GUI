
var savedPath = "../plugins/";

function loadSettings(){
  local = localStorage.getItem('savedPath');
  if (local != undefined || local != "null" || local != null || local != "" || !local.includes("../plugins/")) {
    document.getElementById("nameField").placeholder = local;
    savedPath = local;
  }
  else {
    document.getElementById("nameField").placeholder = savedPath;
  }
}

function saveSettings() {
    var nameField = document.getElementById('nameField').value;
    if (nameField.length < 3) {
      result.textContent = 'Path must contain at least 3 characters';
    } else {
      result.textContent = 'Your path is: ' + nameField;
      savedPath = nameField;
    }
    
    return false;
  }

  
window.onbeforeunload = closingCode;
function closingCode() {
  localStorage.setItem('savedPath', savedPath);
  return null;
}