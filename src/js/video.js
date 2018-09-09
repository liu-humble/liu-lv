import 'video.js';
import 'video.js/dist/video-js.css';

const videos = document.querySelectorAll('video');
videos.forEach(video => {
    video.onplay = () => {
        const previousActiveVideoBox = document.querySelector('.video-box.active');
        const videoBox = video.closest('.video-box');
        if (previousActiveVideoBox && previousActiveVideoBox !== videoBox) {
            previousActiveVideoBox.querySelector('video').pause();
            previousActiveVideoBox.classList.remove('active');
        }
        videoBox.classList.add('active');
    };
});
