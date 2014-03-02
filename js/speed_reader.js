var currentWord = 0;
var words = [];
var myTimer;

function highlightWord(word){
  var center = Math.floor(word.length / 2);
  var letters = word.split('');
  var result = [];
  return letters.map(function(letter, idx){
    if (idx === center){
      return '<span id="speedReaderHighlight">' + letter + '</span>';
    }
    return letter;
  }).join('');
}

function positionWord(){
  wordEl = $("#speedReaderWord")[0];
  highlight = $("#speedReaderHighlight")[0];
  readerEl = $('#speedReaderBox')[0];

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
  wpm = 100;
  if ( wpm > 0 && currentWord < words.length) {
    word = words[currentWord++];
  }
  hasPause = /^\(|[,\.\)]$/.test(word);
  $("#speedReaderWord").html(word);
  positionWord();

  if ((currentWord == words.length && wpm < 0) || (currentWord == 0 && wpm > 0) || (currentWord > 0 && currentWord < words.length))
  {
    // var delay = 60000 / Math.abs($("#wpm").data("wpm"));
    var delay = 60000 / wpm;
    myTimer = setTimeout(displayNextWord, delay * (hasPause ? 2 : 1));
  }
};
