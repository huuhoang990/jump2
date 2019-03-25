function Tile( image, x, y, width, height, blocked ){
    this.x = x;
    this.y = y;
    this.width = width;
    this.height = height;
    this.image = image;
    this.blocked = blocked;
}

Tile.prototype.getx = function (){ return this.x; };
Tile.prototype.gety = function (){ return this.y; };
Tile.prototype.getWidth = function (){ return this.width; };
Tile.prototype.getHeight = function (){ return this.height; };
Tile.prototype.getImage = function (){ return this.image; };
Tile.prototype.isBlocked = function() { return this.blocked; }