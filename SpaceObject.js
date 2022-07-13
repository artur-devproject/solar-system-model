class SpaceObject {
    constructor(centerObject, size, orbit, velocity, color) {
        this.centerObject = centerObject
        this.size = size
        this.orbit = orbit
        this.velocity = velocity / 1000
        this.color = color
        this.angle = 0
    }

    update() {
        this.angle += this.velocity * Math.PI
        this.X = this.centerObject.X + this.orbit * Math.cos(this.angle)
        this.Y = this.centerObject.Y + this.orbit * Math.sin(this.angle)
        return this
    }

    render() {
        // draw the orbit of a space object
        ctx.beginPath()
        ctx.arc(
            this.centerObject.X,
            this.centerObject.Y,
            this.orbit,
            0,
            Math.PI * 2
        )
        ctx.closePath()
        ctx.setLineDash([1, 8])
        ctx.strokeStyle = 'white'
        ctx.stroke()
        
        // draw the space object itself
        ctx.beginPath()
        ctx.arc(
            this.X,
            this.Y,
            this.size,
            0,
            Math.PI * 2
        )
        ctx.closePath()
        ctx.fillStyle = this.color
        ctx.fill()

        return this
    }
}