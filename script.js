const word_el = document.getElementById('word');
const popup = document.getElementById('popup-container');
const message_el = document.getElementById('message-succes');
let selectedWord = getRandomWord();
const wrongLetters_el = document.getElementById('wrong-letters');
const items = document.querySelectorAll(".item");
const message2_el = document.getElementById('message');
const btn = document.getElementById('play-again');
// Oyun başlarken bulunacak kelimeyi üretir. (Generates the word to be found at the start of the game.)
function getRandomWord(){
    // (THE WORDS) - BULUNMASINI İSTEDİĞİN KELİMELERİ BURAYA YAZ
    const words = ["apple","banana","watermelon","lemon","cherry"];
    return words[Math.floor(Math.random()*words.length)];
}

const correctLetters = [];
let wrongLetters = [];
// Doğru harfi ekrana yazdırır. (Prints the correct letter to the screen)
function displayWord(){
    word_el.innerHTML = `${selectedWord.split("").map(letter => 
        `<div class="letter">
        ${correctLetters.includes(letter) ? letter:""}
        </div>`
    ).join("")}`;
    const w = word_el.innerText.replace(/\n/g, "");
    if(w === selectedWord){
        popup.style.display = "flex";
        message_el.innerText = "Tebrikler Kazandınız!";
        
        
    }
};
// oyun bittiğinde yeniden başlatan buton. (Play Again Button)
btn.addEventListener('click', function(){
    correctLetters.splice(0);
    wrongLetters.splice(0);
    selectedWord = getRandomWord();
    displayWord();
    updateWrongLetters();
    popup.style.display = "none";
});
// hatalı harfleri tutar ve ekrana yazdırır - (Wrong Letters Message)
function updateWrongLetters(){
    wrongLetters_el.innerHTML = `
    ${wrongLetters.length>0?"<h3>Hatalı Harfler</h3>":""} 
    ${wrongLetters.map(letter=> `<span>${letter}</span>`)}
    `;
    items.forEach((item, index) => {
        const errorCount = wrongLetters.length;
        if(index<errorCount){
            item.style.display = "block";
        }else{
            item.style.display = "none";
        }
    });
    if(wrongLetters.length === items.length)
        popup.style.display = "flex";
        message_el.innerText = "Oyun bitti, kaybettiniz!"; // Oyun Bitti. (Game Over Message)
    
}
// Bir harf birden çok girilirse ekrana uyarı mesajı yazdırır. (If a letter is entered more than once, it prints a warning message on the screen.)
function displayMessage(){
    message2_el.classList.add("show");
    setTimeout(function(){
        message2_el.classList.remove('show');
    }, 2000)
}
// kullanıcın tıkladığı harfi işler. (Renders the letter the user clicks)
window.addEventListener("keydown",function(e){
    if(e.keyCode >= 65 && e.keyCode <= 90){
        const letter = e.key;
        if(selectedWord.includes(letter)){
            if(!correctLetters.includes(letter)){
                correctLetters.push(letter);
                displayWord();
            }else{
                displayMessage();
            }
        }else{
            
            if(!wrongLetters.includes(letter)){
                wrongLetters.push(letter);
                updateWrongLetters();
            }else{
                displayMessage();
            }
        }
    }
});

displayWord();