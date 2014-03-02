$(document).ready(function(){
  $("body").append(' \
    <div id="speedReaderModal" class="reveal-modal"> \
      <h1>Modal Title</h1> \
      <p id="speedReaderContent"></p> \
    </div> \
  ');

  $("#speedReaderModal").dialog({
      height: 140,
      modal: true,
      autoOpen: false
  });

  chrome.extension.onMessage.addListener(function(msg, sender, sendResponse) {
    if (msg.action == 'open_dialog_box') {
      selected = window.getSelection().toString();
      $("#speedReaderContent").html(selected);
      $("#speedReaderModal").dialog("open");
    }
  });
});
