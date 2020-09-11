import React, { Component } from 'react'
import p5 from 'p5'
import vert from './feedback.vert'
import frag from './feedback.frag'


export default class App extends Component {

    //React ref for div reference we pass into p5
    sketchRef = React.createRef()

    //P5 instance mode
    initSketch = (p) => {
        let feedbackShader
        let prevImg, currImg 
        let w,h              
        p.preload = () => {
            //load images and shaders here
            feedbackShader = p.loadShader(vert,frag)
        }

        p.windowResized = () => {
            //handle window resize here
        }
        p.setup = () => {
            //store width and height
            w = p.windowWidth   
            h = p.windowHeight    

            //setup canvas and init values here
            p.createCanvas(w,h, p.WEBGL)

            //normal canvas
            prevImg = p.createGraphics(w,h)
            prevImg.background(0)
            prevImg.fill(255)
            prevImg.ellipse(w/2,h/2,40,40)
            console.log(prevImg.width,prevImg.height)
            //currImg will be doing pixel operations
            currImg = p.createGraphics(w,h, p.WEBGL)
        }

        p.draw = () => {
            //update canvas here
            currImg.shader(feedbackShader)

            //we send the shader prevImg as a 2d texture so we can 
            //read the values inside the shader
            feedbackShader.setUniform("texsize", [prevImg.width,prevImg.height])
            feedbackShader.setUniform("prevtex", prevImg)

            //we need a rect for frag shader to draw onto
            currImg.rect(-w/2,-h/2,w,h)

            //copy the currImg and set it as previous
            prevImg.image(currImg, 0,0,w,h)

            //show the results
            p.image(currImg, -w/2,-h/2,w,h)
        }
    }

    componentDidMount() {
        //Create p5 canvas once component mounts
        this.p5Canvas = new p5(this.initSketch, this.sketchRef.current)
    }

    render() {
        //this div will contain the sketch canvas
        return (<div className="mySketch" ref={this.sketchRef} />)
    }
}
