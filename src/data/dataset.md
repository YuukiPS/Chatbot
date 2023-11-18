# Dataset

This dataset is designed to improve AI responses about Private Servers. It also includes a command list for GIO and GC.

## Command

| Command | Description | Usage | Server |
| --- | --- | --- | --- |
| `/give` | Gives a specified avatars to the player | `/give <avatars id> lv<level character> sl<skill level character> c<constellation>` | GC |
| `/give` | Gives a weapon to the player | `/give <weapon id> lv<level weapon> r<refinement> x<amount>` | GC |
| `/give` | Gives a specified item to the player | `/give <item id> x<amount>` | GC |
| `/give` | Gives a specified artifact to the player | `/give <artifact id> lv<level artifact> x<amount>` | GC |
| `/give av` | Gives all avatars to the player | `/give av lv<level> c<constellation> sl<skill level>` | GC |
| `/give af` | Gives all artifacts to the player | `/give af lv<level> x<amount>` | GC |
| `/give mats` | Gives all materials to the player | `/give mats x<amount>` | GC |
| `/give wp` | Gives all weapons to the player | `/give wp lv<level> r<refinement> x<amount>` | GC |
| `/give hs` | Gives all teapot items to the player | `/give hs` | GC |
| `/spawn` | Spawns a specified monster in the game | `/spawn <monster id> lv<level monster> hp<health point/0=unlimited health> x<amount of monster>` | GC |
| `/spawn` | Spawns a specified weapon | `/spawn <weapon id> lv<level weapon> r<refinement> x<amount>` | GC |
| `/heal` | Heals the player's active character | `/heal` | GC |
| `/q add` | Adds a specified quest to the player's quest log | `/q add <quest id>` | GC |
| `/q remove` | Removes a specified quest from the player's quest log | `/q remove <quest id>` | GC |
| `/q skip` | Skips a specified quest in the player's quest log | `/q skip` | GC |
| `/q removeall` | Removes all quests from the player's quest log | `/q removeall` | GC |
| `/killall` | Kills all monsters currently in the game | `/killall` | GC |
| `/kill` | Kills the player's active character | `/kill` | GC |
| `/stats freeze cdr 0` | Freezes the cooldown timer for the player's abilities | `/stats freeze cdr 0` | GC |
| `/prop ns 1` | Sets the player's stamina to unlimited | `/prop ns 1 or /prop ns 0 (disable)` | GC |
| `/prop ue 1` | Sets the player's energy to unlimited | `/prop ue 1 or /prop ue 0 (disable)` | GC |
| `/prop god 1` | Sets the player's character to god mode (no damage taken) | `/prop god 1 or /prop god 0 (disable)` | GC |
| `/prop player_level` | Sets the player's level to a specified level | `/prop player_level <level>` | GC |
| `/prop unlockhome on` | Unlock the teapot | `/prop unlockhome on` | GC |
| `/prop abyss` | Change or level up the spiral abyss | `/prop abyss <level>` | GC |
| `/prop lv` | Change current or active character level | `/prop lv <level>` | GC |
| `/prop stlv` | Change all character level on the team or party | `/prop stlv <level>` | GC |
| `/prop salv` | Change all character level you have | `/prop salv <level>` | GC |
| `/prop se hydro` | Change or switch traveler element to hydro | `/prop se hydro` | GC |
| `/prop se grass` | Change or switch traveler element to grass | `/prop se grass` | GC |
| `/prop se electro` | Change or switch traveler element to electro | `/prop se electro` | GC |
| `/prop se wind` | Change or switch traveler element to wind | `/prop se wind` | GC |
| `/prop se white` | Change or switch traveler element to no element | `/prop se white` | GC |
| `/setconst` | Sets the player's constellation to a specified constellation | `/setconst <constellation>` | GC |
| `/weather sunny` | Sets the game's weather to sunny | `/weather sunny` | GC |
| `/weather rain` | Sets the game's weather to rain | `/weather rain` | GC |
| `/weather cloudy` | Sets the game's weather to cloudy | `/weather cloudy` | GC |
| `/weather thunderstorm` | Sets the game's weather to thunderstorm | `/weather thunderstorm` | GC |
| `/weather snow` | Sets the game's weather to snow | `/weather snow` | GC |
| `/weather mist` | Sets the game's weather to mist | `/weather mist` | GC |
| `/talent n` | Change normal attack talent | `/talent n <level>` | GC |
| `/talent q` | Change element burst talent | `/talent q <level>` | GC |
| `/talent e` | Change element skill talent | `/talent e <level>` | GC |
| `/talent all` | Change all talent | `/talent all <level>` | GC |
| `/team add` | Adds a specified character to the player's team | `/team add <character id>` | GC |
| `/team remove` | Removes a specified character from the player's team | `/team remove <character id>` | GC |
| `/resetconst` | Resets active character constellation | `/resetconst` | GC |
| `/resetconst all` | Resets all character constellations | `/resetconst all` | GC |
| `monster` | Spawns a specified monster in the game | `monster <id>` | GIO |
| `kill monster all` | Kills all monsters currently in the game | `kill monster all` | GIO |
| `stamina infinite on` | Sets the player's stamina to unlimited or no stamina | `stamina infinite on` | GIO |
| `stamina infinite off` | Disables the unlimited stamina setting | `stamina infinite off` | GIO |
| `energy infinite on` | Sets the player's energy to unlimited | `energy infinite on` | GIO |
| `energy infinite off` | Disables the unlimited energy setting | `energy infinite off` | GIO |
| `quest accept` | Adds a specified quest to the player's quest log | `quest accept <quest id>` | GIO |
| `quest remove` | Removes a specified quest from the player's quest log | `quest remove <quest id>` | GIO |
| `quest add` | Adds a specified quest to the player's quest log | `quest add <quest id>` | GIO |
| `quest finish` | Completes a specified quest in the player's quest log | `quest finish <quest id>` | GIO |
| `mcoin` | Gives the player a specified amount of Genesis Crystals | `mcoin <amount>` | GIO |
| `scoin` | Gives the player a specified amount of Mora | `scoin <amount>` | GIO |
| `hcoin` | Gives the player a specified amount of Primogems | `hcoin <amount>` | GIO |
| `home_coin` | Gives the player a specified amount of Real Currency | `home_coin <amount>` | GIO |
| `player level` | Sets the player's level to a specified level | `player level <level>` | GIO |
| `avatar add` | Adds a specified avatar to the player's collection | `avatar add <character id>` | GIO |
| `wudi global avatar on` | Sets the player's avatar to god mode (no damage taken) | `wudi global avatar on` | GIO |
| `wudi global avatar off` | Disables god mode for the player's avatar | `wudi global avatar off` | GIO |
| `wudi global monster on` | Sets all monsters to god mode (no damage taken) | `wudi global monster on` | GIO |
| `wudi global monster off` | Disables god mode for all monsters | `wudi global monster off` | GIO |
| `item add` | Adds a specified item to the player's inventory | `item add <item id> <amount>` | GIO |
| `talent unlock` | Unlocks a specified talent for the player | `talent unlock [1-6]` | GIO |
| `talent unlock all` | Unlocks all talents for the player | `talent unlock all` | GIO |
| `point 3 all` | Unlocks all teleport points | `point 3 all` | GIO |
| `item clear` | Removes a specified item from the player's inventory | `item clear <id> <amount>` | GIO |
| `level` | Set active/current character to a specified level | `level <level>` | GIO |
| `jump` | Teleports the player to a specified scene | `jump <scene id>` | GIO |
| `goto` | Teleports the player to specific coordinates in the game world | `goto <x> <y> <z>` | GIO |
| `dungeon` | Teleports the player to a specific dungeon using its ID | `dungeon <dungeon id>` | GIO |
| `equip add` | Equips a specific weapon to the active character, with specified level, ascension level, and refinement level | `equip add <weapon id> <level> <ascension level> [1-6] <refinement level> [1-5]` | GIO |
| `skill 1` | Changes the level normal attack talent of the active character | `skill 1 <level [1-10]>` | GIO |
| `skill 2` | Changes the level element skill talent of the active character | `skill 2 <level [1-10]>` | GIO |
| `skill 3` | Changes the level element burst talent of the active character | `skill 3 <level [1-10]>` | GIO |
| `skill all` | Changes the level of all talents of the active character | `skill all <level [1-10]>` | GIO |
| `weapon level` | Changes the level of the active character's equipped weapon | `weapon level <level>` | GIO |
| `weapon break` | Changes the ascension level of the active character's equipped weapon | `weapon break <level>` | GIO |
| `weapon refine` | Changes the refinement level of the active character's equipped weapon | `weapon refine <level>` | GIO |

## Knowledge

Q: There is no bot Ayaka in GIO\
A: It's normal if you playing on GIO Server. To do command, please go to [ps.yuuki.me](https://ps.yuuki.me/command). Don't forgot to login first before you do command

Q: How can I delete account?\
A: You can't to delete your account. If you want to start from beginning, you can create new account.

Q: Can you send me list of command GIO?\
A: You can see list of command in [doc.yuuki.me](https://doc.yuuki.me/docs/commands/gio)

Q: How can I custom artifact in GIO?\
A: You can't to custom artifact in GIO. You can only custom artifact in GC.

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
A: It depends on your preferences. If you want to play quests and access other functionalities, you can play on `GIO`. If you want to customize artifacts, stats, and more, you should play on `GC`.

Q: How to automatically build all characters?\
A: There is no single command to build all characters. You will have to send a list of commands with the items you want from [ps.yuuki.me](https://ps.yuuki.me/command) for easiest method. On GC, you can use `/enka <uid>` to copy a public showcase.

Q: Where are Genshin ids?\
A: All ids can be found in the [GM Handbook](https://doc.yuuki.me/GMHandbook).

Q: What do I download to play Genshin private server?\
A: You first need the full game data (PC) or mod launcher (Android) for either version 3.2 or 4.0 from [ps.yuuki.me](https://ps.yuuki.me/game/genshin-impact). For PC, you then need to download a proxy such as [YuukiPS Launcher](https://doc.yuuki.me/docs/tutorial-connect/pc/yuukips-launcher) or [Cultivation](https://doc.yuuki.me/docs/tutorial-connect/pc/cultivation). These links and other options are available on the same page as the download links.

Q: Why can't I wish on GIO?\
A: Wishing is unlocked through normal story progression, if you are skipping quests you will run into issues.

Q: What is currently version support for YuukiPS\
A: As of November 8 2023, YuukiPS support for version 4.0 and 3.2

Q: How to downgrade version from 4.2 to 4.0?\
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

Q: Is Private Server 4.2 available?\
A: As of November 12, 2023, YuukiPS does not support for version 4.2, you need to download for version `4.0` or `3.2`. You can find in [ps.yuuki.me](https://ps.yuuki.me/game/genshin-impact)

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
