const setAsActive = indicator => {
    document.querySelector(".carousel-indicators > .active").classList.remove('active')
    indicator.classList.add('active')
}

document.addEventListener("DOMContentLoaded", () => {
    const indicators = document.querySelectorAll(".carousel-indicators > li")
    
    let activeIndicator;
    $('.carousel').on('slide.bs.carousel', (e) => { 
        let indicatorIndex = e.to;
        activeIndicator = indicators.item(indicatorIndex) 
        setAsActive(activeIndicator)})  
    
    indicators.forEach(indicator => {
        indicator.addEventListener("click", () => { setAsActive(indicator) }) 
    })
})
