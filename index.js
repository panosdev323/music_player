// initializing variables
const songs=[];
const play = document.querySelector("#play");
const pause = document.querySelector("#pause");
const previus = document.querySelector("#previus");
const next = document.querySelector("#next");
const shuffle = document.querySelector("#shuffle");
const title = document.querySelector("#title");
const artist = document.querySelector("#artist");
const list = document.querySelector("#list");
const audioElement = new Audio();
let songPos=0;
// on load
addEventListener("DOMContentLoaded", (event) => {
    musicPlayerFunc();
});
// fetch songs
const loadsongs = async () => {
    await fetch('./songs.json')
        .then(response => response.json())
        .then(obj => {
            for (o of obj) {
                songs.push(o);
            }
        })
        .then(()=> {
            setList();
            audioSong();
        })
}
// set audio song
const audioSong = () => {
    audioElement.setAttribute("src",songs[songPos].src);
    title.innerHTML = songs[songPos].title;
    artist.innerHTML = songs[songPos].artist;
    document.querySelectorAll(".songsCL").forEach(e=> {
        e.classList.remove('active')
    })
    document.querySelector(`#song-${songs[songPos].id}`).classList.add('active')
}

// on play button click
const playFn = () => {
    play.addEventListener("click", ()=> {
        audioElement.play();
    })
}
// on pause button click
const pauseFn = () => {
    pause.addEventListener("click", ()=> {
        audioElement.pause();
    })
}
// on previus song click
const previusSong = () => {
    previus.addEventListener("click", ()=> {
        if (songPos >= 1) {
            songPos--;
            audioSong();
            audioElement.play();
        } 
    })
}
// on next song click
const nextSong = () => {
    next.addEventListener("click", ()=> {
        if (songPos < songs.length-1) {
            songPos++;
            audioSong();
            audioElement.play();
        } 
    })
}
// on shuffle click
const shuffleBtn = () => {
    shuffle.addEventListener("click", ()=> {
        // random songs position
        songs.sort(() => Math.random() - 0.5);
        // empty list
        list.innerHTML = '';
        // new list
        setList();
        audioSong();
        audioElement.play();
    })
}
// list song at click, update song position
const listSongClicked = () => {
    document.querySelectorAll(".songsCL").forEach(song=> {
        song.addEventListener("click", () => {
            // active play button
            play.focus();
            // song position
            songPos = song.id.replace(/^\D+/g, '');
            audioSong();
            audioElement.play();
        })
    })
}
// set list
const setList = () => {
    list.innerHTML += songs.map(song=> {
        return `<li class="songsCL" id="song-${song.id}">
                <h4>${song.title}</h4>
                <div>
                    <p>${song.artist}</p>
                    <p>${song.duration}</p>
                </div>
                </li>`;
    }).join('')
}
// music player functions
const musicPlayerFunc = async () => {
    await loadsongs();
    audioElement.setAttribute("src",songs[0].src);
    playFn();
    pauseFn();
    previusSong();
    nextSong();
    shuffleBtn();
    listSongClicked();
}