
function padTo2Digits(num: number) {
  return num.toString().padStart(2, '0');
}

// Формат = "YYYY-MM-DD hh:mm:ss"
// You can tweak the format easily
export function formatDate(date: Date) {
  return (
    [
      date.getFullYear(),
      padTo2Digits(date.getMonth() + 1),
      padTo2Digits(date.getDate()),
    ].join('-') +
    ' ' +
    [
      padTo2Digits(date.getHours()),
      padTo2Digits(date.getMinutes()),
      padTo2Digits(date.getSeconds()),
    ].join(':')
  );
}

export default formatDate