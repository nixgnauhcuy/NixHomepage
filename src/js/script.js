window['webgl-fluid'].default(document.querySelector('canvas'));
document.querySelector('main')
  .addEventListener('mousemove', event => {
    newEvent = new event.constructor(
      event.type, event);
    document.querySelector('canvas')
      .dispatchEvent(newEvent);
});