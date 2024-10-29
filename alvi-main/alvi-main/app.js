let bars = [];
const def = "#ffd700", chng = "#431f91", finished = "#8D93AB", selected = "#66fcf1";

window.onload = setup();

// ############################ Initial onLoad Stuff ##########################
// Initial Setup onLoading of the website

async function setup() {
	let b = document.getElementById("bars");
	let d = document.getElementById("delay");
	document.getElementById("b").innerText = b.value;
	document.getElementById("d").innerText = d.value + "ms";

	if (bars.length != parseInt(b.value)) {
		generateBars(parseInt(b.value));
	}
}

// Generates the number of bars specified

function generateBars(n = -1) {
	bars = [];
	let container = document.querySelector(".container");
	n = n < 0 ? Math.random() * 20 : n;
	if (n <= 20) {
		for (let i = 0; i < n; i++) {
			let rand = Math.floor(4 + Math.random() * 96);
			bars.push('<div class="bar4" id="' + i + '" style="height:' + rand + '%">' + String(rand) + '</div>');
		}
	} else if (n <= 35) {
		for (let i = 0; i < n; i++) {
			let rand = Math.floor(4 + Math.random() * 96);
			bars.push('<div class="bar3" id="' + i + '" style="height:' + rand + '%">' + String(rand) + '</div>');
		}
	} else if (n <= 50) {
		for (let i = 0; i < n; i++) {
			let rand = Math.floor(4 + Math.random() * 96);
			bars.push('<div class="bar2" id="' + i + '" style="height:' + rand + '%">' + String(rand) + '</div>');
		}
	} else if (n <= 65) {
		for (let i = 0; i < n; i++) {
			let rand = Math.floor(4 + Math.random() * 96);
			bars.push('<div class="bar1" id="' + i + '" style="height:' + rand + '%">' + String(rand) + '</div>');
		}
	} else {
		for (let i = 0; i < n; i++) {
			let rand = Math.floor(4 + Math.random() * 96);
			bars.push('<div class="bar" id="' + i + '" style="height:' + rand + '%">' + String(rand) + '</div>');
		}
	}
	container.innerHTML = bars.join('');
}

// ######################## Sorting visualization Utility ############################
// After effects of finished sorting ( applying the finished color and reenabling the inputs )
function Finished_Sorting() {
	let x = document.getElementsByClassName("bar");
	for (let i = 0; i < x.length; i++){
    x[i].style.backgroundColor = finished;
    x[i].classList.add('done');
    }

	x = document.getElementsByTagName("input");
	for (let i = 0; i < x.length; i++){
    x[i].disabled = false;
    }

    document.querySelector('.btn').firstChild.className = 'far fa-play-circle';

}

// A function to implement the tempo ( brief pause between the traversals and shuffles )
function Sleep(ms) {
	return new Promise(resolve => setTimeout(resolve, ms));
}

// A function to disable the inputs at the very start of a viaualization and get the provided input values
function Disable_The_Input() {
	let x = document.getElementsByTagName("input");
	for (let i = 0; i < x.length; i++)
		x[i].disabled = true;
	return parseInt(document.getElementById("delay").value);
}

// Play and Reload Button and it's functionality

document.querySelector('.btn').addEventListener('click', play);

function play(e) {
	if(document.querySelector('.btn').firstChild.className === 'far fa-play-circle') {
		document.querySelector('.btn').firstChild.className = 'fas fa-sync';

		if(document.getElementById('select-algo').value === 'Selection Sort') {
			SelectionSort();
		} else if (document.getElementById('select-algo').value === 'Bubble Sort') {
			BubbleSort();
		} else if (document.getElementById('select-algo').value === 'Insertion Sort') {
			InsertionSort();
		} else if (document.getElementById('select-algo').value === 'Merge Sort') {
			MergeSort();
		} else {
			QuickSort();
		}
	} else {
		reset();
	}

	e.preventDefault();
}

// Select a different algorithm
const selectElement = document.querySelector('#select-algo');

selectElement.addEventListener('change', change);

function change(e) {
	if(document.getElementsByClassName("bar")[0].classList.contains('done')) {
		let b = document.getElementById("bars");
		generateBars(parseInt(b.value));
	}
}

// Complexities

var best="";
var avg="";
var worst="";
function fill_complexities(best, avg, worst){
	document.getElementById("best").innerHTML = "Best";
	document.getElementById("btc").innerHTML = best;
	document.getElementById("avg").innerHTML = "Average";
	document.getElementById("atc").innerHTML = avg;
	document.getElementById("worst").innerHTML = "Worst";
	document.getElementById("wtc").innerHTML = worst;
	document.getElementById("texthere").innerHTML = " Time Complexity";
	
}

// Reload the page

function reset() {
	location.reload();
}

// ################ Algorithms ####################

// Selection Sort

async function SelectionSort() {
	let delay = Disable_The_Input();

	let container = document.querySelector(".container");
	for (let i = 0; i < bars.length; i++) {
		let mn_ind = i;
		let curr_id = bars[i].split('id="')[1].split('"')[0];
		document.getElementById(curr_id).style.backgroundColor = selected;
		for (let j = i + 1; j < bars.length; j++) {
			let nxt_ele = bars[j].split('id="')[1].split('"')[0];
			document.getElementById(nxt_ele).style.backgroundColor = chng;
			let a = parseInt(bars[mn_ind].split(/[:%]/)[1]);
			let b = parseInt(bars[j].split(/[:%]/)[1]);
			if (a > b) mn_ind = j;
			await Sleep(delay / 5.0);
			document.getElementById(nxt_ele).style.backgroundColor = def;
		}

		let nxt_ele = bars[mn_ind].split('id="')[1].split('"')[0];
		document.getElementById(nxt_ele).style.backgroundColor = selected;
		await Sleep(2 * delay / 5.0);

		let tmp = bars[mn_ind];
		bars[mn_ind] = bars[i];
		bars[i] = tmp;

		container.innerHTML = bars.join('');
		await Sleep(2 * delay / 5.0);
		document.getElementById(curr_id).style.backgroundColor = def;
		document.getElementById(nxt_ele).style.backgroundColor = def;
	}
	fill_complexities("Ω(n^2)","Θ(n^2)","O(n^2)");
	Finished_Sorting();

}

// Bubble Sort

async function BubbleSort() {
	let delay = Disable_The_Input();
	let container = document.querySelector(".container");

	for (let i = 0; i < bars.length - 1; i++) {
		let has_swap = false;
		for (let j = 0; j < bars.length - i - 1; j++) {
			let curr_id = bars[j].split('id="')[1].split('"')[0];
			let nxt_ele = bars[j + 1].split('id="')[1].split('"')[0];

			document.getElementById(curr_id).style.backgroundColor = selected;
			document.getElementById(nxt_ele).style.backgroundColor = chng;
			await Sleep(delay / 2);
			let a = parseInt(bars[j].split(/[:%]/)[1]);
			let b = parseInt(bars[j + 1].split(/[:%]/)[1]);
			if (a < b) {
				has_swap = true;

				let t = bars[j];
				bars[j] = bars[j + 1];
				bars[j + 1] = t;

				container.innerHTML = bars.join('');
			}
			document.getElementById(curr_id).style.backgroundColor = selected;
			document.getElementById(nxt_ele).style.backgroundColor = chng;
			await Sleep(delay / 2.0);
			document.getElementById(curr_id).style.backgroundColor = def;
			document.getElementById(nxt_ele).style.backgroundColor = def;
		}
		if (has_swap == false) break;
	}
	fill_complexities("Ω(n)","Θ(n^2)","O(n^2)");
	Finished_Sorting();
}

// Insertion Sort

async function InsertionSort() {
	let delay = Disable_The_Input();
	let container = document.querySelector(".container");
	for (let i = 1; i < bars.length; i++) {
		let j = i - 1;
		let key = bars[i];
		let curr_id = key.split('id="')[1].split('"')[0];
		let nxt_ele = bars[j].split('id="')[1].split('"')[0];
		document.getElementById(curr_id).style.backgroundColor = selected;
		while (j >= 0 && parseInt(bars[j].split(/[:%]/)[1]) > parseInt(key.split(/[:%]/)[1])) {
			document.getElementById(nxt_ele).style.backgroundColor = def;
			nxt_ele = bars[j].split('id="')[1].split('"')[0];
			document.getElementById(nxt_ele).style.backgroundColor = chng;
			await Sleep(delay);
			bars[j + 1] = bars[j];
			j--;
		}

		bars[j + 1] = key;
		container.innerHTML = bars.join('');
		document.getElementById(curr_id).style.backgroundColor = selected;
		document.getElementById(nxt_ele).style.backgroundColor = chng;
		await Sleep(delay * 3.0 / 5);
		document.getElementById(curr_id).style.backgroundColor = def;
		document.getElementById(nxt_ele).style.backgroundColor = def;
	}
	fill_complexities("Ω(n)","Θ(n^2)","O(n^2)");
	Finished_Sorting();
}

// Merge Sort

function Slide_down(l, r) {
	let temp = bars[r];
	for (let i = r - 1; i >= l; i--) {
		bars[i + 1] = bars[i];
	}
	bars[l] = temp;
}


async function merge(l, m, r, d) {
	let container = document.querySelector(".container");
	let y = l;
	let i = l;
	let j = m + 1;

	while (i < j && j <= r) {
		let curr_id = bars[j].split('id="')[1].split('"')[0];
		let nxt_ele = bars[i].split('id="')[1].split('"')[0];
		document.getElementById(curr_id).style.backgroundColor = selected;
		document.getElementById(nxt_ele).style.backgroundColor = chng;
		let a = parseInt(bars[j].split(/[:%]/)[1]);
		let b = parseInt(bars[i].split(/[:%]/)[1]);

		if (a > b) i++;
		else {
			Slide_down(i, j);
			i++; j++;
		}
		await Sleep(d / 2.0);
		container.innerHTML = bars.join('');
		document.getElementById(curr_id).style.backgroundColor = selected;
		document.getElementById(nxt_ele).style.backgroundColor = chng;
		await Sleep(d / 2.0);
		document.getElementById(curr_id).style.backgroundColor = def;
		document.getElementById(nxt_ele).style.backgroundColor = def;
	}
}


async function mergeSort(l, r, d) {
	if (l < r) {
		let m = parseInt(l + (r - l) / 2);
		await mergeSort(l, m, d);
		await mergeSort(m + 1, r, d);
		await merge(l, m, r, d);
	}
}


async function MergeSort() {
	let delay = Disable_The_Input();
	await mergeSort(0, bars.length - 1, delay);
	fill_complexities("Ω(n log(n))","Θ(n log(n))","O(n log(n))");
	Finished_Sorting();
}

// Quick Sort

async function Partition(l, r, d) {
	let i = l - 1;
	let j = l;
	let id = bars[r].split('id="')[1].split('"')[0];
	let container = document.querySelector(".container");
	document.getElementById(id).style.backgroundColor = selected;
	for (j = l; j < r; j++) {
		let a = parseInt(bars[j].split(/[:%]/)[1]);
		let b = parseInt(bars[r].split(/[:%]/)[1]);
		if (a < b) {
			i++;
			let curr_id = bars[i].split('id="')[1].split('"')[0];
			let nxt_ele = bars[j].split('id="')[1].split('"')[0];
			document.getElementById(curr_id).style.backgroundColor = chng;
			document.getElementById(nxt_ele).style.backgroundColor = chng;

			let temp = bars[i];
			bars[i] = bars[j];
			bars[j] = temp;

			await Sleep(d / 3.0);
			container.innerHTML = bars.join('');
			document.getElementById(curr_id).style.backgroundColor = chng;
			document.getElementById(nxt_ele).style.backgroundColor = chng;
			document.getElementById(id).style.backgroundColor = selected;
			await Sleep(d / 3.0)
			document.getElementById(curr_id).style.backgroundColor = def;
			document.getElementById(nxt_ele).style.backgroundColor = def;
		}
	}

	let temp = bars[i + 1];
	bars[i + 1] = bars[r];
	bars[r] = temp;

	container.innerHTML = bars.join(' ');
	document.getElementById(id).style.backgroundColor = selected;
	await Sleep(d / 3.0);
	document.getElementById(id).style.backgroundColor = def;
	return i + 1;
}


async function quickSort(l, r, d) {
	if (l < r) {
		let p = await Partition(l, r, d);
		await quickSort(l, p - 1, d);
		await quickSort(p + 1, r, d);
	}
}


async function QuickSort() {
	let delay = Disable_The_Input();
	await quickSort(0, bars.length - 1, delay);
	fill_complexities("Ω(n log(n))","Θ(n log(n))","O(n^2)");
	Finished_Sorting();
}
