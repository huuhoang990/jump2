function Player(tm, widthCanvas, heightCanvas){
    this.x;
    this.y;
    this.dx=0;
    this.dy=0;
    
    this.width;
    this.height;
    
    this.widthCanvas = widthCanvas;
    this.heightCanvas = heightCanvas;
    
    this.left=false;
    this.right=false;
    this.jumping;
    this.falling;
    this.hurt = false;
    this.die =false;
    this.win = false;
    this.lose = false;
    
    this.moveSpeed;
    this.maxSpeed;
    this.maxFallingSpeed;
    this.stopSpeed;
    this.jumpStart;
    this.gravity;
    
    this.tileMap;
    
    this.topLeft;
    this.topRight;
    this.bottomLeft;
    this.bottomRight;
    
    this.animation;
    this.idleSprite ;
    this.walkingSprites;
    this.jumpingSprites;
    this.fallingSprites;
    this.facingLeft;
    
    this.kirbyHurt;
    this.startHurtTime = 0;
    
    this.kirbyDie;
    this.timeDie;
    
   this.kirbyWin;
   this.kirbyLose;
   
   this.soundJump;
   this.sound_getGift;
   this.soundCollision;
   
   var Constructor = function(tm){
       
       this.soundJump = new Audio("sound/jump.mp3");
       this.sound_getGift = new Audio("sound/get_gift.mp3");
       this.soundCollision = new Audio("sound/collision.mp3");
       
       this.tileMap = tm;
       
       this.width = 22.5;
       this.height = 22;
       
       this.moveSpeed = 0.6;
       this.maxSpeed = 4.2;
       this.maxFallingSpeed = 12;
       this.stopSpeed = 0.30;
       this.jumpStart = -11.0;
       this.gravity = 0.64;
       
       try{
                this.idleSprite = new Array(1);
                this.jumpingSprites = new Array(1);
                this.fallingSprites = new Array(1);
                this.walkingSprites = new Array(6);
                this.kirbyHurt = new Array(1);
                this.kirbyDie = new Array(1);
                this.kirbyWin = new Array(1);
                this.kirbyLose = new Array(1);
                
                this.idleSprite[0] = convertImageObj("graphics/player/kirbyidle.gif");
                this.jumpingSprites[0] = convertImageObj("graphics/player/kirbyjump.gif");
                this.fallingSprites[0] = convertImageObj("graphics/player/kirbyfall.gif");
                this.kirbyHurt[0] = convertImageObj("graphics/player/kirbyhurt.gif");
                this.kirbyDie[0] = convertImageObj("graphics/player/kirbydie.gif");
                
                this.kirbyWin[0] = convertImageObj("graphics/player/kirbyWin.gif") ;
                this.kirbyLose[0] = convertImageObj("graphics/player/kirbyLose.gif") ;

                
                var image = convertImageObj("graphics/player/kirbywalk.gif");
                for( var i = 0; i< this.walkingSprites.length; i++){
                    this.walkingSprites[i] = new SubImage(
                            image,
                            i*this.width+1,
                            0,
                            this.width,
                            this.height
                    );
                    //this.walkingSprites[i]  ; 
                }
       }catch(err){
           console.log(err);
       }
       this.animation = new Animation();
       this.facingLeft = false;
    }
    this.Constructor = Constructor;
    this.Constructor(tm);
    
   // this.Constructor = Constructor;
    //this.Constructor();
}

Player.prototype.setx = function(i) { this.x = i; }

Player.prototype.sety = function(i) { this.y = i; }

Player.prototype.setLeft = function(b){
    this.left =b;
}
Player.prototype.setRight = function(b){
    this.right = b;
}
Player.prototype.setJumping = function(b){
    if(!this.falling){
        this.jumping = true;
    }
}
Player.prototype.setHurt = function(b){
    this.hurt = b;
}
Player.prototype.setDie = function(b){
    this.die = b;
}
Player.prototype.setTimeDie = function(time){
    this.timeDie = time;
}
Player.prototype.setWin = function(b){
    this.win = b;
}
Player.prototype.setLose = function(b){
    this.lose = b;
}

Player.prototype.getLeft = function() { 
   return this.x; 
}
Player.prototype.getRight = function() { 
   return this.x+this.width; 
}
Player.prototype.getTop = function() { 
   return this.y; 
}
Player.prototype.getBottom = function() { 
   return this.y+this.height; 
}
Player.prototype.getDie = function(){
   return this.die;
}


Player.prototype.getx= function() {
    var tx = this.tileMap.getX();
    var ty = this.tileMap.getY();
   return tx+this.x-this.width/2; 
}
Player.prototype.gety = function() {
   var tx = this.tileMap.getX();
   var ty = this.tileMap.getY();
   return ty+this.y-this.height/2; 
}

Player.prototype.isJumping = function(){
    this.soundJump.currentTime=0;
    this.soundJump.play(); 
}
Player.prototype.is_gettingGift = function(){
    this.sound_getGift.volume = 0.1;
    this.sound_getGift.currentTime=0;
    this.sound_getGift.play(); 
}
Player.prototype.isColliding = function(){
    this.soundCollision.currentTime=0;
    this.soundCollision.play(); 
}

Player.prototype.calculateCorners = function(x,y){
    var leftTile = this.tileMap.getColTile( x - this.width/2 );
    var rightTile = this.tileMap.getColTile( (x + this.width/2) - 1);
    var topTile = this.tileMap.getRowTile( y - this.height/2 );
    var bottomTile = this.tileMap.getRowTile( (y+this.height/2)-1);
    
    this.topLeft = this.tileMap.isBlocked( topTile , leftTile);
    this.topRight = this.tileMap.isBlocked(topTile,rightTile);
    this.bottomLeft = this.tileMap.isBlocked(bottomTile,leftTile);
    this.bottomRight = this.tileMap.isBlocked(bottomTile,rightTile);    
}

////////////////////////////////////////////////////////////////////////////////////////////
Player.prototype.update = function(){
    //determine next position
    if( this.left ){
        this.dx -= this.moveSpeed;
        if( this.dx < - this.maxSpeed){
            this.dx = - this.maxSpeed;
            
        }
    }else if(this.right){
        this.dx += this.moveSpeed;
        if(this.dx > this.maxSpeed){
            this.dx = this.maxSpeed;
        }
    }else {
        if( this.dx > 0){
            this.dx -= this.stopSpeed;
            if(this.dx < 0){
                this.dx = 0;
            }
        }else if( this.dx < 0 ){
            this.dx += this.stopSpeed;
            if( this.dx > 0 ){
                this.dx = 0;
            }
        }
    }
    
    if(this.jumping){
        this.dy = this.jumpStart;
        this.falling = true;
        this.jumping = false;
        this.isJumping();
    }
    
    if(this.falling){
        this.dy += this.gravity;
        if(this.dy > this.maxFallingSpeed){
            this.dy = this.maxFallingSpeed;
        }
    }else{
        this.dy = 0;
    }
    
    //when player and ai collide
    if( this.hurt && Date.now() - this.startHurtTime <= 300){
        if (this.facingLeft){
            this.dx = +3;
            this.dy = 0;
            this.dy = -1;
        }else if(!this.facingLeft){
            this.dx = -3;
            this.dy = 0;
            this.dy = -1;
        }
        
    }else{
        this.startHurtTime = 0;
        this.hurt=false;
    }
    
    //when Kirby die
    if( this.die && Date.now()-this.timeDie<300 ){
        //this.dx = 0;
        //this.dy = 0;
        this.left=false;
        this.right=false;
        this.jumping = false;
    }
    //check collisions
    var currCol = this.tileMap.getColTile( parseInt(this.x));
    var  currRow = this.tileMap.getRowTile( parseInt(this.y));
   
    var tox = this.x + this.dx; 
    var toy = this.y + this.dy;
    
    var tempx = this.x;
    var tempy = this.y;
       
    this.calculateCorners(this.x,toy);
    if(this.dy < 0){
        if(this.topLeft || this.topRight){
            this.dy = 0;
            tempy = currRow *  this.tileMap.getTileSize() + this.height/2;            
        }else {
            tempy += this.dy;
        }
    }
    if(this.dy > 0){
        if( this.bottomLeft || this.bottomRight){
            this.dy = 0;
            this.falling = false;
            tempy = (currRow+1) * this.tileMap.getTileSize() - this.height/2;
        }else{
            tempy += this.dy;
          
        }
    }
    
    this.calculateCorners(tox,this.y);
    if(this.dx<0){
        if(this.topLeft || this.bottomLeft){
            this.dx = 0;
            this.tempx = currCol * this.tileMap.getTileSize() + this.width/2;
        }else{
            tempx += this.dx;
           
        }
    }
    
    if(this.dx > 0){
        if(this.topRight || this.bottomRight ){
            this.dx = 0;
            tempx = (currCol + 1 )*this.tileMap.getTileSize()-this.width/2;
        }else {
            tempx += this.dx;
        }
    }
    
    if(!this.falling){
        this.calculateCorners(this.x,this.y+1);
        if(!this.bottomLeft && !this.bottomRight){
            this.falling = true;
        }
    }
    this.x = tempx;
    this.y = tempy;
  
    //move the map
    /*
    if(this.x>200 && this.x<448)
    {
        this.tileMap.setX( parseInt(this.widthCanvas/2-this.x) );
    }
    if(this.y>200 && this.y<290)
    {
      this.tileMap.setY( parseInt( this.heightCanvas/2-this.y) );
    }
    */
    //console.log(parseInt(this.x));
    if(this.x > this.widthCanvas/2 && this.x<this.tileMap.getWidthMap()-this.widthCanvas/2)
        this.tileMap.setX( parseInt( this.widthCanvas/2-this.x ) );
    if(this.y >this.heightCanvas/2 && this.y<this.tileMap.getHeightMap()-this.heightCanvas/2)
        this.tileMap.setY( parseInt(this.heightCanvas/2-this.y) );
    
    /*this.tileMap.setX( parseInt(_canvas.width/2-this.x) );
    this.tileMap.setY( parseInt(_canvas.width/2-this.y) );*/
    //sprite animation
    if( this.left || this.right){
      this.animation.setFrames(this.walkingSprites);
        this.animation.setDelay(100);
    }else{
        this.animation.setFrames(this.idleSprite);
        this.animation.setDelay(-1);
    }
    if(this.dy < 0){
        this.animation.setFrames(this.jumpingSprites);
        this.animation.setDelay(-1);
    }
    if(this.dy > 0){
        this.animation.setFrames(this.fallingSprites);
        this.animation.setDelay(-1);
    }
    if(this.hurt){
        this.animation.setFrames(this.kirbyHurt);
        this.animation.setDelay(-1);
    }  
    if( this.die ){
        this.animation.setFrames(this.kirbyDie);
        this.animation.setDelay(-1);
    }
    if(this.win){
        this.animation.setFrames(this.kirbyWin);
        this.animation.setDelay(-1);
    }
     if(this.lose){
        this.animation.setFrames(this.kirbyLose);
        this.animation.setDelay(-1);
    }
    
    this.animation.update();
    
    if(this.dx<0 ){
        this.facingLeft = true;
    }
    if(this.dx >0 ){
        this.facingLeft = false;
    }
    
     if(this.dx<0 && this.hurt){
        this.facingLeft = false;
    }
    if(this.dx>0 && this.hurt){
        this.facingLeft = true;
    }
}

Player.prototype.draw = function(context){
    var tx = this.tileMap.getX();
    var ty = this.tileMap.getY();
    if(this.facingLeft){
        if(this.animation.getImage().constructor.name == "SubImage"){
            var subImg = this.animation.frames[this.animation.currentFrame];
             context.drawImage(
                     subImg.getImage(),
                     subImg.getx(),
                     subImg.gety(),
                     subImg.getWidth(),
                     subImg.getHeight(),
                    (tx+this.x-this.width/2),
                    (ty+this.y-this.height/2),
                    this.width,
                    this.height
                    
                );
        }else{
            context.drawImage(
                    this.animation.getImage(),
                    (tx+this.x-this.width/2),
                    (ty+this.y-this.height/2)
                );
        }
        
    }else{
          if(this.animation.getImage().constructor.name == "SubImage"){
            var subImg = this.animation.frames[this.animation.currentFrame];
            context.save();
            context.scale(-1,1);
            context.drawImage(
                     subImg.getImage(),
                     subImg.getx(),
                     subImg.gety(),
                      subImg.getWidth(),
                     subImg.getHeight(),
                    -(tx+this.x-this.width/2+this.width),
                    (ty+this.y-this.height/2),
                    this.width,
                    this.height
                    
                );
             context.restore();
         
       }else{
            context.save(); // Save the current state
            context.scale(-1,1); // Set scale to flip the image
            context.drawImage(
                    this.animation.getImage(),
                    -(tx+this.x-this.width/2+this.width),
                    (ty+this.y-this.height/2),
                    this.width,
                    this.height
                );
           context.restore();

        }
    }
}
