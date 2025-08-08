import { test } from "@playwright/test";
import { LinearSearch } from "../../src/pages/Algorithm/LinearSeach";
import { BubbleSort } from "../../src/pages/Algorithm/BubbleShort";

test("Linear search - Find special character in an array", async () => {
  const arrTest = [
    "hello",
    "world123",
    "test@123",
    "abc@@@",
    "xyz#",
    "ManCity",
    "////",
  ];
  const arrTest_2 = [];

  const linearSearch = new LinearSearch();
  await linearSearch.findSpecialChar(arrTest);
});

test("Bubble sort", async () => {
  const iphones = [
    "Iphone 11",
    "Iphone 12",
    "Iphone 1",
    "Iphone 5",
    "Iphone 4",
    "Iphone 7",
    "Iphone 8",
    "Iphone 13",
    "Iphone 13 Promax",
  ];

  const bbSort = new BubbleSort();
  const onlyNumbers = iphones.filter(item => /^\d+$/.test(item));
  console.log(onlyNumbers);
});
