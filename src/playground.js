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
    // console.log(response.data);

};
//fetchJobsV2();

//slice() return subArray in a copy

const sushi = ["Tuna", "Salmon", "Yellowtail", 'Eel', "Shripm", "Octopus", "Uni"];

// console.log("Copied array: " , sushi.slice()); //new copied array
// console.log("From 2 element to end: ", sushi.slice(2));
// console.log("From 2 element to 4 element: ", sushi.slice(2, 4)); //the 4 element is not included

//Arrays - order
//Object - association
//Set - uniqueness


const numbers1 = new Set();
numbers1.add(5);
numbers1.add(10);
numbers1.add(15);
numbers1.add(15);

//console.log(numbers);


const  numbers = [1, 3, 5,7, 9, 11, 6];

const filteredArray = numbers.filter(number => {return number > 6});
//console.log(filteredArray);

const jobs = [
  {title: 'Test', organization : "Microsoft"},
  {title: 'Test1', organization : "Microsoft1"},
  {title: 'Test2', organization : "Microsoft"},
  ];

const filteredJobs = jobs.filter(job =>{return job.organization === 'Microsoft'});
//console.log(filteredJobs);


//REACTIVE FUNCTION
const {reactive, toRefs, ref, toRef, computed } = require("vue");
const person1 = ref({name: "Person"}); //reactive ONLY support object, and here we NEED to use value to get the property of object
const title1 = computed(()=> person1.value.name + " the Great");

//console.log(title1.value);

const person = reactive({   //reactive ONLY support object, and here we DON"T need to use value to get the property of object
    firstName: "FirstName",
    lastName: "LastName"
});

const title = computed(()=> {
    return `${person.firstName} ${person.lastName} "the Great"`
});

const firstName2 = toRef(person, "firstName"); // it takes thhe "firstName" property of person and name the reactive object;
const lastName2 = toRef(person, "lastName");
const title2 = computed(()=>  `${firstName2.value} ${lastName2.value} "the Great"`);

const {firstName, lastName} = toRefs(person);

const title3 = computed(()=>  `${firstName.value} ${lastName.value} "the Great"`);

//const titleLength = computed(()=> title.value.length);

//console.log(title.value);
//console.log(titleLength.value);
console.log(title2.value);
console.log(title3.value);

person.firstName = "Peter";
//console.log(title.value);
//console.log(titleLength.value);
console.log(title2.value);
console.log(title3.value);


