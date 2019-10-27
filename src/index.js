import "core-js/stable";
import "regenerator-runtime/runtime";

import { PDANet } from './lib/PDANet'
import { log } from 'console'

const proxy = new PDANet()

;(async () => {
  await proxy.init()
  await proxy.start()
})()