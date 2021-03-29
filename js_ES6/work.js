/*  for await of
    https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Statements/for-await...of

    Цикл по промисам. Может так же итерировать иобычные объекты (строки, nodes). Суть в том, что их можно комбинировать с промисами.
    Загоняем сюда пачку промисов и строк, и как они все дорешиваются - то сразу выдают решение
*/

let promise = (id, time) => new Promise((resolve => {
  setTimeout(() => resolve(id), time);
}));

const promises = [
  promise(1, 500),
  promise(2, 250),
  promise(3, 1500)
]

const promises2 = [
  setTimeout(() => console.log(1), 100),
  setTimeout(() => console.log(2), 500),
  setTimeout(() => console.log(3), 300)
]

const promises3 = [
  1,2,3,4,5
]

async function all() {
  for await (const i of promises){
    console.log(i)
  }
};

all()

/*
	Параметры функции
	https://youtu.be/x4SFjShP9vA?list=PLqHlAwsJRxAOpWPtj2T6HhSzX-lKmKV2q
	1) Теперь можно задавать параметры по умолчанию для функции
	2) Теперь вместо arguments есть специальный оператор, чтобы взять любое количество аргуметнов и сделать их массивом.
*/

function greeting(greet = 'Hi', name = 'User') {
  return `${greet}, ${name}`;
}

greeting(); // В ES5 незаданный параметр возвращается как undefind, здесь же мы легко задали из значения по умолчанию.
greeting(undefined, 'Bob'); //Вернет "Hi, Bob"

function sum(...values) {
  return values instanceof Array; // values (без точек) будет полноценным массивом
}

sum(1, 2, 3, 4);  // [1,2,3,4]

/*
	цикл for of для перебора свойств массивов и объектов. В отличие от for in, он перебирает не ключи, а значения
	https://youtu.be/rS2uZpyUNJg?list=PLqHlAwsJRxAOpWPtj2T6HhSzX-lKmKV2q
*/

let family = ['Толя', 'Настя', 'Витя'];
for (let person of family) {
  // console.log(person);
}

/*
Новые метода Объектов
https://youtu.be/pbAnhW6ENk8?list=PLqHlAwsJRxAOpWPtj2T6HhSzX-lKmKV2q
1) Синтаксический сахар в названии свойств и методов объекта
2) Динамическое составление свойств объекта, при создании самого объекта
3) Возможность сделать get и set при создании объекта. ХЗ пока зачем
*/

let en = 'to have in common with',
  ru = 'иметь общее с';

let source = 'link'; //Динамическое создание свойств объекта, в процессе создания самого объекта

let inCommon = {
  en, // Если есть переменная с таким именем, то присваивается ее значение
  ru,
  translate() { // Не обязательно теперь писать свойство = function(){}
    return `${this.en}: ${this.ru}`;
  },
  ['video_' + source]: '/video/inCommon.mp4',
  ['audio_' + source]: '/audia/inCommon.mp4',
  get sources() {
    return `${['audio_' + source]}: ${this['audio_' + source]} /n
						${['video_' + source]}: ${this['video_' + source]}`;
  },
  set changeSource(value) {
    ru = value;
    // Вызвать метод: inCommon.changeSource = value;
  }
}


/*
Классы
https://youtu.be/yBNd-0dO1u8?list=PLqHlAwsJRxAOpWPtj2T6HhSzX-lKmKV2q
1) Класс - это шаблон, по которому будет строиться объект
2) В constructor добавляются свойства
3) Есть динамические методы 
4) Есть статически методы
5) Есть get и set, которые являются частью класса, но не объекта на выходе
*/

let days = ['понедельник', 'вторник', "среда", "четверг", "пятница", "суббота", "воскресенье"];

class Cards {
  constructor(title = 'Название не задано', createDate = Cards.getDefauledate(), value) {
    this.createDate = createDate,
      this._title = title, // внутреннее свойсво мы задаем с нижним подчеркиванием, потому что оно пересекается с методом
      this.worlds = value,
      Cards.staticProp += 1;
  }

  showWorld() { // динамическое свойство, доступное извне
    for (var i = this.worlds.length - 1; i >= 0; i--) {
      console.log(this.worlds[i]);
    }
  }

  static getDefauledate() { // свойство которое доступно только внутри класса
    return new Date();
  }

  get title() {
    return this._title; // Здесь может быть какой-то метод, комбириновария свойств
  }

  set title(value) {
    return this._title = value; // Здесь может быть какой-то метод, комбириновария свойств
  }
}

Cards.staticProp = 0; // Свойство для внутреннего использования в конструкторе

let cards_days = new Cards('дни недели', undefined, days);

/*
	Наследование классов
	https://youtu.be/ehSGhaDHehI
*/

let day = ['понедельник', 'вторник'];

class SubCards extends Cards {
  constructor(title = 'Название подзадачи', undefined, value) {
    super(title, undefined, value) // с помощью слова super мы передаем все свойства из родительского класса

    this._lerned = false
  }
}

let subCards = new SubCards('Заголовок задан мной', 'сегодня', day);


/**
 Стрелочные функции
 https://youtu.be/5vgzCnqxRso?list=PLqHlAwsJRxAOpWPtj2T6HhSzX-lKmKV2q
 Фактически это сахар на обычные функции, но есть ряд проблем с this.
 Он равен контексту в котором создан, а не объявляется. Т.е. о объектах он будет равен window, а в settimeout будут равны томуЮ кто его объявляет
 Это значит, что со стрелочными функциями не работают функции call, bind, applay. А также конструкторы
 **/

/*
	function arrow(x,y){
		return x + y;
	} тоже самое, что 
*/

let arrow = (x, y) => x + y;
let arrow2 = () => 'вообще без аргументов';
let arrow3 = () => {
  let result = 'Если нужно 2 строки, то ставим и фигурные ковычки и слово return';
  return result;
}
let arrow4 = () => ({text: 'если свойсвто объекта, то оборачиваем в круглые кавычки'});

let arrow5 = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10];
let arrow6 = arrow5.map((element) => element * element);

/**
 Деструктивное присваивание массивов
 https://youtu.be/DleEy-qHStU?list=PLqHlAwsJRxAOpWPtj2T6HhSzX-lKmKV2q
 **/

let numbers = [1, 2, 3];
let one = numbers[0];
let twoo = numbers[1];
let three = numbers[2];

//Тоже самое что
let [odin, dva, tri] = numbers;

//Тоже самое что
let [a, b, c] = [1, 2, 3];

/*
		Работают оставшиеся параметры let [a,...rest] = [1,2,3];
		Работают значения по умолчанию let [a,b,c= 7] = [1,2];
		Работает вложенность let [a,[b,c]] = [1,[2,3]];
		С функциями интересно

*/

function getScore() {
  return [1, 2, 3]
}

let [_a, _b, _c] = getScore();

/*
	Деструктивное присваивание объектов
	https://youtu.be/_OrI40I1Oy0?list=PLqHlAwsJRxAOpWPtj2T6HhSzX-lKmKV2q
*/

let {d, i, z: zed} = {d: 'свойство d', i: 'свойство i', z: 'свойство z'};

/*
	Кажется что вещь бесполезная, но основные плюсы вылезают на передаче параметров в функцию и доставанию результатат оттуда
*/
function post({data: {firstname, lastname}, cach}) {
  /* в параметры падает объект, раньше нужно было его вызывать object.data, object.cach, сейчас можно просто data, cach
    это круто работает, когда объект многоуровневый и нам нужно взять только часть каких-то данных. сейчас у меня нет доступа к data, зато есть доступ к firsname и lastname
    минус в том, что название этих параметров должно быть известно заранее
  */
}

function getUser() {
  return {
    firstname: 'Antony',
    lastname: 'Myasoedov',
    sosial: {
      facebook: 'beefeater',
      twitter: undefined,
      vk: 'beefeater'
    }
  }
}

let {firstname, lastname, sosial: {facebook: fb, vk}} = getUser();
// console.log(firstname, lastname,fb,vk);
// так мы можем получить только часть данных. Например здесь, мы получили переменные firstname, lastname, vk


/*
	Promise
	https://youtu.be/vNEDPtVchfw?list=PLqHlAwsJRxAOpWPtj2T6HhSzX-lKmKV2q
	https://youtu.be/SjNmkeUpQAU?list=PLqHlAwsJRxAOpWPtj2T6HhSzX-lKmKV2q
  
  let promise = applayForVisa();
  promise.then(bookHotel)
  			 .then(buyTickets)
  			 .catch(cancelVacation);


 let promise = new Promise(function(resolve, reject){
	setTimeout(function(){
		Math.random() > .5 ?  resolve('выполнилось') : reject('не выполнилось');
	}, 500);
});	

promise.then(
	(value) => console.log(value), 
	(value) => console.log(value)
	);
*/


/*

	function applayForVisa(){
		console.log('Ожидание операции...');
		let promise = new Promise(function(resolve, reject){
			setTimeout(function(){
				Math.random() > .5 ?  resolve('Виза одобрена') : reject('не одобрена');
			},200);
		});
		return promise;
	}

	function visaAprouve(value){
		console.log(value);
	}

	function visaReject(){
		console.log('Вы нам не подходите');
	}

	function bookHotel(){
		console.log('Бронируем отель');
	}

	applayForVisa()
		.then(visaAprouve) // если все ок, то переходим к следующему
		.then(bookHotel) // если все ок, то переходим к следующему
		.catch(visaReject); // если хоть в одном пункте что-то не так, то скатываемся сюда

*/

/* Итерраторы 
		Позволяют любой элемент сделать перебираемым

    Свойства итератора должны обязательно называться value, done

		let range = {
		  from: 1,
		  to: 5,
		}

		// сделаем объект range итерируемым
		range[Symbol.iterator] = function() {

		  let current = this.from;
		  let last = this.to;

		  // метод должен вернуть объект с методом next()
		  return {
		    next() {
		      return{value: current++, done: false};
		    }

		  }
		};

		for (let num of range) {
		  console.log(num); // 1, затем 2, 3, 4, 5
		  if(num > 100 || !num){
		  	break;
		  }
		}
*/

