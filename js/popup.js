var paused = false;
var currentWord = 0;
var words = [];
var myTimer;
var response;

function highlightWord(word){
  var center = Math.floor(word.length / 2);
  var letters = word.split('');
  var result = [];
  return letters.map(function(letter, idx){
    if (idx === center){
      return '<span class="highlight">' + letter + '</span>';
    }
    return letter;
  }).join('');
}

function positionWord(){
  wordEl = $("#word")[0];
  highlight = $(".highlight")[0];
  readerEl = $('#reader')[0];

  var centerOffsetX = (highlight.offsetWidth / 2) + highlight.offsetLeft;
  var centerOffsetY = (highlight.offsetHeight / 2) + highlight.offsetTop;

  wordEl.style.left = ((readerEl.clientWidth / 2) - centerOffsetX) + 'px';
  wordEl.style.top = ((readerEl.clientHeight / 2) - centerOffsetY) + 'px';
}

function displayWords(){
  clearTimeout(myTimer);
  var delay = 60000 / parseInt($("#wpm").val(), 10);
  var displayNextWord = function(){
    if(paused){return;}
    word = words[currentWord++];
    hasPause = /^\(|[,\.\)]$/.test(word);
    $("#word").html(word);
    positionWord();

    if (currentWord !== words.length){
      myTimer = setTimeout(displayNextWord, delay * (hasPause ? 2 : 1));
    }
  };

  displayNextWord();
}

function controlLogic(){
  if( $("#control").html() == "Start") {
    fetchHighlightedContent();
  } else if ($("#control").html() == "Continue" ) {
    continueWords();
  } else {
    paused = true;
    $("#control").html("Continue");
  }
}

function continueWords(){
  $("#control").html("Pause");
  paused = false;
  displayWords();
}

function fetchHighlightedContent(){
  chrome.tabs.query({active:true, windowId: chrome.windows.WINDOW_ID_CURRENT},
  function(tab) {
    chrome.tabs.sendMessage(tab[0].id, {method: "getSelection"},
    function(response){
      words = response.data.split(/\s+/).map(highlightWord);
      continueWords();
    });
  });
}

$(document).ready(function() {
  $("#control").on('click', function(){
    controlLogic();
  });

  $("#restart").on('click', function(){
    currentWord = 0;
    continueWords();
  });
});
