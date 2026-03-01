// ==UserScript==
// @name         Spotify Web Player Seek Shortcuts (-10s/+10s)
// @namespace    http://tampermonkey.net/
// @version      1.1
// @description  Adds keyboard shortcuts (Left/Right arrows) to seek +/- 10 seconds on Spotify Web Player.
// @author       Charlee Li
// @match        https://open.spotify.com/*
// @downloadURL  https://github.com/charlee/spotify-hotkeys/raw/refs/heads/master/src/index.user.js
// @updateURL    https://github.com/charlee/spotify-hotkeys/raw/refs/heads/master/src/index.user.js
// @grant        none
// ==/UserScript==

(function () {
    'use strict';

    /**
     * Converts a time string (e.g., "1:30" or "2:05:10") into total seconds.
     * Robustly handles hidden characters and non-standard spacing.
     */
    function parseTime(timeStr) {
        if (!timeStr) return 0;
        // Remove everything except digits and colons
        const cleanStr = timeStr.replace(/[^\d:]/g, '').trim();
        const parts = cleanStr.split(':').map(Number);

        if (parts.length === 2) {
            return parts[0] * 60 + parts[1];
        } else if (parts.length === 3) {
            return parts[0] * 3600 + parts[1] * 60 + parts[2];
        }
        return 0;
    }

    /**
     * Seeks playback by a relative number of seconds.
     */
    function seek(seconds) {
        // Try multiple selectors for the progress bar container
        const progressBar = document.querySelector('[data-testid="progress-bar"]') ||
            document.querySelector('[data-testid="playback-progressbar"]');

        const positionEl = document.querySelector('[data-testid="playback-position"]');
        const durationEl = document.querySelector('[data-testid="playback-duration"]');

        if (!progressBar || !positionEl || !durationEl) {
            console.warn("[Spotify Seek] Required elements not found. Are you in the player view?");
            return;
        }

        const currentTime = parseTime(positionEl.innerText);
        const totalTime = parseTime(durationEl.innerText);

        if (totalTime <= 0) return;

        let newTime = currentTime + seconds;
        if (newTime < 0) newTime = 0;
        if (newTime > totalTime) newTime = totalTime;

        const ratio = newTime / totalTime;
        const rect = progressBar.getBoundingClientRect();

        // Calculate the target pixel coordinate
        const x = rect.left + (rect.width * ratio);
        const y = rect.top + (rect.height / 2);

        // Spotify modern UI uses PointerEvents and requires a sequence (down -> up)
        const eventOptions = {
            clientX: x,
            clientY: y,
            bubbles: true,
            cancelable: true,
            view: window,
            buttons: 1,
            pointerId: 1,
            isPrimary: true
        };

        // Dispatch sequence to trigger React state updates
        progressBar.dispatchEvent(new PointerEvent('pointerdown', eventOptions));
        progressBar.dispatchEvent(new PointerEvent('pointerup', eventOptions));

        // Fallback for older versions or specific UI configurations
        progressBar.dispatchEvent(new MouseEvent('mousedown', eventOptions));
        progressBar.dispatchEvent(new MouseEvent('mouseup', eventOptions));
        progressBar.dispatchEvent(new MouseEvent('click', eventOptions));

        console.log(`[Spotify Seek] Seeked from ${currentTime}s to ${newTime}s (${Math.round(ratio * 100)}%)`);
    }

    window.addEventListener('keydown', function (e) {
        const activeElement = document.activeElement;
        const isTyping = activeElement.tagName === 'INPUT' ||
            activeElement.tagName === 'TEXTAREA' ||
            activeElement.isContentEditable ||
            activeElement.getAttribute('role') === 'textbox';

        if (isTyping) return;

        if (e.key === 'ArrowRight') {
            seek(10);
            e.preventDefault();
            e.stopPropagation();
        } else if (e.key === 'ArrowLeft') {
            seek(-10);
            e.preventDefault();
            e.stopPropagation();
        }
    }, true);
})();
