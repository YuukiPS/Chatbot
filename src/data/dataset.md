# Dataset

This dataset is designed to improve AI responses about Private Servers. It also includes a command list for GIO and GC.

## Command

| Command                   | Description                                                                                                                      | Usage                                                                                            | Server |
| ------------------------- | -------------------------------------------------------------------------------------------------------------------------------- | ------------------------------------------------------------------------------------------------ | ------ |
| `/give`                   | Gives a specified avatars to the player                                                                                          | `/give <avatars id> lv<level character> sl<skill level character> c<constellation>`              | GC     |
| `/give`                   | Gives a weapon to the player                                                                                                     | `/give <weapon id> lv<level weapon> r<refinement> x<amount>`                                     | GC     |
| `/give`                   | Gives a specified item to the player                                                                                             | `/give <item id> x<amount>`                                                                      | GC     |
| `/give`                   | Gives a specified artifact to the player                                                                                         | `/give <artifact id> lv<level artifact> x<amount>`                                               | GC     |
| `/give av`                | Gives all avatars to the player                                                                                                  | `/give av lv<level> c<constellation> sl<skill level>`                                            | GC     |
| `/give af`                | Gives all artifacts to the player                                                                                                | `/give af lv<level> x<amount>`                                                                   | GC     |
| `/give mats`              | Gives all materials to the player                                                                                                | `/give mats x<amount>`                                                                           | GC     |
| `/give wp`                | Gives all weapons to the player                                                                                                  | `/give wp lv<level> r<refinement> x<amount>`                                                     | GC     |
| `/give hs`                | Gives all teapot items to the player                                                                                             | `/give hs`                                                                                       | GC     |
| `/spawn`                  | Spawns a specified monster in the game                                                                                           | `/spawn <monster id> lv<level monster> hp<health point/0=unlimited health> x<amount of monster>` | GC     |
| `/spawn`                  | Spawns a specified weapon                                                                                                        | `/spawn <weapon id> lv<level weapon> r<refinement> x<amount>`                                    | GC     |
| `/heal`                   | Heals the player's active character                                                                                              | `/heal`                                                                                          | GC     |
| `/q add`                  | Adds a specified quest to the player's quest log                                                                                 | `/q add <quest id>`                                                                              | GC     |
| `/q remove`               | Removes a specified quest from the player's quest log                                                                            | `/q remove <quest id>`                                                                           | GC     |
| `/q skip`                 | Skips a specified quest in the player's quest log                                                                                | `/q skip`                                                                                        | GC     |
| `/q removeall`            | Removes all quests from the player's quest log                                                                                   | `/q removeall`                                                                                   | GC     |
| `/killall`                | Kills all monsters currently in the game                                                                                         | `/killall`                                                                                       | GC     |
| `/kill`                   | Kills the player's active character                                                                                              | `/kill`                                                                                          | GC     |
| `/stats freeze cdr 0`     | Freezes the cooldown timer for the player's abilities                                                                            | `/stats freeze cdr 0`                                                                            | GC     |
| `/prop ns 1`              | Sets the player's stamina to unlimited                                                                                           | `/prop ns 1 or /prop ns 0 (disable)`                                                             | GC     |
| `/prop ue 1`              | Sets the player's energy to unlimited                                                                                            | `/prop ue 1 or /prop ue 0 (disable)`                                                             | GC     |
| `/prop god 1`             | Sets the player's character to god mode (no damage taken)                                                                        | `/prop god 1 or /prop god 0 (disable)`                                                           | GC     |
| `/prop player_level`      | Sets the player's level to a specified level                                                                                     | `/prop player_level <level>`                                                                     | GC     |
| `/prop unlockhome on`     | Unlock the teapot                                                                                                                | `/prop unlockhome on`                                                                            | GC     |
| `/prop abyss`             | Change or level up the spiral abyss                                                                                              | `/prop abyss <level>`                                                                            | GC     |
| `/prop lv`                | Change current or active character level                                                                                         | `/prop lv <level>`                                                                               | GC     |
| `/prop stlv`              | Change all character level on the team or party                                                                                  | `/prop stlv <level>`                                                                             | GC     |
| `/prop salv`              | Change all character level you have                                                                                              | `/prop salv <level>`                                                                             | GC     |
| `/prop se hydro`          | Change or switch traveler element to hydro                                                                                       | `/prop se hydro`                                                                                 | GC     |
| `/prop se grass`          | Change or switch traveler element to grass                                                                                       | `/prop se grass`                                                                                 | GC     |
| `/prop se electro`        | Change or switch traveler element to electro                                                                                     | `/prop se electro`                                                                               | GC     |
| `/prop se wind`           | Change or switch traveler element to wind                                                                                        | `/prop se wind`                                                                                  | GC     |
| `/prop se white`          | Change or switch traveler element to no element                                                                                  | `/prop se white`                                                                                 | GC     |
| `/setconst`               | Sets the player's constellation to a specified constellation                                                                     | `/setconst <constellation>`                                                                      | GC     |
| `/weather sunny`          | Sets the game's weather to sunny                                                                                                 | `/weather sunny`                                                                                 | GC     |
| `/weather rain`           | Sets the game's weather to rain                                                                                                  | `/weather rain`                                                                                  | GC     |
| `/weather cloudy`         | Sets the game's weather to cloudy                                                                                                | `/weather cloudy`                                                                                | GC     |
| `/weather thunderstorm`   | Sets the game's weather to thunderstorm                                                                                          | `/weather thunderstorm`                                                                          | GC     |
| `/weather snow`           | Sets the game's weather to snow                                                                                                  | `/weather snow`                                                                                  | GC     |
| `/weather mist`           | Sets the game's weather to mist                                                                                                  | `/weather mist`                                                                                  | GC     |
| `/talent n`               | Change normal attack talent                                                                                                      | `/talent n <level>`                                                                              | GC     |
| `/talent q`               | Change element burst talent                                                                                                      | `/talent q <level>`                                                                              | GC     |
| `/talent e`               | Change element skill talent                                                                                                      | `/talent e <level>`                                                                              | GC     |
| `/talent all`             | Change all talent                                                                                                                | `/talent all <level>`                                                                            | GC     |
| `/team add`               | Adds a specified character to the player's team                                                                                  | `/team add <character id>`                                                                       | GC     |
| `/team remove`            | Removes a specified character from the player's team                                                                             | `/team remove <character id>`                                                                    | GC     |
| `/resetconst`             | Resets active character constellation                                                                                            | `/resetconst`                                                                                    | GC     |
| `/resetconst all`         | Resets all character constellations                                                                                              | `/resetconst all`                                                                                | GC     |
| `monster`                 | Spawns a specified monster in the game                                                                                           | `monster <id>`                                                                                   | GIO    |
| `kill monster all`        | Kills all monsters currently in the game                                                                                         | `kill monster all`                                                                               | GIO    |
| `stamina infinite on`     | Sets the player's stamina to unlimited or no stamina                                                                             | `stamina infinite on`                                                                            | GIO    |
| `stamina infinite off`    | Disables the unlimited stamina setting                                                                                           | `stamina infinite off`                                                                           | GIO    |
| `energy infinite on`      | Sets the player's energy to unlimited                                                                                            | `energy infinite on`                                                                             | GIO    |
| `energy infinite off`     | Disables the unlimited energy setting                                                                                            | `energy infinite off`                                                                            | GIO    |
| `quest accept`            | Adds a specified quest to the player's quest log                                                                                 | `quest accept <quest id>`                                                                        | GIO    |
| `quest remove`            | Removes a specified quest from the player's quest log                                                                            | `quest remove <quest id>`                                                                        | GIO    |
| `quest add`               | Adds a specified quest to the player's quest log                                                                                 | `quest add <quest id>`                                                                           | GIO    |
| `quest finish`            | Completes a specified quest in the player's quest log                                                                            | `quest finish <quest id>`                                                                        | GIO    |
| `mcoin`                   | Gives the player a specified amount of Genesis Crystals                                                                          | `mcoin <amount>`                                                                                 | GIO    |
| `scoin`                   | Gives the player a specified amount of Mora                                                                                      | `scoin <amount>`                                                                                 | GIO    |
| `hcoin`                   | Gives the player a specified amount of Primogems                                                                                 | `hcoin <amount>`                                                                                 | GIO    |
| `home_coin`               | Gives the player a specified amount of Real Currency                                                                             | `home_coin <amount>`                                                                             | GIO    |
| `player level`            | Sets the player's level to a specified level                                                                                     | `player level <level>`                                                                           | GIO    |
| `avatar add`              | Adds a specified avatar to the player's collection                                                                               | `avatar add <character id>`                                                                      | GIO    |
| `wudi global avatar on`   | Sets the player's avatar to god mode (no damage taken)                                                                           | `wudi global avatar on`                                                                          | GIO    |
| `wudi global avatar off`  | Disables god mode for the player's avatar                                                                                        | `wudi global avatar off`                                                                         | GIO    |
| `wudi global monster on`  | Sets all monsters to god mode (no damage taken)                                                                                  | `wudi global monster on`                                                                         | GIO    |
| `wudi global monster off` | Disables god mode for all monsters                                                                                               | `wudi global monster off`                                                                        | GIO    |
| `item add`                | Adds a specified item to the player's inventory                                                                                  | `item add <item id> <amount>`                                                                    | GIO    |
| `talent unlock`           | Unlocks a specified talent for the player                                                                                        | `talent unlock [1-6]`                                                                            | GIO    |
| `talent unlock all`       | Unlocks all talents for the player                                                                                               | `talent unlock all`                                                                              | GIO    |
| `point 3 all`             | Unlocks all teleport points                                                                                                      | `point 3 all`                                                                                    | GIO    |
| `item clear`              | Removes a specified item from the player's inventory                                                                             | `item clear <id> <amount>`                                                                       | GIO    |
| `level`                   | Set active/current character to a specified level                                                                                | `level <level>`                                                                                  | GIO    |
| `jump`                    | Teleports the player to a specified scene                                                                                        | `jump <scene id>`                                                                                | GIO    |
| `goto`                    | Teleports the player to specific coordinates in the game world                                                                   | `goto <x> <y> <z>`                                                                               | GIO    |
| `dungeon`                 | Teleports the player to a specific dungeon using its ID                                                                          | `dungeon <dungeon id>`                                                                           | GIO    |
| `equip add`               | Equips a specific weapon to the active character, with specified level, ascension level, and refinement level                    | `equip add <weapon id> <level> <ascension level> [1-6] <refinement level> [1-5]`                 | GIO    |
| `skill 1`                 | Changes the level normal attack talent of the active character                                                                   | `skill 1 <level [1-10]>`                                                                         | GIO    |
| `skill 2`                 | Changes the level element skill talent of the active character                                                                   | `skill 2 <level [1-10]>`                                                                         | GIO    |
| `skill 3`                 | Changes the level element burst talent of the active character                                                                   | `skill 3 <level [1-10]>`                                                                         | GIO    |
| `skill all`               | Changes the level of all talents of the active character                                                                         | `skill all <level [1-10]>`                                                                       | GIO    |
| `weapon level`            | Changes the level of the active character's equipped weapon                                                                      | `weapon level <level>`                                                                           | GIO    |
| `weapon break`            | Changes the ascension level of the active character's equipped weapon                                                            | `weapon break <level>`                                                                           | GIO    |
| `weapon refine`           | Changes the refinement level of the active character's equipped weapon                                                           | `weapon refine <level>`                                                                          | GIO    |
| `/setlevel`               | The setlevel command allows you to set your current trailblaze level.                                                            | `/setlevel [level]`                                                                              | LC     |
| `/give`                   | The give command allows you to give yourself any item in the game.                                                               | `/give [item id] x(amount) lv(level) r(rank) p(promotion)`                                       | LC     |
| `/heal`                   | The heal command will heal your current avatars.                                                                                 | `/heal`                                                                                          | LC     |
| `/refill`                 | The refill command will refill your skill points in the open world.                                                              | `/refill`                                                                                        | LC     |
| `/scene`                  | The scene command will teleport you to the specified scene. Going to bad scenes can break your account, so be careful.           | `/scene [scene id] [floor id]`                                                                   | LC     |
| `/spawn`                  | The spawn command allows you to spawn any prop or monster.                                                                       | `/spawn [monster/prop id] [stage id] x[amount] lv[level] r[radius]`                              | LC     |
| `/worldlevel`             | The worldlevel command allows you to set the current level of your world.                                                        | `/worldlevel [level]`                                                                            | LC     |
| `/gender`                 | The gender command allows you to change your trailblazer's current gender (Required to re-login for the changes to take effect.) | `/gender {male \| female}`                                                                       | LC     |
| `/clear`                  | Clear or remove items                                                                                                            | `/clear {relics \| lightcones \| materials \| items} lv(filter level)`                           | LC     |
| `/avatar`                 | The avatar command allows you to change the level, ascension, eidolon, and skill levels for your avatars.                        | `/avatar {cur \| all \| lineup} lv[level] p[ascension] r[eidolon] s[skill levels]`               | LC     |
| `/give`                   | Give Custom Relics stats                                                                                                         | `/give [relic id] s[main stat id] [substat id]:[count]`                                          | LC     |

## Knowledge

Q: There is no bot Ayaka in GIO\
A: It's normal if you playing on GIO Server. To do command, please go to [ps.yuuki.me](https://ps.yuuki.me/command). Don't forgot to login first before you do command

Q: How can I delete account?\
A: You can't to delete your account. If you want to start from beginning, you can create new account.

Q: Can you send me list of command GIO?\
A: You can see list of command in [doc.yuuki.me](https://doc.yuuki.me/docs/commands/gio)

Q: How can I custom artifact in GIO?\
A: You can customize artifact stats in GIO using the same command as in GC (Grasscutter).

Q: How can I change banner?\
A: There is no way to change banner in Public server, but you can change banner in Localhost.

Q: Where is download link for Android?\
A: You can download for Android in [ps.yuuki.me](https://ps.yuuki.me/game/genshin-impact)

Q: How to fix error 4214 in Android?\
A: If you enter official server, which actually is not allowed to connect to official server using apk launcher mod because it is risky. If you try to connect to Private Server and get this error message, then the proxy failed to change a domain or server to Private Server. You can try to re open the game and try again

Q: How can I do localhost in Android?\
A: If you want to localhost Grasscutter on Android you can check [GCAndroid](https://github.com/Score-Inc/GCAndroid). You can also manual to install [Grasscutter](https://github.com/Grasscutters/Grasscutter) with command line.

Q: Where can I get GIO in Android?\
A: You can download GIO in [doc.yuuki.me](https://doc.yuuki.me/docs/tutorial-connect/android/download-genshin-impact)

Q: Is there Honkai: Star Rail PS for Android?\
A: Yes if server support for Android. But as of November 9, 2023, YuukiPS doesn't support for Android.

Q: How can I custom artifact in GC?\
A: To custom artifact in GC you can go to this [page](https://null-grasscutter-tools.vercel.app/#/artifact/index)

Q: Where is RSA Patch download link for PC?\
A: You can check this repository: [34736384/RSAPatch](https://github.com/34736384/RSAPatch/releases) for RSA Patch

Q: What is GIO?\
A: Genshin Impact Offline/official. It is 1:1 with official servers for version 3.2 only on Yuuki.

Q: Where is command list for GC?\
A: You can check [docs](https://doc.yuuki.me/docs/commands/gc).

Q: How to get relics in Star Rail?\
A: As of November 9, 2023, you cannot get relics.

Q: Can I use my normal Genshin game to play on private?\
A: You must have 4.0 or 3.2 to play on Yuuki which you can get from [ps.yuuki.me](https://ps.yuuki.me/game/genshin-impact).

Q: Can I play spiral abyss?\
A: Play on GIO (3.2) to have abyss and everything else working, you can get it from [ps.yuuki.me](https://ps.yuuki.me/game/genshin-impact). If you play on GC there will be bugs.

Q: Can I play on iOS?\
A: As of November 9, 2023, you cannot play on iOS.

Q: I downloaded the Android file, and it's in apk.zip format. How can I install it?\
A: Simply put, you need to rename the file to apk. You can do this by going to the file manager, and renaming the file to apk. If you don't see the .zip part, you need to enable file extensions. You can do this by going to the file manager, and clicking the three dots in the top right corner. Then, click settings, and enable file extensions.

Q: Can you provide guidance on installing or hosting GIO?\
A: No, we do not offer official support or assistance for hosting GIO. Please refer to [RageZone](https://forum.ragezone.com/community/genshin-impact-releases.1046/) or you can join this [Discord server](https://discord.gg/VHhdkR4FVr).

Q: I forgot my email or password. How can I recover the account?\
A: If you still remember your UID, you can contact us or send your UID to [me@yuuki.me](mailto:me@yuuki.me) to initiate the backup process.

Q: I am stuck on Spiral Abyss 3. How can I resolve this?\
A: This is normal if you are playing on GC (Grasscutter). If you want to participate in Spiral Abyss, you can play on the GIO server.

Q: I have a full team, but it's asking me to equip Amber and I can't do anything in GIO.\
A: Create a new account and don't add any characters before starting the Amber quest.

Q: Should I play on GC instead of GIO? Which one is better?\
A: It depends on your preferences. If you want to play quests and access other functionalities, you can play on `GIO`. If you want to sandbox, test weapons, explore, or use 4.0 characters, you should play on `GC`.

Q: How to automatically build all characters?\
A: There is no single command to build all characters. You will have to send a list of commands with the items you want from [ps.yuuki.me](https://ps.yuuki.me/command) for easiest method. On GC, you can use `/enka <uid>` to copy a public showcase.

Q: Where are Genshin ids?\
A: All ids can be found in the [GM Handbook](https://gm.elaxan.com).

Q: What do I download to play Genshin private server?\
A: You first need the full game data (PC) or mod launcher (Android) for either version 3.2 or 4.0 from [ps.yuuki.me](https://ps.yuuki.me/game/genshin-impact). For PC, you then need to download a proxy such as [YuukiPS Launcher](https://doc.yuuki.me/docs/tutorial-connect/pc/yuukips-launcher) or [Cultivation](https://doc.yuuki.me/docs/tutorial-connect/pc/cultivation). These links and other options are available on the same page as the download links.

Q: Why can't I wish on GIO?\
A: Wishing is unlocked through normal story progression, if you are skipping quests you will run into issues.

Q: What is currently version support for YuukiPS\
A: As of November 8 2023, YuukiPS support for version 4.0 and 3.2

Q: How to downgrade version from 4.2 or 4.3 to 4.0?\
A: In PC, you can try to re-download the game for version 4.0. You can check [here](https://doc.yuuki.me/docs/tutorial-connect/pc/download-genshin-impact)<br />In Android, you can try to re-download the game for version 4.0. You can check [here](https://doc.yuuki.me/docs/tutorial-connect/android/download-genshin-impact)

Q: I got error 4214 in PC. My version is <version>\
A: if you doing all steps correctly to install Private Server on your PC, make sure that your version is match with Private Server version. You can check [here](https://doc.yuuki.me) to see Private Server version.

Q: Can you help me to use mod in Android?\
A: There is no mod for Android version, only for PC version.

Q: Why there is no wish in GC?\
A: If wish icon is missing, you can try to use following command: `/prop so -111` | `/prop so 1` | `/prop so all`. After you executing this command, don't forgot to re-login to make changes.

Q: How to create account?\
A: To create account, first go to [ps.yuuki.me](https://ps.yuuki.me/account/register) and fill the form to create account such as `Username`, `Email`, and `Password`. After you fill the form, click `Register` button. If you see `Success` message, it means your account is created. If you see `Error` message, it means your account is not created. You can try to create account again.

Q: How to fix `game version not supported`?\
A: Make sure your game version supported by YuukiPS Launcher, and as of November 11, 2023. YuukiPS support for version 4.0 and 3.2

Q: How to get all in GIO?\
A: There is no command to get all in GIO, you need to add them 1 by 1 using command `item add` or other command to get items or avatar

Q: How to get all in GC?\
A: You can use `/give all` and read chat for any further prompts

Q: How to unlock map in GC?\
A: You can use `/prop point all` to open the entire map

Q: How to access commands?\
A: Go to [ps.yuuki.me](https://ps.yuuki.me/command) and fill in the fields to access web command.

Q: How to add all quests?\
A: You can start quests with `/q main` on GC. On GIO, quests are already active.

Q: How to finish all quests?\
A: You cannot finish all quests in one command.

Q: How can I change server in GIO?\
A: You can't. As of November 12, 2023, GIO only available in German.

Q: Where is command list for Honkai: Star Rail or HSR?\
A: You can find in https://discord.com/channels/964119462188040202/1105333305391460452/1135034526016471221 for command list in Honkai: Star Rail

Q: How can I find UID in my account?\
A: You can find ID in [ps.yuuki.me](https://ps.yuuki.me/account/home) and you will see `UID Account`.

Q: How can I get Code in my account?\
A: First, go to [ps.yuuki.me](https://ps.yuuki.me/account/home) and scroll down, then you will see a code for your account. If it's blank, you can click `Generate` button

Q: When I use command, I got output `api_cmd_blockadmin`. How can I fix this?
A: You enter command that means the command has been turned off by Admin to avoid heavy resources on Server

Q: Is Private Server 4.2 or 4.3 available?\
A: As of November 12, 2023, YuukiPS does not support for version 4.2 or 4.3, you need to download for version `4.0` or `3.2`. You can find in [ps.yuuki.me](https://ps.yuuki.me/game/genshin-impact)

Q: I got error `Account is not registered`.
A: If you first time playing Private Server. Make sure that you already registered on [ps.yuuki.me](https://ps.yuuki.me/account/register), enter `username`, `email`, and `password`. After that click `Register button`. Go back to the game, and login with `username` that you register before

Q: Why there is no Private Server for iOS?\
A: The reason why there is no Private Server for iOS is no one share patched .ipa to the public. That means you can't play Private Server on iOS.

Q: I got error `Login expired` when trying to login to Private Server.\
A: If you got this error, first go to [ps.yuuki.me](https://ps.yuuki.me/account/home) and login with your account. After that click the button `Allow only login in-game with current ip address (high security)` or `Allow everyone login in-game`

Q: How can I go back to `Official Server`?.\
A: You can just download the game from [genshin.mihoyo.com](https://genshin.mihoyo.com/en/download) and install it. After that, you can login with your account. On Android simply just download it from [play.google.com](https://play.google.com/store/apps/details?id=com.miHoYo.GenshinImpact&hl=en&gl=US) and install it. After that, you can login with your account. You can delete Private Server or keep it.

Q: How to use command `/player set`?\
A: First, enter command `/player set`. After that go to [ps.yuuki.me](https://ps.yuuki.me/account/home) to get uid and code and copy your uid then scroll down you will see the code if not, then click the button `Generate`. And also copy that and paste it to the command `/player set` modal

Q: How to remove my player data saved using command `/player set`?\
A: You can use command `/player remove` to remove your player data

Q: How to use command `/command`?\
A: Before using command `/command`, make sure that you already enter command `/player set` to set your player data. After that, you can use command `/command` to access command list

Q: How to localhost GIO in Android?\
A: There is no way you can do localhost on Android. Please check on https://discord.com/channels/964119462188040202/1049101257933066322/1099495316924944484 to get more information about how to localhost in you're Android phone

Q: Is the server down?\
A: Please check on channel <#1051149545779777586>. To get information if the server is down

Q: I have issue with YuukiPS Launcher that doesn't open it, How can I fix this issue\
A: If you have issue with YuukiPS Launcher that not open when you run .exe\nMake sure you have download and install DotNet (.NET) from this link: <https://dotnet.microsoft.com/en-us/download/dotnet/6.0/runtime>\nAnd please check documents for how to setup YuukiPS Launcher here: <https://doc.yuuki.me/docs/tutorial-connect/pc/yuukips-launcher>

Q: Will I get banned if I play on YuukiPS?\
A: There is no report that someone got banned by playing on YuukiPS or Private Server. But if you still worried about it, then don't play Private Server.

Q: Can you send me a fiddler script for Honkai: Star Rail?\
A: You can check [here](https://doc.yuuki.me/docs/tutorial-connect/pc/fiddler) to get fiddler script for Honkai: Star Rail

Q: I got error `cant find gm` when trying to use command\
A: If you get this error, mean the command is not found or not available for `GC` or `GIO`. You can check command list for `GC` [here](https://doc.yuuki.me/docs/commands/gc) and for `GIO` [here](https://doc.yuuki.me/docs/commands/gio)

Q: How to get ID for character, weapon, artifact, and item?\
A: You can check [here](https://gm.elaxan.com) to get ID for character, weapon, artifact, and item

Q: I have issue downloading data game.\
A: It may your internet issue or the server itself too busy. You can try with VPN to download the data game, if it's still not working, you can try to download it again later

Q: How to enter command in GC?\
A: You can enter command in GC (Grasscutter) in game chat (Ayaka). Simply open chat section and add Ayaka then enter command that you want to use

Q: How to enter command in GIO?\
A: You can enter command in GIO (Genshin Impact Official) go to [ps.yuuki.me](https://ps.yuuki.me/command) and fill the form to access command list, or you can also using `/command` Discord Bot in <#987879230585069609> channel and make sure that you have enter command `/player set` to set your player data. And another method using `/cmd` and make sure that you have linked your Discord account to your YuukiPS account. And please note that you can't use command in game chat like in GC (Grasscutter)

Q: how y'all remove the artifact cause so annoying\
A: /clear af {rarity}\*

Q: How can I execute commands on my PC?\
A: You can execute commands on your PC through the web command at https://ps.yuuki.me/command

Q: how do I use the private server when there's no 4.2 or 4.3 update\
A: You can get your private server to work by downloading version 4.0 of Genshin Impact. Remember to search for version 4.0 and you can refer to this link for more information: https://discord.com/channels/964119462188040202/1175262038562439168/1175262862558638110

Q: Is it possible to play SR 1.3.0 on IOS?Is it possible to play SR 1.3.0 on IOS?\
A: No, it is not possible to play SR 1.3.0 on IOS.

Q: If I update from version 1.3 to 1.5, private server work?\
A: No.

Q: how can I set the game to use the Japanese audio?\
A: You can download the Japanese audio, go to in-game settings, delete the English voice, and change to the Japanese voice. Alternatively, you can avoid downloading the English voice by tweaking your game folder. However, it is important to note that the English audio is the default and must be installed for global OS users.

Q: How to level up characters with a command?\
A: You can use the command `/prop lv <level>` to level up individual characters or use `/prop salv <level>` to change the level for all characters at once.

Q: I filled my artifact inventrory how can i delete thoose artifacts? I cant add or create a new one\
A: Try to `/clear af all` or `/clear all`

Q: How should I change 3.2 server to 3.0 so that I can access the ps?\
A: You need to download the full game again on the 3.0 version. You can do it from <#970380775264518244> or from Yuuki's website. GIO is only available up to 3.2, but GC is available for version 4.0. You can find it at https://ps.yuuki.me/ and select the third option.

Q: How do I change version from 4.2 or 4.3 to 4.0?\
A: You must download the full 4.0 or 3.2 game on its own

Q: how do i get 4.0.1?\
A: You can download version 4.0 from https://ps.yuuki.me/game/genshin-impact. It is also recommended to download version 3.2. Make sure to download all parts and unzip them.

Q: How to skip to the event of entering the inazuma in gio\
A: If you are stuck on a certain mission, use the command https://doc.yuuki.me/docs/commands/gio#quest. But be careful when using it, make sure you are stuck in this mission. You can also use GM Handbook to search for the name of the current quest you are asking for.

Q: Error copy pathfile\
A: Go ahead and first confirm you actually got the full game, since your folder name is custom. Include the size of the folder if need be. Yes it is, but I need to confirm that you actually have the full game. Since if you downloaded the update file instead, and put it into a folder with a random name, then there is no way to tell you have the wrong thing.

Q: can't enter my teapot\
A: Probably an issue with your account, either avoid teapot or make a new account and only do normal things in the teapot. You can try again first and see if it is still happening, or even directly tp to the teapot scene and see if it works.

Q: how do i dump protos?\
A: Dumping protos requires a deep understanding of reverse engineering and the right tools. It is not something to attempt without the necessary knowledge and skills. Even if you decide to try, it's important to understand that it's a complex process and may not be achievable without the appropriate expertise, tools, and experience.

Q: Is it possible to play on patch 2.8?\
A: Not on Yuuki

Q: is 4.1 going to come out for Android in a few months\
A: If by \"a few months\" you mean never, then yes.

Q: I get damage during elemental burst, is that normal?\
A: Long time bug in GC that I believe was fixed at some point but as with all things, breaks again.

Q: When will 4.2 or 4.3 for Android come?\
A: Maybe in 2027, maybe sooner, but not now. There's no ETA when it will be released.

Q: What happened to raiden?\
A: It was one of the plugin in the server called Attack Infused with Gadget IIRC. It affect Raiden attacks, binding it with the bosses gadget. You can turn it off using `/at off` and turn it on with `/at on`.

Q: Can i still play the ps on ios if i have shadowrocket?\
A: Sure can, but not on YuukiPS. You will have to host the server yourself. Not to forget you also need a patched game and its full game resource.

Q: unable to delete artifacts and items idk why\
A: You can either use it to upgrade other artifact or use `/clear af 5*`.

Q: Is there a 3.4 GIO server available?\
A: No, there will be no 3.4 GIO here, only 3.2.

Q: how can I fix the error on /player set?\
A: Activate command access in your account settings on the Yuuki website. Generate a code, input your account password, save, and then go to the command access section to input your account uid and the generated code. After doing this, you can use commands on the Yuuki website or on Discord if your account is linked.

Q: ive seen some videos where people used korepi or akebi and looted chests autometically and automatically teleported or runned to them how do i do this with akebi?\
A: Simply open akebi and use it. All the features are right there in it.

Q: keeps telling me "NoUser Assembly file"\
A: It seems like some files may have been separated and scattered outside of the main game folder, which is causing the issue. The game folder size and contents need to be verified to ensure that all necessary files are in place.

Q: When I use a command I got error `api_cmd_player_offline`\
A: The error message 'You are not in the game' is likely indicating that the user is not logged in on the same account both in-game and on the site. It's important to ensure that the UID is correct and that the user is logged in on the correct account with the right version (3.2 or 4.0) to access the specific command.

Q: I got stuck at beginning quest, any solution?\
A: If you want the quests to work more effectively in version 4.0, consider playing on localhost. You can also try continuing to move, and the quests should progress, or use commands. For the complete story experience, consider playing on GIO.

Q: Is there an Command to delete all of your 3 Star weapons in GIO?\
A: Please read the command list so you don't have to ask. You can find the list of commands at https://doc.yuuki.me/docs/commands/gio

Q: Which one is better and what is the difference between GC and GIO?\
A: 3.2 (GIO) is like the normal game up to 3.2 but with some changes like more primos etc but clean story 4.0.1 (GC) is in Version 4.0 but just for character testing most features are broken. so depends on what you wanna do

Q: where do i get akebi at? would it be from their discord?\
A: You would purchase Akebi on a license (1 day, 7 day, or 1 month) from the official Akebi or official Akebi resellers (in their Discord) to avoid scams.

Q: I tried to download the 4.0 Android one and it logs me in but for some reason I cannot access the characters to unlock them or to get anything.\
A: Please for your own sake read the common information channels first. Here are the links to the channels: [discord.com/channels/964119462188040202/1049101257933066322/1082622560937713744](https://discord.com/channels/964119462188040202/1049101257933066322/1082622560937713744) and [discord.com/channels/964119462188040202/970380775264518244/1144073951002251296](https://discord.com/channels/964119462188040202/970380775264518244/1144073951002251296)

Q: How do you get weapons Artifacts in GIO?\
A: You can obtain weapons and artifacts by using the WebCommand with your account UID and password, entering custom commands in the 'Raw Command' field, and following the guide provided at https://doc.yuuki.me/docs/commands/gio. You can find the item/character IDs at https://gm.elaxan.com. It's important to note that some commands may return errors, and adding characters before Amber's initial quest is not advised in order to avoid potential account issues.

Q: Does anyone have a mod for Free Camera Genshin Impact 4.0 in Android?\
A: Mods are unsupported in the mobile version of Genshin Impact, only in the PC Desktop/Windows version. You can explore the use of MelonLoader for mods and find potential resources on platforms like GameBanana and GitHub.

Q: How did my map disappear in GC?\
A: It seems like there are some bugs with the Genshin Impact game, as multiple users are experiencing issues such as missing maps and bugged character screens. Some suggestions from other users include trying to log in again, checking the account, switching versions, and using a specific command like `/setprop um -111``.

Q: I can't download the game file version 4.0.1\
A: To resolve the issue with the download, ensure that all ad blockers are disabled. Additionally, rather than using redirects, try using the actual download link. You can also find more information by searching in the designated channel.

Q: Can GIO 3.2 be upgraded to 4.0 at a later date?\
A: No, totally different things

Q: like i enter but as soon as the door opens the screen becomes white and like after 3 minutes or so tells me connection lost but like the wifi is kinda good rn, so is it me or like a problem?\
A: Then the server is down, wait for it to come back up.

Q: I need help with the friendship command\
A: The command usage depends on the specific game version. For GIO 3.2, you can use 'item add 105 99999', while for GC 4.0, you should use '/give 105 x99999'. Make sure to consult the GM Handbook for more items.

Q: Is there anything that is simple to install GIO?\
A: For PC, you can download it from the following link and extract all the files: https://file2.yuuki.me/OD1/Project/GenshinImpact/Data/PC/3.2.0/Global/OneClick. If necessary, you can also download the Launcher from this link: https://github.com/YuukiPS/Launcher-PC/releases/download/2023.11.10.0714/YuukiPS.zip. For Android, you can download the YuukiPS apk from this link: https://file2.yuuki.me/Local_EU/Project/GenshinImpact/Data/Android/3.2.0/Global/YuukiPS.apk

Q: What code should I enter?\
A: To access web commands or the bot, enter the code, it can be found at https://ps.yuuki.me/account/home.

Q: Everytime I try to save it says 'the current code in web are not the same' please help\
A: That's why it is necessary to fill in the password at the bottom. Also, as the message suggests, you need to put in your current password. If it didn't match then it won't work.

Q: Is there a 4.2 private server?\
A: Yes, there is a 4.2 private server called Furina Impact, but it doesn't fully work. Players can only walk around with Furina as there is practically nothing else to do on the 4.2 private server.

Q: Will I have new characters in old version?\
A: No, new characters are not available in the old version.

Q: Network Error 4214\
A: Network Error 4214 is related to Genshin Impact. The conversation involves troubleshooting the error by providing specific information about the game version, proxy, and settings in the Cultivation app. Additionally, the correct download source for the 4.0 version is shared with the user.

Q: Can I ask which version does the story of GC and GIO stop?\
A: GC story stops at version 3.0, while GIO has the full Sumeru Story in version 3.2.

Q: My question is:there is a command that give you unlimited mora or unlimited xp?\
A: No, just give yourself the amount you want.

Q: how to unlock wish and rest\
A: You can find the information in the channels <#970380775264518244> and <#1049101257933066322>. Also, you can search for the exact question in <#1048860849495875594>.

Q: To get the hsr private server i have to do the same way as genshin impact?\
A: Yes

Q: how to disable skill recharge (E key) in 4.0.1 or GC?\
A: You can disable skill recharge (E key) in 4.0.1 by using the command `/stat lock cdr 1`. It's important to note that using both 0 and 1 will result in opposite meanings, as 0 represents off while 1 represents on.

Q: Hello I did not understand how to have a private server could you explain to me how to do it thank you\
A: To have a private server, you can download version 4.0 or 3.2 and use Yuukips launcher or Cultivation. Then, you can launch it, login, and play. You can also visit https://ps.yuuki.me for more information.

Q: cant login\
A: Make sure you're using the proper proxy/settings and try again. If the server is up, keep trying until it works.

Q: can you give me where to find the commands on genshin\
A: <#1049101257933066322> <#970380775264518244> <https://doc.yuuki.me>

Q: i tried to connect in germany and i can't enter on this server\
A: Go try another account or another region

Q: I lost my progress in the game after updating to version 3.2 (GIO) and receiving error 4214. How can I resolve this issue?\
A: It seems like the issue was due to being logged in with a different account or experiencing a server issue. Additionally, the user was able to resolve the problem by installing version 3.2 and restoring account data, which restored their progress in the game and enabled the use of commands.

Q: Can I play Swarm Disaster?\
A: If you tried and it didn't work then probably no

Q: Im getting the error coder 4214\
A: Make sure to set the game in your launcher of choice and then click launch. If the issue persists, ensure the game you just downloaded is the only version in use, and forget the existence of any other versions.

Q: I wanna know if its possible to play the story of star rail. I wanna have a full game playthrough like official server. I already joined the game and know how to use commands, I checked the handbook but I still dont know how to use that to play the story. Maybe its /scene ? But I dont know the format of this command, [scene id] [floor id]? what is that?\
A: Scene is for moving to the specified scene. It is not a quest command. If you want the full game playthrough like the official server, you need to go to the official server. The available features and command list can be found at: https://github.com/Melledy/LunarCore#notable-features

Q: I keep getting this everytime😭 ive already entered a code\
A: This says you don't have a code set on your account. You need to go to the account page, log in, and set a code. Please remember that reading is required, especially right under the code box where it says your current password is required for changes to save.

Q: Why am I getting 'do not have the permission' message for commands like give all in the game?\
A: If it says you don't have permission for a specific command, then as it says, you don't have permission. Try using other commands that you do have permission to use.

Q: Hi Ive noticed zhongli c6 const dosent seem to be working. When hit, his sheild does not regen health. Could I check if anyone is facing the same issues? Thanks!\
A: It's not implemented. Has been an issue in every version and will continue to be until it is properly handled/implemented

Q: Is Swarm Disaster not available? Will it be available in the future?\
A: If it is made available in the future, then it will be available. If not, then it won't.

Q: Why do I get a success message when I use the /give 81114 command but the relic is not in the inventory?\
A: Probably because you looked up the set name which isn't the item. Remember that each piece is an individual item. Individual items have their own names. If you've ever played on official you should understand you get one of four different pieces from any given set when you play the game or do dungeons. Those are items. The set is not an item. If you're not sure what that means, you can either play the official game first, or you can look it up on the wiki.

Q: How can i turn off raiden puppet effects?\
A: Try using command `/at off`

Q: How to play story in HSR?\
A: Currently you can't play story in HSR

Q: Where I can find HSR or LC (LunarCore) command list?\
A: You can check on this [website](https://doc.yuuki.me/docs/commands/lc)

Q: Why I can't play simulated universe in HSR?\
A: As of January 13, 2024, you can't play the simulated universe in HSR due to the 1.6 update. It will be fixed when it is fixed and not a single moment sooner. If you decide to put in some work, you can go fix it in the source and make a PR. If you're not willing to do so, you can visit [LunarCore](https://github.com/Melledy/LunarCore).
