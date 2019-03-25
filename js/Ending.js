function Ending(widthCanvas ,heightCanvas){
    this.x;
    this.y;
    this.width;
    this.height;
    this.startTime;
    this.endTime;
    this.begin;
    this.opacity;
    this.do;
    this.playerDie = false;
    this.point = 0;
    this.dp;
    this.drawPoint = 0;
    var Constructor = function( widthCanvas , heightCanvas){
        this.width =  widthCanvas;
        this.height = heightCanvas;
        this.opacity = 0;
        this.do = 0.0125;
        this.dp = 20;
    }
    this.Constructor = Constructor;
    this.Constructor(widthCanvas, heightCanvas);
}
Ending.prototype.update = function( point , player ){
   this.playerDie = player.getDie(); 
   if(this.opacity < 0.5){
       this.opacity = this.opacity + this.do;
   }else{
       if(!this.playerDie){
           this.point = point;
           if( this.drawPoint < this.point )
            this.drawPoint = this.drawPoint + this.dp;
           else if(  this.drawPoint = this.point ){
              if(this.point>=3000)
                player.setWin(true);
              else
                player.setLose(true);
           }
       }
   }
   
}
Ending.prototype.draw = function(context){
    context.beginPath();
    context.fillStyle = 'rgba(0,0,0,' + this.opacity + ') ';
    context.fillRect(0,0, this.width , this.height);
    context.font = '24pt Century Gothic';
    context.textAlign = 'center';
    context.fillStyle = 'white';
   if(this.opacity >= 0.5){
        if( this.playerDie ){  
          context.fillText('Game Over', this.width/2, this.height/3);          
        }else {
          context.fillText(' Gift point: '+this.drawPoint , this.width/2, this.height/2);
        }
        context.beginPath();
            context.lineWidth = 12;
        context.moveTo(20, 10);
        context.lineTo(80, 10);
        context.quadraticCurveTo(90, 10, 90, 20);
        context.lineTo(90, 80);
        context.quadraticCurveTo(90, 90, 80, 90);
        context.lineTo(20, 90);
        context.quadraticCurveTo(10, 90, 10, 80);
        context.lineTo(10, 20);
        context.quadraticCurveTo(10, 10, 20, 10);
        context.stroke();
    }
    context.closePath();
    
}