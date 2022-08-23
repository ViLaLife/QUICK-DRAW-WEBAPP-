var check_time=0;
score=0;
quick_draw=["aircraft carrier","airplane","alarm clock","ambulance","angel","animal migration","ant","anvil","apple","arm","asparagus","axe","backpack","banana","bandage","barn","baseball","baseball bat","basket","basketball","bat","bathtub","beach","bear","beard","bed","bee","belt","bench","bicycle","binoculars","bird","birthday cake","blackberry","blueberry","book","boomerang","bottlecap","bowtie","bracelet","brain","bread","bridge","broccoli","broom","bucket","bulldozer","bus","bush","butterfly","cactus","cake","calculator","calendar","camel","camera","camouflage","campfire","candle","cannon","canoe","car","carrot","castle","cat","ceiling fan","cello","cell phone","chair","chandelier","church","circle","clarinet","clock","cloud","coffee cup","compass","computer","cookie","cooler","couch","cow","crab","crayon","crocodile","crown","cruise ship","cup","diamond","dishwasher","diving board","dog","dolphin","donut","door","dragon","dresser","drill","drums","duck","dumbbell","ear", "elbow","elephant","envelope","eraser","eye","eyeglasses","face","fan","feather","fence","finger","fire hydrant","fireplace","firetruck","fish","flamingo","flashlight","flip flops","floor lamp","flower","flying saucer","foot","fork","frog","frying pan","garden","garden hose","giraffe","goatee","golf club","grapes","grass","guitar","hamburger","hammer","hand","harp","hat","headphones","hedgehog","helicopter","helmet","hexagon","hockey puck","hockey stick","horse","hospital","hot air balloon","hot dog","hot tub","hourglass","house","house plant","hurricane","ice cream","jacket","jail","kangaroo","key","keyboard","knee","knife","ladder","lantern","laptop","leaf","leg","light bulb","lighter","lighthouse","lightning","line","lion","lipstick","lobster","lollipop","mailbox","map","marker","matches","megaphone","mermaid","microphone","microwave","monkey","moon","mosquito","motorbike","mountain","mouse","moustache","mouth","mug","mushroom","nail","necklace","nose","ocean","octagon","octopus","onion","oven","owl","paintbrush","paint can","palm tree","panda","pants","paper clip","parachute","parrot","passport","peanut","pear","peas","pencil","penguin","piano","pickup truck","picture frame","pig","pillow","pineapple","pizza","pliers","police car","pond","pool","popsicle","postcard","potato","power outlet","purse","rabbit","raccoon","radio","rain","rainbow","rake","remote control","rhinoceros","rifle","river","roller coaster","rollerskates","sailboat","sandwich","saw","saxophone","school bus","scissors","scorpion","screwdriver","sea turtle","see saw","shark","sheep","shoe","shorts","shovel","sink","skateboard","skull","skyscraper","sleeping bag","smiley face","snail","snake","snorkel","snowflake","snowman","soccer ball","sock","speedboat","spider","spoon","spreadsheet","square","squiggle","squirrel","stairs","star","steak","stereo","stethoscope","stitches","stop sign","stove","strawberry","streetlight","string bean","submarine","suitcase","sun","swan","sweater","swingset","sword","syringe","table","teapot","teddy-bear","telephone","television","tennis racquet","tent","The Eiffel Tower","The Great Wall of China","The Mona Lisa","tiger","toaster","toe","toilet","tooth","toothbrush","toothpaste","tornado","tractor","traffic light","train","tree","triangle","trombone","truck","trumpet","tshirt","umbrella","underwear","van","vase","violin","washing machine","watermelon","waterslide","whale","wheel","windmill","smiley","clock","wristwatch","diamond","zebra","zigzag"]

random_number = Math.floor((Math.random() * quick_draw.length) + 1);
console.log(quick_draw[random_number]);
sketch = quick_draw[random_number];
drawn_sketch="";
document.getElementById('sketch').innerHTML = 'Sketch To be Drawn: ' + sketch;

function preload(){
    classifier=ml5.imageClassifier('DoodleNet');
    
    }
    function setup(){
        canvas=createCanvas(300,300);
        canvas.center();
        background("white");
        canvas.mouseReleased(classifyCanvas);
        synth=window.speechSynthesis;
    
    }
    function clearCanvas(){
       background("white");
    
    }

    function update_canvas() {
      background("white");
      random_number = Math.floor((Math.random() * quick_draw.length) + 1);
      console.log(quick_draw[random_number]);
      sketch = quick_draw[random_number];
      document.getElementById('sketch').innerHTML = 'Sketch To be Drawn: ' + sketch;
      document.getElementById('timer').innerHTML = 'Timer: ' + time;
      
    }
    //function timer() {
      //document.getElementById('timer').innerHTML = 'Timer: ' + time++;
      

    //}
    
    function draw(){
    //set stroke weight to 13
    strokeWeight(13);
    // set stroke color to black
    stroke(0);
    //on mouse press, draw line between previous and current mouse position
    if(mouseIsPressed){
        line(pmouseX,pmouseY,mouseX,mouseY);

    }



    
    if(drawn_sketch == sketch){
 score++;
 document.getElementById('score').innerHTML = 'Score: ' + score;
 update_canvas();
 time=0;



    }

    if(time<1500){
      //timer();
      time++
      
      document.getElementById('timer').innerHTML = 'Timer: ' + time;

      if (time==1500){
        check_time=1;
           }
      
      }
      
      if (check_time==1){
        update_canvas();
        time=0;
        check_time=0;
      }
      
    
    }
    
    function classifyCanvas(){
        classifier.classify(canvas,Gotresult);
      
      }

      time=0;

      //function start(){}
      
        
        
       // console.log(time);
       
       
       
      


      

      function Gotresult(error,results){
       if(error){
           console.error(error);
       }
      console.log(results);
      
      document.getElementById("confidence").innerHTML='confidence: '+Math.round(results[0].confidence*100)+'%';

      drawn_sketch = results[0].label;
      document.getElementById('label').innerHTML = 'Your Sketch: ' + drawn_sketch;

      utterthis=new SpeechSynthesisUtterance(results[0].label);
      synth.speak(utterthis);
      }