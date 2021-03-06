/**
*
* @file AnimationManager.js
*
* @description A simple library for handling 2d animations in javascript.
* @author Nolan Sherman
* @copyright University of New Orleans Department of Computer Science Department 2017
*/


/*--------------------
  CLASS: Sprite
---------------------*/
/**
 * Represents a Sprite.Defines the image that represents a single
 * frame of an animation.
 * @constructor
 * @param {string} imgSrc - The url location of the image for this sprite. jpg and png supported.
 */
  function Sprite(imgSrc, xOrigin = null, yOrigin = null, w = null, h = null){
    /*PUBLIC INSTANCE VARIABLES*/
      this.description = ''; //a simple description

    /*PRIVATE VARS*/
        /**The image source for this Sprite
        *@type {string}
        *@private
        */
        var imageSource = imgSrc;

        /**The X origin of this sprite on a spritesheet.
        *@type {number}
        *@private
        */
        var originX = xOrigin;

        /**The Y origin of this sprite on a spritesheet.
        *@type {number}
        *@private
        */
        var originY = yOrigin;

        /**The width of this sprites image.
        *@type {number}
        *@private
        */
        var width = w;

        /**The height of this sprites image.
        *@type {number}
        *@private
        */
        var height = h;

        /**The image that represents this sprite
        *@type {Image}
        *@private
        */
        var image = new Image();

        /**A scale factor for this sprite.
        *@type {number}
        *@default
        *@private
        */
        var scale = 1;

    /*PRIVILAGED METHODS*/


      /**
      * Returns the image source url for this Sprite.
      * @return {string} - The url for the image of this sprite.
      */
      this.getImageSource = function(){
        return imageSource;
      }
      /**
      * Returns the X origin of this sprite on a spritesheet.
      * @return number - The x cordinate of the upper-left-hand corner of this sprite on a sprite sheet.
      * @return null - Retruns null if sprite wasn't created with a sprite sheet.
      */
      this.getOriginX = function(){
        return originX;
      }
      /**
      * Returns the Y origin of this sprite on a spritesheet.
      * @return number - The y cordinate of the upper-left-hand corner of this sprite on a sprite sheet.
      * @return null - Retruns null if sprite wasn't created with a sprite sheet.
      */
      this.getOriginY = function(){
        return originY;
      }
      /**
      * Returns the natural (unscaled) width of this sprite.
      * @return number - The x cordinate of the upper-left-hand corner of this sprite on a sprite sheet.
      * @return null - Retruns null if sprite wasn't created with a sprite sheet.
      */
      this.getSpriteWidth = function(){
        return image.width;
      }
      //gets the height of sprite from origin
      this.getSpriteHeight = function(){
        return image.height;
      }

      //returns the image of this Sprite
      this.getImage = function(){
        return image;
      }

      this.getHeight = function(){
        return image.height * scale;
      }

      this.getWidth = function(){
        return image.width * scale;
      }

    /*PRIVATE METHODS*/

    /*CONSTRUCTOR INSTRUCTIONS*/
      //set the source of the image to imgsrc
      image.src = imageSource;

  }
  /* PUBLIC VARS */

  /* PUBLIC METHODS */

////// END SPRITE CLASS //////

/*--------------------
  CLASS: Animation
---------------------*/
/**
 * Represents a single animation. Defines a group of sprites that play in
 * sequential order at a given rate (FPS)
 * @constructor
 * @param {string}  fpsRate - The amount of frames that should play per second for this animation.
 * @param {Sprite[]}   spriteArray - An array containing only the sprites that make up this animation in sequential order.
 */
  function Animation(fpsRate, spriteArray){
    /*PUBLIC INSTANCE VARIABLES*/
      this.description = ''; //a simple description

    /*PRIVATE VARS*/
      var fps = fpsRate;
      var sprites = spriteArray;
      var currentSprite = sprites[0];
      var scale = 1;
      var startTime;
    /*PRIVILAGED METHODS*/

      //gets the current fps
      this.getFps = function(){
        return fps;
      }

      //sets the fps of this ANIMATION
      this.setFps = function(newFps){
        fps = newFps;
      }

      //gets an array of all the sprites in this animation
      this.getSprites = function(){
        return sprites;
      }

      //gets the currently displayed sprite
      this.getCurrentSprite = function(){
        return currentSprite;
      }

      //gets the image of the current sprite.
      this.getImage = function(){
        return currentSprite.getImage();
      }

      this.getHeight = function(){
        return currentSprite.getHeight() * scale;
      }

      this.getWidth = function(){
        return currentSprite.getWidth() * scale;
      }

      this.getCurrentImage = function(startTime){
        //var index = this.frameindex;
        var now = Date.now();

  			//this.frameindex = ( index + 1) % this.sequence.length
  			//this.startTime = now
            var index = (Math.floor( (now - startTime) / 1000 * fps ) ) % sprites.length;
            currentSprite = sprites[index];
            /*
            console.log("current second: " + (now - startTime) / 1000  );
            console.log("Frames Played: " + Math.floor( (now - startTime) / 1000 * fps ) );
            console.log("index" + (Math.floor( (now - startTime) / 1000 * fps ) ) % sprites.length );
            console.log("Switched to frame " + index);
            */
  		     return currentSprite.getImage();
      }

    /*PRIVATE METHODS*/

    /*CONSTRUCTOR INSTRUCTIONS*/

  }

  /* PUBLIC METHODS */

/*---END ANIMATION CLASS-----*/

/*--------------------
  CLASS: AnimationPlayer
---------------------*/
/**
 * An AnimationPlayer can play any instance of an animation given to it and
 * track playback seperately from other instances of AnimationPlayer. The same
 * AnimationPlayer should not be used by multiple objects calling getCurrentImage().
 * @constructor
 * @param {Animation}  defaultAnimation - The animation to play at the start and when other animations have failed or stopped.
 */
  function AnimationPlayer(defaultAnimation){
    /*PUBLIC INSTANCE VARIABLES*/
      this.description = ''; //a simple description

    /*PRIVATE VARS*/
      var defaultAnimation = defaultAnimation
      var currentAnimation = defaultAnimation;
      var currentAnimationStartTime = Date.now();

    /*PRIVILAGED METHODS*/

      this.play = function(animation){
        if(animation != currentAnimation){
          currentAnimationStartTime = Date.now();
          currentAnimation = animation;
        }

      }

      this.getCurrentAnimationImage = function(){
          return currentAnimation.getCurrentImage(currentAnimationStartTime);
      }

      this.getCurrentAnimation = function(){
        return currentAnimation;
      }

    /*PRIVATE METHODS*/

    /*CONSTRUCTOR INSTRUCTIONS*/
    this.play(defaultAnimation);
  }

  /* PUBLIC METHODS */

/*---END AnimationPlayer CLASS
---------------------*/
