const $question = document.getElementById("question");

/**
 * Represents a Cartesian coordinate plane used for plotting,
 * panning, zooming, and managing points.
 *
 * The plane uses the canvas center as the origin (0, 0).
 * Coordinates are represented using mathematical Cartesian
 * coordinates, where positive y-values increase upward.
 *
 * @class Plane
 */

export class Plane {
    constructor() {
        this.dimension = {
            x: 10,
            y: 10
        };
        /**
         * A vector (list) containing the points plotted on the Cartesian plane.
         *
         * Each point stores its position using x and y coordinates.
         */
        this.points = []
        /**
         * Zoom ofthe plane.
         * this varaible should only be use when, the requirement required the use of zoom
         */
        this.zoom = 0.7;
        this.defaultZoom()
        /**
         * scalar of zoom of how much the scroll wheel scale the zoom
         */
        this.zoomScalar = 0.05
        /**
         * Horizontal offset of the Cartesian plane from the canvas origin.
         *
         * Used to move the plane horizontally when panning.
         *
         * @type {number}
         */
        this.xOffset = 0;
        /**
         * Vertical offset of the Cartesian plane from the canvas origin.
         *
         * Used to move the plane vertically when panning.
         *
         * @type {number}
         */
        this.yOffset = 0;
         /**
         * The number of canvas pixels represented by one Cartesian unit.
         *
         * The scale is calculated from the plane's horizontal dimensions
         * and adjusted according to the current zoom level.
         *
         * @type {number}
         */
        this.scale = (width / (this.dimension.x * 2)) * this.zoom;
        /**
         * Indicates whether the plane is currently being dragged.
         *
         * @type {boolean}
         */
        this.isDragging = false;
        this.enableZooming = true
        this.enablePanning = true
    }
defaultZoom(){
    this.zoom = 1
}
    /**
     * Pans the Cartesian plane based on the mouse movement.
     *
     * Calculates the target offset and constrains the plane within
     * the visible canvas boundaries.
     *
     * @deprecated This method is currently not being used.
     * The panning functionality is not being used.
     *
     * @returns {void}
     */
    pan() {
        // Calculate how far the mouse has dragged since the previous frame
        let targetX = this.xOffset + (mouseX - pmouseX);
        let targetY = this.yOffset + (mouseY - pmouseY);

        // Calculate the maximum distance the center point can slide
        // before the outer boundaries of your grid hit the edges of the canvas screen.
        const maxPanX = (this.dimension.x * this.scale) - (width / 2);
        const maxPanY = (this.dimension.y * this.scale) - (height / 2);

        //  Keep the plane locked inside boundaries relative to center (0,0)
        // If zoomed out far (maxPan is negative), lock it perfectly at 0 (center)
        this.xOffset = maxPanX > 0 ? constrain(targetX, -maxPanX, maxPanX) : 0;
        this.yOffset = maxPanY > 0 ? constrain(targetY, -maxPanY, maxPanY) : 0;
        this.pointsToPlot = []
    }
    zoomOut(){
        this.zoom += this.zoomScalar
        this.zoom = Math.min(this.zoom, 3.0); 
    }

    zoomIn(){
        this.zoom -= this.zoomScalar
        this.zoom = Math.max(this.zoom, 0.15); 

    }
    updateZoom(){
            this.minZoom = 0.5; 

            //  Ensure your zoom value never drops below this dynamic boundary constraint
            this.zoom = Math.max(this.zoom, this.minZoom);


        this.scale = (width / (this.dimension.x * 2)) * this.zoom;
        
    }
    /**
     * Draws the Cartesian coordinate grid and its axis labels.
     *
     * Generates vertical and horizontal grid lines based on the
     * plane's dimensions and current scale. Each grid line is
     * labeled with its corresponding Cartesian coordinate.
     *
     * The origin (0, 0) is handled separately to maintain proper
     * coordinate labeling and alignment.
     *
     * @returns {void}
     */
    axis() {
        // Vertical grid lines
        for (let x = -this.dimension.x; x <= this.dimension.x; x++) {
             
            textSize(6)
            //  text( x ,  5+x * this.dimension.x * this.scale/ 10, 5+  0);
            
            // text(x, x * this.scale + 5, 5);
            const currX = x * this.scale;

    if (x === -this.dimension.x) {
        textAlign(LEFT, TOP);
        text(x, currX + 5, 5);
    } 
    else if (x === this.dimension.x) {
        textAlign(RIGHT, TOP);
        text(x, currX - 5, 5);
    } 
    else {
        textAlign(CENTER, TOP);
        text(x, currX, 5);
    }
    push()
    stroke(200);
            line(
                x * this.scale,
                -this.dimension.y * this.scale,
                x * this.scale,
                this.dimension.y * this.scale
            );
        }
        pop()
     for (let y = -this.dimension.y; y <= this.dimension.y; y++) {

    const currY = y * this.scale;

    // Draw horizontal grid line
    line(
        -this.dimension.x * this.scale,
        currY,
        this.dimension.x * this.scale,
        currY
    );

        // Don't draw Y label for 0
        if (y === 0) {
            continue;
        }

        if (y === -this.dimension.y) {
            textAlign(RIGHT, BOTTOM);
            text(y, -5, -currY - 5);

        } else if (y === this.dimension.y) {
            textAlign(RIGHT, TOP);
            text(y, -5, -currY + 5);

        } else {
            textAlign(RIGHT, CENTER);
            text(y, -5, -currY);
        }
}
    }          
    /**
     * Represents a two-dimensional Cartesian coordinate.
     *
     * @typedef {Object} Vector
     * @property {number} x - The X-coordinate.
     * @property {number} y - The Y-coordinate.
     */

    /**
     * Converts mouse coordinates from the canvas into a
     * snapped Cartesian coordinate.
     *
     * @param {number} mx - The mouse X-position relative to the canvas origin.
     * @param {number} my - The mouse Y-position relative to the canvas origin.
     * @returns {Vector} The corresponding Cartesian coordinate.
     */
   plot(mx, my) {
        // FIX: Clean mapping from raw screen values to snapping coordinates
        const x = mx / this.scale;
        const y = -my / this.scale; // Inverted because canvas standard pixels run downwards

        const snappedX = Math.round(x);
        const snappedY = Math.round(y);

        return createVector(snappedX, snappedY);
    }
    randomPoint() {

        const x = Math.floor(Math.random() * (this.dimension.x * 2 + 1)) - this.dimension.x;
        const y = Math.floor(Math.random() * (this.dimension.y * 2 + 1)) - this.dimension.y;
        // this.pointsToPlot.push(createVector(x,y))
        return createVector(x,y)
    }

    /**
     * Draws all points stored on the Cartesian plane.
     *
     * Each point is converted from Cartesian coordinates to canvas
     * coordinates using the current scale. The point's color indicates
     * its evaluation state:
     * - Green: the point is correct.
     * - Red: the point is incorrect.
     * - Black: the point has not been evaluated yet.
     *
     * @returns {void}
     */
    plotPoints() {
        this.points.forEach(point => {
            const x = point.x * this.scale;
            const y = -point.y * this.scale;

            push();

            noStroke();

            if (point.correct === true) {
                // Correct point
                fill(0, 180, 80);
            } else if (point.correct === false) {
                // Wrong point
                fill(220, 40, 40);
            } else {
                // Not checked yet
                fill(100);
            }

            circle(x, y, 12);

            pop();
        });
    }
    /**
     * Adds a new point to the Cartesian plane.
     *
     * Creates a p5.Vector from the provided Cartesian coordinates
     * and stores it in the plane's collection of points.
     *
     * @param {number} x - The X-coordinate of the point.
     * @param {number} y - The Y-coordinate of the point.
     * @returns {void}
     */
    addPoint(x, y) {

        this.points.push(
            createVector(x, y)
        );

    }


  getMouseCoordinate() {
        // This helper should match the updated plot input calculations
        const translatedMX = mouseX - (width / 2) - this.xOffset;
        const translatedMY = mouseY - (height / 2) - this.yOffset;
        return this.plot(translatedMX, translatedMY);
    }}


/**
 * Represents a quiz session for the Cartesian coordinate plane.
 *
 * Extends the {@link Plane} class to inherit coordinate-plane
 * functionality such as point management, plotting, and scaling.
 *
 * The session manages randomly generated target points,
 * renders quiz questions, and evaluates the points plotted
 * by the user.
 *
 * @class Session
 * @extends Plane
 */
export class Session extends Plane{
    constructor(){
        super()
        this.randomPoints = []
    }


     renderQuestion(){
        const pointsHTML = this.randomPoints
        .map(point => `(${point.x}, ${point.y})`)
        .join(", <br>");

    $question.innerHTML = `
        <div class="quiz-header">
            <p class="eyebrow">CARTESIAN PLANE</p>

            <h1>Coordinate Challenge</h1>

            <p id="question-progress" class="question-progress"></p>

            <p class="description">
                Plot all the given points on the coordinate plane.
            </p>
        </div>

        <div class="target-point">
            <span class="point-label">POINTS</span>

            <span class="coordinate">
                ${pointsHTML}
            </span>
        </div>

        <p id="feedback"></p>
         <div class="button-group">
            <button
                type="button"
                id="check-answer"
                class="submit-button"
            >
                Check Points
            </button>

            <button
                type="button"
                id="next-question"
                class="next-button"
                hidden
            >
                Next Question
            </button>
        </div>
       
    `;

    // document
    //     .getElementById("check-answer")
    //     .addEventListener("click", ()=> this.checkPoint());
     }
     
   
       /**
     * Checks the points plotted by the user against the
     * randomly generated target points.
     *
     * Each plotted point is marked as correct when a target
     * point with matching x and y coordinates is found.
     * The method then calculates the number of correct and
     * incorrect points and updates the feedback displayed
     * to the user.
     *
     * @returns {{
     *     correct: number,
     *     wrong: number,
     *     total: number
     * }|null}
     * An object containing the number of correct, incorrect,
     * and total target points, or null if no points have
     * been plotted.
     */
   checkPoint() {
    const $feedback = document.getElementById("feedback");

    if (this.points.length === 0) {
        $feedback.textContent = "Plot a point first.";
        $feedback.className = "feedback error";
        return null;
    }

    let correctCount = 0;

    this.points.forEach(point => {
        const matchingTarget = this.randomPoints.find(target =>
            point.x === target.x && point.y === target.y
        );
        point.correct = matchingTarget !== undefined;
        if (point.correct) correctCount++;
    });

    const wrongCount = this.points.length - correctCount;

    const isComplete = correctCount === this.randomPoints.length && wrongCount === 0;
    $feedback.textContent = `${correctCount} of ${this.randomPoints.length} target points correct; ${wrongCount} incorrect.`;
    $feedback.className = isComplete ? "feedback success" : "feedback error";

    return {
        correct: correctCount,
        wrong: wrongCount,
        total: this.randomPoints.length
    };
}
  
    
}
export class RandomizedPoint extends Session{
    constructor(){
       super()
      this.generateRandomPoints()
    }
    generateRandomPoints(){
        for (let i = 1 ; i <= 5; i++) {
            const r = createVector(
                constraint(-( this.dimension.x - 1), this.dimension.x - 1),
                constraint(-( this.dimension.y - 1), this.dimension.y- 1)
            )
        
            this.randomPoints.push(r) ;
        }
    }
    createQuestion(){
        this.generateRandomPoints()
        this.renderQuestion();
    }

  
  
}
/**
 * Represents a quiz session for plotting points generated
 * from a quadratic function.
 *
 * Extends the {@link Session} class to inherit Cartesian
 * plane functionality, point management, question rendering,
 * and answer checking.
 *
 * The quadratic function is generated using a random vertical
 * direction and horizontal and vertical translations.
 *
 * @class Quadratic
 * @extends Session
 */
export class Quadratic extends Session{
    constructor(){
        super()
        this.generateQuadraticPoints()
        /**
         * Defines the maximum range used when generating
         * function parameters such as slope values.
         *
         * @type {number}
         */
        this.v = 4
    }
    generateQuadraticPoints(){
        /**
         * Determines the vertical orientation of the parabola.
         * A value of 1 produces an upward-opening parabola,
         * while -1 produces a downward-opening parabola.
         *
         * @type {number}
         */
        let unary = constraint(-1,1)
        unary = unary == 0 ? 1 : unary
        /**
         * Vertical and horizontal translations of the parabola.
         *
         * @type {number}
         */

        let k, h;
        if(unary == 1){
            k = constraint(-9,5)
            h = constraint(-7,7)
        }else{
            h = constraint(-7,7)
            k = constraint(-5, 9)
        }
        // y = x^2
        let y = (x)=> x*x 
        for(let x = -2; x <= 2; x++){
            let hx = x + h
            this.randomPoints.push(createVector(hx, unary*y(x) + k))
        }

        
    }
    createQuestion(){
        this.generateQuadraticPoints()
        this.renderQuestion()
    }
}



export class LinearAbsolute extends Session{
    constructor(){

        super()
        this.randomAbsoluteLinearPoints = []
        this.v = 4
        this.generateAbsoluteLinearPoints()
    }
    generateAbsoluteLinearPoints(){
        /**
         * The slope value constrained within the plane's
         * minimum and maximum coordinate range.
         */
        let s = constraint(-this.v, this.v) 
        // make h 1 if 0, 
        s = s == 0 ? 1 : s

        /**
         * The maximum vertical intercept range based on
         * the plane dimensions and the selected slope.
         */
        const c = this.dimension.y - (s*s) - 2

        /**
         * The maximum vertical intercept range based on
         * the plane dimensions and the selected slope.
         */
        const n =  constraint(-c , c) 
        // console.log(h, n );
        /**
         * Represents the linear function using the
         * selected slope and vertical intercept.
         *
         * @param {number} x - The x-coordinate.
         * @returns {number} The corresponding y-coordinate.
         */
        const y  = (x) => Math.abs(x *  s) + n
        let k;
        let h = constraint(-7, 7);
        let unary = constraint(-1, 1)
        unary = unary == 0 ? 1: unary
        for(let x = -2; x <= 2;x++){
            this.randomAbsoluteLinearPoints.push(createVector(x,y(x)))
            this.randomPoints.push(createVector(x, unary * y(x)))
            console.log("x: " + x,"y: "+ y(x));
            
        }
       
    }
    createQuestion(){
        this.generateAbsoluteLinearPoints()
        this.renderQuestion()
    }

    
}
export class Linear extends Session{
    constructor(){
        super()
        this.randomLinearPoints= []
        this.generateLinearPoints()
        this.v = 4
    }
    generateLinearPoints(){
        /**
         * The slope value constrained within the plane's
         * minimum and maximum coordinate range.
         */
        let h = constraint(-4, 4) 
        // make h 1 if 0, 
        h = h == 0 ? 1 : h

        /**
         * The maximum vertical intercept range based on
         * the plane dimensions and the selected slope.
         */
        const c = this.dimension.y - (h*h) - 1

        /**
         * The maximum vertical intercept range based on
         * the plane dimensions and the selected slope.
         */
        const n =  constraint(-c , c) 
        // console.log(h, n );
        /**
         * Represents the linear function using the
         * selected slope and vertical intercept.
         *
         * @param {number} x - The x-coordinate.
         * @returns {number} The corresponding y-coordinate.
         */
        const y  = (x) => x *  h + n
        for(let x = -2; x <= 2;x++){
            this.randomLinearPoints.push(createVector(x,y(x)))
            this.randomPoints.push(createVector(x,y(x)))
            console.log("x: " + x,"y: "+ y(x));
            
        }
       
        
        
    }
    createQuestion(){
        console.log(this.points);
        // this.resetPlaneState()
        this.generateLinearPoints()
        this.renderQuestion()
        
        
    }

}

/**
 * 
 * @param {Number} c1 
 * @param {Number} c2 
 * @returns random inclusive number from c1 and c2
 */
function constraint(c1, c2){
    // check if c1 and c2 have valid value
    if((c1.length === 0 || c1 === null) ||  (c2.length === 0 || c2 === null)){
        return 0;
    }
    if(c1 > c2){
        return 0;
    }

    return Math.floor(Math.random() * (Math.floor(c2)-Math.ceil(c1)+1) )+ Math.ceil(c1)
}
/**
 * Manages the active quiz session and selects the appropriate
 * quiz implementation based on the current quiz mode.
 *
 * The Quiz class acts as a controller for different quiz types,
 * creating and replacing quiz instances when a new quiz starts.
 *
 * Supported quiz modes include randomized points, linear equations,
 * absolute value equations, and quadratic equations.
 *
 * @class Quiz
 */

export class Quiz{
    constructor(){
        /**
         * The currently active quiz instance.
         *
         * @type {RandomizedPoint|Linear|LinearAbsolute|Quadratic|null}
         */

        this.activeInstance = null
        this.currentMode = "random" 
       
        // this.setupListener()
        this.startNewQuiz()
    }
    startNewQuiz(){
        console.log('hello');
        
        if(this.activeInstance){
            this.activeInstance = null
        }

        if (this.currentMode === 'random') {
            this.activeInstance = new RandomizedPoint();
        } else if (this.currentMode === 'linear') {
            this.activeInstance = new Linear();
        } else if(this.currentMode === "linearAbsolute"){
            this.activeInstance = new LinearAbsolute();
            
        } 
        
        else if(this.currentMode === 'quadratic') {
            this.activeInstance = new Quadratic();
        }
        this.activeInstance.renderQuestion()

        /**
         * 
         *  <div class="button-group">
            <button
                type="button"
                id="check-answer"
                class="submit-button"
            >
                Check Points
            </button>

            <button
                type="button"
                id="next-question"
                class="next-button"
            >
                Next Question
            </button>
        </div>
         */

        // const div = document.createElement("div")
        // div.classList.add("button-group")
        // const chkBtn = document.createElement("button")
        // chkBtn.classList.add("submit-button")
        // chkBtn.id = "check-answer"
        // chkBtn.textContent = "check points"
        // const nxtBtn = document.createElement("button")
        // nxtBtn.classList.add("next-button")
        // nxtBtn.textContent = "next question" 
        // nxtBtn.id = "next-button"

        // div.appendChild(chkBtn)
        // div.appendChild(nxtBtn)
        // $question.appendChild(div)
        // const $nextBtn = document.getElementById("next-question");
        // if ($nextBtn) {
        //     $nextBtn.addEventListener("click", () => this.startNewQuestion(), { once: true });
        // }
    }
    setupListener(){
        const $parent = $question

        // Listen to the parent container permanently
        $parent.addEventListener("click", (event) => {
            // Check if the clicked element was the "Check Points" button
            if (event.target.id === "check-answer" && this.activeInstance) {
                
                this.activeInstance.checkPoint();
            }

            // Check if the clicked element was the "Next Question" button
            if (event.target.id === "next-question") {
                this.startNewQuiz(); // Destroys old plane, boots up a fresh one!
            }
        });
    }
    instance(){
        return this.activeInstance
    }
}