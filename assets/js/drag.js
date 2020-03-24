// const { ipcRenderer } = require('electron')


// var fs = require('fs');

// 				fs.writeFile("/plugins.txt", content, function (err){
// 					if (err) {
// 						console.log(err);
// 					} else {
// 						console.log("File saved");
// 					}
// 				});

// /* Drag and drop code */
// const fill = document.querySelector('.file_drag_area');
// const empties = document.querySelectorAll('.empty');
// const realFilebtn = document.getElementById('real-file');
// const customBtn = document.getElementById('custom-button');
// const customTxt = document.getElementById('custom-text');

// customBtn.addEventListener("click", function(){
//   realFilebtn.click();

// });

// realFilebtn.addEventListener("change", function(){
//   if(realFilebtn.value){
//     customTxt.innerHTML = realFilebtn.value.match(/[\/\\]([\w\d\s\.\-\(\)]+)$/)[1];
//   }
//   else{
//     customTxt.innerHTML = "No file chosen";
//   }
// });

// //Fill listeners
// fill.addEventListener('dragstart', dragStart);
// fill.addEventListener('dragend', dragEnd); 

// for(const empty of empties){
//     empty.addEventListener('dragover', dragOver);
//     empty.addEventListener('dragenter', dragEnter);
//     empty.addEventListener('dragleave', dragLeave);
//     empty.addEventListener('drop', dragDrop);
 
// }

// function dragStart() {
//   this.className += ' hold';
//   setTimeout(() => (this.className = 'invisible'), 0);
// }

// function dragEnd(){
//   this.className = 'fill'; 
// }

// function dragOver(e){
//   e.preventDefault(); 
// }

// function dragEnter(e){
//   e.preventDefault(); 
//   this.className += ' hovered';
// }

// function dragLeave(){
//   this.className = 'empty';
// }

// function dragDrop(){
//   this.className = 'empty';
//   this.append(fill);  
// }

// (function(){
//   var dropzone = document.getElementById("dropzone");

//   dropzone.ondragover = function(){
//     this.className = 'dropzone dragover'
//     return false;
//   }

//   dropzone.ondragleave = function(){
//     this.className = 'dropzone'
//     return false;
//   }
// }());