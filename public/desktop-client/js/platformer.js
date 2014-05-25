window.addEventListener('load', function() {
		
	var w = document.documentElement.clientWidth;
	var h = document.documentElement.clientHeight;
	
	var Q = window.Q = Quintus().include("Sprites, Scenes, Input, 2D, Touch, UI, Anim").include("HeroPlayer, LevelBuilder")
	.setup({
		maximize : true,
		width : w,
		height : h
		//downsampleWidth : 832,
		//downsampleHeight : 640
	})
	.controls().touch()
	
	//Q.debug = true;
	
	// ------------------------------------------------------------

	Q.load("background.jpg, graphic_fuel.png, theorem_logo.jpg, fuel_on.png, smoke.png, dust.png, character_spriteSheet.png, sprites_character.json, terrain_0.png, terrain_1.png, terrain_2.png, terrain_3.png", function() {


		Q.compileSheets("character_spriteSheet.png", "sprites_character.json");

		Q.animations("player", {

			walk_right : {
				frames : [0, 1, 2, 3, 4, 5, 6, 7, 8, 9, 10],
				rate : 1 / 15,
				loop : false,
				trigger : "userStamp"
			},
			fly_up : {
				frames : [22, 23, 24, 25, 26, 27, 28, 29, 30, 31, 32, 33, 34, 35, 36, 37, 38, 39, 40, 41, 42],
				rate : 1 / 15,
				loop : true,
			},
			fly_down : {
				frames : [44, 45, 46, 47, 48, 49, 50, 51, 52, 53, 54, 55, 56, 57, 58, 59, 60, 61, 62, 63, 64],
				rate : 1 / 15,
				loop : true,
			},
			jump : {
				frames : [65, 66, 67, 68, 69, 70, 71, 72, 73, 74, 75, 76, 77, 78, 79, 80, 81, 82, 83, 84, 85],
				rate : 1 / 15,
				loop : false,
			}
		});

		Q.stageScene("level1");

	});
});
