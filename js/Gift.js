/* 
 * To change this license header, choose License Headers in Project Properties.
 * To change this template file, choose Tools | Templates
 * and open the template in the editor.
 */
var index_gift = 0;
function Gift(tm, widthCanvas, heightCanvas){
    this.index;
    
    this.x;
    this.y;
    this.dx=0;
    this.dy=0;
    
    this.width;
    this.height;
    
    this.image;
    
    this.widthCanvas = widthCanvas;
    this.heightCanvas = heightCanvas;
    
    this.left = false;
    this.right = false;
    this.falling=true;
    
    this.maxFallingSpeed;
    this.gravity;
    
    this.tileMap;
    
    this.topLeft;
    this.topRight;
    this.bottomLeft;
    this.bottomRight;
    
    this.cosx;
    this.siny;
    
    this.color;
    this.type;
    
    this.ready = false;
    this.readyTime = Date.now();
    this.timeout = 0;
    
    this.point;
    var Constructor = function(tm){
        this.index = index_gift++;
        
        var angle= Math.random()*(90-89) + 89;
        this.type= parseInt( Math.random()*4+1);
        if(this.type == 1){
            //this.color = "#a00702";
            this.image = convertImageObj( "graphics/gift/gift1.gif");
            this.maxFallingSpeed = 2;
            this.gravity = 0.16;
            this.point = 100;
        }
        if(this.type == 2){
            //this.color = "#01621f";
            this.image = convertImageObj( "graphics/gift/gift2.gif");
            this.maxFallingSpeed = 2.5;
            this.gravity = 0.32;
            this.point = 200;
        }
        if(this.type == 3){
            //this.color = "#edbc53";
            this.image = convertImageObj( "graphics/gift/gift3.gif");
            this.maxFallingSpeed = 3;
            this.gravity = 0.24;
            this.point = 300;
        }
        if(this.type == 4){
            //this.color = "#0c66bc";
            this.image = convertImageObj( "graphics/gift/gift4.gif");
            this.maxFallingSpeed = 4;
            this.gravity = 0.42;
            this.point = 400;
        }
         this.tileMap = tm;
         
         this.width = 20;
         this.height = 20;
         
        var rad = (angle*Math.PI)/180;
        if(this.type%2!=0)
            this.cosx = -Math.cos(rad);
        else
            this.cosx = Math.cos(rad);
        this.siny = Math.sin(rad);
        
       this.timeout = Math.random()*(10000-1000)+1000;

    }
    this.Constructor = Constructor;
    this.Constructor(tm);
}
Gift.prototype.setx = function(i){ 
    this.x=i; 
}
Gift.prototype.sety = function(i){ 
    this.y=i; 
}
Gift.prototype.getIndex = function() { 
   return this.index; 
}
Gift.prototype.getLeft = function() { 
   return this.x; 
}
Gift.prototype.getRight = function() { 
   return this.x+this.width; 
}
Gift.prototype.getTop = function() { 
   return this.y; 
}
Gift.prototype.getBottom = function() { 
   return this.y+this.height; 
}

Gift.prototype.getReady = function() { 
   return this.ready; 
}

Gift.prototype.giftReady = function() { 
    if(Date.now()- this.readyTime >=  this.timeout)
        this.ready = true;
}

Gift.prototype.getPoint = function() { 
    return this.point;
}

Gift.prototype.caculateCorners = function(x,y){
    var leftTile = this.tileMap.getColTile( x - this.width/2 );
    var rightTile = this.tileMap.getColTile( (x + this.width/2) - 1);
    var topTile = this.tileMap.getRowTile( y - this.height/2 );
    var bottomTile = this.tileMap.getRowTile( (y+this.height/2)-1 );
        
    this.topLeft = this.tileMap.isBlocked( topTile , leftTile);
    this.topRight = this.tileMap.isBlocked(topTile,rightTile);
    this.bottomLeft = this.tileMap.isBlocked(bottomTile,leftTile);
    this.bottomRight = this.tileMap.isBlocked(bottomTile,rightTile);
}

Gift.prototype.giftCollision = function(gift2){
    var xCollision;
    var yCollision;
    var rect = {
        left: Math.max(this.getLeft(), gift2.getLeft()),
        top: Math.max(this.getTop(), gift2.getTop()),
        right: Math.min(this.getRight(), gift2.getRight()),
        bottom: Math.min(this.getBottom(), gift2.getBottom())
    };   
   if (rect.left < rect.right || rect.top < rect.bottom ) 
        return true;
    return false;
   
 }
///////////////////////////////////////////////////////////////////////////////////////////////////
Gift.prototype.update = function(){
     //check collisions gift
     /*
    var giftCollision = null;
    for(var i=0;i<gift_arr.length;i++){
        if(this.getIndex()!= gift_arr[i].getIndex()){
          giftCollision = this.giftCollision(gift_arr[i]);
          if(gift_arr[i].falling==false && giftCollision==true){
              giftCollision=true;
          }
          else
              giftCollision=false;
        }
    }
    */
    if(this.falling){
        this.dx += this.cosx;
        this.dy += this.gravity+this.siny;
        if(this.dy > this.maxFallingSpeed){
            this.dy = this.maxFallingSpeed;
        }
    }else{
            this.dx = 0;
            this.dy = 0;
    }
    //check collisions
    var currCol  = this.tileMap.getColTile(parseInt(this.x));
    var currRow = this.tileMap.getRowTile(parseInt(this.y));
    
    var tox = this.x + this.dx;
    var toy = this.y + this.dy;
    
    var tempx = this.x;
    var tempy = this.y;
    
    this.caculateCorners(this.x,toy);
    if(this.dy < 0){
        if(this.topLeft || this.topRight){
            this.dy = 0;
            tempy = currRow * this.tileMap.getTileSize() + this.height/2;
        }else{
         
            tempy +=this.dy;
        }
    }
    if(this.dy > 0){        
        if(this.bottomLeft || this.bottomRight){
            this.dy = 0;
            this.falling = false;
            tempy = (currRow+1)*this.tileMap.getTileSize()-this.height/2;
        }else{           
            tempy+=this.dy;
        }
    }   
    this.caculateCorners(tox, this.y);
    if(this.dx<0){
        if(this.topLeft || this.bottomLeft){
            this.dx = 0;
            this.tempx = currCol * this.tileMap.getTileSize() + this.width/2;
        }else{
            tempx += this.dx;
            if(tempx<=this.width/2+5)
                tempx=this.width/2+5;
        }
    }   
    if(this.dx > 0){
        if(this.topRight || this.bottomRight){
            this.dx = 0;
            tempx = (currCol+1)*this.tileMap.getTileSize()-this.width/2;
        }else{
            tempx += this.dx;
            if(tempx>=this.tileMap.getWidthMap()-this.width/2-5)
              tempx=this.tileMap.getWidthMap()-this.width/2-5;
        }
    }
    
     if(!this.falling){
        this.caculateCorners(this.x,this.y+1);
        if(!this.bottomLeft && !this.bottomRight){
            this.falling = true;
        }
    }
    this.x = tempx;
    this.y = tempy;
}

Gift.prototype.draw = function(context){
    var tx = this.tileMap.getX();
    var ty = this.tileMap.getY();
    context.beginPath();
    /*
    context.fillStyle = this.color;
    context.fillRect(
        parseInt(tx+this.x-this.width/2),
        parseInt(ty+this.y-this.height/2),
        this.width,
        this.height
    );
    */
    context.drawImage(
                   this.image,
                   parseInt(tx+this.x-this.width/2),
                   parseInt(ty+this.y-this.height/2),
                   this.width,
                   this.height
               );
    context.closePath(); 
}