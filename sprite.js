/*
---------------------
  CLASS: Sprite
---------------------
Defines the image that represents a single
frame of an animation.
*/
  function Sprite(imgSrc, xOrigin = null, yOrigin = null, w = null, h = null){
    /*PUBLIC INSTANCE VARIABLES*/
      this.description = ''; //a simple description

    /*PRIVATE VARS*/
      var imageSource = imgSrc;
      var originX = xOrigin;
      var originY = yOrigin;
      var width = w;
      var height = h;

    /*PRIVILAGED METHODS*/

      //gets the image source
      this.getImageSource = function(){
        return imageSource;
      }
      //gets the x origin
      this.getOriginX = function(){
        return originX;
      }
      //gets the y origin
      this.getOriginY = function(){
        return originY;
      }
      //gets the width of sprite from origin
      this.getOriginX = function(){
        return width;
      }
      //gets the height of sprite from origin
      this.getOriginX = function(){
        return height;
      }

    /*PRIVATE METHODS*/

    /*CONSTRUCTOR INSTRUCTIONS*/

  }

  /* PUBLIC METHODS */

/*---END SPRITE CLASS
---------------------*/
