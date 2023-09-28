// const interval = setInterval(() => {
//   console.log("I will print every 2 seconds");
// }, 2000);
//
// setTimeout(() => {
//   clearInterval(interval);
// }, 10000);

//axios
//import axios from 'axios';
const axios = require('axios'); //old syntaxys

const url = 'http://localhost:3000/jobs';
const fetchJobsV1 = ()=>{
    axios.get(url)
      .then((res) => {
          const response = res.data;
          console.log(response);
      })
      .catch(() => {
      });
};
//fetchJobsV1();


const fetchJobsV2 = async ()=>{
    const response = await axios.get(url);
    console.log(response.data);

};
//fetchJobsV2();

//slice() return subArray in a copy

const sushi = ["Tuna", "Salmon", "Yellowtail", 'Eel', "Shripm", "Octopus", "Uni"];

console.log("Copied array: " , sushi.slice()); //new copied array
console.log("From 2 element to end: ", sushi.slice(2));
console.log("From 2 element to 4 element: ", sushi.slice(2, 4)); //the 4 element is not included

