document.addEventListener('DOMContentLoaded',()=>{
    //? getting the objects 
    const textToType = document.getElementById("text-to-type");
    const typingInput = document.getElementById("typing-input");
    const speed = document.getElementById("speed");
    const accuracy = document.getElementById("accuracy");

    //? setting the initial values 
    let error = 0;
    let startTime = new Date();
    let currentIndex = 0;

    //? sample text 
    const sampleText = ["aa bb ab ab ba abba" , "gh jk df fd def jkl", "mnop vki werra tuf","bhi jk byyi yolp poly" ,"rst yzq wti mmm zser", "ght opi vvfrt", "rty qqi opji zser"] 

    //?functions 
    // initialization function 
    function initializer(){
         const text = sampleText[Math.floor(Math.random()*sampleText.length)]
         textToType.textContent = text;
         typingInput.value = '';
         error = 0;
         startTime = new Date();
         currentIndex = 0 ;
         calcAccuracySpeed();
    }
    //!function updating speed and accuracy 
    function calcAccuracySpeed(){
      //speed calculations
        const currentTime = new Date();
        const elapsedTime = (currentTime- startTime)/60000;    //converting milliseconds into the minutes 
        if(elapsedTime<=0){
               speed.textContent = "0";
        }
        else{
            const wordsTyped = typingInput.value.trim().split(/\s+/).length;
            speed.textContent = Math.round(wordsTyped/elapsedTime);
        }

        //accuracy calculations
        const accuracyValue  = currentIndex > 0 ? Math.round((currentIndex - error)*100/currentIndex):100;
        accuracy.textContent = accuracyValue;
    }


    //!function to check the error
    function errorCheck(inputChar, targetChar){
          if(inputChar!==targetChar){
               error++;
               new Audio("./PROJECTS_Typing-test-project-starter_error.mp3").play();
               return false;
          }else{
               return true;
          }
    }
    //!function to display the message
    function displayMessage(message){
       const messageArea = document.getElementById("message-area");
       messageArea.textContent = message;
       setTimeout(()=>{
        messageArea.textContent = "";
       },3000);
    }


    //!event listener when user gives input 
    typingInput.addEventListener("input",(e)=>{
       const typedText = typingInput.value ;
       const targetedText = textToType.textContent;
       if(currentIndex < targetedText.length){
         const isCorrect = errorCheck(typedText[currentIndex],targetedText[currentIndex]);

         //logic to change the color of target text when right o wrong...........
        textToType.innerHTML = targetedText.substring(0,currentIndex) + `<span class =${isCorrect? 'correct':'incorrect'}>${targetedText[currentIndex]}</span>` + targetedText.substring(currentIndex+1)
         currentIndex++;
       
         if(currentIndex==targetedText.length){
            displayMessage("the text has been completed , starting the new text");
            setTimeout(()=>{
                initializer()
            },3000);
           }
       }   
       calcAccuracySpeed();
    })

    //initializing the game 
    initializer();
});