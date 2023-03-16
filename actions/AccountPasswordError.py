from typing import Any, Text, Dict, List

from rasa_sdk import Action, Tracker
from rasa_sdk.executor import CollectingDispatcher

import re, random

class ActionAccountPasswordError(Action):
    def name(self) -> Text:
        return "action_grasscutter_android_account_password_error"

    def run(self, dispatcher: CollectingDispatcher,
            tracker: Tracker,
            domain: Dict[Text, Any]) -> List[Dict[Text, Any]]:
        getMessage = tracker.latest_message['text']

        version = re.search(r'(\d+\.\d+(\.\d+)?)', getMessage)
        if version:
            version = version.group(1)
            randomAnswer = [
                "If you have problem with version {}, you can try to reopen the game. This because the proxy failed to change a domain or server to Private Server".format(version),
                "For issues with version {}, consider updating your game client to the latest version to resolve any compatibility problems.".format(version),
                "In case of problems with version {}, you can try clearing your game cache to ensure there are no corrupted files affecting your experience.".format(version),
                "If you're facing difficulties with version {}, it might help to check your internet connection and ensure you have a stable, low-latency connection for optimal gameplay.".format(version),
                "When encountering issues with version {}, you can try temporarily disabling any firewall or antivirus software to see if they are causing interference with the game.".format(version),
                "If you're having trouble with version {}, you could also try reinstalling the game to ensure you have the correct files and configurations.".format(version),
            ]
            dispatcher.utter_message(random.choice(randomAnswer))
            return []
        else:
            randomAnswer = [
                "The issue could be related to a proxy failing to switch domains or servers to a Private Server. To resolve this, try reopening the game and attempting again.",
                "This problem might be due to a proxy not successfully changing to a Private Server's domain or server. To fix it, close and reopen the game, then try once more.",
                "It's possible that a proxy is causing the issue by not properly transitioning to a Private Server domain or server. To address this, restart the game and give it another try.",
                "Your problem may stem from a proxy that hasn't effectively switched to a Private Server domain or server. To troubleshoot, simply reopen the game and attempt the process again.",
                "The issue could be a result of a proxy's failure to properly switch to a Private Server domain or server. To resolve this problem, close the game and try reopening it before trying again.",
                "This challenge might be due to a proxy that hasn't switched domains or servers to a Private Server correctly. To fix the issue, reopen the game and attempt the process once more.",
                "The problem might arise from a proxy not correctly changing the domain or server to a Private Server. To tackle this, try closing and reopening the game, then give it another shot.",
                "It's likely that the problem is caused by a proxy's inability to effectively change the domain or server to a Private Server. To address this, restart the game and try again.",
                "This issue might stem from a proxy failing to properly transition to a Private Server domain or server. To resolve it, simply close the game, reopen it, and attempt the process once more.",
                "The problem could be related to a proxy that isn't successfully switching to a Private Server domain or server. To fix this, try closing and reopening the game, then give it another shot."
            ]
            dispatcher.utter_message(random.choice(randomAnswer))
            return []