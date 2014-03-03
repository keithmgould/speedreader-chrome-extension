var SpeedReader = {
  currentWord : 0,
  words : [],
  myTimer : null,
  wpm : 100,


  // Each word has a red letter towards the center of the
  // word.  This method finds and highlights that letter.
  highlightWord : function(word) {
    var center = Math.floor(word.length / 2);
    var letters = word.split('');
    var result = [];
    return letters.map(function(letter, idx){
      if (idx === center){
        return '<span id="speedReaderHighlight">' + letter + '</span>';
      }
      return letter;
    }).join('');
  },


  // Each word's red letter must be in the same horizontal
  // position, which is achieved by pushing the word left
  // or right.  This method does the pushing.
  positionWord : function(){
    wordEl = $("#speedReaderWord")[0];
    highlight = $("#speedReaderHighlight")[0];
    readerEl = $('#speedReaderBox')[0];

    var centerOffsetX = (highlight.offsetWidth / 2) + highlight.offsetLeft;
    var centerOffsetY = (highlight.offsetHeight / 2) + highlight.offsetTop;

    wordEl.style.left = ((readerEl.clientWidth / 2) - centerOffsetX) + 'px';
    wordEl.style.top = ((readerEl.clientHeight / 2) - centerOffsetY) + 'px';
  },

  // Each time the Speed Reader icon is clicked,
  // this methid is called.
  displayWords : function(selected_text){
    // clearTimeout(myTimer);
    words = selected_text.split(/\s+/).map(this.highlightWord);
    currentWord = 0;
    this.displayNextWord();
  },

  // This method displays the next word and sets
  // the timer for prep for the following word.
  displayNextWord : function(){
    if (currentWord < words.length) {
      word = words[currentWord++];
    }
    var hasPause = /^\(|[,\.\)]$/.test(word);
    $("#speedReaderWord").html(word);
    this.positionWord();

    if (currentWord < words.length)
    {
      // var delay = 60000 / Math.abs($("#wpm").data("wpm"));
      var delay = 60000 / this.wpm;
      that = this;
      myTimer = setTimeout(function() { that.displayNextWord(); }, delay * (hasPause ? 2 : 1));
    }
  },

  slowDown : function(){
    console.log("slowing down");
    this.wpm = this.wpm - 50;
    if(this.wpm < 0) {this.wpm = 0;}
    return this.wpm;
  },

  speedUp : function(){
    console.log("speeding up");
    this.wpm = this.wpm + 50;
    if(this.wpm > 1000){ this.wpm = 1000;}
    return this.wpm;
  }

};
