var loadImagesFunc = function (array_img, num_array ,callback, context){
  var imgObj = new Image();
  imgObj.src = array_img[num_array];
  var length_arr = array_img.length;
  imgObj.onload = function() {
    if(array_img.length>(num_array+1)){
        var percent = Math.floor(num_array/length_arr*100);
        loadingBarFunc( context, percent );        
        loadImagesFunc(array_img,num_array+1,callback, context);
    }else if(array_img.length==(num_array+1)){
                callback();
    }
  }
}
var loadingBarFunc = function(context , percent){
    var end_degree =  percent*360/100;  
    var canvas_element = context.canvas;
    var w_canvas = canvas_element.width;
    var h_canvas = canvas_element.height;
    context.clearRect( 0, 0, w_canvas, h_canvas);
    context.beginPath();
    context.fillStyle = '#232323';
    context.fillRect(0,0, w_canvas,h_canvas);
    
    context.arc(w_canvas/2, h_canvas/2, 100, 0, 2*Math.PI );
    context.lineWidth = 15;
    context.strokeStyle = 'black';   
    context.stroke();
    context.closePath();
    
    context.beginPath();
    context.arc(w_canvas/2, h_canvas/2, 100, 0*Math.PI/180 , end_degree*Math.PI/180);
    context.strokeStyle = '#40ac47';   
    context.stroke();
    
    context.closePath();
    
    context.beginPath();
    context.font="12pt Century Gothic";
    context.fillStyle = '#40ac47';
    context.fillText(percent+"%",w_canvas/2-10,h_canvas/2);
    context.closePath();
    /*;
    context.clearRect( 0, 0, _canvas.width, _canvas.height);
    context.beginPath();
    context.fillStyle = 'rgba(0,0,0,0.7)';
    context.fillRect(0,0,canvas_width,canvas_height);
    context.font="32pt Century Gothic";
    context.fillStyle = 'white';
    context.fillText("Game Over",80,canvas_height/2);
    context.closePath();
    */
}

var convertImageObj = function (src){
    var imgObj = new Image();
    imgObj.src = src;
    return imgObj;
}

var checkcollision = function(obj1, obj2) {
    var rect = {
        left: Math.max(obj1.getLeft(), obj2.getLeft()),
        top: Math.max(obj1.getTop(), obj2.getTop()),
        right: Math.min(obj1.getRight(), obj2.getRight()),
        bottom: Math.min(obj1.getBottom(), obj2.getBottom())
    };
    if (rect.left > rect.right || rect.top > rect.bottom) 
        return false;
    return true;   
}

var drawText = function(context,x, y,string){
    context.beginPath();
    context.font="12pt Century Gothic";
    context.fillStyle = 'white';
    context.fillText(string,x,y);
    context.closePath();
}

var gameOverFunc = function(context, canvas_width, canvas_height){
    context.beginPath();
    context.fillStyle = 'rgba(0,0,0,0.7)';
    context.fillRect(0,0,canvas_width,canvas_height);
    context.font="32pt Century Gothic";
    context.fillStyle = 'white';
    context.fillText("Game Over",80,canvas_height/2);
    context.closePath();
}
var gameFinished = function(context, point, canvas_width, canvas_height){
    context.beginPath();
    context.fillStyle = 'rgba(0,0,0,0.7)';
    context.fillRect(0,0,canvas_width,canvas_height);
    context.font="32pt Century Gothic";
    context.fillStyle = 'white';
    if(point>=3000)
        context.fillText("You Win",100,canvas_height/2);
    else if(point < 3000)
        context.fillText("You Lose",100,canvas_height/2);
    context.closePath();
}