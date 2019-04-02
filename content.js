function debounce(func, wait, immediate) {
	var timeout;
	return function() {
		var context = this, args = arguments;
		var later = function() {
			timeout = null;
			if (!immediate) func.apply(context, args);
		};
		var callNow = immediate && !timeout;
		clearTimeout(timeout);
		timeout = setTimeout(later, wait);
		if (callNow) func.apply(context, args);
	};
};

let started = false;

const sendToAnton = debounce((branchNumber) => {
  chrome.runtime.sendMessage(branchNumber);
}, 2000);

const start = (branchNumber) => {
  if (!started) {
    started = true;
    sendToAnton(branchNumber);
  }
}

const stop = (branchNumber) => {
  if (started) {
    started = false;
    sendToAnton(branchNumber);
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
  
  if (Number(branchNumber)) {
    start(branchNumber);
  
    document.addEventListener('visibilitychange', () => {
      try {
        if (branch) {
    
          if(document.hidden) {
            stop(branchNumber);
          } else {
            start(branchNumber);
          }
        }
      } catch (e) {
        console.log(e);
      }
    });
  
    window.addEventListener('beforeunload', () => {
      stop(branchNumber);
    });
  }
}
