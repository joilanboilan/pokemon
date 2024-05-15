





window.addEventListener('load', function(){
  
 

  //_________________Fetch_________________
  let pokeArray = [];
  for(let i = 1; i < 1011; i++){  

    window.fetch('https://pokeapi.co/api/v2/pokemon/' + i).then(function(response) { //efter fetchen före är slutförd körs denna. då får vi en respons som vi sedan returnerar json delen av.
      return response.json(); //sen returnerar vi responsen(objektet) i json format(.json();) 
      
    }).then(function(data) { //sen körs denna där vi skapar kort med datan vi fångar in och skriver ut de på skärmen

      pokeArray[i] = data;
    });
    
  }

  let searchForm = this.document.querySelector('#search-form');
  searchForm.addEventListener('submit', function(e){
    e.preventDefault();
    let srcInput = document.querySelector('#search').value;
    console.log(srcInput);


  })


});//window load

function createCards(){
  for(let i = 1; i < 1011; i++){
         
    pokeData = pokeArray[i]; //lägger in våra objekt i arrayen pokeData på den plats som forloopens let j motsvarar 
    /*P.S detta var mest gjort för en funktion som aldrig kom till, men tanken var att göra så så att vi i efterhand kan hämta data 
    från specifkika objekt(pokemon) via t.ex. "pokeData[255].name" vi redan hämtat in tidigare utan att behöva hämta in och kolla igenom alla objekt igen */
    
    let tempStr = pokeArray[i].name.toUpperCase(); //gör så vår sökning så att den kan läsa av stora och små
    query = query.toUpperCase();                  //gör så vår sökning så att den kan läsa av stora och små

    if(tempStr.includes(query)){  //kollar alla objekt och skriver ut de vars .name includerar vårt sökresultat

      searchCount++; //här plussar vi på variablen som håller koll på hur många pokemon skrivs ut på skärmen, eftersom för att skrivas ut så måste de igenom denna if-sats
      searchCountP.innerHTML = "Results: " + searchCount; //uppdaterar vår p-tagg ovanför sökfältet så att den innehåller det nya värdet av searchCount

      //CARD
      let card = document.createElement('div');
      card.classList.add('card');
      card.classList.add([i]);
      changeCardColor2(); //anropar funktion som tilldelar bakgrundsfärg beroende på typen som medfäljer i objektet
      card.style.border = "solid #f5d142 6px"; 
      card.style.borderRadius = "10px";
      card.style.margin = "10px"; //lägger till spacing runt korten
      container.appendChild(card); //lägger in kortet i container

      //CARDBUTTON
      let button = document.createElement('button');
      button.setAttribute('class','btnAdd');
      button.textContent = "add";
      card.appendChild(button);

      //CARD-TOP div intui CARD som innehåller pokemons namn och ID
      let cardtop = document.createElement('div');
      cardtop.classList.add('cardtop');
      card.appendChild(cardtop);

      //CARD-MIDDLE div inuti CARD som innehåller pokemon sprite
      let cardmiddle = document.createElement('div');
      cardmiddle.classList.add('cardmiddle');
      card.appendChild(cardmiddle);

      //CARD-BOTTOM div inuti CARD som innehåller två stycken till div som vardera innehåller 3st pokemon stats
      let cardbottom = document.createElement('div');
      cardbottom.classList.add('cardbottom');
      changeCardBottomColor();
      card.appendChild(cardbottom);
      
      //CARD-BOTTOM1
      let cardbottom1 = document.createElement('div');
      cardbottom1.classList.add('cardbottom1');
      cardbottom.appendChild(cardbottom1);

      //CARD-BOTTOM2
      let cardbottom2 = document.createElement('div');
      cardbottom2.classList.add('cardbottom2');
      cardbottom.appendChild(cardbottom2);

      //_________________________CARD-/top/mid/bottom innehåll___________________________________

      // CARD-TOP INNEHÅLL pokemon NAMN & ID
      let pokeName = document.createElement('p'); //gör ny p tagg
      pokeName.setAttribute('class', 'pokeName');
      pokeName.innerHTML = '<b>'+ pokeData.name + " #" + pokeData.id +'</b>' 
      cardtop.appendChild(pokeName);

      //CARD-MIDDLE INNEHÅLL pokemon BILD
      let cardImage = document.createElement('img');
      cardImage.className = 'card-img';
      if(shinyCheck == true){
        cardImage.setAttribute('src', pokeData.sprites.front_shiny);
        cardImage.setAttribute('alt', pokeData.sprites.front_shiny);
      }
      else{
        cardImage.setAttribute('src', pokeData.sprites.front_default);
        cardImage.setAttribute('alt', pokeData.sprites.front_default);
      }
      cardmiddle.appendChild(cardImage);

      //CARD.BOTTOM1 INNEHÅLL stats 1-3
      let stat1 = document.createElement('p'); //gör ny p tagg
      stat1.innerHTML = '<b>'+ "HP: " + '</b>'+ pokeData.stats[0].base_stat; // ger p-taggen html-innehållet av sträng + stat-namn från api-objektet
      cardbottom1.appendChild(stat1);

      let stat2 = document.createElement('p'); 
      stat2.innerHTML = '<b>'+ " Attack: " + '</b>'+ pokeData.stats[1].base_stat; 
      cardbottom1.appendChild(stat2);
      
      let stat3 = document.createElement('p'); 
      stat3.innerHTML = '<b>'+ "Defense: " + '</b>'+ pokeData.stats[2].base_stat; 
      cardbottom1.appendChild(stat3);

      //CARD.BOTTOM2 INNEHÅLL stats 4-6
      let stat4 = document.createElement('p'); 
      stat4.innerHTML = '<b>'+ " Sp. Atk: " + '</b>'+ pokeData.stats[3].base_stat; 
      cardbottom2.appendChild(stat4);

      let stat5 = document.createElement('p'); 
      stat5.innerHTML = '<b>'+ "Sp. Def " + '</b>'+ pokeData.stats[4].base_stat; 
      cardbottom2.appendChild(stat5);

      let stat6 = document.createElement('p'); 
      stat6.innerHTML = '<b>'+ " Speed " + '</b>'+ pokeData.stats[5].base_stat; 
      cardbottom2.appendChild(stat6);
  
      /*denna funktion används i funktionen "changeCardBottomColor" & "changeCardBottomColor2"*/  
      function checkType(){ /* if it works it works funktion som returnerar en typ beroende på vad för typ api-objektet har*/
      
        let type = pokeData.types[0].type.name;
        switch (type) {
          case 'normal':
            return "normal";
          case 'water':
            return "water";
          case 'fire':
            return "fire";
          case 'grass':
            return "grass";
          case 'electric':
            return "electric";
          case 'ice':
            return "ice";
          case 'fighting':
            return "fighting";
          case 'poison':
            return "poison";
          case 'ground':
            return "ground";
          case 'flying':
            return "flying";
          case 'psychic':
            return "psychic";
          case 'bug':
            return "bug";
          case 'rock':
            return "rock";
          case 'ghost':
            return "ghost";
          case 'dark':
            return "dark";
          case 'dragon':
            return "dragon";
          case 'steel':
            return 'steel';
          case 'fairy':
            return "fairy";
        }
      };

      //ursäktar funktionen, inte det finaste jag gjort men var det första jag kunde komma på :)
      function changeCardColor2(){ /* denna funktion matchar den returnerade pokemon-typen och ändrar bakgrundsfärg på kortet till de officiella typ-färgerna för pokemon spel */

        let pokeType = checkType();// returnerar typen från api-objektet och slänger in det i variabel
        
        switch (pokeType) {
          case 'water':
          card.style.backgroundColor = '#6390F0';
          break;
          case 'fire':
          card.style.backgroundColor = '#EE8130';
          break;
          case 'grass':
          card.style.backgroundColor = '#7AC74C';
          break;
          case 'normal':
          card.style.backgroundColor = '#A8A77A';
          break;
          case 'electric':
          card.style.backgroundColor = '#F7D02C';
          break;
          case 'ice':
          card.style.backgroundColor = '#96D9D6';
          break;
          case 'fighting':
          card.style.backgroundColor = '#C22E28';
          break;
          case 'poison':
          card.style.backgroundColor = '#A33EA1';
          break;
          case 'ground':
          card.style.backgroundColor = '#E2BF65';
          break;
          case 'flying':
          card.style.backgroundColor = '#A98FF3';
          break;
          case 'psychic':
          card.style.backgroundColor = '#F95587';
          break;
          case 'bug':
          card.style.backgroundColor = '#A6B91A';
          break;
          case 'rock':
          card.style.backgroundColor = '#B6A136';
          break;
          case 'ghost':
          card.style.backgroundColor = '#735797';
          break;
          case 'dark':
          card.style.backgroundColor = '#6F35FC';
          break;
          case 'dragon':
          card.style.backgroundColor = '#705746';
          break;
          case 'steel':
          card.style.backgroundColor = '#B7B7CE';
          break;
          case 'fairy':
          card.style.backgroundColor = '#D685AD';
          break;
        };
      };

      //samma som changeCardBottomColor2 fast mörkare färger och för Card-bottom
      function changeCardBottomColor(){

        let pokeType = checkType();
        
        switch (pokeType) {

          case 'water':
          cardbottom.style.backgroundColor = '#2d67e3';
          break;
          case 'fire':
          cardbottom.style.backgroundColor = '#e66302';
          break;
          case 'grass':
          cardbottom.style.backgroundColor = '#369100';
          break;
          case 'normal':
          cardbottom.style.backgroundColor = '#7a7a58';
          break;
          case 'electric':
          cardbottom.style.backgroundColor = '#d1ae19';
          break;
          case 'ice':
          cardbottom.style.backgroundColor = '#59cfc9';
          break;
          case 'fighting':
          cardbottom.style.backgroundColor = '#8f1510';
          break;
          case 'poison':
          cardbottom.style.backgroundColor = '#940691';
          break;
          case 'ground':
          cardbottom.style.backgroundColor = '#c9a036';
          break;
          case 'flying':
          cardbottom.style.backgroundColor = '#8867e6';
          break;
          case 'psychic':
          cardbottom.style.backgroundColor = '#ed326b';
          break;
          case 'bug':
          cardbottom.style.backgroundColor = '#7d8c0d';
          break;
          case 'rock':
          cardbottom.style.backgroundColor = '#8c7a1d';
          break;
          case 'ghost':
          cardbottom.style.backgroundColor = '#5e3b8a';
          break;
          case 'dark':
          cardbottom.style.backgroundColor = '#5929cf';
          break;
          case 'dragon':
          cardbottom.style.backgroundColor = '#6b442a';
          break;
          case 'steel':
          cardbottom.style.backgroundColor = '#9999ad';
          break;
          case 'fairy':
          cardbottom.style.backgroundColor = '#d6639c';
          break;
        };
      };

}
}
}