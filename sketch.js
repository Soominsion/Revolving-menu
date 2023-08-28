let font_en;
let img;
let words = [];
let showMenu = false;
let menu_clicked=false;
let num=0;

class Word {
  constructor(text_en, text_kor, x, y) {
    this.text_en = text_en;
    this.text_kor = text_kor;
    this.x = x;
    this.y = y;
    this.isRotating = false;
    this.angle = 0;
    this.centerX = x;
    this.centerY = y;
  }

  display() {
    fill(0);
    if (!this.isRotating) {
      textFont(font_en);
      text(this.text_en, this.x, this.y);
    } 
    else {
      push();
      translate(this.centerX, this.centerY);
      rotateY(this.angle);
      translate(-this.centerX, -this.centerY);
      if (this.angle < PI * 0.9) {
        textFont(font_en);
        text(this.text_en, this.x, this.y);
        this.angle += 0.1;
      } 
      
      else {
        textFont(font_kor);
        text(this.text_kor, this.x, this.y);
        this.angle += 0.2;
      }
      
      if (this.angle >= 2 * PI) {
        this.angle = 0;
        this.isRotating = false;
      }
      pop();
    }
  }

  checkClicked() {
    let wordWidth = textWidth(this.text_en);
    let wordHeight = textSize();
    let wordX = width / 2 + this.x - wordWidth / 2;
    let wordY = height / 2 + this.y - wordHeight / 2;
    if (
      mouseX >= wordX &&
      mouseX <= wordX + wordWidth &&
      mouseY >= wordY &&
      mouseY <= wordY + wordHeight
    ) {
      for (let i = 0; i < words.length; i++) {
        if (words[i] !== this) {
          words[i].isRotating = false; 
        }
      }
      this.isRotating = true;
      num+=1;
    }
  }
}

function preload() {
  font_en = loadFont('assets/DancingScript-Bold.ttf');
  font_kor = loadFont('assets/MapoFlowerIsland.ttf');
  font_menu = loadFont('assets/PermanentMarker-Regular.ttf');
}

function setup() {
  createCanvas(800, 600, WEBGL);
  paper_img = loadImage('assets/종이질감（반투명）.PNG');
  coffee_img = loadImage('assets/undraw_coffee.svg');
  cake_img= loadImage('assets/undraw_cupcake.svg');
  textSize(20);
  textAlign(CENTER, CENTER);

  // Create word objects
  //words.push(new Word('MENU', '메뉴', 0, -270));
  
  words.push(new Word('< COFFEE >', '< 커피 >', -200, -200))
  words.push(new Word('Americano', '아메리카노', -200, -150));
  words.push(new Word('Caffe Latte', '카페라떼', -200, -120));
  words.push(new Word('Einspanner', '아인슈페너', -200, -90));
  words.push(new Word('Cafe Con Panna', '에스프레소 콘파냐', -200, -60));
  
  words.push(new Word('< DESSERT >', '< 디저트 >', 200, -200));
  words.push(new Word('Financier', '휘낭시에', 200, -150));
  words.push(new Word('Croquant Chou', '크로칸슈', 200, -120));
  words.push(new Word('Bonui Marron', '밤 조림', 200, -90));
  words.push(new Word('Green Onion Bagel  ', '쪽파 베이글', 200, -60));
  
  words.push(new Word('< TEA >', '< 차 >', -200, 50));  
  words.push(new Word('Yuja Tea', '유자차', -200, 100));
  words.push(new Word('Black Tea', '홍차', -200, 130));
  words.push(new Word('Green Plum Tea', '매실차', -200, 160));
  words.push(new Word('Grapefruit Tea', '자몽 에이드', -200, 190));
  words.push(new Word('Green Grape Tea', '청포도차', -200, 220));
  words.push(new Word('Green Tangerine Tea', '청귤차', -200, 250));
  
  
  words.push(new Word('< BEVERAGE >', '< 음료 >', 200, 50));
  words.push(new Word('M.S.G.R', '미숫가루', 200, 100));
  words.push(new Word('Mugwort Latte', '쑥라떼', 200, 130));
  words.push(new Word('Red Bean Latte', '팥라떼', 200, 160));
  words.push(new Word('Dragonfruit Ade', '용과 에이드', 200, 190)); 
  words.push(new Word('Black Sesame Latte', '흑임자라떼', 200, 220));
  words.push(new Word('Sweet Pumpkin Sikhye', '단호박 식혜', 200, 250));
  

  
}

function keyPressed() {
  if (keyCode === ENTER && !showMenu) {
    showMenu = true;
  }
}

function mousePressed() {
  for (let i = 0; i < words.length; i++) {
    words[i].checkClicked();
  }
  checkMENUCliked();
}


function checkMENUCliked(){
  let wordWidth = textWidth('menu');
  let wordHeight = textSize();
  let wordX = width / 2 + 0 - wordWidth / 2;
  let wordY = height / 2 -270 - wordHeight / 2;
  if (
      mouseX >= wordX &&
      mouseX <= wordX + wordWidth &&
      mouseY >= wordY &&
      mouseY <= wordY + wordHeight
    ){
    menu_clicked=true;
  }
  
}


function display_eng_menu(){
  push();
  image(coffee_img, -130, -280);
  image(cake_img, 60, -290);
  //line(0, -210, 0, 270);
  textSize(30);
  textFont(font_menu);
  text('MENU', 0, -270);
  for (let i = 0; i < words.length; i++) {
    textSize(20);
    words[i].display();
  }
  pop();  
}
function display_kor_menu(){
  background('#FFFBF0');
  image(coffee_img, -130, -280);
  image(cake_img, 60, -290);
  //line(0, -210, 0, 270);
  textSize(30);
  textFont(font_kor);
  text('메뉴', 0, -270);
  for (let i = 0; i < words.length; i++) {
    textSize(20);
    text(words[i].text_kor, words[i].x, words[i].y)
  }
}

function draw() {
  background('#FFFBF0');
  
  if (!showMenu) {
    textSize(25);
    textFont(font_menu);
    fill(0);
    let hi = "What menu are you curious about?";
    let touchText = "Touch it";
    let enterText = "Please press the Enter key.";
    let totalHeight = 30 + 10 + 15;
    
    text(hi, 0, -totalHeight/2);
    text(touchText, 0, -totalHeight / 2 + 30);
    
    if (millis() % 1000 < 500) {
      textSize(15);
      text(enterText, 0, 280);
    }
  } 
  else {
    display_eng_menu();
    if(num >= 10){      
      fill(0);
      rect(-260,-10,530,30);
      textSize(20);
      fill(255);
      textFont(font_menu);
      text('If you want to see the Korean menu, press \'MENU\' ', -5, 0);
      fill(0);
      if (menu_clicked){
        display_kor_menu();
      }
    }
    else{
      menu_clicked=false;     
    }
  } 
}
