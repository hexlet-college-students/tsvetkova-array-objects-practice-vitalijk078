const normalizeData = (content) => content.trim().split('\n').slice(1).map((str) => {
  const temp = str.split(';'); // перевели строки в масив
  const newStr = temp.map((elem) => Number(elem) || elem); // переводим строки в числа
  return newStr;
});
const getHighrRuating = (data) => data.reduce((top, now) => (top[2] < (now[2] + now[3]) ? [now[0], now[1], now[2] + now[3]] : top), ['name', 'dev', 0]);
const getMaxIndia = (data) => data.reduce((mx, now) => Math.max(mx, now[6]), 0);

const getMinIndia = (data) => data.reduce((mx, now) => Math.min(mx, now[6]), Infinity);

const getPopAustralia = (data) => {
  const sortDlAustr = data.map((item) => Number(item[5])).sort((a, b) => b - a);
  const downloadAust = data.map((item) => Number(item[5]));
  const sortedTop3 = [
    data[downloadAust.indexOf(sortDlAustr[0])][0],
    data[downloadAust.indexOf(sortDlAustr[1])][0],
    data[downloadAust.indexOf(sortDlAustr[2])][0],
  ];
  return sortedTop3.sort();
};
const numberOfDownload = (data) => {
  const averNumberOfDl = data.reduce((acc, item) => {
    const count = (Number(item[4]) + Number(item[5]) + Number(item[6]) + Number(item[7])) / 4;
    acc.push(count);
    return acc;
  }, []);

  const averNumberName = averNumberOfDl.reduce((acc, item) => {
    const nameApp = data[averNumberOfDl.indexOf(item)][0];
    acc.push([item, nameApp]);
    return acc;
  }, []);

  averNumberOfDl.sort((a, b) => a - b);

  const namesAverDl = averNumberOfDl.reduce((acc, item) => {
    const nameApp = averNumberName.filter((num) => num[0] === item);
    acc.push(nameApp[0][1]);
    return acc;
  }, []);

  return namesAverDl.join(', ');
};

const topOwner = (data) => {
  const owners = data.reduce((acc, item) => {
    const owner = item[1];
    if (!Object.hasOwn(acc, owner)) {
      acc[owner] = 0;
    }
    acc[owner] += 1;
    return acc;
  }, {});

  const ownersFilt = Object.entries(owners).filter((item) => item[1] >= 2);

  const topOwners = ownersFilt.map((item) => item[0]).join(', ');
  return topOwners;
};

// trim() -
// split() -
// map()- пвраметр внутри map, функция где двойной пара--метр
// task 1
const tableParsing = (content) => {
  const data = normalizeData(content);
  // console.log(data);

  const topM = getHighrRuating(data);
  console.log(`General top messenger: ${topM[0]}, Owner: ${topM[1]}`);

  const [mx, mn] = [getMaxIndia(data), getMinIndia(data)];
  console.log(`Download count: Max count: ${mx}, Min count: ${mn}`);

  const [top1, top2, top3] = getPopAustralia(data);
  console.log(`Top-3 Australia: ${top1}, ${top2}, ${top3}`);

  const names = numberOfDownload(data);
  console.log(`Top downloads: ${names}`);

  const owners = topOwner(data);
  console.log(`Top owner: ${owners}`);
};

// task 2

const normalizeDataJob = (content) => {
  const data = content.split('\n');
  return data.map((item) => item.split(','));
};

const getNameSurname = (data) => {
  const [name, post] = [data[0], data[1]];
  return [name, post];
};

const frames = ['React', 'Angular', 'Vue.js', 'JQuery', 'Backbone.js', 'Node.js', 'Ember.js', 'Meteor'];

const getFrames = (data) => {
  const framesToLower = frames.map((item) => item.trim().toLowerCase());
  const framesNospace = data[5].map((item) => item.trim().toLowerCase());
  const listFrames = framesNospace.filter((item) => framesToLower.includes(item));
  return listFrames.length;
};
const getGitName = (data) => {
  const socials = data[4].join(',').split(':')[1].split(',').map((item) => item.trim());
  const linkName = socials.map((item) => item.split('.')).filter((item) => item[0] === 'github').flat();
  const name = linkName[1].split('/')[1];
  return name;
};
const calculateTime = (data) => {
  const newInfo = data[6];

  const dateRanges = [];
  const pattern = /\d{2}\.\d{2}\.\d{4} - \d{2}\.\d{2}\.\d{4}/g;

  newInfo.forEach((line) => {
    const foundRanges = line.match(pattern);
    if (foundRanges) {
      dateRanges.push(...foundRanges);
    }
  });

  const milliseconds = dateRanges.map((info) => {
    const newData = info.split(' - ');
    const start = newData[0].split('.').map((number) => Number(number));
    const end = newData[1].split('.').map((number) => Number(number));

    const startMilisec = Date.parse(new Date(start[2], start[1], start[0]));
    const endMilisec = Date.parse(new Date(end[2], end[1], end[0]));

    const res = endMilisec - startMilisec;

    return res;
  }).reduce((acc, num) => num + acc, 0);

  const millisecondsInYear = 365.25 * 24 * 60 * 60 * 1000; // Учитываем високосные годы
  const millisecondsInMonth = 30.44 * 24 * 60 * 60 * 1000; // Среднее количество дней в месяце

  const years = Math.floor(milliseconds / millisecondsInYear);
  const remainingMillisecondsAfterYears = milliseconds % millisecondsInYear;
  const months = Math.floor(remainingMillisecondsAfterYears / millisecondsInMonth);

  return { years, months };
};

const getWorkPlace = (data) => {
  const str = data[7].join('');
  const educationPlaces = str.split(':')[1].split(';').map((place) => {
    const s = place.trim().split(' ');
    const name = `${s[0]} ${s[1]}`;
    return name;
  }).sort();

  return educationPlaces;
};

// task 2
const candidateAssessment = (content) => {
  const data = normalizeDataJob(content);

  const [name, post] = getNameSurname(data);
  console.log(`Job seeker: ${name[0]}, ${post[0]}`);

  const numOfFrames = getFrames(data);
  console.log(`Required stack: ${numOfFrames}`);

  const nickName = getGitName(data);
  console.log(`GitHub nickname: ${nickName}`);

  const timeWorked = calculateTime(data);
  console.log(`Experience: ${timeWorked.years} years ${timeWorked.months} months`);

  const workedPlace = getWorkPlace(data);
  console.log(`Education: ${workedPlace.join(', ')}`);
};

// task 3
const actorRating = (/* content */) => {

};

export {
  tableParsing, candidateAssessment, actorRating,
};
