let information_suruh = document.querySelector(".information-surah")
let audio = document.querySelector(".black-bar audio")
let isPlaying = false;
let playPause = document.querySelector(".play-pause");
let arabic_surah = document.querySelector(".arabic-surah")
let english_surah = document.querySelector(".english-surah")
let progressArea = document.querySelector(".bar");
let progressBar = document.querySelector(".black-bar");
let icon = document.querySelector(".icon")

let getDataFromLocalStorge = JSON.parse(window.localStorage.getItem("surah"))

// Audio

icon.addEventListener("click" , () => {
    window.open("index.html" , "_self")
})





//Audio
let srcAudio = getDataFromLocalStorge[0].audio_files[0].src;
let searchButton = document.querySelector(".search button")



searchButton.addEventListener("click" , () => {
    window.open("index.html" , "_self")
})

window.addEventListener("load" , () => {
    loadMusic()
})


function loadMusic() {
    arabic_surah.textContent = getDataFromLocalStorge[0].name_arabic;
    english_surah.textContent = getDataFromLocalStorge[0].name_complex;
    audio.src = srcAudio;
}

function playAudio() {

    isPlaying = true;

    playPause.innerHTML = `<i class="fa-solid fa-pause cursor-pointer text-4xl text-white"></i>`

    audio.play()
}



function pauseAudio() {
    isPlaying = false;

    playPause.innerHTML = `<i class="fa-solid fa-play cursor-pointer text-4xl text-white "></i>`

    audio.pause()
}

playPause.addEventListener("click" , () => {
    isPlaying ? pauseAudio() : playAudio();
})



audio.addEventListener("timeupdate" , (e) => {

    let currentAudio = e.target.currentTime;
    let duration  = e.target.duration;
    let progressWidth = (currentAudio / duration) * 100;
    progressBar.style.width = `${progressWidth}%`
    let currentTime = document.querySelector(".current-time")
    let durationTime = document.querySelector(".max-duration")

    audio.addEventListener("loadeddata" , () => {

        let interval = setInterval(() => {
           let _elapsed = audio.currentTime;

           currentTime.innerHTML = formatTime(_elapsed)
        }, 1000);

        let _duration = audio.duration;

        durationTime.innerHTML = formatTime(_duration)

        audio.addEventListener("ended" , () => {
            clearInterval(interval)
            pauseAudio()
            
        })

    })

})


progressArea.addEventListener("click", (e) => {
    let progressWidth = progressArea.clientWidth;
    let clickedOffsetX = e.offsetX;
    let songDuration = audio.duration;

    if (!isNaN(songDuration)) {
        audio.currentTime = (clickedOffsetX / progressWidth) * songDuration;
        playAudio();
    } else {
        console.log("Duration is not available yet.");
    }
});


// Get Information From Local


function information() {

    let bg_button = getDataFromLocalStorge[0].audio_files[0]["bg-sm"];

    information_suruh.innerHTML  = `
                
    <h1 class= "text-[#77E4C8] text-3xl mb-9">${getDataFromLocalStorge[0].name_arabic} (${getDataFromLocalStorge[0].name_complex})</h1>

    <div class="span-ayay text-white text-2xl mb-7 flex flex-wrap gap-6">
       <span class = " span-ayat underline cursor-pointer text-[#cf2865]">الايات</span>
       <span class = " span-details cursor-pointer text-[#dfc163]">معلومات عن الصوره </span>
     </div>

   <h1 class= "text-[#36C2CE] text-2xl mb-9">يمكنك اختيار العديد من الاصوات</h1>
   
        <button class=" menu-list relative  flex gap-x-3  items-center p-3 border-2 border-[#414141] w-full sm:w-[400px] rounded-xl">
        <span class="sheikh-img"><img class="rounded-full w-12" src="${bg_button}" alt=""></span>
        <span class="sheikh-name text-white text-2xl">Mishari_al_afay</span>


        <ul class=" hide links absolute top-[70px] right-0 w-full py-4 bg-white rounded-xl overflow-auto max-h-[400px]"> 
       </ul>
   </button>

    <h1 class= "font-bold text-white text-3xl mb-9 text-center mt-16">معلومات عن سوره (${getDataFromLocalStorge[0].name_arabic})</h1>

    
           <p class="text-white text-xl mt-24 mb-7">الاسم بالانجليزيه : (${getDataFromLocalStorge[0].name_simple})</p>
           <p class="text-white text-xl  mb-7">تبدء من صفحه: ${getDataFromLocalStorge[0].pages[0]}</p>
           <p class="text-white text-xl  mb-7">تنتهي من صفحه: ${getDataFromLocalStorge[0].pages[1]}</p>
           <p class="text-white text-xl  mb-7">ترتيب النزول : ${getDataFromLocalStorge[0].revelation_order}</p>
           <p class="text-white text-xl  mb-7">مكان النزول : ${getDataFromLocalStorge[0].revelation_place} </p>
           <p class="text-white text-xl  mb-7">عدد الايات : ${getDataFromLocalStorge[0].verses_count} </p>
           <p class="text-white text-xl  mb-7">هل هذه السوره تبدء بالبسمله : ${getDataFromLocalStorge[0].bismillah_pre ? getDataFromLocalStorge[0].bismillah_pre = "نعم" : getDataFromLocalStorge[0].bismillah_pre = "لا"} تبدء بالبسمله</p>
    `


    
    let lists = information_suruh.querySelector("ul")


    getDataFromLocalStorge[0].audio_files.forEach((e) => {


        lists.innerHTML += `
        <li class="flex gap-x-2 items-center p-2 text-black mb-3">
                    <span class="text-black"><img width="50" src="${e["bg-sm"]}" alt=""></span>
                    <span>${e.name}</span>
                    </li>`})


    //Button
    let buttonMenu = information_suruh.querySelector(".menu-list")

    buttonMenu.addEventListener("click", () => {
        lists.classList.toggle("hide")
    })


    //Span List

    let spanList = information_suruh.querySelector(".menu-list .sheikh-name")
    let spanImgSheikh = information_suruh.querySelector(".menu-list .sheikh-img img");
    //Lists 

    let listOfUl = information_suruh.querySelectorAll("ul li")
 
    listOfUl.forEach((li) => {
      
      
        li.addEventListener("click", () => {
            spanImgSheikh.src = li.querySelector("span img").src
            spanList.textContent = li.textContent
            let source = getDataFromLocalStorge[0].audio_files
            source.forEach((e) => { 

              

                if(e.name == li.textContent.trim()) {
                    loadMusic()
                    audio.src = e.src; 
                    pauseAudio()
                }
          
            })
        })

    })


    let spanAyat = information_suruh.querySelector(".span-ayat")
    let spanDetails = information_suruh.querySelector(".span-details")

    spanDetails.addEventListener("click" , () => {
    window.open("detailsSuruh.html" , "_self")
    })

    spanAyat.addEventListener("click" , () => {
    window.open("surah.html" , "_self")
    })
}
information()



function formatTime(time) { 

    if(time && !isNaN(time)) {
        let hours = Math.floor(time / 3600) < 10 ? `0${Math.floor(time / 3600)}` : Math.floor(time / 3600);
        let minutes = Math.floor((time % 3600) / 60) < 10 ? `0${Math.floor((time % 3600) / 60)}` : Math.floor((time % 3600) / 60);
        let seconds = Math.floor(time % 60) < 10 ? `0${Math.floor(time % 60)}` : Math.floor(time % 60);
        return hours > 0 ? `${hours}:${minutes}:${seconds}` : `${minutes}:${seconds}`;
    }

    return `00:00`;
}
