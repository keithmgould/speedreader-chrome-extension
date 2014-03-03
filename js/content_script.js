$(document).ready(function(){
  $("body").append(' \
    <div id="speedReaderModal" class="reveal-modal"> \
      <div id="speedReaderBox"> \
        <div id="speedReaderWord"></div> \
      </div> \
      <div id="speedReaderSpeedPanel"> \
        <button id="speedReaderSlower"><<</button> \
        <span id="speedReaderWpm">100</span> \
        <button id="speedReaderFaster">>></button> \
      </div> \
    </div> \
  ');

  $("#speedReaderModal").dialog({
      autoOpen: false
  });

  $("#speedReaderSlower").on("click", function(){
    var new_wpm = SpeedReader.slowDown();
    $("#speedReaderWpm").html(new_wpm);
  });

  $("#speedReaderFaster").on("click", function(){
    var new_wpm = SpeedReader.speedUp();
    $("#speedReaderWpm").html(new_wpm);
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
