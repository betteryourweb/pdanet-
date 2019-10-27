import { spawn } from "child_process"
import { log } from "console"
import { randomBytes } from 'crypto';

export function pRun (cmd, opts = {}) {
  if (!cmd || typeof cmd === 'undefined') throw new Error(`No command given...`)
  return new Promise((resolve, reject) => {
    let args = cmd.split(' ')
    cmd = args.shift()

    const prog = spawn(cmd, args, opts)
    let _data = ``
    let _err = ``
    prog.stdout.on('data', data => (_data += data.toString()))
    prog.stderr.on('data', data => (_err += data.toString()))
    prog.stderr.on('error', data => (_err += data.toString()))
    prog.on('close', () => (_err.length) ? reject(_err) : resolve(_data))
  })
}

export function run (cmd, opts = {}) {
  if (!cmd || typeof cmd === 'undefined') throw new Error(`No command given...`)
  let args = cmd.split(' ')
  cmd = args.shift()

  const prog = spawn(cmd, args, opts)
  let _data = ``
  let _err = ``
  prog.stdout.on('data', data => log(data.toString()))
  prog.stderr.on('data', data => log(data.toString()))
  prog.stderr.on('error', data => log(data.toString()))
  prog.on('close', (code) => log(`Exited with code`))
  return prog
}
export async function checkProcess (p) {
  let processes = await pRun(`sudo ps -aux`)
  return processes.split('\n').filter(p => p.includes(`${p}`))
    .map(p => p.split(' ').filter(p => p !== '')[1]).length
}

export async function localFwd(remoteHost, remotePort, localHost = '127.0.0.1', localPort = 21099, monPort=31099) {
  return await pRun(`autossh -M ${monPort} -L ${localHost}:${localPort}:${remoteHost}:${remotePort}`)
}

export async function getOpenPorts () {
  let tmp = (await pRun(`sudo netstat -tulnp`))
  .trim()
    .split('\n')
    .map(x => x.split(' ').filter(_x => _x !== ''))
  tmp.shift()
  tmp.shift()
  
  let result = tmp
    .map(x => {
      // Proto Recv-Q Send-Q Local Address           Foreign Address         State       PID/Program name 
      // log(x)

      let state = (x[5].includes('/')) ? '' : x[5]
      let pidChicks = (state === '') ? x[5].split('/') : x[6].split('/')
      let pid = pidChicks[0]
      let program = pidChicks[1]
      if (typeof x[6] !== 'undefined' && !x[6].includes('/')) program += ` ${x[6]}`
      let _tmp = {
        proto: x[0],
        recv: x[1],
        send: x[2],
        localAddress: x[3],
        foreignAddress: x[4],
        state,
        pid,
        program
      }
      return _tmp
    })
    return result
}

export async function isPortOpen (port) {
  let ports = await getOpenPorts()
  return ports.filter(la => {
    let _chunks = (la.localAddress.split(':'))
    log(_chunks[_chunks.length - 1] === port)
  })
}

export function getRandPort (min = 1025, max = 65665) {
  let port = parseInt(randomBytes(5).toString('hex'))
  if (typeof port !== 'number' || isNaN(port)) return getRandPort(min, max)
  if (port < min || port > max) return getRandPort(min, max)
  return port
}
