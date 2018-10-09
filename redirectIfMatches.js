(function(hostnames) {
  var redirectIfMatches = {
    init() {
      this.hostnames = hostnames ? hostnames.split('|') : []
      this.currentHostname = window.location.hostname
      this.redirectUrl = 'https://google.com'

      return this
    },

    run() {
      this.hostnames.forEach(hostname => {
        if(new RegExp(hostname).test(this.currentHostname)) {
          window.location = this.redirectUrl
        }
      })
    }
  }

  redirectIfMatches.init().run()

})('javhd|pornhub|xnxx|facebook')
