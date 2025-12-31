let targetYear = new Date().getFullYear() + 1;
let hasFlipped = false;

function createYearDisplay(year) {
    const yearStr = year.toString();
    const yearDisplay = document.getElementById('yearDisplay');
    yearDisplay.innerHTML = '';
    
    for (let i = 0; i < yearStr.length; i++) {
        const digitContainer = document.createElement('span');
        digitContainer.className = 'year-digit';
        
        const flipContainer = document.createElement('div');
        flipContainer.className = 'flip-container';
        flipContainer.dataset.index = i;
        
        const flipFront = document.createElement('div');
        flipFront.className = 'flip-front';
        flipFront.textContent = yearStr[i];
        
        const flipBack = document.createElement('div');
        flipBack.className = 'flip-back';
        flipBack.textContent = yearStr[i];
        
        flipContainer.appendChild(flipFront);
        flipContainer.appendChild(flipBack);
        digitContainer.appendChild(flipContainer);
        yearDisplay.appendChild(digitContainer);
    }
}

function flipLastDigit() {
    const flipContainers = document.querySelectorAll('.flip-container');
    const lastDigitContainer = flipContainers[flipContainers.length - 1];
    
    if (lastDigitContainer && !hasFlipped) {
        hasFlipped = true;
        
        const targetYearStr = targetYear.toString();
        const newDigit = targetYearStr[targetYearStr.length - 1];
        
        const flipBack = lastDigitContainer.querySelector('.flip-back');
        flipBack.textContent = newDigit; 
        
        lastDigitContainer.classList.add('flipping');
        
        setTimeout(() => {
            const flipFront = lastDigitContainer.querySelector('.flip-front');
            flipFront.textContent = newDigit; 
            lastDigitContainer.classList.remove('flipping');
            lastDigitContainer.style.transform = 'rotateX(-180deg)';
        }, 1200);
    }
}

function updateCountdown() {
    const now = new Date().getTime();
    const currentYear = new Date().getFullYear();
    targetYear = currentYear + 1;
    
    const newYear = new Date(`January 1, ${targetYear} 00:00:00`).getTime();
    const gap = newYear - now;

    if (gap < 0) {
        const messageDiv = document.querySelector('.message');
        if (messageDiv) {
            messageDiv.innerHTML = `<div class="celebration-text">🎊 HAPPY NEW YEAR ${targetYear}! 🎊</div>`;
        }
        startConfettiAnimation();
        
        document.getElementById('days').textContent = '00';
        document.getElementById('hours').textContent = '00';
        document.getElementById('minutes').textContent = '00';
        document.getElementById('seconds').textContent = '00';
        return;
    }

    if (gap <= 3000 && !hasFlipped) {
        flipLastDigit();
    }

    const second = 1000;
    const minute = second * 60;
    const hour = minute * 60;
    const day = hour * 24;

    const days = Math.floor(gap / day);
    const hours = Math.floor((gap % day) / hour);
    const minutes = Math.floor((gap % hour) / minute);
    const seconds = Math.floor((gap % minute) / second);

    document.getElementById('days').textContent = String(days).padStart(2, '0');
    document.getElementById('hours').textContent = String(hours).padStart(2, '0');
    document.getElementById('minutes').textContent = String(minutes).padStart(2, '0');
    document.getElementById('seconds').textContent = String(seconds).padStart(2, '0');

    const secondsEl = document.getElementById('seconds');
    if (seconds !== updateCountdown.lastSecond && secondsEl) {
        secondsEl.classList.add('pulse');
        setTimeout(() => secondsEl.classList.remove('pulse'), 300);
    }
    updateCountdown.lastSecond = seconds;
}

updateCountdown.lastSecond = -1;

function initializeStarField() {
    const starsContainer = document.getElementById('stars');
    if (!starsContainer) return;
    for (let i = 0; i < 100; i++) {
        const star = document.createElement('div');
        star.className = 'star';
        star.style.width = Math.random() * 3 + 'px';
        star.style.height = star.style.width;
        star.style.left = Math.random() * 100 + '%';
        star.style.top = Math.random() * 100 + '%';
        star.style.animationDelay = Math.random() * 3 + 's';
        star.style.animationDuration = (Math.random() * 2 + 2) + 's';
        starsContainer.appendChild(star);
    }
}

function generateSnowflake() {
    const snowflake = document.createElement('div');
    snowflake.className = 'snowflake';
    snowflake.innerHTML = '❄';
    snowflake.style.left = Math.random() * 100 + '%';
    snowflake.style.animationDuration = (Math.random() * 3 + 5) + 's';
    snowflake.style.fontSize = (Math.random() * 1 + 0.5) + 'em';
    snowflake.style.opacity = Math.random() * 0.6 + 0.3;
    document.body.appendChild(snowflake);
    setTimeout(() => snowflake.remove(), 8000);
}

function launchFirework() {
    const colors = ['#ff6b6b', '#ffd93d', '#6bcf7f', '#4d96ff', '#b95eff'];
    const x = Math.random() * window.innerWidth;
    const y = Math.random() * window.innerHeight * 0.7;
    for (let i = 0; i < 30; i++) {
        const particle = document.createElement('div');
        particle.className = 'firework';
        particle.style.left = x + 'px';
        particle.style.top = y + 'px';
        particle.style.background = colors[Math.floor(Math.random() * colors.length)];
        const angle = (Math.PI * 2 * i) / 30;
        const velocity = Math.random() * 100 + 50;
        document.body.appendChild(particle);
        let posX = x; let posY = y;
        let velX = Math.cos(angle) * velocity; let velY = Math.sin(angle) * velocity;
        const animateParticle = () => {
            velY += 2; posX += velX / 10; posY += velY / 10;
            particle.style.left = posX + 'px'; particle.style.top = posY + 'px';
            particle.style.opacity = parseFloat(particle.style.opacity || 1) - 0.02;
            if (parseFloat(particle.style.opacity) > 0) requestAnimationFrame(animateParticle);
            else particle.remove();
        };
        requestAnimationFrame(animateParticle);
    }
}

function initializeFloatingParticles() {
    for (let i = 0; i < 20; i++) {
        const particle = document.createElement('div');
        particle.className = 'particle';
        particle.style.width = Math.random() * 5 + 2 + 'px';
        particle.style.height = particle.style.width;
        particle.style.left = Math.random() * 100 + '%';
        particle.style.top = Math.random() * 100 + '%';
        particle.style.background = `rgba(255, 255, 255, ${Math.random() * 0.3 + 0.1})`;
        particle.style.animation = `float ${Math.random() * 10 + 5}s ease-in-out infinite`;
        particle.style.animationDelay = Math.random() * 5 + 's';
        document.body.appendChild(particle);
    }
}

function startConfettiAnimation() {
    const colors = ['#ff6b6b', '#ffd93d', '#6bcf7f', '#4d96ff', '#b95eff', '#ff9ff3', '#feca57'];
    const confettiInterval = setInterval(() => {
        for (let i = 0; i < 5; i++) {
            const confetti = document.createElement('div');
            confetti.className = 'confetti';
            confetti.style.left = Math.random() * 100 + '%';
            confetti.style.backgroundColor = colors[Math.floor(Math.random() * colors.length)];
            confetti.style.width = (Math.random() * 10 + 5) + 'px';
            confetti.style.height = (Math.random() * 20 + 10) + 'px';
            confetti.style.animationDuration = (Math.random() * 3 + 2) + 's';
            confetti.style.animationDelay = Math.random() + 's';
            document.body.appendChild(confetti);
            setTimeout(() => confetti.remove(), 5000);
        }
    }, 100);
    setTimeout(() => clearInterval(confettiInterval), 30000);
}

function initializeAllAnimations() {
    initializeStarField();
    initializeFloatingParticles();
    setInterval(generateSnowflake, 300);
    setInterval(() => {
        if (Math.random() > 0.7) launchFirework();
    }, 2000);
}

function startCountdownTimer() {
    const currentYear = new Date().getFullYear(); 
    createYearDisplay(currentYear); 
    
    updateCountdown();
    setInterval(updateCountdown, 1000);
} 

if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', () => {
        initializeAllAnimations();
        startCountdownTimer();
    });
} else {
    initializeAllAnimations();
    startCountdownTimer();
}