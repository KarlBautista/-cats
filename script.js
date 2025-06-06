const generateCat = document.getElementById("generate-cat");
const catGrid = document.getElementById("cat-grid");
const catQuote = document.getElementById("cat-quote");
const loadingPaw = document.getElementById("loading-paw");
const apiForCatImage = "https://api.thecatapi.com/v1/images/search?limit=10";
const apiKeyForCatImage = "live_j99QBOaA7d6pJ9iDrPyUQXFClzORon0KOKyAVcQp9QxvxmRSmQQuv5oPHDXjrdoJ";
const apiForCatQuotes = "https://meowfacts.herokuapp.com/";
const audio = new Audio("./sound/meow.wav");



const generateCatPictues = () => {
    try{
   fetch(apiForCatImage, {headers: {
        "x-api-key" : apiKeyForCatImage
   }}).then(response => response.json())
   .then(data => 
    data.forEach((el) => {
        const catPicture = document.createElement('img');
        catPicture.id = el.id;
        catPicture.src = el.url;
        catPicture.alt = "A cute cat";
        
        catGrid.appendChild(catPicture);
        audio.play();
    }))
    } catch (err) {
        console.error(`Error fetching cat pictures data: ${err}`);
    }

}


const generateCatQuotes = () => {
    try{
        setTimeout(() => {
        fetch(apiForCatQuotes)
        .then(response => response.json())
        .then(data =>
        catQuote.textContent = data.data[0])
        }, 1500)
       
    } catch (err) {
        console.error(`Error fetching cat quotes data: ${err}`)
    }
   

}

const showLoadingScreen = () => {
  const loadingScreen = document.createElement('div');
  loadingScreen.id = "loading-screen";

  const loadingText = document.createElement('p');
  loadingText.textContent = "Loading...";
  loadingText.id = "loading-text";

  loadingScreen.appendChild(loadingText);
  document.body.appendChild(loadingScreen);

  loadingScreen.offsetHeight;
};

const hideLoadingScreen = () => {
  const loading = document.getElementById("loading-screen");
  if (loading) loading.remove();
};


generateCat.addEventListener('click', () => {
    catGrid.innerHTML = ''; 
    catQuote.textContent = '';

    showLoadingScreen();

    setTimeout(() =>   hideLoadingScreen(), 1000)
   
    setTimeout(() => {
         generateCatQuotes();
         generateCatPictues();
        
    }, 500)
   
 
  



    
});


