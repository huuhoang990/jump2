var arr_ai = [];
function AI(tm, widthCanvas, heightCanvas){
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
    
    this.blockLeft = false;
     this.blockRight = false;
   var Constructor = function(tm){
       
       this.tileMap = tm;
       
       this.width = 24;
       this.height = 27;
       
       this.moveSpeed = 0.6;
       this.maxSpeed = 2.2;
       this.maxFallingSpeed = 12;
       this.stopSpeed = 0.30;
       this.jumpStart = -11.0;
       this.gravity = 0.64;
       
       try{
                this.idleSprite = new Array(1);
                this.jumpingSprites = new Array(1);
                this.fallingSprites = new Array(1);
                this.walkingSprites = new Array(6);

                this.idleSprite[0] = convertImageObj("graphics/player/tonberry.gif");
                this.jumpingSprites[0] = convertImageObj("graphics/player/tonberryjump.gif");
                this.fallingSprites[0] = convertImageObj("graphics/player/tonberryfall.gif");
                
                var image = convertImageObj("graphics/player/tonberrywalk.gif");
                for( var i = 0; i< this.walkingSprites.length; i++){
                    this.walkingSprites[i] = new SubImage(
                            image,
                            i*this.width,
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
       arr_ai.push(this);
    }
    this.Constructor = Constructor;
    this.Constructor(tm);
    
   // this.Constructor = Constructor;
    //this.Constructor();
}

AI.prototype.setx = function(i) { this.x = i; }

AI.prototype.sety = function(i) { this.y = i; }

AI.prototype.setLeft = function(b){
    this.left =b;
}
AI.prototype.setRight = function(b){
    this.right = b;
}
AI.prototype.setJumping = function(b){
    if(!this.falling){
        this.jumping = true;
    }
}

AI.prototype.getLeft = function() { 
   return this.x; 
}
AI.prototype.getRight = function() { 
   return this.x+this.width; 
}
AI.prototype.getTop = function() { 
   return this.y; 
}
AI.prototype.getBottom = function() { 
   return this.y+this.height; 
}

AI.prototype.getx= function() {
    var tx = this.tileMap.getX();
    var ty = this.tileMap.getY();
   return tx+this.x-this.width/2; 
}
AI.prototype.gety = function() {
   var tx = this.tileMap.getX();
   var ty = this.tileMap.getY();
   return ty+this.y-this.height/2; 
}


AI.prototype.calculateCorners = function(x,y){
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
AI.prototype.update = function(){
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
    }
    
    if(this.falling){
        this.dy += this.gravity;
        if(this.dy > this.maxFallingSpeed){
            this.dy = this.maxFallingSpeed;
        }
    }else{
        this.dy = 0;
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
            if(tempy<=0)
                tempy=this.tileMap.getHeightMap();
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
        if(this.topRight || this.bottomRight){
            this.dx = 0;
            tempx = (currCol + 1 )*this.tileMap.getTileSize()-this.width/2;
        }else {
            tempx += this.dx;
        }
    }
    
  if(this.topLeft || this.bottomLeft)
    this.blockLeft = true;
  else
    this.blockLeft = false;
  if(this.topRight || this.bottomRight)
    this.blockRight = true;
  else
    this.blockRight = false;
        
    
    
    
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
    this.animation.update();
    
    if(this.dx<0){
        this.facingLeft = true;
    }
    if(this.dx >0 ){
        this.facingLeft = false;
    }
}

AI.prototype.draw = function(context){
    var tx = this.tileMap.getX();
    var ty = this.tileMap.getY();
    if(this.facingLeft){
        if(this.animation.getImage().constructor.name == "SubImage"){
            var subImg = this.animation.frames[this.animation.currentFrame];
            /*console.log(subImg.getx());
            console.log(subImg.gety());
            context.drawImage( subImg.getImage(), 0,0, 24, 27,(tx+this.x-this.width/2), (ty+this.y-this.height/2),this.width,this.height);*/
            
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
        /*
        context.drawImage(
                    this.animation.getImage(),
                    (tx+this.x-this.width/2+this.width),
                    (ty+this.y-this.height/2),
                    -this.width,
                    this.height
                );
        */
    }
    
    /*
    context.beginPath();
    context.fillStyle = "red";
    context.fillRect(
               parseInt(tx+this.x-this.width/2),
               parseInt(ty+this.y-this.height/2),
                this.width,
                this.height
            );
    */
}
