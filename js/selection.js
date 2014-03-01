chrome.extension.onMessage.addListener(function(request, sender, sendResponse) {
  if (request.method == "getSelection") {
    response = window.getSelection().toString();
    // Some mysterious multiple calls to this listener
    // on various JS heavy websites.
    // Adding this length check to mitigate.
    if(response.length > 1) { sendResponse({data: response }); }
  }
});
