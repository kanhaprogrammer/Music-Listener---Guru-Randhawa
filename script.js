// Enhanced Song Data with proper year grouping
const songs = [
    // 2025
    { title: "Qatal", year: "2025", cover: "Guru Randhawa - QATAL - (Official Video) - Guru Randhawa.jpg", audio: "Guru Randhawa - QATAL - (Official Video) - Guru Randhawa.mp3" },
    { title: "The Po Po Song", year: "2025", cover: "The Po Po Song.jpg", audio: "The Po Po Song.m4a" },
    { title: "Sirra", year: "2025", cover: "Sirra.jpg", audio: "Sirra.m4a" },
    { title: "Karizma", year: "2025", cover: "Karizma.jpg", audio: "Karizma.m4a" },
    { title: "Tu Kaun Mai Kaun", year: "2025", cover: "Tu Kaun Mai Kon.jpg", audio: "Tu Kaun Mai Kaun.m4a" },
    { title: "Vibe", year: "2025", cover: "Vibe.jpg", audio: "Vibe.m4a" },
    { title: "Flex", year: "2025", cover: "Flex.jpg", audio: "Flex.m4a" },
    
    // 2023
    { title: "You Talking to Me", year: "2023", cover: "You Talking to Me.jpg", audio: "You Talking to Me.m4a" },
    
    // 2022
    { title: "Mai Chala", year: "2022", cover: "Main Chala.jpg", audio: "Mai Chala.m4a" },
    { title: "Designer", year: "2022", cover: "Designer.png", audio: "Designer.m4a" },
    
    // 2020
    { title: "Baby Girl", year: "2020", cover: "Baby Girl.jpg", audio: "Baby Girl.m4a" },
    { title: "Naach Meri Rani", year: "2020", cover: "Naach Meri Rani.jpg", audio: "Naach Meri Rani.m4a" },
    { title: "Surma Surma", year: "2020", cover: "Surma Surma.jpg", audio: "Surma Surma.m4a" },
    
    // 2019
    { title: "Slowly Slowly", year: "2019", cover: "Slowly SLowly.jpg", audio: "Slowly Slowly.m4a" },
    { title: "Ishq Tera", year: "2019", cover: "Ishq Tera.jpg", audio: "Ishq Tera.m4a" },
    
    // 2018
    { title: "Daaru Wargi", year: "2018", cover: "Daaru Wargi.jpg", audio: "Daaru Wargi.m4a" },
    { title: "Morni Banke", year: "2018", cover: "Moni Banke.jpg", audio: "Morni Banke.m4a" },
    { title: "Nachle Na", year: "2018", cover: "Nachle na.jpg", audio: "Nachle Na.m4a" },
    { title: "Kaun Nach Di", year: "2018", cover: "Kaun Nach Di.jpg", audio: "Kaun Nach Di.m4a" },
    { title: "Made In India", year: "2018", cover: "Made In India.jpg", audio: "Made In India.m4a" },
    { title: "Ishare Tere", year: "2018", cover: "Ishare Tere.jpg", audio: "Ishare Tere.m4a" },
    { title: "Raat Kamaal Hai", year: "2018", cover: "Raat Kamaal Hai.jpg", audio: "Raat Kamaal Hai.m4a" },
    { title: "Downtown", year: "2018", cover: "Downtown.jpg", audio: "Downtown.m4a" },
    { title: "Tere Te", year: "2018", cover: "Tere Te.jpg", audio: "Tere Te.m4a" },
    
    // 2017
    { title: "Ban Ja Rani", year: "2017", cover: "Ban Ja Rani.jpg", audio: "Ban Ja Rani.m4a" },
    { title: "Lahore", year: "2017", cover: "Lahore.jpg", audio: "Lahore.m4a" },
    { title: "Taare", year: "2017", cover: "Taare.jpg", audio: "Taare.m4a" },
    { title: "High Rated Gabru", year: "2017", cover: "High Rated Gabru.jpg", audio: "High Rated Gabru.m4a" },
    
    // 2016
    { title: "Suit Suit", year: "2016", cover: "Suit Suit.jpg", audio: "Suit Suit.m4a" },
    { title: "Fashion", year: "2016", cover: "Fashion.jpg", audio: "Fashion.m4a" },
    
    // 2015
    { title: "Outfit", year: "2015", cover: "Outfit.jpg", audio: "Outfit.m4a" },
    { title: "Patola", year: "2015", cover: "Patola.jpg", audio: "Patola.m4a" }
];

// DOM Elements
const songContainer = document.getElementById('song-container');
const searchInput = document.getElementById('search-input');
const filterButtons = document.querySelectorAll('.filter-btn');
const audioElement = document.getElementById('audio-element');
const playBtn = document.getElementById('play-btn');
const prevBtn = document.getElementById('prev-btn');
const nextBtn = document.getElementById('next-btn');
const currentSongDisplay = document.getElementById('current-song');
const themeToggle = document.getElementById('theme-toggle');

// Current playing song index
let currentSongIndex = 0;
let filteredSongs = [];

// Load Songs into Grid with year grouping
function loadSongs(filter = 'all', searchTerm = '') {
    songContainer.innerHTML = '';
    
    // Filter songs based on year and search term
    filteredSongs = songs.filter(song => {
        const matchesYear = filter === 'all' || 
                          (filter === '2025' && song.year === '2025') ||
                          (filter === '2023' && (song.year === '2023' || song.year === '2022')) ||
                          (filter === '2020' && (song.year === '2020' || song.year === '2019')) ||
                          (filter === '2018' && (song.year === '2018' || song.year === '2017')) ||
                          (filter === '2016' && (song.year === '2016' || song.year === '2015'));
        
        const matchesSearch = song.title.toLowerCase().includes(searchTerm.toLowerCase());
        return matchesYear && matchesSearch;
    });

    // Group by year if showing all songs
    if (filter === 'all') {
        const years = [...new Set(songs.map(song => song.year))].sort((a, b) => b - a);
        
        years.forEach(year => {
            const yearSongs = filteredSongs.filter(song => song.year === year);
            if (yearSongs.length > 0) {
                // Add year header
                const yearHeader = document.createElement('h3');
                yearHeader.className = 'year-header';
                yearHeader.textContent = year;
                songContainer.appendChild(yearHeader);
                
                // Add songs for this year
                yearSongs.forEach(song => {
                    songContainer.appendChild(createSongCard(song));
                });
            }
        });
    } else {
        // Just show filtered songs without year headers
        filteredSongs.forEach(song => {
            songContainer.appendChild(createSongCard(song));
        });
    }
}

// Helper function to create song cards
function createSongCard(song) {
    const songCard = document.createElement('div');
    songCard.className = 'song-card';
    songCard.innerHTML = `
        <img src="${song.cover}" alt="${song.title}" onerror="this.src='placeholder.jpg'">
        <div class="song-info">
            <h3>${song.title}</h3>
            <p class="year-badge">${song.year}</p>
            <button class="play-btn" onclick="playSong('${song.audio}', '${song.title}', ${filteredSongs.findIndex(s => s.title === song.title)})">
                <i class="fas fa-play"></i>
            </button>
        </div>
    `;
    return songCard;
}

// Play Song Function
function playSong(audioSrc, title, index) {
    currentSongIndex = index;
    audioElement.src = audioSrc;
    audioElement.play()
        .then(() => {
            currentSongDisplay.textContent = `Now Playing: ${title}`;
            playBtn.innerHTML = '<i class="fas fa-pause"></i>';
        })
        .catch(error => {
            console.error("Playback failed:", error);
            currentSongDisplay.textContent = `Error playing: ${title}`;
        });
}

// Play next song
function playNext() {
    if (filteredSongs.length === 0) return;
    
    currentSongIndex = (currentSongIndex + 1) % filteredSongs.length;
    const nextSong = filteredSongs[currentSongIndex];
    playSong(nextSong.audio, nextSong.title, currentSongIndex);
}

// Play previous song
function playPrev() {
    if (filteredSongs.length === 0) return;
    
    currentSongIndex = (currentSongIndex - 1 + filteredSongs.length) % filteredSongs.length;
    const prevSong = filteredSongs[currentSongIndex];
    playSong(prevSong.audio, prevSong.title, currentSongIndex);
}

// Event Listeners
searchInput.addEventListener('input', (e) => {
    loadSongs(document.querySelector('.filter-btn.active').dataset.year, e.target.value);
});

filterButtons.forEach(button => {
    button.addEventListener('click', () => {
        filterButtons.forEach(btn => btn.classList.remove('active'));
        button.classList.add('active');
        loadSongs(button.dataset.year, searchInput.value);
    });
});

playBtn.addEventListener('click', () => {
    if (audioElement.paused) {
        audioElement.play();
        playBtn.innerHTML = '<i class="fas fa-pause"></i>';
    } else {
        audioElement.pause();
        playBtn.innerHTML = '<i class="fas fa-play"></i>';
    }
});

prevBtn.addEventListener('click', playPrev);
nextBtn.addEventListener('click', playNext);

audioElement.addEventListener('ended', playNext);

themeToggle.addEventListener('click', () => {
    document.body.classList.toggle('dark-mode');
    themeToggle.textContent = document.body.classList.contains('dark-mode') ? '☀️' : '🌙';
});

// Initialize
loadSongs();