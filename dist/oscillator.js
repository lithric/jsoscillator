function sound() {
    const context = new AudioContext();
    const oscillator = context.createOscillator();
    oscillator.connect(context.destination);
    oscillator.start();
    setTimeout(() => {
       oscillator.stop() 
    }, 1000);
}

const timer = {
    start(label="default",title) {
        if (!title) {
            timer[label] = [];
            timer[label].performance = performance.now();
        }
        else {
            timer[label][title] = performance.now();
        }
    },
    stop(label="default",title) {
        if (title) {
            let time = performance.now()-timer[label][title];
            let ms = time.toFixed(3);
            let opi = (10/time).toFixed(2);
            timer[label].push([title,{ms,opi}]);
        }
        else {
            let time = performance.now()-timer[label].performance;
            let ms = time.toFixed(3);
            let opi = (10/time).toFixed(2);
            for (let [title,stats] of timer[label]) {
                console.debug(`${title}: ${stats.ms}ms ${stats.opi}opi`);
            }
            console.debug(`${label}: ${ms}ms ${opi}opi - timer ended`);
            delete timer[label];
        }
    }
}