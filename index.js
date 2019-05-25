const $api = require('discord.js')
const $bot = new $api.Client()
let std = ''

$bot.login(process.env.Token)

$bot.on('ready', () => {
  $bot.user.setActivity('JavaScript Codes', { type: 'WATCHING'})
})

$bot.on('message', ($msg) => {
  if ($msg.author.id === $bot.user.id) return

  console.log('Message Detectied')
  if ($msg.content.includes('```js')) {
    console.log('Run Script...\n')
    let $script = $msg.content.split('```js')[1].split('```')[0]
    if ($script.includes('$api') || $script.includes('$bot') || $script.includes('$msg') || $script.includes('$th') || $script.includes('process') || $script.includes('require(') || $script.includes('import')) {
      $msg.channel.send('Code Runner | Error: Script cannot include Enviroment & Module Things   ex) $api, $bot, $msg, $th, process, require(), import')
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
  } else {
    console.log('Ignore...\n')
  }
})

function stdLn (message) {
  std += 'log: ' + message + '\n'
}