  	 
  	 var table_canvas = document.getElementById("b");
  	 var table_context = this.table_canvas.getContext("2d");
  	 var movement_step = 0;
  	 
  	 
  	 // Paddle object
  	 function Paddle(xpos, ypos, pwidth, plength) {

	     this.x_position = xpos;
	     this.y_position = ypos;
	     this.paddle_width = pwidth;
	     this.paddle_length = plength;
	     
	     this.move = function(){
	     	  if((this.y_position > this.paddle_length/2 && movement_step < 0) || (this.y_position < (table.table_length+table.top_margin-this.paddle_length-15)  && movement_step >0)){
	     	  	       this.y_position = this.y_position + movement_step; 
	     	  }  	         
	     };
	     
	     this.render = function() {
	        table_context.beginPath();
           table_context.rect(this.x_position, this.y_position, this.paddle_width, this.paddle_length);
           table_context.fillStyle = 'red';
           table_context.fill();
           table_context.lineWidth = 7;
           table_context.strokeStyle = 'red';
           table_context.stroke();
	     };
	};
	
	
	 // Ball object
	function Ball(xpos, ypos, bradius) {

	     this.x_position = xpos;
	     this.y_position = ypos;
	     this.ball_radius = bradius;
	     this.counterClockwise = false;
	     
	     this.render = function() {
	        table_context.beginPath();
           table_context.arc(this.x_position, this.y_position, this.ball_radius = bradius, 0, 2 * Math.PI, this.counterClockwise);
           table_context.lineWidth = 4;
           table_context.strokeStyle = 'red';
           table_context.stroke();
	     };
	};


   //Table object, making table
   
 	function Table(lmargin, tmargin, t_width, t_length) {
 		this.left_margin = lmargin;
 		this.top_margin = tmargin;
 		this.table_width = t_width;
 		this.table_length = t_length;
 				
  		this.render = function(){
  			table_context.fillStyle="grey"
 			table_context.fillRect(this.left_margin, this.top_margin, this.table_width, this.table_length);
 		};
 	};
 	
 	
 	
 	// start positions of the paddles (fixed for table, of course)
 	
 	var player = new Paddle(250, 15, 10, 70);
 	var com = new Paddle(1154, 15, 10, 70);
 	var ball = new Ball(700, 380, 10);
 	var table = new Table(200, 5, 1014, 690);
 
 
 	//"Master" render function
 	
 	var render = function() {
 		table.render();
    	player.render();
    	com.render();
    	ball.render(); 
    			
 	};
 	
 
 // event listener for Paddle...
 
 window.addEventListener("keydown", function(event){
 	  			if(event.keyCode==79 || event.which ==79) {
 	  	  			 movement_step= -50;
 	  	   		 player.move();
 	  			} 
 	  			else if(event.keyCode==75 || event.which==75) {
 	  				movement_step= 50;
 	  				player.move();
 	  			}
 });
 	
 	
  var step = function() {
  	   	render();
  	   	window.requestAnimationFrame(step);   
  };

 
  		

 //refreshing window akka animation
 	
 	var animate = window.requestAnimationFrame ||
        window.webkitRequestAnimationFrame ||
        window.mozRequestAnimationFrame    ||
        window.oRequestAnimationFrame      ||
        window.msRequestAnimationFrame     ||
        function(callback) { window.setTimeout(callback, 1000/60) };
 	
 	    
 window.onload = animate(step);
	
	
	
	
	