let started = false;

const start = (branchNumber) => {
  if (!started) {
    started = true;
    fetch(`https://console.dialogflow.com/api-client/demo/embedded/52d9e889-9db3-477d-b0cd-e16039e07af6/demoQuery?q=начал%20ревью%20${branchNumber}&sessionId=1`, { mode: 'no-cors' });
  }
}

const stop = () => {
  if (started) {
    started = false;
    fetch(`https://console.dialogflow.com/api-client/demo/embedded/52d9e889-9db3-477d-b0cd-e16039e07af6/demoQuery?q=закончил%20ревью&sessionId=1`, { mode: 'no-cors' });
  }
}

const getBranch = () => {
  if (document.querySelector('.js-source-branch')) {
    return document.querySelector('.js-source-branch').textContent;
  }

  return '';
}

const branch = getBranch();

if (branch) {
  const branchNumber = branch.substr(-4);
  start(branchNumber);

  document.addEventListener('visibilitychange', () => {
    try {
      if (branch) {
  
        if(document.hidden) {
          stop();
        } else {
          start(branchNumber);
        }
      }
    } catch (e) {
      console.log(e);
    }
  });

  window.addEventListener('beforeunload', () => {
    stop();
  });
}
