  	 function Paddle(xpos, ypos, pwidth, plength) {

	     this.x_position = xpos;
	     this.y_position = ypos;
	     this.paddle_width = pwidth;
	     this.paddle_length = plength;
	     
	     this.render = function (ctx) {
	        ctx.beginPath();
           ctx.rect(this.x_position, this.y_position, this.paddle_width, this.paddle_length);
           ctx.fillStyle = 'red';
           ctx.fill();
           ctx.lineWidth = 7;
           ctx.strokeStyle = 'red';
           ctx.stroke();
	     };
	};
	
	
	
	function Ball(xpos, ypos, bradius) {

	     this.x_position = xpos;
	     this.y_position = ypos;
	     this.ball_radius = bradius;
	     this.counterClockwise = false;
	     
	     // write render method here
	     
	     this.render = function (ctx) {
	        ctx.beginPath();
           ctx.arc(this.x_position, this.y_position, this.ball_radius = bradius, 0, 2 * Math.PI, this.counterClockwise);
           ctx.lineWidth = 4;
           ctx.strokeStyle = 'red';
           ctx.stroke();
	     };
	};

 	var player = new Paddle(250, 50, 10, 70);
 	var com = new Paddle(1154, 50, 10, 70);
 	var ball = new Ball(700, 380, 10);
 
 	var render = function(ctx) {
    	player.render(ctx);
    	com.render(ctx);
    	ball.render(ctx);
 	};
      
 window.onload = function draw() {
  		var table_canvas = document.getElementById("b");
  		var table_context = table_canvas.getContext("2d");
  		table_context.fillStyle="grey"
 		table_context.fillRect(200, 5, 1014, 690);
 		 
 		render(table_context);	 
	};