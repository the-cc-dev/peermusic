module.exports = ScrapingServers

// Manage scrapping servers
function ScrapingServers (storage) {
  if (!(this instanceof ScrapingServers)) {
    return new ScrapingServers(storage)
  }

  this.storage = storage
}

// Bind the event handlers and render the initial list
ScrapingServers.prototype.initialize = function () {
  var self = this
  document.querySelector('#addNewScraping').onclick = function () { self.add() }

  this.render()
}

// Get all registered scraping servers
ScrapingServers.prototype.get = function () {
  return this.storage.get('scrapingServers', [])
}

// Render a list of scraping servers
ScrapingServers.prototype.render = function () {
  document.querySelector('#scraping-servers').innerHTML = this.get().map(function (x) {
    var string = '<li>' + x.url
    string += x.description === '' ? '' : ' (' + x.description + ')'
    return string + '</li>'
  }).join('')
}

// Add a new scraping server
ScrapingServers.prototype.add = function () {
  // Rudimentary validation
  var url = document.querySelector('#serverURL').value
  if (url === '' || !url.match(/(https?:\/\/)(([a-zA-ZäöüÄÖÜ\d.-]+)(\/.*)?)/)) {
    window.alert('You need to enter a valid URL')
    return
  }

  // Save new server in storage
  var servers = this.get()
  servers.push({
    url: url,
    description: document.querySelector('#serverDescription').value
  })
  this.storage.set('scrapingServers', servers)

  // Update the view
  document.querySelector('#serverURL').value = ''
  document.querySelector('#serverDescription').value = ''
  this.render()
}