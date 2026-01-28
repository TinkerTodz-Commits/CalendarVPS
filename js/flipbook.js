document.addEventListener('DOMContentLoaded', () => {

    // --- CONFIG ---
    const stack = document.getElementById('calendarStack');
    const images = [
        'calendar_pages/01_jan_feb.png',
        'calendar_pages/02_mar_apr.png',
        'calendar_pages/03_may_june.png',
        'calendar_pages/04_jul_aug.png',
        'calendar_pages/05_sep_oct.png',
        'calendar_pages/06_nov_dec.png'
    ];
    let currentIndex = 0; // The page visible on TOP
    const total = images.length;
    const items = [];

    // --- BUILD STACK ---
    // Clear existing content just in case
    stack.innerHTML = '';

    // We want the FIRST image (Jan) to be on TOP.
    // In DOM, normally last = top.
    // However, we will control Z-INDEX explicitly.
    // Jan (Index 0) -> Z = 100
    // Feb (Index 1) -> Z = 99 ...

    images.forEach((src, idx) => {
        const el = document.createElement('div');
        el.className = 'calendar-page';
        el.style.zIndex = total - idx; // Higher index = Higher Z

        el.innerHTML = `<img src="${src}" alt="Page ${idx + 1}">`;

        stack.appendChild(el);
        items.push(el);
    });

    // --- STATE MANAGEMENT ---

    function updateState() {
        // Update Buttons
        document.getElementById('btnPrev').disabled = (currentIndex === 0);
        document.getElementById('btnNext').disabled = (currentIndex === total - 1);
    }

    function goNext() {
        if (currentIndex < total - 1) {
            // Animate current page AWAY
            // We add 'flipped' which triggers the CSS transform
            items[currentIndex].classList.add('flipped');
            currentIndex++;
            updateState();
        } else {
            // Optional: Bounce effect at end?
            console.log("End of calendar");
        }
    }

    function goPrev() {
        if (currentIndex > 0) {
            // To go back, we need to bring the PREVIOUS page BACK DOWN.
            currentIndex--;
            items[currentIndex].classList.remove('flipped');
            updateState();
        }
    }

    // --- ZOOM LOGIC ---
    let zoomLevel = 1.0;
    const zoomStep = 0.2;

    function applyZoom() {
        // clamp
        if (zoomLevel < 0.5) zoomLevel = 0.5;
        if (zoomLevel > 3.0) zoomLevel = 3.0;

        stack.style.transform = `scale(${zoomLevel})`;
    }

    function zoomIn() { zoomLevel += zoomStep; applyZoom(); }
    function zoomOut() { zoomLevel -= zoomStep; applyZoom(); }
    function zoomReset() { zoomLevel = 1.0; applyZoom(); }

    // --- EVENT BINDING ---

    // Buttons
    document.getElementById('btnPrev').onclick = goPrev;
    document.getElementById('btnNext').onclick = goNext;

    document.getElementById('btnZoomIn').onclick = zoomIn;
    document.getElementById('btnZoomOut').onclick = zoomOut;
    document.getElementById('btnZoomReset').onclick = zoomReset;

    // CLICK INTERACTION
    // Use 'pointerup' or 'click' on the container.
    // Since images are pointer-events:none, clicks fall through to .calendar-page, 
    // but .calendar-page covers the whole screen.
    // So we can listen to the stack or wrapper.

    // NOTE: We only want to flip if they click the PAGE area, not empty space.
    // But since pages are full screen centered, clicking anywhere is fine for fullscreen app.
    document.addEventListener('click', (e) => {
        // Ignore clicks on controls
        if (e.target.closest('.controls-container')) return;

        const screenWidth = window.innerWidth;
        const clickX = e.clientX;

        // Right side (more towards December/Forward)
        if (clickX > screenWidth / 2) {
            goNext();
        }
        // Left side (Previous/Backward)
        else {
            goPrev();
        }
    });

    // Keyboard
    document.addEventListener('keydown', (e) => {
        switch (e.key) {
            case 'ArrowRight':
            case 'ArrowDown':
            case ' ':
                goNext();
                break;
            case 'ArrowLeft':
            case 'ArrowUp':
                goPrev();
                break;
            case '+': zoomIn(); break;
            case '-': zoomOut(); break;
            case '0': zoomReset(); break;
        }
    });

    // Init
    updateState();

    // Remove loader if any
    const loader = document.getElementById('loader');
    if (loader) loader.style.display = 'none';
});
