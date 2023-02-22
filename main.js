document.addEventListener('DOMContentLoaded', function () {

    var btnSpeeds = document.querySelectorAll('.btn-speed');
    btnSpeeds.forEach((btn, key, all) => {
        btn.addEventListener('click', async function () {
            all.forEach((all_btn) => { 
                all_btn.classList.remove('active');
            });
            const tabId = await getTabId();
            chrome.scripting.executeScript({
                target: { tabId: tabId },
                func: setVideoSpeed,
                args: [btn.textContent]
            })
            btn.classList.add('active');
        }, false);
    })

    var customSpeed = document.querySelector('#btn-custom-speed');
    customSpeed.addEventListener('click', async function () {
        const tabId = await getTabId();
        var speed = document.querySelector('#custom-speed-input').value
        chrome.scripting.executeScript({
            target: { tabId: tabId },
            func: setVideoSpeed,
            args: [speed]
        })
    })

}, false);



async function getTabId() {
    const tabs = await chrome.tabs.query({ active: true, currentWindow: true });
    return (tabs.length > 0) ? tabs[0].id : null;
}


function setVideoSpeed(multiplier) {
    try {
        console.log("setting video speed to " + multiplier)
        document.querySelector('video').playbackRate = multiplier;
        console.log("video speed set to " + multiplier)
    } catch (error) {
        alert("it seems that I can't find the video source. Please make sure you are on a video page. If you think this is a bug, please report it to bugreportde@lurifos.dev")
    }
    
}
