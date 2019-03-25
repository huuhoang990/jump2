function Animation(){
    this.frames = new Array();
    this.currentFrame = 0;
    this.startTime=0;
    this.delay;
    
    var Constructor = function(){
      
    }
    this.Constructor = Constructor;
    this.Constructor();
}
Animation.prototype.setFrames = function(images){
    this.frames = images;
    if( this.currentFrame >= this.frames.length)
        this.currentFrame = 0;
}
Animation.prototype.setDelay = function(d){
    this.delay = d;
}
Animation.prototype.getImage = function(){
    return this.frames[this.currentFrame];
}
Animation.prototype.update = function(){
    if(this.delay == -1)
        return;
    var elapsed = (Date.now() - this.startTime);
    if( elapsed > this.delay ){
        this.currentFrame++;
        this.startTime = Date.now();
    }
    if( this.currentFrame == this.frames.length){
        this.currentFrame = 0;
    }
}