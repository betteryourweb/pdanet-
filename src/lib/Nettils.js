import { pRun, getRandPort } from './utils';
import { log } from 'util';
import { spawn } from 'child_process'
import { openSync } from 'fs';

export class Nettils {
  constructor () {
    this._localFwds = []
  }
  async restartNetwork () {
    await pRun(`sudo systemctl restart networking`)
    await pRun(`sudo systemctl restart NetworkManager`)
  }
  async startNetwork () {
    await pRun(`sudo systemctl start networking`)
    await pRun(`sudo systemctl start NetworkManager`)
  }
  async stopNetwork () {
    await pRun(`sudo systemctl stop networking`)
    await pRun(`sudo systemctl stop NetworkManager`)
  }
  
  async localFwd (localHost, localPort, remoteHost, remotePort, monPort = null, options = ['-f', '-q', '-C', '-Nn']) {
    if (!monPort) monPort = getRandPort(40000, 50000)

    let cmd = `autossh  -M ${monPort} -L  ${localHost}:${localPort}:${remoteHost}:${remotePort}  ${options.join(' ')} localhost`
    let args = cmd.split(' ').filter(x => x.trim() !== '')
    cmd = args.shift()

    return new Promise((resolve, reject) => {
      let _data
      let out = openSync('./out.log', 'a');
      let err = openSync('./out.log', 'a');

      let prog = spawn(cmd, args, {
        detached: true, stdio: [ 'ignore', out, err ] 
      })
      function addData (data, debug = 1) {
        _data += data
        if (debug) log(data)
        return data
      }
      // prog.stdout.on('data', data => addData(data, 1))
      // prog.stderr.on('data', data => addData(data, 1))
      // prog.stderr.on('error', data => addData(data, 1))
      prog.on('close', code => {
        resolve({
          _p: prog,
          _data
        })
      })
      prog.unref()
    })
  }
}

export default Nettils
