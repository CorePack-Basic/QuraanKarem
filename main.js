let surah_section = document.querySelector(".surah-section");
let searchInput = document.querySelector(".search input");
let searchButton = document.querySelector(".search button")
let emptySurah = document.querySelector(".no-surah")
let quraanSection = document.querySelector(".quraan-section")
let details_surah = document.querySelector(".details-surah")
// Fetch Data from github

let ayatArray = [];

async function fetchData() {
    try {
        const res = await fetch("https://raw.githubusercontent.com/ProNabowy/Quran/main/quranKraim.json");
        const data = await res.json();
        ayatArray = data;
        if(surah_section) {
            showDataPage(ayatArray);
        }

        surahPage()

    } catch (error) {
        console.error("Error fetching data:", error);
    }
}

fetchData();

function showDataPage(arrayToShow) {

    surah_section.innerHTML = "";

    arrayToShow.forEach(e => {

        surah_section.innerHTML += `
            <div id="${e.id}" class="surah-quran col-span-12 xl:col-span-4 lg:col-span-6 border-2 border-[#4a4a4a] py-8 rounded-[10px]">
                        <a href="./surah.html">
                            <h1 class="text-center text-white font-semibold text-2xl "> ${e.name_arabic} (${e.name_complex})</h1>
                        </a>
                    </div>
        `;
    });



}

searchButton.addEventListener("click", () => {
    const searchTerm = searchInput.value.trim();
    const filteredArray = ayatArray.filter(e => e.name_arabic.includes(searchTerm));



    if (searchTerm != "" && filteredArray.length) {
        window.localStorage.setItem("surah" , JSON.stringify(filteredArray))
        emptySurah.innerHTML = "";
        showDataPage(filteredArray)
    } else if (searchTerm != "" && !filteredArray.length) {
        emptySurah.innerHTML = "لا توجد سوره بهذه الاسم برجاء التأكد من اسم السوره"
        showDataPage(ayatArray)
    } else {
        emptySurah.innerHTML = "";
        showDataPage(ayatArray)
    }



});


function surahPage() {

    let allSurah = document.querySelectorAll(".surah-quran")

    allSurah.forEach((e) => {

        e.addEventListener("click", (event) => {

            let surahDetails = ayatArray.filter((element) => element.id == e.getAttribute("id"))

            window.localStorage.setItem("surah" , JSON.stringify(surahDetails))
            window.open("./surah.html" , "_self")

        })



    })

}

surahPage()