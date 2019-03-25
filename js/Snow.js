function Snow(image_src,x ,y,widthCanvas, heightCanvas){
    this.x;
    this.y;
    this.dx;
    this.dy;
    
    this.image;
    
    this.rad;
    this.speed;
    
    this.ready;
    this.clear;
    
    this.width = 10;
    this.height = 11;
    
    this.widthCanvas = widthCanvas;
    this.heightCanvas = heightCanvas;
    
    this.count_update = 0;
    var Constructor = function(image_src, x, y, widthCanvas, heightCanvas){
        //this.x = Math.random()*this.widthCanvas/2 + this.widthCanvas/4;
        this.x = x
        this.y = y;//this.height;
        
        this.speed =  Math.random()*1.5+0.5;       
        
        var image = new Image();
        image.src = image_src;
        this.image = image;
        
        var angle= Math.random()*180;
        console.log(angle);
        this.rad = (angle*Math.PI)/180;
        this.dx = Math.cos(this.rad) * this.speed;
        this.dy = Math.sin(this.rad)*this.speed;
    }
    this.Constructor = Constructor;
    this.Constructor(image_src,x,y, widthCanvas, heightCanvas);
}
Snow.prototype.update = function(){
    this.count_update++;
    this.x += this.dx;
    this.y += this.dy;
    if(this.y>=480)
        this.y=-this.height;
    if(this.x >= 640+this.width+5)
        this.dx = -this.dx;
    if(this.x <= -this.width-5)
        this.dx = -(this.dx);
}
Snow.prototype.draw = function(context){
    var tx = tileMap.getX();
    var ty = tileMap.getY();
     context.drawImage(
                    this.image,
                    tx+this.x-this.width/2,
                    ty+this.y-this.height/2
                );
                
}

