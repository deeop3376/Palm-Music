function Rem(){
    var docEl=document.documentElement,
    resizeEvt='orientationchange' in window ? 'orientationchange' : 'resize',
    recalc =function(){
        var clientWidth=docEl.clientWidth;
        if(!clientWidth) return;
        docEl.style.fontSize=14 + 'px';
    }
    if(!document.addEventListener) return ;
    window.addEventListener(resizeEvt,recalc,false);
    document.addEventListener('DOMContentLoaded',recalc,false);

}
export default Rem