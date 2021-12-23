function matchMediaQuery(breakPoints, setBreakpoints) {
    for (let key of Object.keys(breakPoints)){
        if(window.matchMedia(`${breakPoints[key]}`).matches){
            setBreakpoints(key)
        }
    }
}
export default function breakPointsObserver(breakPoints, setBreakpoints) {
    matchMediaQuery(breakPoints, setBreakpoints);

    window.addEventListener('resize', () => {
        matchMediaQuery(breakPoints, setBreakpoints);
    })
}