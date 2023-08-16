const { strictEqual } = require('./util/test');

// Write a function, which takes a non-negative integer (seconds) as input and returns the time in a human-readable format (HH:MM:SS)
//
// HH = hours, padded to 2 digits, range: 00 - 99
// MM = minutes, padded to 2 digits, range: 00 - 59
// SS = seconds, padded to 2 digits, range: 00 - 59
//
// The maximum time never exceeds 359999 (99:59:59)

function humanReadable0(seconds) {
  const padToTwo = number => number < 10 ? `0${number}` : number;

  const maxSecond = 1;
  const maxMinute = 60;
  const maxHour = 60 * 60;
  const maxParts = [maxHour, maxMinute, maxSecond];

  let secondsToSubtract = 0;

  const parts = maxParts.map((maxPart) => {
    const part = Math.floor((seconds - secondsToSubtract) / maxPart);
    if (part >= 1) {
      secondsToSubtract += maxPart * part;
    }
    return part;
  });
  const [hours, minutes, secs] = parts;

  return `${padToTwo(hours)}:${padToTwo(minutes)}:${padToTwo(secs)}`;
}

function humanReadable1(seconds) {
  const maxParts = [60 * 60, 60, 1]; // [maxHour, maxMinute, maxSecond];
  let secondsToSubtract = 0;

  const parts = maxParts.map((maxPart) => {
    const part = Math.floor((seconds - secondsToSubtract) / maxPart);
    if (part >= 1) {
      secondsToSubtract += maxPart * part;
    }
    return `${part < 10 ? `0${part}` : part}`;
  });

  return parts.join(':');
}

function humanReadable(seconds) {
  const maxParts = [60 * 60, 60, 1]; // [maxHour, maxMinute, maxSecond];

  const parts = maxParts.map((maxPart) => {
    const part = Math.floor(seconds / maxPart);
    seconds -= maxPart * part;
    return `${part < 10 ? `0${part}` : part}`;
  });

  return parts.join(':');
}

strictEqual(humanReadable(0), '00:00:00', 'humanReadable(0)');
strictEqual(humanReadable(59), '00:00:59', 'humanReadable(59)');
strictEqual(humanReadable(60), '00:01:00', 'humanReadable(60)');
strictEqual(humanReadable(90), '00:01:30', 'humanReadable(90)');
strictEqual(humanReadable(3599), '00:59:59', 'humanReadable(3599)');
strictEqual(humanReadable(3600), '01:00:00', 'humanReadable(3600)');
strictEqual(humanReadable(45296), '12:34:56', 'humanReadable(45296)');
strictEqual(humanReadable(86399), '23:59:59', 'humanReadable(86399)');
strictEqual(humanReadable(86400), '24:00:00', 'humanReadable(86400)');
strictEqual(humanReadable(359999), '99:59:59', 'humanReadable(359999)');
