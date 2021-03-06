const synth = window.speechSynthesis;
let voices = [];

function speakVoice(words) {
    if (synth.speaking) {
      console.log("speaking");
      return;
    }
    if (words !== '') {
      const utterThis = new SpeechSynthesisUtterance(words);
      utterThis.onend = function (event) {
        console.log('text-to-sppech.onend');
      }
      utterThis.onerror = function (event) {
        console.error('text-to-speech.onerror');
      }
      
      for (let voice of voices)
      {
        if ((voice.lang === 'en-US') && (voice.name === 'Alex'))
        {
          utterThis.voice = voice;
        }
      }

      utterThis.pitch = 1;
      utterThis.rate = 1;
      // console.log(utterThis);
      synth.speak(utterThis);
    }
};

const loadVoices = () => {
    voices = synth.getVoices();
};

// For browsers that use voiceschanged event
speechSynthesis.onvoiceschanged = function(e) {
    // Load the voices into the dropdown
    loadVoices();
    // Don't add more options when voiceschanged again
    // speechSynthesis.onvoiceschanged = null;
}

// speechSynthesis.addEventListener('voiceschanged', speakVoice);

export default {
    speak: (words) => {
        return speakVoice(words);
    }
};