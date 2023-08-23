const { strictEqual } = require('./util/test');

// Write a function called sumIntervals/sum_intervals that accepts an array of intervals, and returns the sum of all the
// interval lengths. Overlapping intervals should only be counted once.
//
// Intervals
//  Intervals are represented by a pair of integers in the form of an array. The first value of the interval will always
//  be less than the second value. Interval example: [1, 5] is an interval from 1 to 5. The length of this interval is 4.
//
// Overlapping Intervals
//  List containing overlapping intervals:
//
//   [
//     [1, 4],
//     [7, 10],
//     [3, 5]
//   ]
//
//  The sum of the lengths of these intervals is 7. Since [1, 4] and [3, 5] overlap, we can treat the interval as [1, 5],
//  which has a length of 4.
//
// Examples:
//   sumIntervals( [
//     [1, 2],
//     [6, 10],
//     [11, 15]
//   ] ) => 9
//
// sumIntervals( [
//   [1, 4],
//   [7, 10],
//   [3, 5]
// ] ) => 7
//
// sumIntervals( [
//   [1, 5],
//   [10, 20],
//   [1, 6],
//   [16, 19],
//   [5, 11]
// ] ) => 19
//
// sumIntervals( [
//   [0, 20],
//   [-100000000, 10],
//   [30, 40]
// ] ) => 100000030
//
// Tests with large intervals
//  Your algorithm should be able to handle large intervals. All tested intervals are subsets
//  of the range [-1000000000, 1000000000].

// Stack implementation
function sumIntervals0(intervals) {
  let originalSize;
  do {
    originalSize = intervals.length;
    for (let i = 0; i < originalSize; i++) {
      let isIncluded = false;
      let [min, max] = intervals.shift();

      for (let i = 0; i < intervals.length; i++) {
        const [intervMin, intervMax] = intervals[i];

        // Included
        if ((min >= intervMin) && (max <= intervMax)) {
          isIncluded = true;
          break;
        }

        // Intersects
        if (((min < intervMin) && (max >= intervMin)) || ((min <= intervMax) && (max > intervMax))) {
          min = Math.min(min, intervMin);
          max = Math.max(max, intervMax);
        }
      }

      if (!isIncluded) {
        intervals.push([min, max]);
      }
    }
  } while (intervals.length > 1 && intervals.length < originalSize);

  return intervals.reduce((acc, [min, max]) => {
    acc = acc + Math.abs(max - min);
    return acc;
  }, 0);
}

// Swap implementation + shift()
function sumIntervals1(intervals) {
  let originalSize = intervals.length;
  for (let i = 0; i < originalSize - 1; i++) {
    let doSave = true;
    let [min, max] = intervals.shift();

    for (let j = 0; j < intervals.length; j++) {
      const [intervMin, intervMax] = intervals[j];

      // Included inside other interval
      if ((min >= intervMin) && (max <= intervMax)) {
        doSave = false;
        break;
      }

      // Includes other interval
      if ((intervMin >= min) && (intervMax <= max)) {
        intervals[j] = [min, max];
        doSave = false;
        break;
      }

      // Intersects
      if (((min < intervMin) && (max >= intervMin)) || ((min <= intervMax) && (max > intervMax))) {
        min = Math.min(min, intervMin);
        max = Math.max(max, intervMax);
        intervals[j] = [min, max];
        doSave = false;
      }
    }

    if (doSave) {
      intervals.push([min, max]);
    }
  }

  return intervals.reduce((acc, [min, max]) => {
    acc = acc + Math.abs(max - min);
    return acc;
  }, 0);
}

// Single array + optimize SUM - OPTIMIZED & FASTEST
function sumIntervals(intervals) {
  let sum = 0;
  let borderIndex = 0;
  let startIndex = borderIndex;
  while (startIndex < intervals.length) {
    let [min, max] = intervals[startIndex];
    sum = sum + Math.abs(max - min);

    let currentIndex = startIndex + 1;
    while (currentIndex < intervals.length) {
      const [intervMin, intervMax] = intervals[currentIndex];

      // Included inside other interval
      if ((min >= intervMin) && (max <= intervMax)) {
        sum = sum - Math.abs(max - min);
        intervals[startIndex] = intervals[borderIndex];
        borderIndex++;
        break;
      }

      // Includes other interval
      if ((intervMin >= min) && (intervMax <= max)) {
        intervals[currentIndex] = [min, max];
        sum = sum - Math.abs(max - min);
        intervals[startIndex] = intervals[borderIndex];
        borderIndex++;
        break;
      }

      // Intersects
      if (((min < intervMin) && (max >= intervMin)) || ((min <= intervMax) && (max > intervMax))) {
        sum = sum - Math.abs(max - min);
        min = Math.min(min, intervMin);
        max = Math.max(max, intervMax);
        intervals[currentIndex] = [min, max];
        intervals[startIndex] = intervals[borderIndex];
        borderIndex++;
        break;
      }
      currentIndex++;
    }

    startIndex++;
  }

  return sum;
}

// Single array + indexes, swap only
function sumIntervals2(intervals) {
  let sum = 0;
  let borderIndex = 0;
  let startIndex = borderIndex;
  while (startIndex < intervals.length) {
    let [min, max] = intervals[startIndex];

    let currentIndex = startIndex + 1;
    while (currentIndex < intervals.length) {
      const [intervMin, intervMax] = intervals[currentIndex];

      // Included inside other interval
      if ((min >= intervMin) && (max <= intervMax)) {
        intervals[startIndex] = intervals[borderIndex];
        borderIndex++;
        break;
      }

      // Includes other interval
      if ((intervMin >= min) && (intervMax <= max)) {
        intervals[currentIndex] = [min, max];
        intervals[startIndex] = intervals[borderIndex];
        borderIndex++;
        break;
      }

      // Intersects
      if (((min < intervMin) && (max >= intervMin)) || ((min <= intervMax) && (max > intervMax))) {
        min = Math.min(min, intervMin);
        max = Math.max(max, intervMax);
        intervals[currentIndex] = [min, max];
        intervals[startIndex] = intervals[borderIndex];
        borderIndex++;
        break;
      }
      currentIndex++;
    }

    startIndex++;
  }

  for (let i = borderIndex; i < intervals.length; i++) {
    const [min, max] = intervals[i];
    sum = sum + Math.abs(max - min);
  }

  return sum;
}

// Stack implementation slice() instead of shift()
function sumIntervals3(intervals) {
  let originalSize;
  do {
    originalSize = intervals.length;
    for (let i = 0; i < originalSize; i++) {
      let isIncluded = false;
      // let [min, max] = intervals.shift();
      let [min, max] = intervals.at(0);
      intervals = intervals.slice(1);

      for (let i = 0; i < intervals.length; i++) {
        const [intervMin, intervMax] = intervals[i];

        // Included
        if ((min >= intervMin) && (max <= intervMax)) {
          isIncluded = true;
          break;
        }

        // Intersects
        if (((min < intervMin) && (max >= intervMin)) || ((min <= intervMax) && (max > intervMax))) {
          min = Math.min(min, intervMin);
          max = Math.max(max, intervMax);
        }
      }

      if (!isIncluded) {
        intervals.push([min, max]);
      }
    }
  } while (intervals.length > 1 && intervals.length < originalSize);

  return intervals.reduce((acc, [min, max]) => {
    acc = acc + Math.abs(max - min);
    return acc;
  }, 0);
}

// Stack implementation OPT sum
function sumIntervals4(intervals) {
  let originalSize;
  let sum;
  do {
    sum = 0;
    originalSize = intervals.length;
    for (let i = 0; i < originalSize; i++) {
      let isIncluded = false;
      let [min, max] = intervals.shift();

      for (let i = 0; i < intervals.length; i++) {
        const [intervMin, intervMax] = intervals[i];

        // Included
        if ((min >= intervMin) && (max <= intervMax)) {
          isIncluded = true;
          break;
        }

        // Intersects
        if (((min < intervMin) && (max >= intervMin)) || ((min <= intervMax) && (max > intervMax))) {
          min = Math.min(min, intervMin);
          max = Math.max(max, intervMax);
        }
      }

      if (!isIncluded) {
        intervals.push([min, max]);
        sum = sum + Math.abs(max - min);
      }
    }
  } while (intervals.length > 1 && intervals.length < originalSize);

  return sum;
}

// Stack implementation, INDEXES only
function sumIntervals5(intervals) {
  let sum;
  let originalSize = 0;
  let startIndex = 0;
  let prevReducedSize = 0;
  let reducedSize = intervals.length - startIndex;
  do {
    sum = 0;
    startIndex = originalSize;
    prevReducedSize = reducedSize;
    originalSize = intervals.length;
    for (let i = startIndex; i < originalSize; i++) {
      let isIncluded = false;
      let [min, max] = intervals[i];

      for (let j = i + 1; j < intervals.length; j++) {
        const [intervMin, intervMax] = intervals[j];

        // Included
        if ((min >= intervMin) && (max <= intervMax)) {
          isIncluded = true;
          break;
        }

        // Intersects
        if (((min < intervMin) && (max >= intervMin)) || ((min <= intervMax) && (max > intervMax))) {
          min = Math.min(min, intervMin);
          max = Math.max(max, intervMax);
        }
      }

      if (!isIncluded) {
        intervals.push([min, max]);
        sum = sum + Math.abs(max - min);
      }
    }

    reducedSize = intervals.length - originalSize;
  } while (reducedSize > 1 && reducedSize < prevReducedSize);

  return sum;
}

// Stack implementation slice() on step
function sumIntervals6(intervals) {
  let originalSize;
  let sum;
  do {
    sum = 0;
    originalSize = intervals.length;
    for (let i = 0; i < originalSize; i++) {
      let isIncluded = false;
      let [min, max] = intervals[i];

      for (let j = i + 1; j < intervals.length; j++) {
        const [intervMin, intervMax] = intervals[j];

        // Included
        if ((min >= intervMin) && (max <= intervMax)) {
          isIncluded = true;
          break;
        }

        // Intersects
        if (((min < intervMin) && (max >= intervMin)) || ((min <= intervMax) && (max > intervMax))) {
          min = Math.min(min, intervMin);
          max = Math.max(max, intervMax);
        }
      }

      if (!isIncluded) {
        intervals.push([min, max]);
        sum = sum + Math.abs(max - min);
      }
    }

    intervals = intervals.slice(originalSize);
  } while (intervals.length < originalSize && intervals.length > 1);

  return sum;
}

// Reduced new array
function sumIntervals6(intervals) {
  let originalSize;
  let sum;
  do {
    sum = 0;
    originalSize = intervals.length;
    const reduced = [];
    for (let i = 0; i < originalSize; i++) {
      let isIncluded = false;
      let [min, max] = intervals[i];

      for (let j = i + 1; j < intervals.length; j++) {
        const [intervMin, intervMax] = intervals[j];

        // Included
        if ((min >= intervMin) && (max <= intervMax)) {
          isIncluded = true;
          break;
        }

        // Intersects
        if (((min < intervMin) && (max >= intervMin)) || ((min <= intervMax) && (max > intervMax))) {
          min = Math.min(min, intervMin);
          max = Math.max(max, intervMax);
        }
      }

      if (!isIncluded) {
        intervals.push([min, max]);
        reduced.push([min, max]);
        sum = sum + Math.abs(max - min);
      }
    }

    // intervals = intervals.slice(originalSize);
    intervals = reduced;
  } while (intervals.length < originalSize && intervals.length > 1);

  return sum;
}

// Failed case
strictEqual(sumIntervals([
  [1, 4],
  [7, 10],
  [3, 5],
]), 7);
strictEqual(sumIntervals([
  [ 0, 20 ],
  [ -100000000, 10 ],
  [ 30, 40 ],
]), 100000030);

// Basic case
strictEqual(sumIntervals([
  [1, 5],
  [10, 20],
  [1, 6],
  [16, 19],
  [5, 11]
]), 19);

// Small Random Tests
strictEqual(sumIntervals([
  [ -8, -4 ],   [ 17, 19 ],
  [ 15, 16 ],   [ -4, 5 ],
  [ -15, -9 ],  [ 6, 12 ],
  [ -20, -10 ], [ 16, 21 ],
  [ -10, 0 ],   [ 0, 7 ]
]), 38);

strictEqual(sumIntervals([
  [15, 21],
  [-20, 5],
  [-20, 12]
]), 38);

// should return the correct sum for non overlapping intervals
strictEqual(sumIntervals([[1, 5]]), 4);
strictEqual(sumIntervals([[1, 5], [6, 10]]), 8);

// should return the correct sum for overlapping intervals
strictEqual(sumIntervals([[1, 5], [1, 5]]), 4);
strictEqual(sumIntervals([[1, 4], [7, 10], [3, 5]]), 7);

// should return the correct sum for large intervals
let intervals = [
  { intervals: [[-1e9, 1e9]], sum: 2e9 },
  {
    intervals: [
      [0, 20],
      [-1e8, 10],
      [30, 40]
    ], sum: 1e8 + 30
  }
];
for (let i = 0; i < intervals.length; i++) {
  strictEqual(sumIntervals(intervals[i].intervals), intervals[i].sum);
}


// BIG array
const intervalsList = [
  [-432489641, -432196023],
  [-200487718, -200351672],
  [819604784, 819946644],
  [-720112731, -719439042],
  [-225490853, -225125898],
  [-331396192, -330766755],
  [670182875, 670921858],
  [-405988737, -405831020],
  [110108040, 110751078],
  [429487773, 429793305],
  [-480508610, -480266278],
  [-123561582, -123006513],
  [7719288, 7959019],
  [357985906, 358369293],
  [-553342221, -552971482],
  [-429565822, -429048724],
  [-360899337, -360503519],
  [151613539, 152250642],
  [-346271351, -346100631],
  [889188961, 889543118],
  [468370697, 468617651],
  [-807639613, -806817372],
  [-933595530, -933351938],
  [53684428, 54159546],
  [-617957292, -617333443],
  [704116326, 705038095],
  [-625989351, -625804209],
  [884650088, 885157643],
  [-741344708, -740730181],
  [430511836, 430763545],
  [153728320, 153926545],
  [156271462, 156554675],
  [241132522, 242072256],
  [777731071, 778318520],
  [506132721, 506883391],
  [-824686386, -823851601],
  [-989655002, -989478740],
  [425384734, 426358580],
  [889352682, 890201329],
  [296552202, 297107489],
  [347308783, 348301522],
  [-154907211, -154718809],
  [-690800295, -690451945],
  [-852395833, -851606439],
  [12749526, 12870244],
  [308606963, 309536777],
  [-573121229, -572529379],
  [-464732676, -463754061],
  [-441726063, -441603654],
  [284021797, 284948519],
  [-72101996, -71807426],
  [114882127, 115319665],
  [939571733, 940440977],
  [-254870401, -254652433],
  [-868522510, -868122404],
  [318268760, 318952623],
  [111357129, 112187043],
  [-907450890, -906641270],
  [-902283722, -901303723],
  [-945717563, -944717844],
  [988776011, 989318420],
  [-745831646, -745183699],
  [-401102695, -400730443],
  [-587628134, -586879782],
  [38513427, 39097243],
  [335131950, 335739953],
  [-291984840, -291124388],
  [-311563402, -311359201],
  [-342342574, -341620864],
  [184424946, 184532096],
  [21137843, 21870353],
  [-977296218, -976353231],
  [-848759732, -848266775],
  [-142287156, -141974164],
  [188685104, 188958743],
  [458167207, 458617039],
  [838681763, 838823567],
  [699044058, 699908134],
  [971032408, 971268989],
  [-135737823, -135588250],
  [25220340, 25747653],
  [-835618012, -834703451],
  [138057593, 138299823],
  [914829875, 915722916],
  [-179793469, -179189661],
  [434027062, 434373676],
  [-135395883, -134719888],
  [-425480828, -425231131],
  [-615573474, -615360077],
  [280249709, 280763523],
  [114506457, 114670651],
  [759764469, 760688036],
  [-342926574, -342311682],
  [-554806497, -554307597],
  [305348409, 305560853],
  [224669823, 225037200],
  [-492055702, -491655984],
  [94300874, 95171995],
  [354526498, 354981761],
  [-449622690, -448695242],
  [119239214, 120225337],
  [487531581, 488192811],
  [154703592, 154950069],
  [-665454717, -664724672],
  [976844687, 977550046],
  [-855684171, -855469407],
  [-158832214, -158324013],
  [-596382785, -596083392],
  [-409544145, -409436949],
  [-899537926, -899328263],
  [-989073481, -988516646],
  [-214389438, -213561111],
  [849558004, 850255668],
  [-578415899, -578058997],
  [-209189934, -208488295],
  [688817646, 689307657],
  [-769737593, -769601083],
  [-972779521, -972587199],
  [-551292504, -550850720],
  [377767104, 378260262],
  [923566136, 924402798],
  [291164014, 291975181],
  [-149003398, -148349475],
  [705724768, 706353945],
  [-566585996, -565731856],
  [513789165, 514696333],
  [264970150, 265847016],
  [247543166, 247746714],
  [936352635, 936635453],
  [427139290, 427944797],
  [-373057669, -372947742],
  [104749176, 105601556],
  [955347042, 955764905],
  [785624426, 785815571],
  [-575873878, -574951568],
  [-10419538, -9953919],
  [439950067, 440535904],
  [786097109, 786718484],
  [-601852688, -600969474],
  [-937655900, -937435646],
  [-187448405, -187287495],
  [374348433, 374788862],
  [-103015047, -102819212],
  [-983068730, -982879157],
  [863694, 1604870],
  [-120527037, -119826741],
  [-783340892, -782924571],
  [-966638024, -966335773],
  [218411007, 219377044],
  [-280526254, -280382743],
  [-34270316, -33871833],
  [-816972926, -816001092],
  [479554645, 480107151],
  [496676012, 497349271],
  [-587833322, -587509699],
  [-901954100, -901629932],
  [-856699358, -855762866],
  [-403444299, -402751302],
  [-499325245, -498997487],
  [518783342, 519405071],
  [293131042, 293542337],
  [452459032, 452702116],
  [824817574, 825370707],
  [813678037, 814589032],
  [-672219657, -671876713],
  [827540393, 827839596],
  [33433673, 33961920],
  [-777646461, -777364174],
  [54832079, 55386959],
  [-863675344, -863361646],
  [375212465, 376076138],
  [-15220684, -14492788],
  [-23506209, -23285878],
  [394254566, 394358065],
  [-271951832, -271685133],
  [-664419835, -664181117],
  [-880682550, -880423428],
  [261166652, 262070069],
  [-783826877, -783355874],
  [-412427097, -411831217],
  [-612926529, -612157436],
  [420448027, 421436559],
  [-711080978, -710713121],
  [-864784537, -863824704],
  [-903241660, -902847751],
  [-890401516, -889623470],
  [710946602, 711428706],
  [-677208105, -676263193],
  [-316788425, -316040354],
  [532243492, 533228225],
  [383553406, 384444384],
  [624570330, 625434083],
  [-649550716, -649080582],
  [-558175695, -557932491],
  [-264145533, -263408561],
  [400545530, 401134622],
  [-260438763, -259549635],
  [-493379116, -492906799],
  [487632094, 488061171],
  [-296778626, -296495531],
  [-963559235, -963083761],
  [-810239719, -809649535],
  [423511346, 424459387],
  [428948575, 429902348],
  [-168912794, -168137753],
  [412977316, 413568704],
  [-328949352, -328218111],
  [359841123, 360389352],
  [58327616, 59068312],
  [-79766409, -78810514],
  [-290546826, -290284569],
  [267883674, 268049368],
  [231824532, 232311401],
  [946999752, 947755431],
  [-113656647, -113447981],
  [106356508, 107344284],
  [317717794, 318600747],
  [-502890050, -502774096],
  [794580813, 795440600],
  [-814736022, -814034425],
  [-451027602, -450755229],
  [335046213, 335399255],
  [688560788, 688764799],
  [984651098, 985469839],
  [917811353, 918752291],
  [-931432914, -930482059],
  [151228643, 152040483],
  [737237324, 737411905],
  [776809944, 777531911],
  [754242647, 754466701],
  [300871493, 301276637],
  [201985694, 202119896],
  [520723948, 521071087],
  [313171834, 313478080],
  [-222302395, -221872197],
  [-397667257, -397013329],
  [667102124, 667745348],
  [-964257170, -963732052],
  [-430035995, -429379018],
  [989544319, 990213112],
  [-905152961, -904722565],
  [-837829589, -837063076],
  [-974257076, -974023625],
  [-731404436, -730760135],
  [403695300, 404167949],
  [-6047932, -5360772],
  [642218670, 642869267],
  [-989949174, -989261756],
  [264852075, 265441073],
  [887141289, 887759277],
  [-997416982, -997147198],
  [-593312573, -593175157],
  [663304323, 663473305],
  [-694805498, -694126260],
  [-252544749, -252229403],
  [835476718, 836370941],
  [807255255, 807721867],
  [120087345, 120674464],
  [787971105, 788632520],
  [-850818064, -850440703],
  [762713482, 763538476],
  [-546374015, -546268774],
  [274535648, 275496169],
  [-695919652, -694958334],
  [-606569677, -606392545],
  [-87098867, -86804892],
  [-687577273, -687143750],
  [-332855383, -332479026],
  [27248435, 28087723],
  [-580668795, -579684627],
  [-959248712, -958580789],
  [100257301, 100872746],
  [45114695, 45517298],
  [117264537, 117683502],
  [-424676784, -424574929],
  [-966316789, -965988436],
  [426571062, 427027959],
  [906994318, 907768965],
  [-519768038, -519265569],
  [-494580606, -494272165],
  [270962027, 271560895],
  [-668049926, -667830926],
  [249778839, 250390227],
  [781437402, 782405095],
  [-62805892, -62608723],
  [-898366169, -898200296],
  [-479555043, -478565216],
  [-843343265, -842414395],
  [826818718, 827675236],
  [178225637, 178701645],
  [542145132, 542674706],
  [181457572, 182073034],
  [-301802063, -301478346],
  [-43167952, -42897133],
  [707402061, 707547080],
  [157625038, 158009197],
  [498167998, 498876521],
  [990511758, 991181578],
  [-605040139, -604113262],
  [-48315811, -47540052],
  [594454779, 595024635],
  [-838236344, -838047185],
  [-236492770, -235560050],
  [27553569, 27976914],
  [593769796, 593909492],
  [308366576, 308888028],
  [358799567, 359283976],
  [-538233020, -537832865],
  [-484738097, -484024254],
  [322001088, 322600521],
  [422586130, 422949976],
  [428352434, 428817990],
  [-444299313, -444107237],
  [-784505100, -784304664],
  [558280031, 558419229],
  [-218133653, -217282335],
  [666512184, 666881444],
  [278830763, 279115988],
  [-924674852, -924084603],
  [-226246979, -225671761],
  [-873324118, -872993464],
  [736435931, 736944964],
  [-940730973, -940580048],
  [856060864, 856970758],
  [-442130142, -441258223],
  [847670712, 848640067],
  [-326574964, -325836699],
  [-773991423, -773725188],
  [-337927522, -337480438],
  [-450017104, -449554103],
  [622639968, 623140960],
  [-819561942, -818749262],
  [74604414, 75518148],
  [-183305398, -182593877],
  [-420623324, -420386875],
  [-440382724, -439804292],
  [26403117, 26944864],
  [-469143892, -468301660],
  [715128091, 715237797],
  [-716737832, -716163591],
  [-775425782, -774617226],
  [-221203412, -220359836],
  [-29533967, -28673517],
  [-836274, -312406],
  [824803860, 825085713],
  [-690632612, -689908392],
  [-632744516, -632297081],
  [-673883645, -673610255],
  [570292480, 571288078],
  [-372002187, -371862426],
  [67424573, 67952645],
  [-829153199, -828959047],
  [-248846445, -248372849],
  [-89886690, -89438966],
  [121299002, 121666647],
  [56783420, 57219747],
  [675852723, 676381585],
  [240373288, 240530564],
  [-359604792, -359322791],
  [-924409472, -923527781],
  [-316876132, -316197853],
  [52910624, 53505733],
  [15699956, 16051525],
  [-560592645, -559782612],
  [807565797, 807681182],
  [-72381436, -71912984],
  [398337051, 398947160],
  [51342420, 51572159],
  [291098128, 291416281],
  [554528391, 555164337],
  [-963024908, -962229093],
  [-77125230, -76703084],
  [218167003, 218500510],
  [179397982, 180103680],
  [537128876, 538092921],
  [-673729059, -673496828],
  [-729608811, -729101882],
  [-917686785, -917074152],
  [-735462743, -735246083],
  [603373672, 603742999],
  [-614356391, -614112733],
  [481585259, 482059331],
  [592070967, 592452560],
  [-47597515, -46625605],
  [-978258874, -978044201],
  [360919491, 361221302],
  [-885939532, -885337692],
  [468476552, 468585284],
  [-981941499, -981258077],
  [-581451566, -580759158],
  [-99914462, -99325588],
  [-586084634, -585199816],
  [185945306, 186299055],
  [621216637, 621919294],
  [-291760394, -290990296],
  [456882367, 457162265],
  [-56708877, -56522198],
  [805792478, 806032486],
  [528631839, 528912813],
  [-511372431, -510591692],
  [-612450424, -611703364],
  [-733107644, -732622680],
  [642992327, 643137953],
  [-194266764, -194139515],
  [447793929, 448024305],
  [-628450843, -627889946],
  [-410409016, -410257064],
  [24783986, 25564344],
  [509592792, 510210301],
  [-496704089, -496209682],
  [-806397691, -805444159],
  [378168507, 378491405],
  [587583589, 588352238],
  [139844005, 140338254],
  [154057980, 155042702],
  [803012723, 803734661],
  [-218692337, -218545355],
  [789466355, 790273091],
  [975100436, 975321879],
  [-465361399, -464812199],
  [-922760932, -921829073],
  [-142478637, -141824117],
  [-790732186, -789876161],
  [-41035267, -40811964],
  [-206389646, -206075169],
  [517558447, 517796915],
  [400316761, 400692193],
  [822234789, 822679785],
  [-401772361, -400880421],
  [104360094, 104933064],
  [115374622, 116149588],
  [-600468467, -600040195],
  [-938605167, -938123619],
  [-26520601, -26268761],
  [-572121000, -571962937],
  [-680186505, -679935206],
  [-548715087, -547787576],
  [-295832861, -294967727],
  [858170418, 858555317],
  [527476203, 528288705],
  [-576736890, -576312015],
  [-688942518, -688700294],
  [791813453, 791959235],
  [-965078438, -964601468],
  [973906023, 974014050],
  [813055738, 813877230],
  [501732578, 501935292],
  [-240772790, -240352414],
  [-451033201, -450534375],
  [496537566, 496825855],
  [-659463616, -658810603],
  [51746944, 52446214],
  [200945826, 201224537],
  [95176042, 96031264],
  [-882138482, -881954716],
  [-630540129, -629910947],
  [-528531483, -527874801],
  [-390767663, -390620009],
  [388029476, 388146160],
  [-255871395, -255470055],
  [-640820856, -640063318],
  [683527679, 684471023],
  [627950225, 628775821],
  [-835029864, -834574463],
  [554286840, 555221160],
  [-402862910, -402035399],
  [432464031, 432893738],
  [-750439089, -749621078],
  [-577907959, -577007935],
  [-806212617, -805582323],
  [-69941396, -69330669],
  [671051499, 671325949],
  [401066688, 401935859],
  [-23913609, -23284381],
  [355321774, 356189883],
  [724206433, 724867837],
  [266602348, 267244248],
  [-121191891, -120323192],
  [861538979, 861785924],
  [921468394, 921925417],
  [-575430438, -574954660],
  [481729011, 482564964],
  [995576729, 995873172],
  [921090939, 922081583],
  [956440911, 957297006],
  [-735044451, -734587960],
  [-558414710, -557612791],
  [296565746, 297145987],
  [985803652, 986241286],
  [-41481083, -40563191],
  [-871477165, -871208039],
  [-675543484, -674739278],
  [163951934, 164678132],
  [450478131, 451192531],
  [-430203003, -429680137],
  [-69757832, -68891685],
  [-33765440, -33028956],
  [-863526458, -862646184],
  [-373764600, -373039488],
  [-844182728, -843548654],
];
console.time('check');
// console.log(sumIntervals(intervalsList));
// for (let i = 0; i < 10; i++) {
// for (let i = 0; i < 100; i++) {
for (let i = 0; i < 1000; i++) {
  sumIntervals(intervalsList);
}
strictEqual(sumIntervals(intervalsList), 253392517);
console.timeEnd('check');
