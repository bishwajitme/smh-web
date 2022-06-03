//export function getParam (name) {
//  name = name.replace(/[\[]/, '\\[').replace(/[\]]/, '\\]');
//  const regex = new RegExp('[\\?&]' + name + '=([^&#]*)'),
//        results = regex.exec(document.location.search);
//  return results === null ?
//    ''
//    : decodeURIComponent(results[1].replace(/\+/g, ' '));
//}
//
//export function getParams () {
//  return (document.location.search).replace(/(^\?)/, '')
//    .split('&')
//    .map(function (n) {
//      return n = n.split('='), this[n[0]] = n[1], this
//    }.bind({}))[0];
//}
