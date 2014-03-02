$(document).ready(function(){
  $(":not(iframe) body").append(' \
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
      selected = window.getSelection().toString();
      words = selected.split(/\s+/).map(highlightWord);
      $("#speedReaderModal").dialog("open");
      displayWords();
    }
  });
});
