#!/usr/bin/env node

import { fileURLToPath } from "node:url";
import path from "node:path";
import fs from 'fs';
import _ from "lodash";

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);


const fileName = process.argv[2];
const content = fs.readFileSync(path.join(
  __dirname,
  fileName
), 'utf-8');

// BEGIN
//console.log(content)

// step 1
////////////////////////////////////////////
const poop1 = content.split('\r\n');
const poop2 = poop1.slice(1);

const poop3 = poop2.map((unit) => unit.split('|'));
const poop4 = poop3.map((unit) => unit.slice(1));

const arr = [];
for (let i = 0; i < poop4.length; i += 1) {
  arr.push(poop4[i][0]);
}
const amountOfCreature = arr.length;  // число сколько всего видов существ
console.log(amountOfCreature);
////////////////////////////////////////////

console.log("__________________");

// step 2
////////////////////////////////////////////
let maxPower = 0;
let costOfCreature_maxPower = 0;
for (let i = 0; i < poop4.length; i += 1) {
  if (Number(poop4[i][1]) > maxPower) {
    maxPower = Number(poop4[i][1]);
    costOfCreature_maxPower = Number(poop4[i][6]);
  }
}
const costOfCreature_maxPower_10units = costOfCreature_maxPower * 10;
console.log(costOfCreature_maxPower_10units);



let maxPower_second = 0;
let costOfCreature_maxPower_second = 0;
for (let i = 0; i < poop4.length; i += 1) {
  if ((Number(poop4[i][1]) > maxPower_second) && (Number(poop4[i][1]) < maxPower)) {
    maxPower_second = Number(poop4[i][1]);
    costOfCreature_maxPower_second = Number(poop4[i][6]);
  }
}
const costOfCreature_maxPower_second_20units = costOfCreature_maxPower_second * 20;
console.log(costOfCreature_maxPower_second_20units);
////////////////////////////////////////////


console.log("__________________");


// step 3
////////////////////////////////////////////
let maxWeight = 0;
let costOfCreature_maxWeight = 0;
let squad_size_maxWeight = 0;
for (let i = 0; i < poop4.length; i += 1) {
  if (Number(poop4[i][5]) > maxWeight) {
    maxWeight = Number(poop4[i][5]);
    costOfCreature_maxWeight = Number(poop4[i][6]);
    squad_size_maxWeight = Number(poop4[i][3]);
  }
}
const costOfSquad_maxWeight = costOfCreature_maxWeight * squad_size_maxWeight;
console.log(costOfSquad_maxWeight);



let minWeight = maxWeight;
let costOfCreature_minWeight = 0;
let squad_size_minWeight = 0;
for (let i = 0; i < poop4.length; i += 1) {
  if (Number(poop4[i][5]) < minWeight) {
    minWeight = Number(poop4[i][5]);
    //console.log(`minWeight: ${minWeight}`);
    costOfCreature_minWeight = Number(poop4[i][6]);
    squad_size_minWeight = Number(poop4[i][3]);
  }
}
const costOfSquad_minWeight = costOfCreature_minWeight * squad_size_minWeight;
console.log(costOfSquad_minWeight);

////////////////////////////////////////////

console.log("__________________");

// step 4
////////////////////////////////////////////
let unitPower = 0;
let costOfCreature_unit = 0;
let cost_vs_power = 0;
let arr_C_vs_P = [];
let name_arr_C_vs_P = [];
for (let i = 0; i < poop4.length; i += 1) {
  unitPower = Number(poop4[i][1]);
  costOfCreature_unit = Number(poop4[i][6]);
  cost_vs_power = costOfCreature_unit / unitPower;
  arr_C_vs_P.push(cost_vs_power);
  name_arr_C_vs_P.push([String(poop4[i][0]), cost_vs_power]);
}

let non_optimal = 0;
let name_of_non_optimal = []; 

for (let i = 0; i < name_arr_C_vs_P.length; i += 1) {
  if (name_arr_C_vs_P[i][1] > non_optimal) {
    non_optimal = name_arr_C_vs_P[i][1];
    name_of_non_optimal = name_arr_C_vs_P[i][0];
  }
}
console.log(`Not optimal unit: ${name_of_non_optimal} ${non_optimal}`);




let optimal = non_optimal;
let name_of_optimal = []; 

for (let i = 0; i < name_arr_C_vs_P.length; i += 1) {
  if (name_arr_C_vs_P[i][1] < optimal) {
    optimal = name_arr_C_vs_P[i][1];
    name_of_optimal = name_arr_C_vs_P[i][0];
  }
}
console.log(`Optimal unit: ${name_of_optimal} ${optimal}`);
////////////////////////////////////////////

console.log("__________________");



// step 5
////////////////////////////////////////////
const money = 10000;  // сумма, которой мы располагаем для найма армии
let army_for_money = 0; // число юнитов из существ одного типа, которое можно нанять за наши деньги 
let unitPower2 = 0;
let squad_size2 = 0;
let costOfCreature_unit2 = 0;
let power_of_mercenary_army = 0;
let AFM_vs_unitPo = 0;
let nameArmy = '';
for (let i = 0; i < poop4.length; i += 1) {
  unitPower2 = Number(poop4[i][1]);
  squad_size2 = Number(poop4[i][3]);
  costOfCreature_unit2 = Number(poop4[i][6]);
  army_for_money = money / costOfCreature_unit2;
  power_of_mercenary_army = unitPower2 * army_for_money;
  AFM_vs_unitPo = army_for_money / unitPower2;
  nameArmy = String(poop4[i][0]);
  console.log(`Power of army ${nameArmy}: ${power_of_mercenary_army}; The ratio of power and quantity: ${AFM_vs_unitPo}`);
}

console.log(Math.round(AFM_vs_unitPo));

////////////////////////////////////////////
//name_arr_C_vs_P.push([String(poop4[i][0]), cost_vs_power]);

// END
