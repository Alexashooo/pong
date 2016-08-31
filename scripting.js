  	 
  	 var table_canvas = document.getElementById("b");
  	 var table_context = this.table_canvas.getContext("2d");
  	 
  	 var movement_step_paddle = 0;
  	 
  	 // Paddle object
  	 function Paddle(xpos, ypos, pwidth, plength) {

	     this.x_position = xpos;
	     this.y_position = ypos;
	     this.paddle_width = pwidth;
	     this.paddle_length = plength;
	     
	     this.move = function(){
	     	  if((this.y_position > this.paddle_length/2 && movement_step_paddle < 0) || (this.y_position < (table.table_length+table.top_margin-this.paddle_length-15)  && movement_step_paddle >0)){
	     	  	       this.y_position = this.y_position + movement_step_paddle; 
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
	  
	
	var movement_step_ball = 2;
		
	
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
	     
	     // start angle, it should be defined more angles like 15, 30, 60, 75, 90...
	     
	     this.reflection_angle = function (r_angle){
	     	    return r_angle;
	     };
	     
	     this.move = function(){
	     	 //alert(ball_x_previous_pos + ' ' + ball.x_position + '      ' + ball_y_previous_pos + '   ' +ball.y_position);	
	     	 //reflection angle 
	     	 if(this.reflection_angle(45)=== 45){
	     	 		//collision with table top
	     	 		//left to right
	     			 if(this.y_position === table.top_margin +10 && this.x_position > ball_x_previous_pos) {
	     			 	 this.x_position = this.x_position + movement_step_ball;
	     	   		 this.y_position = this.y_position + movement_step_ball;
	     			 }	
	     			 //right to left
	     			 else if(this.y_position === table.top_margin && this.x_position < ball_x_previous_pos) {
	     			 	 this.x_position = this.x_position - movement_step_ball;
	     	   		 this.y_position = this.y_position + movement_step_ball;
	     			 } 
	     			 //collision with table bottom
	     			 //left to right
	     			 else if (this.y_position === (table.table_length+table.top_margin) && this.x_position > ball_x_previous_pos) {
	     			 	 this.x_position = this.x_position + movement_step_ball;
	     	   		 this.y_position = this.y_position - movement_step_ball;
	     			 }
	     			 //right to left
	     			 else if (this.y_position === (table.table_length+table.top_margin) && this.x_position < ball_x_previous_pos) {
	     			 	 this.x_position = this.x_position - movement_step_ball;
	     	   		 this.y_position = this.y_position - movement_step_ball;
	     			 }
	     			 //free movement
	     			 //left to right and up
	     			 else if (this.y_position != table.top_margin && this.y_position === (table.table_length+table.top_margin) && this.x_position > ball_x_previous_pos && this.y_position < ball_y_previous_pos){
	     			 	 this.x_position = this.x_position + movement_step_ball;
	     	   		 this.y_position = this.y_position - movement_step_ball;
	     			 } 
	     			 //left to right and down
	     			 else if (this.y_position != table.top_margin + 10 && this.y_position != (table.table_length+table.top_margin) && this.x_position > ball_x_previous_pos && this.y_position > ball_y_previous_pos){
	     			 	 this.x_position = this.x_position + movement_step_ball;
	     	   		 this.y_position = this.y_position + movement_step_ball;
	     			 } 
	     			 //right to left and up
	     			 else if (this.y_position != table.top_margin + 10 && this.y_position != (table.table_length+table.top_margin) && this.x_position < ball_x_previous_pos && this.y_position < ball_y_previous_pos){
	     			 	 this.x_position = this.x_position - movement_step_ball;
	     	   		 this.y_position = this.y_position - movement_step_ball;
	     			 } 
	     			 //right to left and down
	     			 else if (this.y_position != table.top_margin && this.y_position != (table.table_length+table.top_margin) && this.x_position < ball_x_previous_pos && this.y_position < ball_y_previous_pos){
	     			 	 this.x_position = this.x_position - movement_step_ball;
	     	   		 this.y_position = this.y_position + movement_step_ball;
	     			 } 
	     			  		 
	       }
	     };
	     
	     this.serve_the_ball = function() {
	     		this.x_position = this.x_position + movement_step_ball;
	     	   this.y_position = this.y_position - movement_step_ball;
	     };
	     
	     //delete this
	     this.move_test = function(){
	     	 ball_x_previous_pos = ball.x_position;
	       ball_y_previous_pos = ball.y_position;
	     	 if(this.reflection_angle(45)===45){
	     	 	if(this.x_position > ball_x_previous_pos){
	     	  		this.x_position = this.x_position + movement_step_ball;
	     	  		this.y_position = this.y_position - movement_step_ball;
	     	  	}
	     	 }
	     	 	
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
 	var ball_x_previous_pos = ball.x_position;
	var ball_y_previous_pos = ball.y_position;	
 	var table = new Table(200, 5, 1010, 690);
 
 
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
 	  	  			 movement_step_paddle= -50;
 	  	   		 player.move();
 	  			} 
 	  			else if(event.keyCode==75 || event.which==75) {
 	  				movement_step_paddle= 50;
 	  				player.move();
 	  			}
 });
 	
 var start_counter = 0;
 
 var step = function() {	 
         do {
          ball.serve_the_ball();
          start_counter++;
         }  
         while(start_counter===0);
         ball.move();
  	   	render();
  	   	ball_x_previous_pos = ball.x_position;
	      ball_y_previous_pos = ball.y_position;
	     
  	   	
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
	
	
	
	
	