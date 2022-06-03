export default function(e) {
  switch (e.which) {
    case 38:
      return 'up';
    case 40:
      return 'down';
    case 13:
      return 'enter';
    case 9:
      return 'tab';
    default:
      return null;
  }
}
