console.log('running');
var isMobile = false; //initiate as false
// device detection
if(/(android|bb\d+|meego).+mobile|avantgo|bada\/|blackberry|blazer|compal|elaine|fennec|hiptop|iemobile|ip(hone|od)|ipad|iris|kindle|Android|Silk|lge |maemo|midp|mmp|netfront|opera m(ob|in)i|palm( os)?|phone|p(ixi|re)\/|plucker|pocket|psp|series(4|6)0|symbian|treo|up\.(browser|link)|vodafone|wap|windows (ce|phone)|xda|xiino/i.test(navigator.userAgent)
    || /1207|6310|6590|3gso|4thp|50[1-6]i|770s|802s|a wa|abac|ac(er|oo|s\-)|ai(ko|rn)|al(av|ca|co)|amoi|an(ex|ny|yw)|aptu|ar(ch|go)|as(te|us)|attw|au(di|\-m|r |s )|avan|be(ck|ll|nq)|bi(lb|rd)|bl(ac|az)|br(e|v)w|bumb|bw\-(n|u)|c55\/|capi|ccwa|cdm\-|cell|chtm|cldc|cmd\-|co(mp|nd)|craw|da(it|ll|ng)|dbte|dc\-s|devi|dica|dmob|do(c|p)o|ds(12|\-d)|el(49|ai)|em(l2|ul)|er(ic|k0)|esl8|ez([4-7]0|os|wa|ze)|fetc|fly(\-|_)|g1 u|g560|gene|gf\-5|g\-mo|go(\.w|od)|gr(ad|un)|haie|hcit|hd\-(m|p|t)|hei\-|hi(pt|ta)|hp( i|ip)|hs\-c|ht(c(\-| |_|a|g|p|s|t)|tp)|hu(aw|tc)|i\-(20|go|ma)|i230|iac( |\-|\/)|ibro|idea|ig01|ikom|im1k|inno|ipaq|iris|ja(t|v)a|jbro|jemu|jigs|kddi|keji|kgt( |\/)|klon|kpt |kwc\-|kyo(c|k)|le(no|xi)|lg( g|\/(k|l|u)|50|54|\-[a-w])|libw|lynx|m1\-w|m3ga|m50\/|ma(te|ui|xo)|mc(01|21|ca)|m\-cr|me(rc|ri)|mi(o8|oa|ts)|mmef|mo(01|02|bi|de|do|t(\-| |o|v)|zz)|mt(50|p1|v )|mwbp|mywa|n10[0-2]|n20[2-3]|n30(0|2)|n50(0|2|5)|n7(0(0|1)|10)|ne((c|m)\-|on|tf|wf|wg|wt)|nok(6|i)|nzph|o2im|op(ti|wv)|oran|owg1|p800|pan(a|d|t)|pdxg|pg(13|\-([1-8]|c))|phil|pire|pl(ay|uc)|pn\-2|po(ck|rt|se)|prox|psio|pt\-g|qa\-a|qc(07|12|21|32|60|\-[2-7]|i\-)|qtek|r380|r600|raks|rim9|ro(ve|zo)|s55\/|sa(ge|ma|mm|ms|ny|va)|sc(01|h\-|oo|p\-)|sdk\/|se(c(\-|0|1)|47|mc|nd|ri)|sgh\-|shar|sie(\-|m)|sk\-0|sl(45|id)|sm(al|ar|b3|it|t5)|so(ft|ny)|sp(01|h\-|v\-|v )|sy(01|mb)|t2(18|50)|t6(00|10|18)|ta(gt|lk)|tcl\-|tdg\-|tel(i|m)|tim\-|t\-mo|to(pl|sh)|ts(70|m\-|m3|m5)|tx\-9|up(\.b|g1|si)|utst|v400|v750|veri|vi(rg|te)|vk(40|5[0-3]|\-v)|vm40|voda|vulc|vx(52|53|60|61|70|80|81|83|85|98)|w3c(\-| )|webc|whit|wi(g |nc|nw)|wmlb|wonu|x700|yas\-|your|zeto|zte\-/i.test(navigator.userAgent.substr(0,4))) isMobile = true;
var width = window.innerWidth;
var ismobileWidth = false;
if(width < 970){
    ismobileWidth = true;
}
console.log(width, ismobileWidth);
var images = document.getElementsByClassName('image');
var imagesList = document.getElementsByClassName('list-image');
var imageEnd = document.getElementsByClassName('image-end');
var pre = document.getElementsByTagName('pre');

function debounce(func, wait, immediate) {
	var timeout;
	return function() {
		var context = this, args = arguments;
		var later = function() {
			timeout = null;
			if (!immediate) func.apply(context, args);
		};
		var callNow = immediate && !timeout;
		clearTimeout(timeout);
		timeout = setTimeout(later, wait);
		if (callNow) func.apply(context, args);
	};
};

function elementInViewport(el) {
    var top = el.offsetTop;
    var left = el.offsetLeft;
    var width = el.offsetWidth;
    var height = el.offsetHeight;

    while(el.offsetParent) {
        el = el.offsetParent;
        top += el.offsetTop;
        left += el.offsetLeft;
    }

    return (
        top >= window.pageYOffset &&
        left >= window.pageXOffset &&
        (top + height) <= (window.pageYOffset + window.innerHeight) &&
        (left + width) <= (window.pageXOffset + window.innerWidth)
    );
}

function imageCounter(){
    var imageList = [];
    var listContainer = document.querySelector('.interactive-th-images-list');
    for(var i=0; i < images.length; i++){
        imageList.push(images[i].dataset.src);
    }

    for (var c in imageList) {
        var el = document.createElement('div');
        el.className = "list-image image" + [c];
        el.innerHTML = "<img src='" + imageList[c] + "'>";
        listContainer.appendChild(el);
    }
}

function showImages() {
    console.log('scrolling');
    var windowHeight = window.innerHeight;
    var article = document.querySelector('.article-copy');
    for(var i = 0; i < images.length; i++){
        var length = images.length - 1;
        var img = images[length-i];
        if (img.getBoundingClientRect().top < windowHeight / 2) {
            console.log(i);
            imagesList[length-i].classList.add('visible');
            // changeTextColor();
            if(!img.classList.contains('end')){
                article.classList.add('over-image');
            }else {
                article.classList.remove('over-image');
            }
            return false;
        } else {
            imagesList[length-i].classList.remove('visible');
            // changeTextColor();
            article.classList.remove('over-image');
        }
    }
}

function changeTextColor() {
    console.log('called');
    var typeOverImage = document.getElementsByClassName('type-in-image');
    var article = document.querySelector('.article-copy');
    for(var i = 0; i < typeOverImage.length; i++){
        if(typeOverImage[i].getBoundingClientRect().top < window.innerHeight && typeOverImage[i].getBoundingClientRect().bottom > window.innerHeight / 2){
            console.log('white');
            typeOverImage[i].style.color = "#fff";
        }else{
            // console.log('black');
            typeOverImage[i].style.color = "#333";
        }
    }
}

function stickHeader() {
    var tracker = document.querySelector('.audio-tracker');
    var header = document.querySelector('.interactive-th-audio');
    if(tracker.getBoundingClientRect().top <= 0){
        header.classList.add('sticky');
    }else {
        header.classList.remove('sticky');
    }
}

function animateDay() {
    var days = document.getElementsByClassName('day');
    for(var i = 0; i < days.length; i ++){
        if(elementInViewport(days[i])){
            days[i].classList.add('inView');
        }else {
            days[i].classList.remove('inView');
        }
    }
}

function loadAudio(mp3, ogg, player){
    var mp3src = mp3.dataset.src;
    var oggsrc = ogg.dataset.src;

    mp3.setAttribute('src', mp3src);
    ogg.setAttribute('src', oggsrc);
    if(player.readyState === 0){
        player.load();
    }
    player.play();
}

function playAudio(){
    var audioPlayer = document.getElementById('audio-player');
    var mp3 = document.querySelector('.audio-file-mp3');
    var ogg = document.querySelector('.audio-file-ogg');
    var playButton = document.querySelector('.audio-play-button');
        playButton.addEventListener('click', function(){
            if(audioPlayer.paused){
                loadAudio(mp3, ogg, audioPlayer);
                console.log('playing');
                playButton.classList.add('playing');
            }else {
                audioPlayer.pause();
                console.log('paused');
                playButton.classList.remove('playing');
            }
        })
}

function textConversation() {
    console.log('this');
    var messages = document.getElementsByClassName('message');
    for(var i = 0; i < messages.length; i ++){
        if(elementInViewport(messages[i])){
            messages[i].classList.add('visible');
        }else {
            messages[i].classList.remove('visible');
        }
    }
}

function init(){
    if(!isMobile && !ismobileWidth){
        imageCounter();
    }
    playAudio();
    document.addEventListener('scroll', function(){
        if(!isMobile && !ismobileWidth){
            showImages();
        }
        animateDay();
        stickHeader();
        textConversation();
    });
}

init();
