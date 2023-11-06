canvas = document.querySelector("canvas");

var c = canvas.getContext("2d");
canvas.width = window.innerWidth;
canvas.height = window.innerHeight;

var mouse = {
    x: undefined,
    y: undefined
}

// var minRadius = 1;
// var maxRadius = 40;

var colorArray = [
    "#003049",
    "#d62828",
    "#f77f00",
    "#fcbf49",
    "#eae2b7",
]

window.addEventListener("mousemove", (event) => {
    mouse.x = event.x;
    mouse.y = event.y;
    console.log(mouse);
})
window.addEventListener("resize", () => { // resize
    canvas.width = window.innerWidth;
    canvas.height = window.innerHeight;

    init();
})


class Circle {
    constructor(x, y, dx, dy, radius, color) {
        this.x = x;
        this.y = y;
        this.dx = dx;
        this.dy = dy;
        this.radius = radius;
        this.minRadius = radius;
        this.maxRadius = radius*3*(Math.random()+1);
        this.color = color;

        this.draw = function () {
            c.beginPath();
            c.arc(this.x, this.y, this.radius, 0, Math.PI * 2, false);
            // c.strokeStyle = this.color;
            // c.stroke();
            c.fillStyle = color;
            c.fill();
            c.closePath();
        };
        this.update = function () {
            if (this.x + this.radius > innerWidth) {
                this.dx = -(Math.abs(this.dx));
                this.dx *= 0.9;
            } else if (this.x - this.radius < 0) {
                this.dx = Math.abs(this.dx);
                this.dx *= 0.9;
            } else {
                this.dx *= 0.999;
            }

            if (this.y + this.radius > innerHeight) {
                this.dy = -Math.abs(this.dy);
                this.dy *= .8
            } else if (this.y - this.radius < 0) {
                this.dy = Math.abs(this.dy);
                this.dx = this.dx * .8
            } else {
                this.dy += .1;
            };

            this.x += this.dx;
            this.y += this.dy;

            // interactivity
            if (Math.abs(mouse.x - this.x) < 50 && Math.abs(mouse.y - this.y) < 50) {
                if (this.radius >= this.maxRadius){
                    this.dy -= 10 * (Math.random()+1);
                    this.dx = (Math.random() - 0.5) * 20;
                    this.radius = this.minRadius;
                } else {
                    this.radius++;
                }
                
            } else if (this.radius > this.minRadius) {
                this.radius--;
            }

            this.draw();
        };
    }
}


var circleArray = [];

function init() {
    circleArray=[];
    for (var i = 0; i < (innerHeight * innerWidth)/500; i++) {
        let color = colorArray[Math.floor(Math.random() * colorArray.length)]; //`rgb(${Math.floor(Math.random() * 256)}, ${Math.floor(Math.random() * 256)}, ${Math.floor(Math.random() * 256)})`;
        let radius = Math.random() * 10 + 1;
        let x = Math.round(Math.random() * (innerWidth - radius * 2) + radius);
        let y = Math.round(Math.random() * (innerHeight - radius * 2) + radius);
        let dx = (Math.random() - 0.5) * 5;
        let dy = (Math.random() - 0.5) * 5;


        circleArray.push(new Circle(x, y, dx, dy, radius, color))
    }
}

function animate() {
    requestAnimationFrame(animate);

    c.clearRect(0, 0, innerWidth, innerHeight);

    for (var i = 0; i < circleArray.length; i++) {
        circleArray[i].update();
    };
};

init();
animate();