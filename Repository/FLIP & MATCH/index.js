const section = document.querySelector("section");
const playerLivesCount = document.querySelector("span");
let playerLives = 10;

//Link text
playerLivesCount.textContent = playerLives;

//Generate the object
const getData = () => [
    {imgSrc: "./images/umbrella.jpg", name: "umbrella" },
    {imgSrc: "./images/ball.jpg", name: "ball" },
    {imgSrc: "./images/gift.jpg", name: "gift" },
    {imgSrc: "./images/house.jpg", name: "house" },
    {imgSrc: "./images/pillow.jpg", name: "pillow" },
    {imgSrc: "./images/saw.jpg", name: "saw" },
    {imgSrc: "./images/spin.jpg", name: "spin" },
    {imgSrc: "./images/watermelon.jpg", name: "watermelon" },
    {imgSrc: "./images/umbrella.jpg", name: "umbrella" },
    {imgSrc: "./images/ball.jpg", name: "ball" },
    {imgSrc: "./images/gift.jpg", name: "gift" },
    {imgSrc: "./images/house.jpg", name: "house" },
    {imgSrc: "./images/pillow.jpg", name: "pillow" },
    {imgSrc: "./images/saw.jpg", name: "saw" },
    {imgSrc: "./images/spin.jpg", name: "spin" },
    {imgSrc: "./images/watermelon.jpg", name: "watermelon" },
];

//Randomize
const randomize = () => {
    const cardData = getData();
    cardData.sort(() => Math.random() - 0.5);
    return cardData;
};

//Card Generator Function
const cardGenerator = () => {
    const cardData = randomize();

    //Generate the HTML
    cardData.forEach((item) => {
        const card = document.createElement("div");
        const face = document.createElement("img");
        const back = document.createElement("div");
        card.classList.add("card");
        face.classList.add("face");
        back.classList.add("back");

        //Attach the info to the cards
        face.src = item.imgSrc;
        card.setAttribute("name", item.name);

        //Attach the cards to the section
        section.appendChild(card);
        card.appendChild(face);
        card.appendChild(back);

        card.addEventListener("click", (e) => {
            card.classList.toggle('toggleCard');
            checkCards(e);
        });
    });
};

//Check Cards
const checkCards = (e) => {
    console.log(e);
    const clickedCard = e.target;
    clickedCard.classList.add("flipped");
    const flippedCards = document.querySelectorAll(".flipped");
    const toggleCard = document.querySelectorAll(".toggleCard");
    console.log(flippedCards);

    //Logic
    if (flippedCards.length === 2) {
        if(
            flippedCards[0].getAttribute("name") ===
            flippedCards[1].getAttribute("name")
        ) {
            console.log("match");
            flippedCards.forEach((card) => {
            card.classList.remove("flipped");
            card.style.pointerEvents = "none";
        });
        } else {
        console.log("wrong");
        flippedCards.forEach((card) => {
            card.classList.remove("flipped");
            setTimeout(() => card.classList.remove("toggleCard"),1000);
        });
        playerLives--;
        playerLivesCount.textContent = playerLives;
        if (playerLives === 0) {
            restart("TRY AGAIN");
        }
    }

    //Run a check to set if you won the game
        if (toggleCard.length ===16) {
            restart("YOU WON");
        }
    }
};

//Restart game
const restart = (text) => {
    let cardData = randomize();
    let faces = document.querySelectorAll(".face");
    let cards = document.querySelectorAll(".card");
    section.style.pointerEvents = "none";
    cardData.forEach((item,index)  => {
        cards[index].classList.remove("toggleCard");

        //Randomize cards order
        setTimeout(() => {
            cards[index].style.pointerEvents = "all";
            cards[index].src = item.imgSrc;
            cards[index].setAttribute("name",item.name);
            section.style.pointerEvents = "all";
    },   1000);
    });
    playerLives = 10;
    playerLivesCount.textContent = playerLives;
    setTimeout(() => window.alert(text), 100);
};

cardGenerator();