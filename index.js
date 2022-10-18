let heights = [];
let bars = [];
let barValues = [];

let barSlider = document.getElementById("barSlider");
let n = barSlider.value;
let speedSlider = document.getElementById("speedSlider");
let delay = 375 - speedSlider.value;

let container = document.getElementById("container");
let width = container.offsetWidth;
let height = container.offsetHeight;
let lineWidth = width / n - 1;

let isStopped = true;
let isPaused = false;
let isGenerated = true;
let isSorted = false;

class Stack {
  constructor() {
    this.arr = [];
    this.top = -1;
  }
  push(element) {
    this.top++;
    this.arr.push(element);
  }
  isEmpty() {
    return this.top == -1;
  }
  pop() {
    if (this.isEmpty() === false) {
      this.top = this.top - 1;
      return this.arr.pop();
    }
  }
}

function getRandomValue(min, max) {
  return Math.random() * (max - min) + min;
}

function generateRandomArray() {
  isGenerated = true;
  isSorted = false;
  isStopped = true;
  isPaused = false;
  n = barSlider.value;
  lineWidth = width / n - 1;
  container.innerHTML = "";
  for (let i = 0; i < n; i++) {
    heights[i] = parseInt(getRandomValue(1, height));
    bars.push(document.createElement("div"));
    bars[i].style.width = `${lineWidth}px`;
    bars[i].style.height = `${heights[i]}px`;
    bars[i].style.transform = `translate(${i * lineWidth + i}px)`;
    bars[i].style.backgroundColor = "black";
    bars[i].className = "bar";
    container.appendChild(bars[i]);

    if (n <= 60) {
      barValues.push(document.createElement("div"));
      barValues[i].innerHTML = heights[i];
      barValues[i].style.marginBottom = `${heights[i] + 5}px`;
      barValues[i].style.transform = `translate(${i * lineWidth + i}px)`;
      barValues[i].className = "barValue";
      container.appendChild(barValues[i]);
    }
  }
}

generateRandomArray();

function swap(i, minindex) {
  [heights[i], heights[minindex]] = [heights[minindex], heights[i]];
  [bars[i], bars[minindex]] = [bars[minindex], bars[i]];
  [bars[i].style.transform, bars[minindex].style.transform] = [
    bars[minindex].style.transform,
    bars[i].style.transform,
  ];

  [barValues[i], barValues[minindex]] = [barValues[minindex], barValues[i]];
  [barValues[i].style.transform, barValues[minindex].style.transform] = [
    barValues[minindex].style.transform,
    barValues[i].style.transform,
  ];
}

function draw(coloredBars, colors) {
  for (let i = 0; i < n; i++) {
    bars[i].style.backgroundColor = "black";
    for (let j = 0; j < coloredBars.length; j++) {
      if (i == coloredBars[j]) {
        bars[i].style.backgroundColor = colors[j];
        break;
      }
    }
  }
}

function sleep(ms) {
  return new Promise((resolve) => setTimeout(resolve, ms));
}

async function SortedAnimation() {
  for (let i = 0; i < n; i++) {
    bars[i].style.backgroundColor = "lime";
    await sleep(10);
  }
  await sleep(300);
  for (let i = 0; i < n; i++) {
    bars[i].style.backgroundColor = "white";
    await sleep(10);
  }
}

async function bubbleSort() {
  for (let i = 0; i < n - 1; i++) {
    for (let j = 0; j < n - i - 1; j++) {
      if (isStopped) {
        draw([], []);
        return;
      }
      if (!isPaused) {
        if (heights[j] > heights[j + 1]) {
          swap(j, j + 1);
        }
        draw([j, j + 1], ["green", "yellow"]);
      } else {
        j--;
      }
      await sleep(delay);
    }
  }
  console.log("Bubble Sort");
  draw([], []);
  isSorted = true;
  isStopped = true;
  isPaused = false;
  SortedAnimation();
}

async function selectionSort() {
  for (let i = 0; i < n - 1; i++) {
    let minIndex = i;
    for (let j = i + 1; j < n; j++) {
      if (isStopped) {
        draw([], []);
        return;
      }
      if (!isPaused) {
        if (heights[j] < heights[minIndex]) {
          minIndex = j;
        }
        draw([i, j, minIndex], ["blue", "red", "green"]);
      } else {
        j--;
      }
      await sleep(delay);
    }
    swap(i, minIndex);
  }
  console.log("Selection Sort");
  draw([], []);
  isSorted = true;
  isStopped = true;
  isPaused = false;
  SortedAnimation();
}

async function insertionSort() {
  for (let i = 0; i < n; i++) {
    let key = heights[i];
    for (let j = i - 1; j >= 0 && heights[j] > key; j--) {
      if (isStopped) {
        draw([], []);
        return;
      }
      if (!isPaused) {
        swap(j, j + 1);
        draw([j, i + 1], ["green", "red"]);
      } else {
        j++;
      }
      await sleep(delay);
    }
  }
  draw([], []);
  isSorted = true;
  isStopped = true;
  isPaused = false;
  SortedAnimation();
}
// public static int[] mergeSort2(int[] arr,int i,int j){
//     if(i>j){
//         return new int[]{};
//     }
//     if(i==j){
//         int[] narr={arr[i]};
//         return narr;
//     }
//     int mid=i+(j-i)/2;
//     int[] left=mergeSort2(arr,i,mid);
//     int[] right=mergeSort2(arr,mid+1,j);
//     return merge(left,right);
// }
// public static int[] merge(int[] left,int[] right){
//     int n=left.length;
//     int m=right.length;
//     int[] ans=new int[n+m];
//     int i=0,j=0,k=0;
//     while(i<n && j<m){
//         if(left[i]<right[j]){
//             ans[k]=left[i];
//             i++;
//             k++;
//         }
//         else{
//             ans[k]=right[j];
//             count++;
//             j++;
//             k++;
//         }
//     }
//     while(i<n){
//         ans[k]=left[i];
//         i++;
//         k++;
//     }
//     while(j<m){
//         ans[k]=right[j];
//         j++;
//         k++;
//     }
//     return ans;
// }
// }
async function mergeSort() {
  for (let curSize = 1; curSize < n; curSize *= 2) {
    for (let start = 0; start < n - 1; start += 2 * curSize) {
      let mid = Math.min(start + curSize - 1, n - 1);
      let end = Math.min(start + 2 * curSize - 1, n - 1);
      let n1 = mid - start + 1;
      let n2 = end - mid;
      let L = [],
        R = [];
      for (let i = 0; i < n1; i++) L.push(heights[start + i]);
      for (let j = 0; j < n2; j++) R.push(heights[mid + 1 + j]);
      let i = 0,
        j = 0,
        k = start;
      let barsIndices = [];
      let barsCOlors = [];
      for (let i1 = start; i1 <= end; i1++) {
        barsIndices.push(i1);
        barsCOlors.push("yellow");
      }

      while (i < n1 || j < n2) {
        if (isStopped) {
          draw([], []);
          return;
        }
        if (!isPaused) {
          if (j == n2 || (i < n1 && L[i] <= R[j])) {
            draw([k, ...barsIndices], ["green", ...barsCOlors]);
            i++;
          } else {
            for (let i1 = mid + 1 + j; i1 > k; i1--) {
              swap(i1, i1 - 1);
            }
            draw([k, ...barsIndices], ["green", ...barsCOlors]);
            j++;
          }
          k++;
        }
        await sleep(delay);
      }
    }
  }
  draw([], []);
  isSorted = true;
  isStopped = true;
  isPaused = false;
  SortedAnimation();
}

async function quickSort() {
  let s = new Stack();
  s.push(0);
  s.push(n - 1);
  while (!s.isEmpty()) {
    let h = s.pop();
    let l = s.pop();

    let i = l - 1;

    let barsIndices = [];
    let barsCOlors = [];

    for (let i1 = l; i1 <= h; i1++) {
      barsIndices.push(i1);
      barsCOlors.push("yellow");
    }

    for (let j = l; j <= h - 1; j++) {
      if (isStopped) {
        draw([], []);
        return;
      }
      if (!isPaused) {
        draw([i, j, ...barsIndices], ["green", "red", ...barsCOlors]);
        if (heights[j] <= heights[h]) {
          i++;
          swap(i, j);
        }
      } else {
        j--;
      }
      await sleep(delay);
    }
    swap(i + 1, h);
    let partition = i + 1;
    if (l < partition - 1) {
      s.push(l);
      s.push(partition - 1);
    }
    if (partition + 1 < h) {
      s.push(partition + 1);
      s.push(h);
    }
  }
  draw([], []);
  isSorted = true;
  isStopped = true;
  isPaused = false;
  SortedAnimation();
}

//All other sorted function

barSlider.oninput = () => {
  document.querySelector(".sliderValue").innerHTML = `Bars: ${barSlider.value}`;
  generateRandomArray();
};
speedSlider.oninput = () => {
  delay = 375 - speedSlider.value;
};

document
  .getElementById("generateButton")
  .addEventListener("click", generateRandomArray);
document.getElementById("sortButton").addEventListener("click", () => {
  type = document.getElementById("sort_type").value;

  if (!isStopped) return;

  if (isSorted || !isGenerated) generatedRandomarray();

  isGenerated = false;
  isPaused = false;
  isStopped = false;

  if (type == "bubble") bubbleSort();
  else if (type == "selection") selectionSort();
  else if (type == "insertion") insertionSort();
  else if (type == "merge") mergeSort();
  else if (type == "quick") quickSort();
});
document.getElementById("stopButton").addEventListener("click", () => {
  isStopped = true;
  isPaused = false;
  document.getElementById("pauseButton").innerHTML = "Pause";

  if (!isGenerated && !isSorted) generateRandomArray();
});

document.getElementById("pauseButton").addEventListener("click", () => {
  if (!isStopped) {
    if (isPaused) {
      document.getElementById("pauseButton").innerHTML = "Pause";
      isPaused = false;
    } else {
      document.getElementById("pauseButton").innerHTML = "Resume";
      isPaused = true;
    }
  }
});
