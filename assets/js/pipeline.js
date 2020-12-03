function addHorizontalPlugin(i) {
    var outerDiv = document.createElement("div");
    outerDiv.id = "plugin";
    var inputDiv = document.createElement("div");
    inputDiv.style = "margin-top:100px; margin-left:50px;";
    var buttonInput = document.createElement("input");
    buttonInput.type = "file";
    buttonInput.id = "input-file";
    buttonInput.hidden = "hidden";
    inputDiv.appendChild(buttonInput);
    var buttonInputButton = document.createElement("button");
    buttonInputButton.type = "button";
    buttonInputButton.id = "custom-IFB";
    buttonInputButton.textContent = "Input File";
    inputDiv.appendChild(buttonInputButton);
    outerDiv.appendChild(inputDiv);
    var innerDiv = document.createElement("div");
    innerDiv.className = "empty";
    innerDiv.id = "file";
    var deleteImg = document.createElement("img");
    deleteImg.src = "trash.png";
    deleteImg.id = "deleteButton"
    deleteImg.onclick = function () { deletePlugin(this) };
    innerDiv.appendChild(deleteImg);
    outerDiv.appendChild(innerDiv);
    var outputDiv = document.createElement("div");
    outputDiv.id = "upload-output-file";
    outputDiv.style = "margin-left:55px; margin-top: 5px;"
    var buttonOutput = document.createElement("input");
    buttonOutput.type = "file";
    buttonOutput.id = "output-file";
    buttonOutput.hidden = "hidden";
    outputDiv.appendChild(buttonOutput);
    var buttonOutputButton = document.createElement("button");
    buttonOutputButton.type = "button";
    buttonOutputButton.id = "custom-OFB-blue";
    buttonOutputButton.textContent = "Output File";
    outputDiv.appendChild(buttonOutputButton);
    outerDiv.appendChild(outputDiv);
    var br = document.createElement("br");
    outerDiv.appendChild(br);
    ((i.parentNode)).appendChild(outerDiv);
    setColors(i); 
}

function deletePlugin(i) {
    (((i.parentNode).parentNode).parentNode).removeChild(i.parentNode.parentNode)
    setColors(i);
}

function deleteStage(i) {
    (i.parentNode.parentNode).removeChild(i.parentNode);
    setColors(i);
}

function setColors(i) {
    var pluginVertical = document.querySelectorAll("#pluginVertical");
    pluginVertical.forEach(function (vplugin) {
        horizontalPlugin = vplugin.querySelectorAll("#plugin");
        horizontalPlugin.forEach(function (hplugin) {
            var buttons = hplugin.querySelectorAll("button");
            if (horizontalPlugin.length <= 1) {
                buttons[0].id = "custom-IFB-gray";
                buttons[1].id = "custom-OFB-gray";

            }
            else if (horizontalPlugin.length > 1) {
                buttons[0].id = "custom-IFB";
                buttons[1].id = "custom-OFB";
            }
            if (vplugin.previousElementSibling != null && vplugin.previousElementSibling.querySelectorAll("#plugin").length > 1) {
                buttons[0].id = "custom-IFB";
            }
        })
    })
    pluginVertical[0].querySelector("#plugin").querySelector("button").id = "custom-IFB";
    var lastButtons = pluginVertical[pluginVertical.length - 1].querySelectorAll("button");
    lastButtons[1].id = "custom-OFB-blue";
}

function addPluginBox(i) {
    var outerDiv = document.createElement("div");
    outerDiv.id = "pluginVertical";
    var plus = document.createElement("img");
    plus.src = "plus_sign.png";
    plus.id = "plus-sign";
    plus.onclick = function () { addHorizontalPlugin(this) };
    outerDiv.appendChild(plus);
    var minus = document.createElement("img");
    minus.id = "minus-sign";
    minus.src = "minus_sign.png";
    minus.onclick = function () { deleteStage(this) };
    outerDiv.appendChild(minus);
    var pluginDiv = document.createElement("div");
    pluginDiv.id = "plugin";
    var inputDiv = document.createElement("div");
    inputDiv.style = "margin-top:100px; margin-left:50px;";
    var buttonInput = document.createElement("input");
    buttonInput.type = "file";
    buttonInput.id = "input-file";
    buttonInput.hidden = "hidden";
    inputDiv.appendChild(buttonInput);
    var buttonInputButton = document.createElement("button");
    buttonInputButton.type = "button";
    buttonInputButton.id = "custom-IFB"
    buttonInputButton.textContent = "Input File";
    inputDiv.appendChild(buttonInputButton);
    pluginDiv.appendChild(inputDiv);
    var innerDiv = document.createElement("div");
    innerDiv.className = "empty";
    innerDiv.id = "file";
    var deleteImg = document.createElement("img");
    deleteImg.src = "trash.png";
    deleteImg.id = "deleteButton"
    deleteImg.onclick = function () { deletePlugin(this) };
    innerDiv.appendChild(deleteImg);
    pluginDiv.appendChild(innerDiv);
    var outputDiv = document.createElement("div");
    outputDiv.id = "upload-output-file";
    outputDiv.style = "margin-left:55px; margin-top: 5px;";
    var buttonOutput = document.createElement("input");
    buttonOutput.type = "file";
    buttonOutput.id = "output-file";
    buttonOutput.hidden = "hidden";
    outputDiv.appendChild(buttonOutput);
    var buttonOutputButton = document.createElement("button");
    buttonOutputButton.type = "button";
    buttonOutputButton.id = "custom-OFB";
    buttonOutputButton.textContent = "Output File";
    outputDiv.appendChild(buttonOutputButton);
    pluginDiv.appendChild(outputDiv);
    var br = document.createElement("br");
    pluginDiv.appendChild(br);
    outerDiv.appendChild(pluginDiv);
    document.getElementById("top-column").appendChild(outerDiv);
    setColors(i);
}

//to generate config file
//once the save button is clicked, the filenames are saved into a text file

function parseInput(event) {
    var fs = require('fs');
    var data = document.getElementById("file").textContent;
    // var inputName = document.getElementById("custom-IFB-text").textContent;
    // var outputName = document.getElementById("custom-OFB-text").textContent;

    var cl = document.getElementById("file").className;
    var cl2 = document.getElementsByClassName("empty");

    //inputName = inputName.trim()
    fs.writeFileSync('assets/config.txt', (err) => { throw err });

    data = data.trim();
    fs.appendFileSync('assets/config.txt', data + "\n", (err) => { throw err });

    for (var i = 0; i < document.getElementsByClassName("empty").length; i++) {
        var n = document.getElementsByClassName("empty")[i].textContent;
        n = n.trim();
        fs.appendFileSync('assets/config.txt', n + "\n", (err) => { throw err });
    }
    //outputName = outputName.trim()
    fs.appendFileSync('assets/config.txt', (err) => { throw err });
    alert("Data has been saved. Running PluMA...");

    //call pluma
}

//calls function at the start of draggging the function
document.addEventListener("dragstart", function (event) {
    // sets the data type and the value of the dragged filename
    event.dataTransfer.setData("text", event.target.textContent);
    // Changes the opacity of the draggable element
    event.target.style.opacity = "0.4";
    dragged = event.target;

});


//Resets the opacity to 1
document.addEventListener("dragend", function (event) {
    event.target.style.opacity = "1";
});


//The border is changed when the dragged filename enters the file_drag_area classes
document.addEventListener("dragenter", function (event) {
    if (event.target.className == "file_drag_area" || event.target.className == "empty") {
        event.target.style.border = "3px dotted black";
    }
});


//allows user to dragover filenames
document.addEventListener("dragover", function (event) {
    event.preventDefault();
});

//the border is set back to normal once the filenames are dragged out of the empty class
document.addEventListener("dragleave", function (event) {
    event.target.style.border = "";

});

//generates random hash string for temporary filenames
function hash(s) {
    return s.split("").reduce(
        function (a, b) {
            a = ((a << 5) - a) + b.charCodeAt(0); return a & a
        }, 0);
}

//the filenames in the empty classes are ready to be parsed
//when dropped into the boxes
document.addEventListener("drop", function (event) {
    event.preventDefault();
    if (event.target.className == "file_drag_area" || event.target.className == "empty") {
        event.target.style.backgroundColor = "#FFFFE0";
        event.target.style.border = "";
        var node = document.createElement("UL");
        var tempNode = document.createElement("UL");
        node.id = "plugin";
        node.setAttribute('draggable', true);
        var d = document.createTextNode(event.dataTransfer.getData("text"));
        var random = hash(Math.random().toString(2));
        var temp = "\n" + random.toString();
        temp += ".CSV";
        var tempText = document.createTextNode(temp);
        node.appendChild(d);
        tempNode.appendChild(tempText);
        event.target.appendChild(node);
        event.target.appendChild(tempNode);
        console.log(tempNode);
        tempNode.style.visibility = "hidden";
    }

    if (dragged.className = "empty") {
        dragged.parentNode.removeChild(dragged);
    }

});

//changes opacity when draggable element enters trash can div
function dragenter(ev) {
    ev.target.style.opacity = "0.4";
}

//changes opacity when draggable element leaves trash can div
function dragleave(ev) {
    ev.target.style.opacity = "1";
}

//changes opacity when dragging ends
function dragend(ev) {
    ev.target.style.opacity = "1";
}
