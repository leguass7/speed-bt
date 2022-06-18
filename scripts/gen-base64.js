/* eslint-disable @typescript-eslint/no-var-requires */
const fs = require('fs')
const path = require('path')

const inDir = path.resolve('docs', 'cert')
const outDir = path.resolve('docs', 'cert')

function loadCert(filename = '') {
  const certPath = path.resolve(inDir, filename)
  if (fs.existsSync(certPath)) {
    try {
      const data = fs.readFileSync(certPath, { encoding: 'base64' })
      return data
    } catch {
      return null
    }
  }
  return null
}

function saveFile(filename, base64) {
  try {
    const outJson = path.resolve(outDir, `${filename}.json`)

    fs.writeFileSync(outJson, JSON.stringify({ base64 }, null, 2), { encoding: 'utf-8' })
    fs.writeFileSync(path.resolve(outDir, filename), base64, { encoding: 'utf-8' })

    return true
  } catch {
    return false
  }
}

async function start() {
  // const base64 = loadCert('homologacao-290881-h-speed-bt.p12')
  // saveFile('cert-base64', base64)
  const base64 = loadCert('producao-290881-speed-bt.p12')
  saveFile('cert-base64-prod', base64)
}

start()
