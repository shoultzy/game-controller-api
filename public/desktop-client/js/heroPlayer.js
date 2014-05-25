;
Quintus.HeroPlayer = function(Q) {

	var _stage;
	var _player;
	var _fuelIndicator;
	var _smokeContainer;
	var _terrain;
	var _walkSpeed;
	var _defaultWalkSpeed = 4;
	var _verticalSpeed = 20;
	var _jumpSpeed = 400;
	var _tileNumber = 1;
	var _numberInc = 0;
	var _incDelay = 300;
	var _userLanded = false;
	var _fuelAmount = 98;
	var _fuelAmountTotal = 98;

	Q.Sprite.extend("Player", {

		init : function(p) {

			this._super(p, {
				sprite : "player",
				sheet : "player",
				w : 10,
				width : 10,
				x : 0,
				y : 0
			});

			_walkSpeed = _defaultWalkSpeed;
			_player = this;
			_stage = Q.stage();

			_terrain = new Q.TerrainBuilder();
			_terrain.initTerrain(_tileNumber);

			_smokeContainer = new Q.Sprite({
				x : 0,
				y : 0
			});
			
			_stage.insert(_smokeContainer);

			_player.add('2d, animation');
			_player.p.points = [[0, -30], [15, 40], [-15, 40]];

			this.on("bump.bottom", this, "landed");
			this.on("userStamp", this, "dispatchDust");

			Q.input.on("upUp", this, "characterDescend");
			Q.input.on("actionUp", this, "characterDescend");
			
			this.characterDescend();
		},
		
		landed : function() {
			_player.play("walk_right");

			//if (!_userLanded)
				//_player.dispatchDust();

			_userLanded = true;
			
			//console.log('landed');
		},

		characterDescend : function() {
			_player.play("fly_down");
		},

		dispatchDust : function() {
			var dustParticle = new Q.Sprite({
				scale : .5,
				asset : "dust.png",
				opacity : 1,
				x : this.p.x + 20,
				y : this.p.y + 40,
				type : 0
			});
			dustParticle.add("tween");

			dustParticle.animate({
				scale : 6,
				opacity : 0,
				angle : 90
			}, 1, Q.Easing.Quadratic.Out, {
				callback : function() {
					dustParticle.destroy()
				}
			});
			this.stage.insert(dustParticle);
		},

		dispatchSmoke : function() {
			var smokeParticle = new Q.Sprite({
				scale : 0,
				asset : "smoke.png",
				opacity : .2 + Math.random()*.8,
				x : this.p.x - 12,
				y : this.p.y - 0,
				type : 0
			});
			smokeParticle.add("tween");

			smokeParticle.animate({
				scale : .25 + Math.random() * 3,
				opacity : 0,
				angle : Math.random() * 180
			}, 1, Q.Easing.Quadratic.Out, {
				callback : function() {
					smokeParticle.destroy()
				}
			});
			
			this.stage.insert(smokeParticle, _smokeContainer);
		},
		
		updateFuelAmount : function(){
			/*_fuelIndicator.draw = function(ctx) {
				ctx.fillStyle = '#025588';
				ctx.fillRect(-64, -4, _fuelAmount, 7);
			};*/
		},

		step : function() {

			this.p.x += _walkSpeed;
			//this.p.x += 4;
			
			if(this.p.y > 1500){
				this.p.x = 0;
				this.p.y = 0;
				_player.p.vy -= 1000;
				
				_walkSpeed = _defaultWalkSpeed;
				this.characterDescend();
				
			}else{
				
				if (Q.inputs['up'] || Q.inputs['action'] || userAction == 1) {
					
					if (_player.p.y > -200 && _fuelAmount > 0) {
						this.dispatchSmoke();
						_player.p.vy -= _verticalSpeed;
						//_fuelAmount -= .25;
						this.updateFuelAmount();
						_player.play("fly_up");
					}
				} else if (Q.inputs['fire'] && _userLanded) {
					
					_player.p.vy -= _jumpSpeed;
					_player.play("jump");
				}
	
				if (this.p.x > (_tileNumber * 900) - (Q.width / 2 - 50)) {
					_tileNumber++;
					_terrain.initTerrain(_tileNumber);
				}
	
				if (_numberInc < _incDelay) {
					_numberInc++;
				} else {
					_numberInc = 0;
					_walkSpeed++;
				}
			}
			
			_userLanded = false;
		},
		
		// setters
		
		setHUD : function(f){
			_fuelIndicator = f;
		}
	});
}