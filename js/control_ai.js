function control_ai(ai){
   if( !ai.left &&  !ai.right){
       var random_move = Math.floor(Math.random()*2);
       if(random_move==0)
            ai.setLeft(true);
        else
            ai.setRight(true);

  }
    if( ai.blockLeft == true &&  ai.dx==0 ){
       ai.setLeft(false);
       ai.setRight(true);
    }
    if( ai.blockRight == true &&  ai.dx==0 ){
       ai.setLeft(true);
       ai.setRight(false);
    }
    var jump = Math.floor(Math.random()*100);
    if(jump>95)
        ai.setJumping(true);
}
/*
function control_ai(ai){
 this.ai = ai;
 this.x = ai.getx();
 this.y = ai.gety();
 this.topLeft = ai.topLeft;
 this.topRight = ai.topRight;
 this.bottomLeft = ai.bottomLeft;
 this.bottomRight = ai.bottomRight;
 this.left = ai.left;
 this.right= ai.right;
 this.jumping = ai.jumping;
 this.falling = ai.falling;
 
 this.goLeft = false;
 this.goRight = false;
 this.isJumping = false;
 this.isFalling = false;
 this.standing =true;
}
control_ai.prototype.update= function(){
 this.x = this.ai.getx();
 this.y = this.ai.gety();
 this.topLeft = this.ai.topLeft;
 this.topRight = this.ai.topRight;
 this.bottomLeft = this.ai.bottomLeft;
 this.bottomRight = this.ai.bottomRight;
 this.left = this.ai.left;
 this.right= this.ai.right;
 this.jumping = this.ai.jumping;
 this.falling = this.ai.falling;
 
 if( !this.left && !this.right && !this.jumping && !this.falling ){
     this.standing = true;
 }
 if( this.left && !this.right && this.ai.dx!=0 ){
    this.goLeft = true;    
 }
 if( this.right && !this.left && this.ai.dx!=0 ){
    this.goLeft = true;    
 }
 if( this.jumping && this.ai.dy < 0){
     this.isJumping = true;
 }else{
     this.isJumping = false;
 }
 if( this.jumping || this.ai.dy > 0 ){
     this.isFalling = true;
 }else{
     this.isFalling = true;
 }
}
control_ai.prototype.control= function(){
    
}
*/
function control_ai2(ai){
   if( !ai.left &&  !ai.right)
      ai.setLeft(true);
  if(!ai.bottomLeft){
       ai.setLeft(false);
       ai.setRight(true);
  }
  if(!ai.bottomRight){
       ai.setLeft(true);
       ai.setRight(false);
  }
}
