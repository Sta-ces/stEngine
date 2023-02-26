export default class Shapes{
    
    static Square(ctx, {x, y, w, h, fillColor, strokeColor, strokeWidth = 0}){
        if(fillColor) ctx.fillStyle = fillColor;
        if(strokeColor) ctx.strokeStyle = strokeColor;
        if(strokeWidth) ctx.lineWidth = strokeWidth;
        ctx.fillRect(x, y, w, h);
        if(strokeWidth > 0 || strokeColor) ctx.strokeRect(x, y, w, h);
    }

    static Circle(ctx, {x, y, r, startAngle = 0, endAngle = 2 * Math.PI, fillColor, strokeColor, strokeWidth = 0}){
        if(fillColor) ctx.fillStyle = fillColor;
        if(strokeColor) ctx.strokeStyle = strokeColor;
        if(strokeWidth) ctx.lineWidth = strokeWidth;
        ctx.beginPath();
        ctx.arc(x, y, r, startAngle, endAngle);
        ctx.closePath();
        ctx.fill();
        if(strokeWidth > 0 || strokeColor) ctx.stroke();
    }

    static Star(ctx, {x, y, spikes = 5, outerRadius = 30, innerRadius = 15, fillColor, strokeColor, strokeWidth = 0}){
        let rot = Math.PI/2*3;
        let cx = x, cy = y;
        let step = Math.PI/spikes;

        if(fillColor) ctx.fillStyle = fillColor;
        if(strokeColor) ctx.strokeStyle = strokeColor;
        if(strokeWidth) ctx.lineWidth = strokeWidth;
        ctx.beginPath();
        ctx.moveTo(cx,cy-outerRadius);
        for(let i=0;i<spikes;i++){
            x=cx+Math.cos(rot)*outerRadius;
            y=cy+Math.sin(rot)*outerRadius;
            ctx.lineTo(x,y);
            rot+=step;
            x=cx+Math.cos(rot)*innerRadius;
            y=cy+Math.sin(rot)*innerRadius;
            ctx.lineTo(x,y);
            rot+=step;
        }
        ctx.lineTo(cx,cy-outerRadius);
        ctx.closePath();
        if(fillColor) ctx.fill();
        if(strokeWidth > 0 || strokeColor) ctx.stroke();
    }

    static Path(ctx, {curves, closePath = true, fillColor, strokeColor, strokeWidth = 0}){
        if(curves && curves.length > 0){
            if(fillColor) ctx.fillStyle = fillColor;
            if(strokeColor) ctx.strokeStyle = strokeColor;
            if(strokeWidth) ctx.lineWidth = strokeWidth;
            ctx.beginPath();
            ctx.moveTo(curves[0].x, curves[0].y);
            for (let c = 1; c < curves.length; c++) {
                const curve = curves[c];
                ctx.lineTo(curve.x, curve.y);
            }
            if(closePath) ctx.closePath();
            if(fillColor) ctx.fill();
            if(strokeWidth > 0 || strokeColor) ctx.stroke();
        }
    }

    static HTML(base, {element = "div", classname = "", id = "", src = "", alt = "", data = "", type = "", attr = {}, parent = null, textContent = null, append = true}){
        const el = document.createElement(element)
        if(classname !== "") el.setAttribute("class", classname)
        if(id !== "") el.setAttribute("id", id)
        if(src !== "") el.setAttribute("src", src)
        if(data !== "") el.setAttribute("data", data)
        if(type !== "") el.setAttribute("type", type)
        if(alt !== "") el.setAttribute("alt", alt)
        if(Object.keys(attr).length > 0){
            for(const [key, value] of Object.entries(attr))
                el.setAttribute(key, value)
        }
        if(textContent) el.innerHTML = textContent
        if(parent) parent.appendChild(el)
        else if(append) base.append(el)
        return el
    }
}