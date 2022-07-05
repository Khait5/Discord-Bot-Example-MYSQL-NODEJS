Installed with NPM. (NODEJS)

System Enviroments variables:
CLIENT_TOKEN: Discord bot's Client_Token .
DB: Mysql Database name.
HOST: Mysql Host. IP or Domain.
User: Mysql Login User
Pass: Mysql Login Password

You don't need to add SE variables, just change all of them in code like this:
    BEFORE                                AFTER
process.env.host           ->         'mysqlhost.com'
process.env.user           ->         'mysqluser'
process.env.user           ->         'mysqluser'
process.env.pass           ->         'mysqlpassword'
process.env.db             ->         'mysqldatabasename'
process.env.CLIENT_TOKEN   ->         'CLIENT_TOKEN'

Bot Functionalities:
-!hello: Welcome command. 
-!help: Basic knowledge of commands.
-!user_create (Desired User): create user if you are not on database.
-!user_check: check if you are registered on database.
-!user_code: Get your account code on private message for linking in the future in the case you change your discord tag.
-!user_relink (Your Code): Link your account again after changing discord user or tag using your user code.

SQL:
CREATE TABLE discord_users (
id int(10) PRIMARY KEY AUTO_INCREMENT,
user varchar(30),
discord_tag varchar(30),