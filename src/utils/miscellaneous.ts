const audioPlayer = new Audio();

export default function playAudio(url: string, volume: number = 0.1) {
  audioPlayer.volume = volume;
  audioPlayer.src = url;
  audioPlayer.load();
  audioPlayer.play();
}