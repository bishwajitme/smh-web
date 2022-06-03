function createReadableDate (dateString) {
  const monthNames = ['januari', 'februari', 'mars', 'april', 'maj', 'juni',
    'juli', 'augusti', 'september', 'oktober', 'november', 'december',
  ];
  const type = dateString.match(/(\-[0-9]{2})/g).length;
  const date = new Date(dateString);
  const monthName = monthNames[date.getMonth()];
  const day = (type >= 2) ? date.getDate().toString().slice(-2) + ' ' : '';
  const month = (type >= 2) ? monthName + ' '
    : monthName.charAt(0).toUpperCase() + monthName.slice(1) + ' ';
  const year = date.getFullYear();
  return day + month + year;
}

export default createReadableDate;
