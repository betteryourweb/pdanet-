import { networkInterfaces } from 'os'
import { log } from 'util'
import { timer, from } from 'rxjs'
import Proxy from './Proxy'

import Nettils from './Nettils'
import { readFileSync, writeFileSync } from 'fs'

const net = new Nettils()

export class PDANet {
  constructor (opts = {
    timeout: 10000
  }) {    
    this.proxyHost = '192.168.49.1'
    this.proxyPort = 8000
    this.proxyFile = process.env.HOME + '/.bash_proxy'
    this.timeout = opts.timeout || '10000'
    this.startDelay = opts.startDelay || '1000'
    this.subscriptions = {}
    this.service = 0
    this.proxy = null
  }
  async init () {
    log(`Initializing PDANet+ Proxy service`)
  }
  checkIP () {
    log(
      this.getIfaces()
    )
  }
  getIfaces () {
    return Object.keys(networkInterfaces())
      .filter(x => x !== 'lo')
      .map(iface => ({
        iface,
        info: networkInterfaces()[iface]
      }))
  }
  async start () {
    log(`Starting PDANet+ proxy service`)
    this.subscriptions.start = this.watcher$().subscribe(x => {
      log('service:',  this.service)
      if (!this.isProxied()) {
        let proxyFile = readFileSync(this.proxyFile).toString()
        if (proxyFile.trim() !== '') writeFileSync(this.proxyFile, '')
        this.service = 0
        return log(`Not proxied`)
      }
      if (this.service === 1) return 
      this.service = 1
      log(`Setting Proxy`)
      from(this.setProxy())
        .subscribe(_x => {
          from(net.localFwd('127.0.0.1', 1080, '192.168.49.1', 8000))
            .subscribe(x => log('Setting forward', {pid: x.pid}))
        })
    })
  }
  async stop () {
    log(`Stopping PDANet+ proxy service`)
    this.subscriptions.start.unsubscribe()
    
    if (this.proxy) {
      this.proxy.unsetProxy()
      delete this.proxy
      this.proxy = null
    }
  }
  async restart (timeout = 500) {
    log(`Restarting PDANet+ proxy service`)
    this.stop()
    setTimeout(() => this.start(), timeout)
  }

  watcher$ () {
    return timer(this.startDelay, this.timeout)
  }

  isProxied () {
    let _is = false
    log(`Checking if proxied`)
    _is = !!this.getIfaces().map(iface => {
        let _homed = iface.info.filter(x => x.family === 'IPv4')
        if (_homed.length === 1) return _homed
      }).length

      return _is
  }
  async setProxy() {
    if (!this.proxy) this.proxy = new Proxy(`192.168.49.1`, 8000)
    return await this.proxy.setProxy()
  }
}

export default PDANet
