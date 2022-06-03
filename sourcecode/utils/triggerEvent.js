function triggerEvent (e) {
  const event = document.createEvent('HTMLEvents');
  event.initEvent(e, true, true);
  document.dispatchEvent(event);
}

export default triggerEvent;
