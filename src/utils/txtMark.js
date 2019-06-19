import markPic from '../../static/img/user_mark.png'
var txtMarkFn = function (op) {
    var textAlign = op && op.textAlign ? op.textAlign : 'center'
    var textBaseline = op && op.textBaseline ? op.textBaseline : 'middle'
    var font = op && op.font ? op.font : 'bold 13px Microsoft Yahei'
    var fillStyle = op && op.fillStyle ? op.fillStyle : 'rgba(90, 90, 90, 0.1)'
    var content = op && op.content ? op.content : '严禁外传'
    var zIndex = op && op.zIndex ? op.zIndex : 990
    var canvas = document.createElement('canvas')

    canvas.setAttribute('width', 170)
    canvas.setAttribute('height', 170)
    var ctx = canvas.getContext('2d')

    var img = new Image()
    img.setAttribute('crossOrigin', 'Anonymous')
    img.src = markPic

    img.onload = function () {
        ctx.drawImage(img, 0, 0)
        ctx.textAlign = textAlign
        ctx.textBaseline = textBaseline
        ctx.font = font
        ctx.fillStyle = fillStyle
        ctx.fillText(content, 142, 70)

        var base64Url = canvas.toDataURL('image/png')
        var gTxtMark = document.querySelector('.gTxtMark')

        var txtMarkDiv = gTxtMark || document.createElement('div')
        var styleStr = `
          position:absolute;
          top:0;
          left:0;
          width:500%;
          height:500%;
          z-index:${zIndex};
          pointer-events:none;
          background-repeat:repeat;
          background-image:url('${base64Url}');
          transform: translate(-50%, -50%) rotate(25deg)`

        txtMarkDiv.setAttribute('style', styleStr)
        txtMarkDiv.classList.add('gTxtMark')

        var d1 = document.getElementById('J-beta-app')
        var d2 = document.getElementById('J-beta-header')
        if (d1 && d2) {
            d1.insertBefore(txtMarkDiv, d2)
        }
    }
}

export default txtMarkFn
