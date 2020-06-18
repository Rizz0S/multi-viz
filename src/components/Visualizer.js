import React from 'react';

class Visualizer extends React.Component {
    static defaultProps = {
        audioContexts: []
    }
    
    constructor(props) {
        super(props);
        this.canvas = React.createRef();
    }

    renderVisualizer = () => {
        const canvas = this.canvas.current;
        const canvasContext = canvas.getContext('2d')
  
         const numBars = 125;
  
         let barWidth = (canvas.width / numBars) * 30;
         let barHeight;
  
         const renderFrame = () => {
             const agg = [];
             const freqDataMany = [];
             canvasContext.clearRect(0, 0, canvas.width, canvas.height)
             requestAnimationFrame(renderFrame);
          
    
             this.props.audioContexts.forEach((audioContextObj) => {
                 let freqData = audioContextObj.freqData;
                 audioContextObj.analyser.getByteFrequencyData(freqData);
                 freqDataMany.push(freqData);
             })
          
             if (this.props.audioContexts.length > 0) {
                 for (let i = 0; i < freqDataMany[0].length; i++) {
                     agg.push(0);
                     freqDataMany.forEach((data) => {
                     agg[i] += data[i];
                     });
                 }

                 const centerX = canvas.width / 2;
                 const centerY = canvas.height / 2;
                 const radius = 45;

                 for (let i = 0; i < (numBars); i++) {
                     barHeight = (agg[i] * 0.5);
                     barWidth = 3;
  
                  
                     let rads = (Math.PI * 2) / numBars;
                     let x = centerX + Math.cos(rads * i) * (radius);
                     let y = centerY + Math.sin(rads * i) * (radius);
                     let x_end = centerX + Math.cos(rads * i) * (radius + barHeight);
                     let y_end = centerY + Math.sin(rads * i) * (radius + barHeight);
  
                     this.drawBar(canvasContext, x, y, x_end, y_end, barWidth)
                 }

                 canvasContext.beginPath();
                 canvasContext.arc( centerX, centerY, radius, 0, (2*Math.PI) );
                 canvasContext.lineWidth = 1;
                 canvasContext.stroke();
                 canvasContext.closePath();
             }  
         }
         renderFrame();
     }
      
  
    drawBar = (canvasContext, x1, y1, x2, y2, width) => {
         const gradient = canvasContext.createLinearGradient(x1, y1, x2, y2);
         gradient.addColorStop(0, "rgb(209, 136, 155)");
         gradient.addColorStop(0.5, "rgb(247, 223, 230)"); 
         gradient.addColorStop(0.8, "rgb(230, 243, 245)"); 
         gradient.addColorStop(1, "white");
      
         canvasContext.lineWidth = width;
         canvasContext.strokeStyle = gradient;
         canvasContext.beginPath();
         canvasContext.moveTo(x1,y1);
         canvasContext.lineTo(x2,y2);
         canvasContext.stroke();
         canvasContext.closePath();
     }
  
    componentDidMount() {
        this.renderVisualizer();
    }

    render() {
        return(
            <>
             <canvas 
               className="visualizer"
               width={500}
               height={500}
               ref={this.canvas}
             />
            </>
        )
    }
} // end of Visualizer class



export default Visualizer;