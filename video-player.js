const containers = document.querySelectorAll("div.ia21-player")
        
containers.forEach(async container => { 
    const btPlayPause = container.querySelector("button.play-pause")
    const video = container.querySelector("video")
    const timeline = container.querySelector(".dragbar.timeline")
    const timelineDrag = timeline.querySelector(".draggable")
    const timer = container.querySelector(".timer")
    const bt = document.querySelector(".button")
    const playlist = container.querySelector(".playlist")
    

    bt.addEventListener("click", () => {
        playlist.classList.toggle("hide")
       })


    btPlayPause.addEventListener("click", () => {
        if (video.paused) {
            video.play()
            btPlayPause.innerHTML = '❚❚'
            return
        }
        
        video.pause()
        btPlayPause.innerText = '😺'
    })
    
     
    // --------------------------------------------------------
    
    video.addEventListener("timeupdate", () => {
        const percent = (video.currentTime / video.duration) * 100
        const offset = (percent / 100) / 2
        timelineDrag.style.setProperty("--percent", `${percent}%`)
        timelineDrag.style.setProperty("--offset", `${offset}rem`)

        
        var segundos = Math.floor(video.currentTime % 60)
        var minutos = Math.floor(video.currentTime / 60)
        var horas = Math.floor(minutos / 60)
        
        timer.innerText = `${horas}:${minutos < 10 ? 0 : ''}${minutos % 60}:${segundos < 10 ? 0 : ''}${segundos}`

    })
    
    // --------------------------------------------------------
    
    const dragbars = container.querySelectorAll(".dragbar")
    
    dragbars.forEach(dragbar => {
        const dragabble = dragbar.querySelector(".draggable")
        
        if (dragbar.classList.contains("volume")) {
            dragabble.style.setProperty("--percent", `100%`)
            dragabble.style.setProperty("--offset", ".5rem")
        }

        dragbar.addEventListener("click", ev => {
            const width = Math.floor(dragbar.getBoundingClientRect().width)
            const index = (ev.offsetX / width)
            const percent =  index * 100 
            
            dragabble.style.setProperty("--percent", `${percent}%`)
            
            if (dragbar.classList.contains("timeline")){
                video.currentTime = video.duration * index
                return
            }
            
            if (dragbar.classList.contains("volume")){
                video.volume = index
                return
            }
            
        })    
    })

    document.addEventListener("keydown", (e) =>{

      if (e.key.toLowerCase() == 'f') {
        console.log("Played Respect")
        if (isVideoFullScreen) {
            document.exitFullscreen()
            isVideoFullscreen = false
              return
        }
          video.webkitRequestFullscrenn()
          isVideoFullscreen = true
      }
 
       if (e.key.toLowerCase() == 'm') {
         if (video.volume == 0) {
            video.volume = volumeAnterior
            return
         }

         volumeAnterior = video.volume
         video.volume = 0
    }

       if (e.code() == 'Space') {
        btPlayPause.click()
     }
    })

    

})