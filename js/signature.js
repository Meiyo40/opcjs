jQuery(document).ready(function($){
    
    function to_image(){
        var canvas = document.getElementById("signature-pad");
        document.getElementById("theimage").src = canvas.toDataURL();
        Canvas2Image.saveAsPNG(canvas);
    }
    
    let canvas = document.getElementById("signature-pad");
    let signaturePad = new SignaturePad(canvas);
    let imgData = canvas.toDataURL();
    
    $('#clear').on('click', function(){
        signaturePad.clear();
    });
    
    $('#download').on('click', function(){
       to_image();
    });
});


