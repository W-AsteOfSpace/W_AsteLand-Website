let synth = window.speechSynthesis;
        let utterance;
        function speakText() {
            synth.cancel();
            let getText = document.getElementById('speakthis').textContent;
            utterance = new SpeechSynthesisUtterance(getText);
            utterance.lang = 'en-NZ';
            utterance.pitch = 1;
            utterance.rate = 1;
            utterance.volume = 1;
            synth.speak(utterance);
        }