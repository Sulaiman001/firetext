'use strict'; 

var editor, toolbar, editWindow;
var storage = navigator.getDeviceStorage("sdcard");

function init() {
  document.location.hash = 'welcome';
  editor = document.getElementById('editor');
  toolbar = document.getElementById('edit-bar');
  editWindow = document.getElementById('edit');
  toolbar.addEventListener(
    'mousedown', function mouseDown(event) {
      event.preventDefault();
      event.target.classList.toggle('active');
    }
  );
  toolbar.addEventListener(
    'mouseup', function mouseDown(event) {
      if (event.target.classList.contains('sticky') != true) {
        event.target.classList.remove('active');
      }
    }
  );
  editWindow.addEventListener(
    'mouseenter', function mouseDown(event) {
      editor.focus();
    }
  );
}

window.addEventListener('hashchange', function() {
  if (location.hash == '#back') {
    window.history.back();
    window.history.back();
  } else if (document.getElementById(location.hash.replace(/#/, ''))) {
    if (document.querySelector('.current')) {    
      document.querySelector('.current').classList.remove('current');
    }
    document.getElementById(location.hash.replace(/#/, '')).classList.add('current');
  } else {
  }
});

function nav(location) {
  document.location.hash = location;
}

function navBack() {
  document.location.hash = 'back';
}
 
function formatDoc(sCmd, sValue) {
  document.execCommand(sCmd, false, sValue);
}  

function saveFromEditor() {
  saveFile(document.getElementById('currentFileName').textContent, editor.innerHTML);
} 

function saveFile(filename, content) {
  var contentBlob = new Blob([content], { "type" : "text\/html" });
  var filePath = ("Documents/" + filename);
  var req = storage.addNamed(contentBlob, filePath);
  req.onsuccess = function () {
    alert('Save successful!');
  };
  req.onerror = function () {
    alert('Save unsuccessful :( \n\nInfo for gurus:\n"' + this.error.name + '"');
  };
}