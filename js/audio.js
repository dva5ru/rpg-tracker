const SoundManager = (function() {
    let audioCtx = null;
    let musicInterval = null;
    let currentMusicType = null;
    let sfxEnabled = true;
    let musicEnabled = true;
    
    function initAudio() {
        if (!audioCtx && (window.AudioContext || window.webkitAudioContext)) {
            audioCtx = new (window.AudioContext || window.webkitAudioContext)();
            if (audioCtx.state === 'suspended') {
                audioCtx.resume();
            }
        }
    }
    
    function playTone(frequency, duration, type = 'sine', volume = 0.2) {
        if (!sfxEnabled) return;
        initAudio();
        if (!audioCtx) return;
        const now = audioCtx.currentTime;
        const osc = audioCtx.createOscillator();
        const gain = audioCtx.createGain();
        osc.type = type;
        osc.frequency.value = frequency;
        gain.gain.value = volume;
        gain.gain.exponentialRampToValueAtTime(0.0001, now + duration);
        osc.connect(gain);
        gain.connect(audioCtx.destination);
        osc.start();
        osc.stop(now + duration);
    }
    
    function click() { playTone(800, 0.08, 'sine', 0.1); }
    function victory() {
        playTone(523.25, 0.2, 'sine', 0.2);
        setTimeout(() => playTone(659.25, 0.2, 'sine', 0.2), 150);
        setTimeout(() => playTone(783.99, 0.3, 'sine', 0.2), 300);
    }
    function defeat() {
        playTone(440, 0.3, 'sawtooth', 0.2);
        setTimeout(() => playTone(349.23, 0.5, 'sawtooth', 0.2), 250);
    }
    function chest() {
        playTone(659.25, 0.1, 'square', 0.15);
        setTimeout(() => playTone(783.99, 0.15, 'square', 0.15), 100);
        setTimeout(() => playTone(987.77, 0.2, 'square', 0.15), 250);
    }
    function levelUp() {
        playTone(523.25, 0.2, 'sine', 0.2);
        setTimeout(() => playTone(659.25, 0.2, 'sine', 0.2), 150);
        setTimeout(() => playTone(783.99, 0.3, 'sine', 0.2), 300);
        setTimeout(() => playTone(1046.5, 0.4, 'sine', 0.2), 450);
    }
    function questComplete() {
        playTone(523.25, 0.1, 'triangle', 0.15);
        setTimeout(() => playTone(659.25, 0.15, 'triangle', 0.15), 100);
    }
    function buy() {
        playTone(600, 0.1, 'sine', 0.1);
        setTimeout(() => playTone(800, 0.1, 'sine', 0.1), 80);
    }
    function merge() {
        playTone(440, 0.2, 'sawtooth', 0.15);
        setTimeout(() => playTone(880, 0.3, 'sawtooth', 0.15), 150);
    }
    function equip() { playTone(600, 0.1, 'sine', 0.12); }
    function heal() {
        playTone(523.25, 0.3, 'sine', 0.12);
        setTimeout(() => playTone(659.25, 0.4, 'sine', 0.12), 200);
    }
    function modal() { playTone(400, 0.05, 'sine', 0.08); }
    
    function stopMusic() {
        if (musicInterval) {
            clearInterval(musicInterval);
            musicInterval = null;
        }
        currentMusicType = null;
    }
    
    function startMusic(type) {
        if (!musicEnabled) return;
        if (currentMusicType === type && musicInterval) return;
        stopMusic();
        currentMusicType = type;
        let notes = [];
        if (type === 'menu') {
            notes = [261.63, 329.63, 392.00, 523.25, 392.00, 329.63, 261.63];
        } else if (type === 'battle') {
            notes = [440.00, 523.25, 587.33, 698.46, 587.33, 523.25, 440.00];
        } else { return; }
        
        let noteIndex = 0;
        musicInterval = setInterval(() => {
            if (!musicEnabled || !audioCtx) return;
            const now = audioCtx.currentTime;
            const osc = audioCtx.createOscillator();
            const gain = audioCtx.createGain();
            osc.type = 'sine';
            osc.frequency.value = notes[noteIndex];
            gain.gain.value = 0.05;
            gain.gain.exponentialRampToValueAtTime(0.0001, now + 0.5);
            osc.connect(gain);
            gain.connect(audioCtx.destination);
            osc.start();
            osc.stop(now + 0.5);
            noteIndex = (noteIndex + 1) % notes.length;
        }, 600);
    }
    
    function setSfxEnabled(enabled) {
        sfxEnabled = enabled;
        localStorage.setItem('rpg_sfx_enabled', enabled);
    }
    
    function setMusicEnabled(enabled) {
        musicEnabled = enabled;
        localStorage.setItem('rpg_music_enabled', enabled);
        if (!enabled) { stopMusic(); } 
        else {
            const battleModal = document.getElementById('modal-battle');
            if (battleModal && battleModal.style.display === 'flex') startMusic('battle');
            else startMusic('menu');
        }
    }

    function loadSettings() {
        const sfx = localStorage.getItem('rpg_sfx_enabled');
        if (sfx !== null) sfxEnabled = sfx === 'true';
        const music = localStorage.getItem('rpg_music_enabled');
        if (music !== null) musicEnabled = music === 'true';
        if (musicEnabled) {
            const activateMusic = () => {
                initAudio();
                startMusic('menu');
                document.removeEventListener('click', activateMusic);
                document.removeEventListener('touchstart', activateMusic);
            };
            document.addEventListener('click', activateMusic);
            document.addEventListener('touchstart', activateMusic);
        }
    }
    
    return {
        init: initAudio,
        playEffect: function(effect) {
            if (!sfxEnabled) return;
            switch(effect) {
                case 'click': click(); break;
                case 'victory': victory(); break;
                case 'defeat': defeat(); break;
                case 'chest': chest(); break;
                case 'levelup': levelUp(); break;
                case 'quest': questComplete(); break;
                case 'buy': buy(); break;
                case 'merge': merge(); break;
                case 'equip': equip(); break;
                case 'heal': heal(); break;
                case 'modal': modal(); break;
                default: click();
            }
        },
        setSfxEnabled: setSfxEnabled,
        setMusicEnabled: setMusicEnabled,
        getSfxEnabled: () => sfxEnabled,
        getMusicEnabled: () => musicEnabled,
        startMusic: startMusic,
        stopMusic: stopMusic,
        loadSettings: loadSettings,
        toggleSfx: function() {
            const newState = !sfxEnabled;
            this.setSfxEnabled(newState);
            const btn = document.getElementById('sound-toggle');
            if (btn) {
                btn.innerText = newState ? 'ВКЛ' : 'ВЫКЛ';
                btn.classList.toggle('on', newState);
            }
            this.playEffect('click');
        },
        toggleMusic: function() {
            const newState = !musicEnabled;
            this.setMusicEnabled(newState);
            const btn = document.getElementById('music-toggle');
            if (btn) {
                btn.innerText = newState ? 'ВКЛ' : 'ВЫКЛ';
                btn.classList.toggle('on', newState);
            }
            if (newState) this.startMusic('menu');
            else this.stopMusic();
        }
    };
})();

export default SoundManager;
