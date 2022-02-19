const audioPlayer = new Audio();

function playAudio(url: string, volume: number = 0.1) {
  audioPlayer.volume = volume;
  audioPlayer.src = url;
  audioPlayer.load();
  audioPlayer.play();
}

function random(min: number, max: number) {
  const minValue = Math.ceil(min);
  const maxValue = Math.floor(max);
  return Math.floor(Math.random() * (maxValue - minValue + 1)) + minValue;
}

export { playAudio, random }