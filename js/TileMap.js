function TileMap(s, tileSize){
   this.x=0;
   this.y=0;
    this.tileSize = tileSize;
   this.map = new Array();
   this.mapWidth;
   this.mapHeight;
   
   this.bg = convertImageObj("graphics/bg2.gif");
   
   this.tileset;
   this.tiles = new Array(2);
   
    var br = loadXMLDoc(s);
    var obj = getTileMap(br);
    console.log(obj);
    this.mapWidth = obj.map_width;
    this.mapHeight = obj.map_height;
    this.map = obj.tile_map;
}

TileMap.prototype.loadTiles = function (s){
    var imgObj = new Image();
    imgObj.src = s;
    this.tileset = imgObj;
    var numTilesAcross = parseInt((this.tileset.width +1)/(this.tileSize+1));
    this.tiles[0] = new Array(numTilesAcross);
    this.tiles[1] = new Array(numTilesAcross);
    for(var col = 0; col < numTilesAcross; col++){
        this.tiles[0][col] = new Tile( this.tileset, col*this.tileSize+col, 0, this.tileSize, this.tileSize ,false);
        this.tiles[1][col] = new Tile( this.tileset, col*this.tileSize+col, this.tileSize+1, this.tileSize, this.tileSize ,true);
    }
    /*
    _context.drawImage(
                      this.tiles[1][0].getImage(),
                      this.tiles[1][0].getx(),
                      this.tiles[1][0].gety(),
                      this.tileSize,
                      this.tileSize,
                      0,
                      0,
                      this.tileSize,
                      this.tileSize
                  );
    */
    /*
    var imgObj = new Image();
    imgObj.src = s;
    this.tileset = imgObj;
    var numTilesAcross = ( this.tileset.width + 1 ) / ( this.tileSize + 1 );
    var subimage;
    for( var col = 0; col < numTilesAcross; col++){
        subimage = this.tileset.getImageData(
                    col*this.tileSize+col,
                    0,
                    this.tileSize,
                    this.tileSize
                );
        this.tiles[0][col] = new Tile(subimage,false);
        subimage = this.tileset.getImageData(
                    col*this.tileSize + col,
                    this.tileSize + 1,
                    this.tileSize,
                    this.tileSize
                );
        this.tiles[1][col] = new Tile(subimage,true)
    }
    */
}

TileMap.prototype.getX = function() { return parseInt(this.x); }
TileMap.prototype.getY = function() { return parseInt(this.y); }

TileMap.prototype.getColTile = function(x){
    return parseInt(x/this.tileSize);
}
TileMap.prototype.getRowTile = function(y){
    return parseInt(y/this.tileSize);
}
TileMap.prototype.getTile = function(row ,col ){
   return this.map[parseInt(row)][parseInt(col)]; 
}
TileMap.prototype.getTileSize = function(){
    return this.tileSize;
}
TileMap.prototype.isBlocked = function( row , col ){
    var rc = this.map[row][col];
    var r = parseInt(rc/this.tiles[0].length);
    var c = rc%this.tiles[0].length;
    return this.tiles[r][c].isBlocked();
}
TileMap.prototype.getWidthMap = function(){
    return this.tileSize*this.mapWidth;
}
TileMap.prototype.getHeightMap = function(){
    return this.tileSize*this.mapHeight;
}    

TileMap.prototype.setX = function(i) { this.x = i; }
TileMap.prototype.setY = function(i) { this.y = i; }
/////////////////////////////////////////////////////////////////
TileMap.prototype.update = function(){
}

TileMap.prototype.draw = function(context){
  
    context.drawImage(this.bg, this.x, this.y);
    
    for( var row = 0; row < this.mapHeight; row++ ){
        for(var col = 0; col< this.mapWidth; col++ ){
            var rc = this.map[row][col];
            var r = parseInt(rc/this.tiles[0].length);
            var c= rc%this.tiles[0].length;
            context.drawImage(
                      this.tiles[r][c].getImage(),
                      this.tiles[r][c].getx(),
                      this.tiles[r][c].gety(),
                      this.tileSize,
                      this.tileSize,
                      this.x+col*this.tileSize,
                      this.y+row*this.tileSize,
                      this.tileSize,
                      this.tileSize
                  );
        }
    }
}

function loadXMLDoc(dname) 
{
    if (window.XMLHttpRequest){
      xhttp=new XMLHttpRequest();
    }
    else{
      xhttp=new ActiveXObject("Microsoft.XMLHTTP");
    }
    xhttp.open("GET",dname,false);
    xhttp.send();
    return xhttp.responseText;
}

function getTileMap(txtContent){
    var arr = new Array();
    var arr_lines = txtContent.split('\n'); 
    var mapWidth = parseInt(arr_lines[0]);
    var mapHeight = parseInt(arr_lines[1]);
    var delimiters = " ";
    for(var row = 0; row<mapHeight;row++ ){
        var tokens = arr_lines[row+2].split(delimiters);
        arr[row] = new Array();
        for(var col = 0; col<mapWidth; col++ ){
           arr[row][col] = parseInt(tokens[col]);
        }
    }
    var obj = {
        map_width : mapWidth,
        map_height : mapHeight,
        tile_map : arr
    }
    return obj;
}