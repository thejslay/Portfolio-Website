const audioPlayer = document.getElementById('audioPlayer');
const playPauseBtn = document.getElementById('playPauseBtn');
const prevBtn = document.getElementById('prevBtn');
const nextBtn = document.getElementById('nextBtn');
const progressBar = document.getElementById('progressBar');
const currentTime = document.getElementById('currentTime');
const duration = document.getElementById('duration');
const volumeSlider = document.getElementById('volumeSlider');
const trackTitle = document.getElementById('trackTitle');
const albumArt = document.getElementById('albumArt');
const playlist = document.getElementById('playlist');

const tracks = [
    { title: 'Fit For An Autopsy - Far from Heaven', src: '../assets/Fit For An Autopsy - Far From Heaven.mp3', art: '../assets/FFAA.jpg' },
    { title: 'Valiant Hearts - No Place Like Home', src: '../assets/Valiant Hearts - No Place Like Home.mp3', art: '../assets/valiant.jpg' },
    { title: 'Netherwalker - Thine King Weeps For Mercy', src: '../assets/Netherwalker - Thine King Weeps for Mercy.mp3', art: '../assets/netherwalker.jpg' },
    { title: 'Worm Shepherd - Winter Sun', src: '../assets/Worm Shepherd - Winter Sun.mp3', art: '../assets/worm.png' },
];

let currentTrackIndex = 0;
let isPlaying = false;

function loadTrack(index) {
    const track = tracks[index];
    audioPlayer.src = track.src;
    trackTitle.textContent = track.title;
    albumArt.src = track.art;
    updatePlaylist();
    audioPlayer.load();
}

function updatePlaylist() {
    playlist.innerHTML = '';
    tracks.forEach((track, index) => {
        const li = document.createElement('li');
        li.textContent = track.title;
        li.classList.toggle('active', index === currentTrackIndex);
        li.addEventListener('click', () => {
            currentTrackIndex = index;
            loadTrack(index);
            playTrack();
        });
        playlist.appendChild(li);
    });
}

function playTrack() {
    audioPlayer.play();
    isPlaying = true;
    playPauseBtn.textContent = '❚❚';
}

function pauseTrack() {
    audioPlayer.pause();
    isPlaying = false;
    playPauseBtn.textContent = '▶';
}

function togglePlayPause() {
    if (isPlaying) {
        pauseTrack();
    } else {
        playTrack();
    }
}

function formatTime(seconds) {
    const mins = Math.floor(seconds / 60);
    const secs = Math.floor(seconds % 60);
    return `${mins}:${secs < 10 ? '0' : ''}${secs}`;
}

playPauseBtn.addEventListener('click', togglePlayPause);

prevBtn.addEventListener('click', () => {
    currentTrackIndex = (currentTrackIndex - 1 + tracks.length) % tracks.length;
    loadTrack(currentTrackIndex);
    playTrack();
});

nextBtn.addEventListener('click', () => {
    currentTrackIndex = (currentTrackIndex + 1) % tracks.length;
    loadTrack(currentTrackIndex);
    playTrack();
});

audioPlayer.addEventListener('timeupdate', () => {
    const { currentTime: currentTimeValue, duration: durationValue } = audioPlayer;
    progressBar.value = (currentTimeValue / durationValue) * 100 || 0;
    currentTime.textContent = formatTime(currentTimeValue);
    duration.textContent = formatTime(durationValue) || '0:00';
});

progressBar.addEventListener('input', () => {
    audioPlayer.currentTime = (progressBar.value / 100) * audioPlayer.duration;
});

volumeSlider.addEventListener('input', () => {
    audioPlayer.volume = volumeSlider.value;
});

audioPlayer.addEventListener('ended', () => {
    nextBtn.click();
});

// Initialize the player
loadTrack(currentTrackIndex);
updatePlaylist();