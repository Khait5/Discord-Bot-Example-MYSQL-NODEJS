
require('dotenv').config(); //initialize dotenv

const { Client, Intents } = require('discord.js');

const client = new Client({ intents: [Intents.FLAGS.GUILDS, Intents.FLAGS.GUILD_MESSAGES] });

var mysql = require('mysql');


var con = mysql.createConnection({ //Mysql Connection
  host: process.env.host,
  user: process.env.user,
  password: process.env.pass,
  database: process.env.db
});


con.connect(function(err) { //Mysql Connected Working or not
  if (err) throw err;
  console.log("Connected!");
});


setInterval(function () { //Loop to prevent mysql server disconnections, delete this if your server doesnt do that
    con.query('SELECT 1');
}, 5000);





client.on('ready', () => { //When bot ready info
  console.log(`Logged in as ${client.user.tag}!`);
  client.user.setActivity("!help", {
  type: "PLAYING"
});
});



const prefix = "!"; //bot prefix commands
client.on('messageCreate', message => { //When message received
    if (message.author.bot) return;
    if (!message.content.startsWith(prefix)) return;

    const commandBody = message.content.slice(prefix.length); //Body of the command
    const args = commandBody.split(' '); //Just arguments 
    const command = args.shift().toLowerCase(); //Just command

    
    if (command === "hello") {  //!hello
        message.reply(`Hello! Welcome to X server!`);
    } 
  if (command === "help") {
        message.reply(`-!hello: Welcome command.

-!help: Basic knowledge of commands.

-!user_create (Desired User): create user if you are not on database.

-!user_check: check if you are registered on database.

-!user_code: Get your account code on private message for linking in the future in the case you change your discord tag.

-!user_relink (Your Code): Link your account again after changing discord user or tag using your user code.`);
    } 


    if (command === "user_relink") { //!user_relink (Your Code)
      if(args[0]){
              con.query('SELECT * FROM discord_users WHERE userToken=?', [args[0]], (err,rows) => {
  if(err) throw err;
        if(rows[0]){

          con.query('UPDATE discord_users SET discord_tag=? WHERE userToken=?', [message.member.user.tag, args[0]], (err,rows) => {
  if(err) {
    throw err;
  }else{
    message.reply('Your account has been successfully updated with your new discord tag.');
  }
        
      });
          
        }else{
          message.reply('That token doesnt exist on the database');
        }

    });
      }else{
        message.reply('Correct Syntax: !user_relink YourCode');
      }

  }
  
  
    if (command === "user_check") { //!user_check
      con.query('SELECT * FROM discord_users WHERE discord_tag=?', [message.member.user.tag], (err,rows) => {
  if(err) throw err;
        if(rows[0]){
          message.reply('You are registered as '+rows[0].user);
        }else{
          message.reply('You are not registered. !user_create');
        }

    });
  }

      if (command === "user_code") { //!user_code
      con.query('SELECT * FROM discord_users WHERE discord_tag=?', [message.member.user.tag], (err,rows) => {
  if(err) throw err;
        if(rows[0]){
          message.author.send('Hello '+rows[0].user+'. Your token is '+rows[0].userToken)
        }else{
          message.reply('You are not registered. !user_create');
        }

    });
  }


    if (command === "user_create") { //!user_create user_name
      if(args[0]){
              con.query('SELECT * FROM discord_users WHERE discord_tag=?', [message.member.user.tag], (err,rows) => {
  if(err) throw err;
        if(rows[0]){
          message.reply('You are registered already as '+rows[0].user);
        }else{
          
con.query('SELECT * FROM discord_users WHERE user=?', [args[0]], (err,rows) => {
  if(err) throw err;
        if(rows[0]){
          message.reply(args[0]+' is already being used by another user.');
        }else{

          
con.query('INSERT INTO discord_users (user, discord_tag, userToken) VALUES (?,?,?)', [args[0], message.member.user.tag, (Math.random() + 1).toString(36).substring(2)], (err,rows) => {
            if(err) throw err;
                console.log('User '+args[0]+' created at database for '+message.member.user.tag);
                message.reply('Register success as '+args[0]);
              });

          
        }
      });
    }
    });
      }else{
        message.reply('Correct Syntax: !user_create DesiredUser');
      }

      
  }
  
});




  

//make sure this line is the last line
client.login(process.env.CLIENT_TOKEN); //login bot using token
