# SpotifyAiPlayer

## Overview
This web app allows users to control their Spotify playback by using their voice. It signs into the user's Spotify account, records a voice command, converts the voice command to text using Whisper, and sends the converted text to ChatGPT for interpretation and execution.

## Technical details, frontend:
1. I implemented my own oauth because I wanted to learn the details of it, however in production I would use an existing library
2. When Spotify returns after the verification, immediately send off call to the backend to grab an access token
3. I recorded the audio using mediaRecorder, creating a blob and converting it to formData which gets send to the backend

## Technical details, backend:
1. On startup, I run an ingest script to shorten the spotify-open-api yaml file which contains all spotify endpoints. I used yaml in prompt because it has less tokens than JSON (see: [link](https://betterprogramming.pub/yaml-vs-json-which-is-more-efficient-for-language-models-5bc11dd0f6df)).
2. I put the incoming formData that contains the audio from the frontend into an audio file named audio.wav which gets converted to text using whisper.
3. The prompt gets fed to gpt4 along with the shortened list of Spotify api endpoints and returns what endpoints are required.
4. I then search the full yaml file for those exact endpoints and feed them into another gpt4 call which returns the script
5. I run the script using worker threads

## Demo

https://github.com/potatoman/SpotifyAiPlayer/assets/67916039/4f0bd5bd-141c-45d8-943e-9310a0501c59

