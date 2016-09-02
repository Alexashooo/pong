   	 
  	 var table_canvas = document.getElementById("b");
  	 var table_context = this.table_canvas.getContext("2d");
  	 
  	 var movement_step_paddle_player = 0;
     var movement_step_paddle_com = 0;
  	 
  	 // Paddle object
  	 function Paddle(xpos, ypos, pwidth, plength) {

	     this.x_position = xpos;
	     this.y_position = ypos;
	     this.paddle_width = pwidth;
	     this.paddle_length = plength;
         
	     
	     this.move = function(m_paddle){
	     	  if((this.y_position > this.paddle_length/2 && m_paddle < 0) || (this.y_position < (table.table_length-table.top_margin-100)  && m_paddle >0)){
	     	  	       this.y_position = this.y_position + m_paddle; 
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
	  
	// movement and the speed of the ball at te same time
	var movement_step_ball = 2;
		
	
	 // Ball object
	function Ball(xpos, ypos, bradius) {

	     this.x_position = xpos;
	     this.y_position = ypos;
	     this.ball_radius = bradius;
	     this.counterClockwise = false;
         this.direction_correction = -1;
         this.y_direction = 1;
         this.x_direction = 1;
         this.line_width = 1;
	     
	     this.render = function() {
	       table_context.beginPath();
           table_context.arc(this.x_position, this.y_position, this.ball_radius = bradius, 0, 2 * Math.PI, this.counterClockwise);
           table_context.lineWidth = this.line_width;
           table_context.fillStyle = 'red';
           table_context.fill();
           table_context.strokeStyle = 'red';
           table_context.stroke();
	     };
	     
	     // start angle, it should be defined more angles like 30, 60.... 
	     
	     this.reflection_angle = function (r_angle){
	     	    return r_angle;
	     };
	     
	     this.move = function(){	
	     	 //reflection angle 
	     	 if(this.reflection_angle(45)=== 45){
             
	     	 		//collision with table top
	     	 		//left to right
	     			if(ball.y_position===table.top_margin+ball.ball_radius && this.x_direction > 0 && this.y_direction < 0) {
                        ball.x_position += movement_step_ball;
                        ball.y_position += movement_step_ball;
                        this.y_direction = this.y_direction * this.direction_correction;
                    }
               
                    //collision with table top
	     	 		//right to left
                    if(ball.y_position===table.top_margin+ball.ball_radius && this.x_direction < 0 && this.y_direction < 0) {
                        ball.x_position -= movement_step_ball;
                        ball.y_position += movement_step_ball;
                        this.y_direction = this.y_direction * this.direction_correction;
                    }
             
                    // free movement from left to right and up
                    else if(ball.y_position != table.top_margin+ball.ball_radius && ball.y_position!=table.top_margin+table.table_length - ball.ball_radius && this.x_direction > 0 && this.y_direction < 0 && ball.x_position-ball.ball_radius != player.x_position && ball.x_position!=com.x_position){
                        ball.x_position += movement_step_ball;
                        ball.y_position -= movement_step_ball;
                    }
                    // free movement from left to right and down
                    else if(ball.y_position != table.top_margin+ball.ball_radius && ball.y_position!=table.top_margin+table.table_length - ball.ball_radius && this.x_direction > 0 && this.y_direction > 0 && ball.x_position-ball.ball_radius != player.x_position && ball.x_position!=com.x_position){
                        ball.x_position += movement_step_ball;
                        ball.y_position += movement_step_ball;
                    }
                    
                    // free movement from right to left and up
                    else if(ball.y_position != table.top_margin+ball.ball_radius && ball.y_position!=table.top_margin+table.table_length - ball.ball_radius && this.x_direction < 0 && this.y_direction < 0 && ball.x_position-ball.ball_radius != player.x_position && ball.x_position!=com.x_position){
                        ball.x_position -= movement_step_ball;
                        ball.y_position -= movement_step_ball;
                    }
             
                    // free movement from right to left and down
                    else if(ball.y_position != table.top_margin+ball.ball_radius && ball.y_position!=table.top_margin+table.table_length - ball.ball_radius && this.x_direction < 0 && this.y_direction > 0 && ball.x_position-ball.ball_radius != player.x_position && ball.x_position!=com.x_position){
                        ball.x_position -= movement_step_ball;
                        ball.y_position += movement_step_ball;
                    }
             
                    //collision with table bottom
	     	 		//left to right
                    else if(ball.y_position===table.top_margin+table.table_length - ball.ball_radius && this.x_direction > 0 && this.y_direction > 0) {
                        ball.x_position += movement_step_ball;
                        ball.y_position -= movement_step_ball;
                        this.y_direction = this.y_direction * this.direction_correction;
                    }
               
                    //collision with table bottom
	     	 		//right to left
                    else if(ball.y_position===table.top_margin+table.table_length - ball.ball_radius && this.x_direction < 0 && this.y_direction > 0) {
                        ball.x_position -= movement_step_ball;
                        ball.y_position -= movement_step_ball;
                        this.y_direction = this.y_direction * this.direction_correction;
                    }
             
                    //collision with left(player) paddle
                    // top to down
                    else if(ball.x_position===(player.x_position+player.paddle_width) && ball.y_position >= player.y_position && ball.y_position <= player.y_position + player.paddle_length && this.x_direction < 0 && this.y_direction > 0) {
                        ball.x_position += movement_step_ball;
                        ball.y_position += movement_step_ball;
                        this.x_direction = this.x_direction * this.direction_correction;
                    }
                    
                    //collision with left(player) paddle
                    // down to top
                    else if(ball.x_position===(player.x_position+player.paddle_width) && ball.y_position >= player.y_position && ball.y_position <= player.y_position + player.paddle_length && this.x_direction < 0 && this.y_direction < 0) {
                        ball.x_position += movement_step_ball;
                        ball.y_position -= movement_step_ball;
                        this.x_direction = this.x_direction * this.direction_correction;
                    }
             
                    //collision with right(com) paddle
                    // top to down
                    else if(ball.x_position ===com.x_position && ball.y_position >= com.y_position && ball.y_position <= com.y_position + com.paddle_length && this.x_direction > 0 && this.y_direction > 0) {
                        ball.x_position -= movement_step_ball;
                        ball.y_position += movement_step_ball;
                        this.x_direction = this.x_direction * this.direction_correction;
                    }
                    
                    //collision with right(com) paddle
                    // down to top
                    else if(ball.x_position === com.x_position && ball.y_position >= com.y_position && ball.y_position <= com.y_position + com.paddle_length && this.x_direction > 0 && this.y_direction <0) {
                        ball.x_position -= movement_step_ball;
                        ball.y_position -= movement_step_ball;
                        this.x_direction = this.x_direction * this.direction_correction;
                    }
             
                    // serve again
                   
                    else if(ball.x_position ===(player.x_position+player.paddle_width) && (ball.y_position < player.y_position || ball.y_position > player.y_position + player.paddle_length)) {
                          start_counter--;     
                    }
                   
                    else if(ball.x_position===(player.x_position+player.paddle_width) && (ball.y_position < player.y_position || ball.y_position > player.y_position + player.paddle_length)) {
                         start_counter--;    
                    }
             
                    else if(ball.x_position ===com.x_position && (ball.y_position < com.y_position || ball.y_position > com.y_position + com.paddle_length)) {
                          start_counter--;     
                    }
                   
                    else if(ball.x_position===player.x_position && (ball.y_position < com.y_position || ball.y_position > com.y_position + com.paddle_length)) {
                         start_counter--;    
                    }
	     			  		 
	       }
	     };
	     
	     this.serve_the_ball = function() {
               ball.x_position=500;
               ball.y_position=380;
               render();
               this.y_direction = Math.abs(this.y_direction);
               this.x_direction = Math.abs(this.x_direction);
	     };
	     
	};


   //Table constructor, making table
   
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
 	
 	
 	
 	// start positions of all objects
 	
 	var player = new Paddle(250, 10, 10, 70);
 	var com = new Paddle(1154, 10, 10, 70);
 	var ball = new Ball(700, 380, 10);
 	var table = new Table(200, 0, 1010, 690);

   
    //COM player moving akka AI

    var com_delay = 150;  // delay of 150 px before point of impact

    Paddle.prototype.updateComPosition = function() {
       //while(ball.y_position != this.y_position) {
            if(ball.x_position >= this.x_position-com_delay && ball.y_position > this.y_position){
                movement_step_paddle_com++;    
            }
            else if(ball.x_position >= this.x_position-com_delay && ball.y_position < this.y_position){
                movement_step_paddle_com--;
            }
       //}
    };
 
 
 	//"Master" render function
 	
 	var render = function() {
 		table.render();
    	player.render();
    	com.render();
    	ball.render();
    	  			
 	};
 	
 
 // event listener for player'a paddle...
 
 window.addEventListener("keydown", function(event){
 	  			if(event.keyCode==87 || event.which ==87) {
 	  	  	         movement_step_paddle_player= -50;
 	  	   		     player.move(movement_step_paddle_player);
                     //alert(movement_step_paddle_player);
 	  			} 
 	  			else if(event.keyCode==83 || event.which==83) {
 	  				 movement_step_paddle_player= 50;
 	  				 player.move(movement_step_paddle_player);
                     //alert(movement_step_paddle_player);  
 	  			}
 });
 	

//window.addEventListener("keydown", function(event){
 	  			//if(event.keyCode==80 || event.which ==80) {
 	  	  			 //movement_step_paddle= -50;
 	  	   		    // com.move();
 	  			//} 
 	  			//else if(event.keyCode==76 || event.which==76) {
 	  				//movement_step_paddle= 50;
 	  				//com.move();
 	  			//}
 //});


 var start_counter = 0;
 
 var step = function() {	   
         if(start_counter===0){
             setTimeout(ball.serve_the_ball(), 0);
             start_counter++;           
         }
         else{
            ball.move();
            com.updateComPosition();
            com.move(movement_step_paddle_com);
            render(); 
        
         };
          	   	
  	   	requestAnimationFrame(step);   
  };

 
  		

 //refreshing window akka animation
 	
 	var animate = window.requestAnimationFrame ||
        window.webkitRequestAnimationFrame ||
        window.mozRequestAnimationFrame    ||
        window.oRequestAnimationFrame      ||
        window.msRequestAnimationFrame     ||
        function(callback) { window.setTimeout(step(), 100/60) };
 	
 	    
 window.onload = animate(step);
	

	
	
	
	