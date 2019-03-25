function TextCanvas(x,y,time,string){
    this.x;
    this.y
    this.time;
    this.string;
    
    this.start;
    
    var Constructor = function(x,y,time,string){
        this.x = x;
        this.y = y;
        this.time = time;
        this.string = string
        this.start = Date.now();
    }
    this.Constructor = Constructor;
    this.Constructor(x,y,time,string);
}

TextCanvas.prototype.update = function(){
    var elapsed = Date.now() - this.start;
    if(elapsed > this.time){
        return true;
    }
    return false;
}

TextCanvas.prototype.draw = function(context){
    context.beginPath();
    context.font="12pt Century Gothic";
    var elapsed = (Date.now() - this.start);
    var alpha = 1*Math.sin(3.14*elapsed/this.time);
    if(alpha > 1) alpha = 1;
    context.fillStyle = 'rgba(255, 255,255,'+alpha+')';
    var length = context.measureText(this.string).width;
    context.fillText(this.string, parseInt(this.x-(length/2)),parseInt(this.y));
    context.closePath();
}