Installed with NPM. (NODEJS)\n
\n
System Enviroments variables:\n
CLIENT_TOKEN: Discord bot's Client_Token .\n
DB: Mysql Database name.\n
HOST: Mysql Host. IP or Domain.\n
User: Mysql Login User\n
Pass: Mysql Login Password\n
\n
You don't need to add SE variables, just change all of them in code like this:\n
    BEFORE                                AFTER\n
process.env.host           ->         'mysqlhost.com'\n
process.env.user           ->         'mysqluser'\n
process.env.user           ->         'mysqluser'\n
process.env.pass           ->         'mysqlpassword'\n
process.env.db             ->         'mysqldatabasename'\n
process.env.CLIENT_TOKEN   ->         'CLIENT_TOKEN'\n

Bot Functionalities:\n
-!hello: Welcome command. \n
-!help: Basic knowledge of commands.\n
-!user_create (Desired User): create user if you are not on database.\n
-!user_check: check if you are registered on database.\n
-!user_code: Get your account code on private message for linking in the future in the case you change your discord tag.\n
-!user_relink (Your Code): Link your account again after changing discord user or tag using your user code.\n

SQL:\n
CREATE TABLE discord_users (\n
id int(10) PRIMARY KEY AUTO_INCREMENT,\n
user varchar(30),\n
discord_tag varchar(30),\n
userToken varchar(30)\n
);\n