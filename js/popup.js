var currentWord = 0;
var words = [];
var myTimer;

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
  displayNextWord();
}

function displayNextWord(){
  var wpm = $("#wpm").data("wpm");
  if ( wpm == 0) { return; }
  if ( wpm > 0 && currentWord < words.length) {
    word = words[currentWord++];
  } else if(wpm < 0 && currentWord > 0) {
    word = words[currentWord--];
  }
  hasPause = /^\(|[,\.\)]$/.test(word);
  $("#word").html(word);
  positionWord();

  if ((currentWord == words.length && wpm < 0) || (currentWord == 0 && wpm > 0) || (currentWord > 0 && currentWord < words.length))
  {
    var delay = 60000 / Math.abs($("#wpm").data("wpm"));
    myTimer = setTimeout(displayNextWord, delay * (hasPause ? 2 : 1));
  }
};

function fetchHighlightedContent(){
  chrome.tabs.query({active:true, windowId: chrome.windows.WINDOW_ID_CURRENT}, function(tab) {
    chrome.tabs.sendMessage(tab[0].id, {method: "getSelection"}, function(response){
      if(response.data == "") { return; }
      words = response.data.split(/\s+/).map(highlightWord);
      $("#wordCount").html(words.length);
      displayWords();
    });
  });
}

$(document).ready(function() {

});
