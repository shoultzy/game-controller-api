;
Quintus.LevelBuilder = function(Q) {

	var _stage;
	var _player;
	var _terrainContainer;
	// var _terrainArray = [[[900, 800], [[-450, 0], [-215, 0], [29, 0], [301, 0], [450, 0], [450, 100], [0, 100]]],
						// [[900, 800], [[-450, 0], [-406, 0], [-198, -23], [10, -46], [121, -52], [261, -49], [365, -33], [447, 0], [450, 100], [0, 100]]],
						// [[900, 800], [[-450, 0], [-239, -11], [-82, -11], [105, -11], [436, 0], [450, 0], [450, 100], [0, 100]]],
						// [[553, 800], [[-450, 0], [-244, -32], [-82, -32], [103, -18], [103, 100], [0, 100]]]];
						
	// temp array -----------
	var _terrainArray = [[[900, 800], [[-450, 0], [-215, 0], [29, 0], [301, 0], [450, 0], [450, 100], [0, 100]]]];


	Q.scene("level1", function(stage) {

		_stage = stage;

		stage.insert(new Q.Repeater({
			speedX : .25, // speed to move in x direction
			speedY : .25, // speed to move in y direction,
			repeatY : false,
			type : 0,
			asset : "background.jpg"
		}));

		_terrainContainer = new Q.Sprite({
			x : 0,
			y : 350
		});

		stage.insert(_terrainContainer);

		var terrainElement = new Q.Sprite({
			x : 0,
			y : 450,
			width : 900,
			height : 200,
			asset : 'terrain_0.png'
		});
		terrainElement.p.points = _terrainArray[0][1];

		var skyBase = new Q.Sprite({
			x : -450,
			y : 0,
			w : 2000,
			h : 1800,
			type : 0
		});

		skyBase.draw = function(ctx) {
			ctx.fillStyle = '#040006';
			ctx.fillRect(-this.p.cx, -2150, this.p.w, this.p.h);
		};

		var terrainBase = new Q.Sprite({
			x : 0,
			y : 900,
			w : _terrainArray[0][0][0],
			h : _terrainArray[0][0][1],
			type : 1
		});

		terrainBase.draw = function(ctx) {
			ctx.fillStyle = '#040006';
			ctx.fillRect(-this.p.cx, -this.p.cy, _terrainArray[0][0][0], _terrainArray[0][0][1]);
		};

		var terrainEnds = new Q.Sprite({
			x : 0,
			y : 1500,
			w : 900,
			h : 1500,
			type : 0
		});

		terrainEnds.draw = function(ctx) {
			ctx.fillStyle = '#000';
			ctx.fillRect(-this.p.cx, -this.p.cy, 900, 1500);
		};

		stage.insert(terrainBase, _terrainContainer);
		stage.insert(terrainElement, _terrainContainer);
		stage.insert(skyBase, _terrainContainer);
		stage.insert(terrainEnds, _terrainContainer);

		_player = stage.insert(new Q.Player());

		stage.add("viewport").follow(_player);
		stage.viewport.offsetY = 120;
		stage.viewport.offsetX = -100;

		Q.input.DEFAULT_KEYS = [];

		//Q.debug = true;
	});

	Q.scene("HUD", function(stage) {
		var _fuelAmount;

		var hygienePanel = new Q.Sprite({
			x : 0,
			y : 0,
			type : 0
		});

		hygienePanel.draw = function(ctx) {
			ctx.fillStyle = '#FFFFFF';
			ctx.fillRect(0, Q.height - 45, Q.width, 45);
		};
		stage.insert(hygienePanel);

		var theoremLogo = new Q.Sprite({
			asset : "theorem_logo.jpg",
			x : 80,
			y : Q.height - 20,
			type : 0
		});
		stage.insert(theoremLogo);

		/*_fuelAmount = new Q.Sprite({
		 x : Math.round(95),
		 y : Math.round(Q.height - 80),
		 type : 0
		 });

		 _fuelAmount.draw = function(ctx) {
		 ctx.fillStyle = '#025588';
		 ctx.fillRect(-64, -4, 98, 7);
		 };

		 stage.insert(_fuelAmount);

		 _player.setHUD(_fuelAmount);

		 var fuelIndicator = new Q.Sprite({
		 asset : "graphic_fuel.png",
		 x : Math.round(80),
		 y : Math.round(Q.height - 80)
		 })
		 stage.insert(fuelIndicator);*/

	}), Q.Sprite.extend("TerrainBuilder", {

		initTerrain : function(num) {

			var randomGen = Math.floor(Math.random() * _terrainArray.length);
			var terrainElement = new Q.Sprite({
				x : 900 * num,
				y : 450,
				width : 900,
				height : 200,
				asset : 'terrain_' + randomGen + '.png'
			});
			terrainElement.p.points = _terrainArray[randomGen][1];

			var terrainBase = new Q.Sprite({
				x : 900 * num,
				y : 900,
				w : _terrainArray[randomGen][0][0],
				h : _terrainArray[randomGen][0][1],
				type : 1
			});

			terrainBase.p.x -= (900 - _terrainArray[randomGen][0][0]) / 2;
			terrainBase.draw = function(ctx) {
				ctx.fillStyle = '#040006';
				ctx.fillRect(-this.p.cx, -this.p.cy, _terrainArray[randomGen][0][0], _terrainArray[randomGen][0][1]);
			};

			var skyBase = new Q.Sprite({
				x : 900 * num,
				y : 0,
				w : 900,
				h : 1800,
				type : 0
			});

			skyBase.draw = function(ctx) {
				ctx.fillStyle = '#040006';
				ctx.fillRect(-this.p.cx, -2150, this.p.w, this.p.h);
			};

			var terrainEnds = new Q.Sprite({
				x : 900 * num,
				y : 1500,
				w : 900,
				h : 1500,
				type : 0
			});

			terrainEnds.draw = function(ctx) {
				ctx.fillStyle = '#000';
				ctx.fillRect(-this.p.cx, -this.p.cy, 900, 1500);
			};

			_stage.insert(skyBase, _terrainContainer);
			_stage.insert(terrainBase, _terrainContainer);
			_stage.insert(terrainElement, _terrainContainer);
			_stage.insert(terrainEnds, _terrainContainer);
		}
	});
}