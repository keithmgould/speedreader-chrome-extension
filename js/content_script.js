$(document).ready(function(){
  $("body").append(' \
    <div id="speedReaderModal" class="reveal-modal"> \
      <div id="speedReaderBox"> \
        <div id="speedReaderWord"></div> \
      </div> \
    </div> \
  ');

  $("#speedReaderModal").dialog({
      autoOpen: false
  });

  chrome.extension.onMessage.addListener(function(msg, sender, sendResponse) {
    if (msg.action == 'open_dialog_box') {
      selected_text = window.getSelection().toString();
      if (selected_text.length == 0)
      {
        alert("Please select the text you would like to speed read before hitting the Speed Reader icon.");
      }else{
        $("#speedReaderModal").dialog("open");
        SpeedReader.displayWords(selected_text);
      }
    }
  });
});
