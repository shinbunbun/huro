# huro
moddableフォルダがESP32側のソースコード、ws_serverフォルダがwsサーバのソースコード、bot_serverがLINEBotを動かしているサーバのソースコードです。

botのコードは動かす際に必要なモジュールがあります(axios, @line/bot-sdk)。各自インストールしてください。
また、BotはLambda用のコードになっています。
使用する際は「ACCESSTOKEN」という名前の環境変数にbotのtokenを登録してください。
