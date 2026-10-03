

/**
 * Represents a piecewise function composed of multiple
 * {@link Piece} objects.
 *
 * Each piece contains a condition that determines whether
 * it applies to a given input and a calculation that produces
 * the corresponding output.
 *
 * @class Piecewise
 */
export class Piecewise{
    constructor(pieces = []){
         /**
         * Collection of pieces that make up the
         * piecewise function.
         *
         * @type {Piece[]}
         */
        this.pieces = pieces
    }
    /**
     * Adds a piece to the piecewise function.
     *
     * @param {Piece} piece - The piece to add.
     * @returns {Piecewise} This instance, allowing method chaining.
     */

    addPiece(piece){
        this.pieces.push(piece)
        return this 
    }
    /**
     * Calculates the output of the piecewise function for a given input.
     *
     * Finds the first piece whose condition is satisfied by the
     * input and uses that piece to calculate the corresponding output.
     *
     * @param {number} input - The input value to evaluate.
     * @returns {number} The calculated output value.
     * @throws {Error} If no piece satisfies the given input.
     */

    calculate(input){
        const piece = this.pieces.find(piece => piece.evaluate(input))
        if(!piece) throw new Error("no piece")
        return piece.calculate(input)
    }
}
/**
 * Represents a single piece of a piecewise function.
 *
 * A piece consists of a condition that determines whether
 * the piece applies to a given input and a calculation that
 * determines the corresponding output.
 *
 * @class Piece
 */


export class Piece{
    constructor(condition,  calculation){
        this.condition = condition;
        this.calculation = calculation;

    }

    /**
     * Evaluates the condition of this piece.
     *
     * @param {number} e - Input value to evaluate.
     * @returns {boolean} Whether the condition is satisfied.
     */
    evaluate(e){
        return this.condition(e)
    }

/**
 * Calculation used to determine the output of this piece.
 *
 * @type {Function}
 */

    calculate(c){
        return this.calculation(c)
    }
}