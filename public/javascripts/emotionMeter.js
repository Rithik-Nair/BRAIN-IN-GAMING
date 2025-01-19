// public/javascripts/emotionMeter.js

async function setupWebcam() {
    const videoElement = document.getElementById('webcam');
    const stream = await navigator.mediaDevices.getUserMedia({ video: true });
    videoElement.srcObject = stream;
  }
  
  async function detectEmotion() {
    const faceapi = require('@vladmandic/face-api.js');
    await faceapi.nets.ssdMobilenetv1.loadFromUri('/models');
    await faceapi.nets.faceLandmark68Net.loadFromUri('/models');
    await faceapi.nets.faceRecognitionNet.loadFromUri('/models');
    await faceapi.nets.ageGenderNet.loadFromUri('/models');
    await faceapi.nets.faceExpressionNet.loadFromUri('/models');
  
    const videoElement = document.getElementById('webcam');
  
    videoElement.onplaying = async () => {
      setInterval(async () => {
        const detections = await faceapi.detectAllFaces(videoElement).withFaceExpressions();
        if (detections.length > 0) {
          const emotions = detections[0].expressions;
          updateEmotionMeter(emotions);
        }
      }, 100);
    };
  }
  
  function updateEmotionMeter(emotions) {
    // The emotion with the highest value
    const dominantEmotion = Object.entries(emotions).reduce((max, curr) => {
      return curr[1] > max[1] ? curr : max;
    });
  
    const emotionLevel = dominantEmotion[1] * 100; // scale to 100%
    const emotionMeter = document.getElementById('emotion-level');
    emotionMeter.style.width = `${emotionLevel}%`;
  
    // Log emotion to console (for debugging)
    console.log(`Dominant Emotion: ${dominantEmotion[0]} - ${dominantEmotion[1]}`);
  }
  
  setupWebcam().then(() => {
    detectEmotion();
  });
  