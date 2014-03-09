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
        <button id="speedReaderControl">Start</button> \
      </div> \
      <div id="speedReaderDashboard"> \
        Time Remaining: <span id="speedReaderTimeRemaining"></span> \
      </div> \
    </div> \
  ');

  $("#speedReaderModal").dialog({
      autoOpen : false,
      resizable : false,
      close : function(event, ui){
        SpeedReader.pause();
      }
  });

  // Bindings
  $("#speedReaderSlower").on("click", function(){
    var new_wpm = SpeedReader.changeSpeed(-50);
    $("#speedReaderWpm").html(new_wpm);
  });

  $("#speedReaderFaster").on("click", function(){
    var new_wpm = SpeedReader.changeSpeed(50);
    $("#speedReaderWpm").html(new_wpm);
  });

  $("#speedReaderControl").on("click", function(){
    switch($(this).html())
    {
    case "Start":
      $(this).html("Pause");
      SpeedReader.resume();
      break;
    case "Pause":
      $(this).html("Continue");
      SpeedReader.pause();
      break;
    case "Continue":
      $(this).html("Pause");
      SpeedReader.resume();
      break;
    }
  })

  chrome.extension.onMessage.addListener(function(msg, sender, sendResponse) {
    if (msg.action == 'open_dialog_box') {
      var selection = window.getSelection();
      selected_text = selection.toString();
      if (selected_text.length == 0)
      {
        alert("Please select the text you would like to speed read before hitting the Speed Reader icon.");
      }else{
        $( "#speedReaderModal" ).dialog({
          position: {
            my: 'center',
            at: 'center',
            of: selection.getRangeAt(0).startContainer.parentNode
          }
        });
        $("#speedReaderModal").dialog("open");
        SpeedReader.displayWords(selected_text);
      }
    }
  });
});
