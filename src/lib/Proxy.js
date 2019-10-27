import { log } from "console"
import { writeFileSync } from "fs"
import { pRun } from './utils';

export class Proxy {
  constructor (host, port, user = false, password) {
    this.host = host || null
    this.port = port || null
    this.user = user || false
    this.password = password || false
    this.uri = ``
    this.proxyFile = process.env.HOME + '/.bash_proxy'
  }

  get hostStr () {
    let userStr = ``
    if (this.user && this.password) userStr = `${this.user}:${this.password}`
    if (this.user && !this.password) userStr = `${this.user}`
    if (userStr) userStr += `@`
    return this.uri = `${userStr}${this.host}:${this.port}`
  }
  get allProxy () { return `socks5://${this.hostStr}`}
  get httpProxy () { return `http://${this.hostStr}`}
  get httpsProxy () { return `http://${this.hostStr}`}
  get ftpProxy () { return `http://${this.hostStr}`}
  
  get noProxy () {
    return '127.0.0.0/8,localhost,' + this.host.split('.')
      .splice(0, 3, /\d/)
      .join('.') + '.0/24'
  }

  async setProxy (host = null, port = null, user = false, password = false) {
    if (!host) {
      if (!this.host) throw new Error('No proxy host selected')
    } else { this.host = host }
    if (!port) {
      if (!this.port) throw new Error('No proxy port selected')
    } else { this.port = port }

    let toWrite = `export HTTP_PROXY=${this.httpProxy}
export HTTPS_PROXY=${this.httpsProxy}
export FTP_PROXY=${this.ftpProxy}
export ALL_PROXY=${this.allProxy}
export NO_PROXY=${this.noProxy}
export http_proxy=${this.httpProxy}
export https_proxy=${this.httpsProxy}
export ftp_proxy=${this.ftpProxy}
export all_proxy=${this.allProxy}
export no_proxy=${this.noProxy}`

    writeFileSync(this.proxyFile, toWrite)
    try {
      await this.npmProxy()
      await this.yarnProxy()
      await this.dockerProxy()
      await this.gitProxy()
    } catch (e) {
      // log({e})
      throw new Error(`Error setting proxy`)
    }
  }
  async unsetProxy () {
    log(`Unsetting proxy`)
    writeFileSync(this.proxyFile, '', {flags: 'w'})
    try {
      await pRun(`git config --global http.proxy ${this.httpProxy}`)
      await pRun(`git config --global https.proxy ${this.httpsProxy}`)
      await pRun(`npm config delete proxy`)
      await pRun(`npm config delete https-proxy`)
      await pRun(`npm config delete http_proxy`)
      await pRun(`npm config delete https_proxy`)
      await pRun(`yarn config delete http-proxy`)
      await pRun(`yarn config delete http_proxy`)
      await pRun(`yarn config delete proxy`)
      await pRun(`yarn config delete https-proxy`)
      await pRun(`yarn config delete https_proxy`)
     
    } catch (e) {
      throw new Error(``)
    }
  }
  async gitProxy () {
    log(`Setting proxy from git`)
    try {
      await pRun(`git config --global http.proxy ${this.httpProxy}`)
      await pRun(`git config --global https.proxy ${this.httpsProxy}`)

    } catch (e) {
      throw new Error(`Error setting config`, {e})
    }  
  }
  async npmProxy () {
    log(`Setting proxy from npm`)
    
    try {
      await pRun(`npm config set proxy ${this.httpProxy}`)
      await pRun(`npm config set https-proxy ${this.httpsProxy}`)
      await pRun(`npm config set http_proxy ${this.httpProxy}`)
      await pRun(`npm config set https_proxy ${this.httpsProxy}`)
    } catch (e) {
      throw new Error(`Error setting config ${e}`, {e})
    }  
  }

  async yarnProxy () {
    log(`Setting proxy from yarn`)
    try {
      await pRun(`yarn config set http-proxy ${this.httpProxy}`)
      await pRun(`yarn config set http_proxy ${this.httpProxy}`)
      await pRun(`yarn config set proxy ${this.httpProxy}`)
      await pRun(`yarn config set https-proxy ${this.httpsProxy}`)
      await pRun(`yarn config set https_proxy ${this.httpsProxy}`)
    } catch (e) {
      throw new Error(`Error setting config`, {e})
    }  

  }
  async dockerProxy () {
    log(`Setting proxy from docker`)
    try {

    } catch (e) {
      throw new Error(`Error setting config`, {e})
    }  

  }

}

export default Proxy
