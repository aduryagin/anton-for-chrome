chrome.runtime.onMessage.addListener(
  function(branchNumber, sender, sendResponse) {
    fetch(encodeURI(`https://console.dialogflow.com/api-client/demo/embedded/52d9e889-9db3-477d-b0cd-e16039e07af6/demoQuery?q=идет ревью для ${branchNumber}&sessionId=1`, { mode: 'no-cors' }));
  }
)
