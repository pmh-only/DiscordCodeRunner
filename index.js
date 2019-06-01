const $api = require('discord.js')
const $bot = new $api.Client()
const superagent = require('superagent')
const ip = require('ip')
const ping = require('ping')
let std = ''

$bot.login(process.env.Token)

$bot.on('ready', () => {
  $bot.user.setActivity('JavaScript Codes | Dev', { type: 'WATCHING'})
  setInterval(() => {
    if (std.length >= 100) {
      process.exit(1)
    }
  }, 1000)
})

$bot.on('message', ($msg) => {
  if ($msg.author.id === $bot.user.id) return

  console.log('Message Detectied')
  if ($msg.content.includes('```js')) {
    console.log('Run Script...\n')
    let $script = $msg.content.split('```js')[1].split('```')[0]
    if ($script.includes('$api') || $script.includes('$bot') || $script.includes('$msg') || $script.includes('$th') || $script.includes('process') || $script.includes('require(') || $script.includes('import') || $script.includes('eval(')) {
      $msg.channel.send('Code Runner | Error: Script cannot include Enviroment & Module Things   ex) $api, $bot, $msg, $th, process, require(), import, eval(')
    } else {
      std = ''
      $script = $script.split('console.log(').join('stdLn(')
      console.log('Script: ' + $script + '\n')
      $msg.channel.send('Code Runner | Running...\n-------------').then(($th) => {
        try {
          eval($script)
        } catch (e) {
          $msg.channel.send('Error: ' + e.message)
        }
        if (std) { $msg.channel.send(std) }
        $th.edit('Code Runner | Finished\n-------------')
        $msg.channel.send('-------------')
      })
    }
  } else if ($msg.content.startsWith('http://') || $msg.content.startsWith('https://')) {
    superagent.get($msg.content).then((res) => {
      $msg.channel.send($msg.content + ' is Up')
    }).catch((err) => {
      $msg.channel.send($msg.content + ' is Down')
    })
  } else if (ip.isV4Format($msg.content)) {
    ping.sys.probe($msg.content, (isUp) => {
      if (isUp) $msg.channel.send($msg.content + ' is Up')
      else $msg.channel.send($msg.content + ' is Down')
    })
  } else {
    console.log('Ignore...\n')
  }
})

function stdLn (message) {
  std += 'log: ' + message + '\n'
}
