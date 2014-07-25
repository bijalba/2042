
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

    this.enemy = this.add.sprite(512,300,'greenEnemy');
    this.enemy.animations.add('fly', [0,1,2], 20, true);
    this.enemy.play('fly');
    this.enemy.anchor.setTo(0.5,0.5);
    this.physics.enable(this.enemy, Phaser.Physics.ARCADE);

    this.bullet = this.add.sprite(512, 400, 'bullet');
    this.bullet.anchor.setTo(0.5,0.5);
    this.physics.enable(this.bullet, Phaser.Physics.ARCADE); 
    this.bullet.body.velocity.y = -400;

    this.cursors = this.input.keyboard.createCursorKeys();

  },

  update: function () {
   this.sea.tilePosition.y += 0.2;
   this.physics.arcade.overlap(
      this.bullet, this.enemy, this.enemyHit, null, this
    );

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

  quitGame: function (pointer) {

    //  Here you should destroy anything you no longer need.
    //  Stop music, delete sprites, purge caches, free resources, all that good stuff.

    //  Then let's go back to the main menu.
    this.state.start('MainMenu');

  }

};
