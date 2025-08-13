import { test, expect } from "@playwright/test";
import ollama from "ollama";
import fs from "fs";

test.skip("Why im alone", async ({}) => {
  let fullResponse = "";
  const gen = await ollama.generate({
    model: "llama3.1",
    prompt: "Why im alone?, shorten it to 50 words, vietnamese",
    stream: true,
    // timeout: 60000,
  });

  for await (const chunk of gen) {
    fullResponse += chunk.response;
  }
  const responseMatch = fullResponse.replace(/\n/g, " ");
  console.log(responseMatch);
});

test.skip("What does the fox says", async ({}) => {
  const gen = await ollama.generate({
    model: "llama3.1",
    prompt: `The author of the song "What does the fox says"?`,
    stream: true,
  });
  // for await (const chunk of gen) {
  //   const cleanedResponse = chunk.response.replace(/\n/g, " ");
  //   process.stdout.write(cleanedResponse);
  // }
  console.log(gen);
});

test.skip("What i have done", async ({}) => {
  let fullResponse = "";
  const gen = await ollama.generate({
    model: "llama3.1",
    prompt: "Release date of the song 'What I Have Done'?",
    stream: true,
  });

  for await (const chunk of gen) {
    fullResponse += chunk.response;
  }
  const responseMatch = fullResponse.replace(/\n/g, " ");
  console.log(responseMatch);
});

test.skip("Ollama chat", async ({}) => {
  const gen = await ollama.chat({
    model: "llama3.1",
    messages: [
      {
        role: "user",
        content: "Playwright revenue to now?, shorten 50 words",
      },
    ],
  });
  console.log(gen.message);
});

test.skip("Ollama chat with image", async ({}) => {
  const imageBuffer = fs.readFileSync("tests/images/img_001.jpg");
  const imageTest = imageBuffer.toString("base64");
  const gen = await ollama.chat({
    model: "llava",
    messages: [
      {
        role: "user",
        content: "How many people in image, who?, shorten 50 words",
        images: [imageTest],
      },
    ],
  });
  console.log(gen.message);
});

//exceed timeout
test.skip("Ollama chat, extract text with image", async ({}) => {
  const imageBuffer = fs.readFileSync("tests/images/img_001.jpg");
  const imageTest = imageBuffer.toString("base64");

  const gen = await ollama.chat({
    model: "llava",
    stream: false,
    messages: [
      {
        role: "user",
        content: "Extract text only from image, write line two rows",
        images: [imageTest],
      },
    ],
  });
  console.log(gen.message);
});

//exceed timeout
test.skip("Ollama chat, The man who wear the white clothes", async ({}) => {
  const imageBuffer = fs.readFileSync("tests/images/img_001.jpg");
  const imageTest = imageBuffer.toString("base64");

  const gen = await ollama.chat({
    model: "llava",
    stream: false,
    messages: [
      {
        role: "user",
        content: "The man who on the left, Who is he?, shorten 50 words",
        images: [imageTest],
      },
    ],
  });
  console.log(gen.message);
});

//exceed timeout
test.skip("Ollama chat, The man who", async ({}) => {
  const gen = await ollama.chat({
    model: "llama3.1",
  });
});

test.skip("A simple prompt", async ({ page }) => {
  await page.goto("https://playwright.dev/");
  const oll = await ollama.create({
    model: "llama3.1",
  });
});
