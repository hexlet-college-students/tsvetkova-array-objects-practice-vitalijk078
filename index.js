const normalizeData = (content) => content.trim().split('\n').slice(1).map((str) => {
  const temp = str.split(';'); // перевели строки в масив
  const newStr = temp.map((elem) => Number(elem) || elem); // переводим строки в числа
  return newStr;
});
const getHighrRuating = (data) => data.reduce((top, now) => (top[2] < (now[2] + now[3]) ? [now[0], now[1], now[2] + now[3]] : top), ['name', 'dev', 0]);
const getMaxIndia = (data) => data.reduce((mx, now) => Math.max(mx, now[6]), 0);

const getMinIndia = (data) => data.reduce((mx, now) => Math.min(mx, now[6]), Infinity);
// trim() -
// split() -
// map()- пвраметр внутри map, функция где двойной параметр
// task 1
const tableParsing = (content) => {
  const data = normalizeData(content);
  // console.log(data);

  const topM = getHighrRuating(data);
  console.log(`General top messenger: ${topM[0]}, Owner: ${topM[1]}`);

  const [mx, mn] = [getMaxIndia(data), getMinIndia(data)];
  console.log(`Download count: Max count: ${mx}, Min count: ${mn}`);
};

// task 2
const candidateAssessment = (/* content */) => {

};

// task 3
const actorRating = (/* content */) => {

};

export { tableParsing, candidateAssessment, actorRating };
