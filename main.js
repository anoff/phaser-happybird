// Create our 'main' state that will contain the game
const mainState = {
    preload: function() { 
        // This function will be executed at the beginning     
        // That's where we load the images and sounds 

        game.load.image('bird', 'assets/bird.png');
    },

    create: function() { 
        // This function is called after the preload function     
        // Here we set up the game, display sprites, etc.

        game.stage.backgroundColor = '#a470ff';
        game.physics.startSystem(Phaser.Physics.ARCADE);
        this.bird = game.add.sprite(100, 245, 'bird');
        game.physics.arcade.enable(this.bird);
        this.bird.body.gravity.y = 1000;

        const spaceKey = game.input.keyboard.addKey(Phaser.Keyboard.SPACEBAR);
        spaceKey.onDown.add(this.jump, this);  
    },

    update: function() {
        // This function is called 60 times per second    
        // It contains the game's logic

        // If the bird is out of the screen (too high or too low)
        // Call the 'restartGame' function
        if (this.bird.y < 0 || this.bird.y > 490) {
            this.restartGame();
        }
        if (this.bird.y > 350 && this.bird.body.velocity.y > 0) {
            this.bird.body.velocity.y = -0.9 * this.bird.body.velocity.y;
        }
    },
    // Make the bird jump 
    jump: function() {
        // Add a vertical velocity to the bird
        this.bird.body.velocity.y = -350;
    },

    // Restart the game
    restartGame: function() {
        // Start the 'main' state, which restarts the game
        game.state.start('main');
    },
};

// Initialize Phaser, and create a 400px by 490px game
const game = new Phaser.Game(400, 490);

// Add the 'mainState' and call it 'main'
game.state.add('main', mainState); 

// Start the state to actually start the game
game.state.start('main');