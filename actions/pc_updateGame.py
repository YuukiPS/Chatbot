from typing import Any, Text, Dict, List

from rasa_sdk import Action, Tracker
from rasa_sdk.executor import CollectingDispatcher

import re, random

class ActionUpdateGame(Action):
    def name(self) -> Text:
        return "action_grasscutter_pc_update_game"

    def run(self, dispatcher: CollectingDispatcher,
            tracker: Tracker,
            domain: Dict[Text, Any]) -> List[Dict[Text, Any]]:

        game = tracker.latest_message['text']
        pattern = r"(\d+\.\d+)"
        matches = re.findall(pattern, game)

        if len(matches) == 2:
            randomAnswer = [
                "You can try to use hdiff to update the game from {} to {}, download the full zip and replace the files completely or just update via the launcher, any method works".format(matches[0], matches[1]),
                "To update your Grasscutter game from version {} to version {}, you can try using hdiff to update, downloading the full zip file and replacing the old files, or updating through the game's launcher. Any of these methods should work for getting the latest version of the game.".format(matches[0], matches[1]),
                "Updating your Grasscutter game from version {} to version {} is easy! You can use hdiff to update, download the full zip file and replace the old files, or update through the launcher. All of these methods should work for getting the latest version of the game.".format(matches[0], matches[1]),
                "To update your Grasscutter game from version {} to version {}, you can either use hdiff to update, download the full zip file and replace the old files, or update through the game's launcher. Any of these methods should work for updating your game to the latest version.".format(matches[0], matches[1]),
                "If you're looking to update your Grasscutter game from version {} to version {}, there are a few different methods you can try. You can use hdiff to update, download the full zip file and replace the old files, or update through the game's launcher. Any of these approaches should work for getting the latest version of the game.".format(matches[0], matches[1]),
                "Updating your Grasscutter game from version {} to version {} is simple. You can either use hdiff to update, download the full zip and replace the files, or update through the game's launcher. All of these methods should be effective for getting the latest version of the game.".format(matches[0], matches[1]),
                "To update your Grasscutter game from version {} to version {}, you can use hdiff to update, download the full zip file and replace the old files, or update through the game's launcher. Any of these methods should be effective for getting the latest version of the game.".format(matches[0], matches[1]),
                "If you're trying to update your Grasscutter game from version {} to version {}, you can try using hdiff to update, downloading the full zip file and replacing the old files, or updating through the game's launcher. All of these methods should work for getting the latest version of the game.".format(matches[0], matches[1]),
                "Updating your Grasscutter game from version {} to version {} is easy and can be done in a few ways. You can use hdiff to update, download the full zip file and replace the old files, or update through the game's launcher. Any of these methods should work for getting the latest version of the game.".format(matches[0], matches[1]),
                "To update your Grasscutter game from version {} to version {}, you can use hdiff to update, download the full zip file and replace the old files, or update through the game's launcher. All of these methods should be effective for getting the latest version of the game.".format(matches[0], matches[1]),
                "There are several ways to update your Grasscutter game from version {} to version {}. You can try using hdiff to update, downloading the full zip file and replacing the old files, or updating through the game's launcher. Any of these methods should work for getting the latest version of the game.".format(matches[0], matches[1])
            ]
            dispatcher.utter_message(text=random.choice(randomAnswer))
            return []
        elif len(matches) == 1:
            randomAnswer = [
                "You can try to use hdiff to update the {} game, download the full zip and replace the files completely or just update via the launcher, any method works".format(matches[0]),
                "To update your Grasscutter game from version {}, you can try using hdiff to update, downloading the full zip file and replacing the old files, or updating through the game's launcher. Any of these methods should work for getting the latest version of the game.".format(matches[0]),
                "Updating your Grasscutter game from version {} is easy! You can use hdiff to update, download the full zip file and replace the old files, or update through the launcher. All of these methods should work for getting the latest version of the game.".format(matches[0]),
                "To update your Grasscutter game from version {}, you can either use hdiff to update, download the full zip file and replace the old files, or update through the game's launcher. Any of these methods should work for getting the latest version of the game.".format(matches[0]),
                "If you're looking to update your Grasscutter game from version {}, there are a few different methods you can try. You can use hdiff to update, download the full zip file and replace the old files, or update through the game's launcher. Any of these approaches should work for getting the latest version of the game.".format(matches[0]),
                "Updating your Grasscutter game from version {} is simple. You can either use hdiff to update, download the full zip and replace the files, or update through the game's launcher. All of these methods should be effective for getting the latest version of the game.".format(matches[0]),
                "To update your Grasscutter game from version {}, you can use hdiff to update, download the full zip file and replace the old files, or update through the game's launcher. Any of these methods should be effective for getting the latest version of the game.".format(matches[0]),
                "If you're trying to update your Grasscutter game from version {}, you can try using hdiff to update, downloading the full zip file and replacing the old files, or updating through the game's launcher. All of these methods should work for getting the latest version of the game.".format(matches[0]),
                "Updating your Grasscutter game from version {} is easy and can be done in a few ways. You can use hdiff to update, download the full zip file and replace the old files, or update through the game's launcher. Any of these methods should work for getting the latest version of the game.".format(matches[0]),
                "To update your Grasscutter game from version {}, you can use hdiff to update, download the full zip file and replace the old files, or update through the game's launcher. All of these methods should be effective for getting the latest version of the game.".format(matches[0]),
                "There are several ways to update your Grasscutter game from version {}. You can try using hdiff to update, downloading the full zip file and replacing the old files, or updating through the game's launcher. Any of these methods should work for getting the latest version of the game.".format(matches[0])
            ]
            dispatcher.utter_message(text=random.choice(randomAnswer))
            return []
        else:
            dispatcher.utter_message(text="I'm sorry, I couldn't find any version numbers in your message. Please try again.")

        return []