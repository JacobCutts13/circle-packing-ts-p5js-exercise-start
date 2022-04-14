interface Circle {
    pos: Position;
    radius: number;
}
interface Position {
    x: number;
    y: number;
}
/*PSUEDOCODE 
function calculatePackedCircles():Circle[]
	validatedCircles = empty list of circles	
	repeat 1000 times	
			candidate = generate a circle with random position and radius	
			if candidate does not overlap with any circle of validatedCircles	
			    add candidate to validatedCircle	
			else	
			    do nothing (we will not use this candidate)	
	return validatedCircles

*/
function calculatePackedCircles(areaWidth: number, areaHeight: number): Circle[] {
    let validatedCircles: Circle[] = [];
    for(let i = 0; i<1000; i++){
        const candidate: Circle = {
            pos: {
                x: Math.floor(Math.random() * areaWidth),
                y: Math.floor(Math.random() * areaHeight)
            },
            radius: Math.floor(Math.random() * areaWidth/20)
        }
        let isValid = true;
        for(const circle of validatedCircles){
            if(distance(candidate.pos, circle.pos) < (candidate.radius + circle.radius)){
                isValid = false;
                break;
            }
        }
        if (isValid){
            validatedCircles.push(candidate);
        }
    }
    return validatedCircles;
}

function calculateTouchingCircles(areaWidth: number, areaHeight: number): Circle[] {
    let validatedCircles: Circle[] = [];
    const first: Circle = {
        pos: {
            x: Math.floor(Math.random() * areaWidth),
            y: Math.floor(Math.random() * areaHeight)
        },
        radius: Math.floor(Math.random() * areaWidth/20)
    }
    validatedCircles.push(first);
    for(let i = 0; i<100; i++){
        const candidate: Circle = {
            pos: {
                x: Math.floor(Math.random() * areaWidth),
                y: Math.floor(Math.random() * areaHeight)
            },
            radius: areaWidth
        }
        for(const circle of validatedCircles){
            const dist = distance(candidate.pos, circle.pos) - circle.radius;
            if(dist < candidate.radius){
                candidate.radius = dist;
            }
        }
        validatedCircles.push(candidate);
    }
    return validatedCircles;
}

/** Returns the distance between two given positions.
    This function doesn't require p5.js 
 */
function distance(p1: Position, p2: Position): number {
    const x = p1.x - p2.x;
    const y = p1.y - p2.y;
    const hyp = Math.sqrt(x * x + y * y);
    return hyp; //distance between centres of 2 circles if hyp>r1+r2 then touching
}