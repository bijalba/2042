
BasicGame.Game = function (game) {

};

BasicGame.Game.prototype = {
preload: function () {
          this.load.image('sea', 'assets/sea.png');
          this.load.image('bullet', 'assets/bullet.png');
          this.load.spritesheet('greenEnemy', 'assets/enemy.png', 32, 32);
          this.load.spritesheet('explosion', 'assets/explosion.png', 32, 32);
          this.load.spritesheet('player', 'assets/player.png', 64, 64);
        },

  create: function () {

    this.sea = this.add.tileSprite(0, 0, 1024, 768, 'sea');
    
    this.player = this.add.sprite(400, 650, 'player');
    this.player.anchor.setTo(0.5, 0.5);
    this.player.animations.add('fly', [ 0, 1, 2 ], 20, true);
    this.player.play('fly');
    this.game.physics.enable(this.player, Phaser.Physics.ARCADE);
    this.player.speed = 300;

    this.player.body.collideWorldBounds = true;

    this.enemyPool = this.add.group(); 
    this.enemyPool.enableBody = true; 
    this.enemyPool.physicsBodyType = Phaser.Physics.ARCADE; 
    this.enemyPool.createMultiple(50, 'greenEnemy'); 
    this.enemyPool.setAll('anchor.x', 0.5); 
    this.enemyPool.setAll('anchor.y', 0.5); 
    this.enemyPool.setAll('outOfBoundsKill', true); 
    this.enemyPool.setAll('checkWorldBounds', true);
    // Set the animation for each sprite
    this.enemyPool.forEach(function (enemy) {
      enemy.animations.add('fly', [ 0, 1, 2 ], 20, true);
    });
    this.nextEnemyAt = 0;
this.enemyDelay = 1000;

    // Add an empty sprite group into our game 
    this.bulletPool = this.add.group();
    // Enable physics to the whole sprite group
    this.bulletPool.enableBody = true;
    this.bulletPool.physicsBodyType = Phaser.Physics.ARCADE;
    // Add 100 'bullet' sprites in the group.
    // By default this uses the first frame of the sprite sheet and 
    // sets the initial state as non-existing (i.e. killed/dead) 
    this.bulletPool.createMultiple(100, 'bullet');
    // Sets anchors of all sprites
    this.bulletPool.setAll('anchor.x', 0.5);
    this.bulletPool.setAll('anchor.y', 0.5);
    // Automatically kill the bullet sprites when they go out of bounds
    this.bulletPool.setAll('outOfBoundsKill', true);
    this.bulletPool.setAll('checkWorldBounds', true);



    this.nextShotAt = 0; this.shotDelay = 100;

    this.cursors = this.input.keyboard.createCursorKeys();

    this.instructions = this.add.text( 510, 600,
'Use Arrow Keys to Move, Press Z to Fire\n' + 'Tapping/clicking does both',
{ font: '20px monospace', fill: '#fff', align: 'center' }
);
this.instructions.anchor.setTo(0.5, 0.5); 
this.instExpire = this.time.now + 10000;



  },

  update: function () {
   this.sea.tilePosition.y += 0.2;
   this.physics.arcade.overlap(
      this.bulletPool, this.enemyPool, this.enemyHit, null, this
);
   this.physics.arcade.overlap(
           this.player, this.enemyPool, this.playerHit, null, this
);

if (this.nextEnemyAt < this.time.now && this.enemyPool.countDead() > 0) { this.nextEnemyAt = this.time.now + this.enemyDelay;
var enemy = this.enemyPool.getFirstExists(false);
// spawn at a random location top of the screen 
enemy.reset(this.rnd.integerInRange(20, 1004), 0);
      // also randomize the speed
      enemy.body.velocity.y = this.rnd.integerInRange(30, 60);
      enemy.play('fly');
    }




    this.player.body.velocity.x = 0;
    this.player.body.velocity.y = 0;

    if (this.cursors.left.isDown) {
      this.player.body.velocity.x = -this.player.speed;
    } else if (this.cursors.right.isDown) {
      this.player.body.velocity.x = this.player.speed;
}
    if (this.cursors.up.isDown) {
      this.player.body.velocity.y = -this.player.speed;
    } else if (this.cursors.down.isDown) {
      this.player.body.velocity.y = this.player.speed;
}

  if (this.game.input.activePointer.isDown &&
this.game.physics.arcade.distanceToPointer(this.player) > 15) {
      this.game.physics.arcade.moveToPointer(this.player, this.player.speed);
}
  
  if (this.input.keyboard.isDown(Phaser.Keyboard.Z) ||
        this.input.activePointer.isDown) {
      this.fire();
    }

  if (this.instructions.exists && this.time.now > this.instExpire) { 
    this.instructions.destroy();
}

  },

  render: function() { 
    //this.game.debug.body(this.bullet); 
    //this.game.debug.body(this.enemy);
},


enemyHit: function (bullet, enemy) { 
  bullet.kill();
  enemy.kill();
  var explosion = this.add.sprite(enemy.x, enemy.y, 'explosion'); 
  explosion.anchor.setTo(0.5, 0.5); 
  explosion.animations.add('boom');
  explosion.play('boom', 15, false, true);
},

playerHit: function (player, enemy) {
  enemy.kill();
  var explosion = this.add.sprite(player.x, player.y, 'explosion');
  explosion.anchor.setTo(0.5, 0.5);
  explosion.animations.add('boom');
  explosion.play('boom', 15, false, true);
  player.kill();
},






fire: function(){
  if (this.nextShotAt > this.time.now) {
return; }
this.nextShotAt = this.time.now + this.shotDelay;
  
  // Find the first dead bullet in the pool
var bullet = this.bulletPool.getFirstExists(false);
// Reset (revive) the sprite and place it in a new location
    bullet.reset(this.player.x, this.player.y - 20);
    bullet.body.velocity.y = -500;
},


  quitGame: function (pointer) {

    //  Here you should destroy anything you no longer need.
    //  Stop music, delete sprites, purge caches, free resources, all that good stuff.

    //  Then let's go back to the main menu.
    this.state.start('MainMenu');

  }

};
