function SubImage(image , x, y, width, height){
    this.image = image;
    this.x = x;
    this.y = y;
    this.width = width;
    this.height = height;
}
SubImage.prototype.getImage = function(){
    return this.image;
}
SubImage.prototype.getx = function(){
    return this.x;
}
SubImage.prototype.gety = function(){
    return this.y;
}
SubImage.prototype.getWidth = function(){
    return this.width;
}
SubImage.prototype.getHeight = function(){
    return this.height;
}
