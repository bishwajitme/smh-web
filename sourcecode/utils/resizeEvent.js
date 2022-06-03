(function resizeEvent () {
  let timeOutId;
  const resize = {
    trigger: function () {
      const event = document.createEvent('HTMLEvents');
      event.initEvent('window:resize', true, true);
      document.dispatchEvent(event);
    },
    checkResize: function () {
      clearTimeout(timeOutId);
      timeOutId = setTimeout(resize.trigger, 500);
    },
    init: function () {
      window.addEventListener('resize', resize.checkResize);
    },
  };

  resize.init();
})();
