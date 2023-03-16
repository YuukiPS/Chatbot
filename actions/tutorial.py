from typing import Any, Text, Dict, List

from rasa_sdk import Action, Tracker
from rasa_sdk.executor import CollectingDispatcher

import re, random

class ActionTutorialAndroid(Action):
    def name(self) -> Text:
        return "action_grasscutter_android_tutorial"
    
    def run(self, dispatcher: CollectingDispatcher,
            tracker: Tracker,
            domain: Dict[Text, Any]) -> List[Dict[Text, Any]]:
        # get message
        message = tracker.latest_message['text']
        # extract version
        version = re.search(r'(\d+\.\d+(\.\d+)?)', message)
        if version:
            version = version.group(1)
            if version == "3.2":
                randomAnswer = [
                    "You can check out the {} tutorial here: https://youtu.be/VHMor4bl_Cs. Let me know if you have any questions.".format(version.group(1)),
                    "For a step-by-step guide, see the {} tutorial at https://youtu.be/VHMor4bl_Cs. Feel free to ask me anything.".format(version),
                    "Need some help with {}? Check out this tutorial at https://youtu.be/VHMor4bl_Cs. If you have any doubts, just ask!".format(version),
                    "The {} tutorial is available at https://youtu.be/VHMor4bl_Cs. If you need any clarification, don't hesitate to ask me.".format(version),
                    "Looking to learn more about {}? This tutorial at https://youtu.be/VHMor4bl_Cs might be useful. Let me know if you have any questions.".format(version)
                ]
                dispatcher.utter_message(random.choice(randomAnswer))
                return []
            else:
                randomAnswer = [
                    "Regrettably, at the moment, we don't have a mobile {} tutorial available. However, you can refer to our website or consult our official documentation at https://doc.yuuki.me for more information.".format(version),
                    "I'm sorry to inform you that a mobile {} tutorial is currently unavailable. You can visit our website or access our official document at https://doc.yuuki.me for further details.".format(version),
                    "At present, we do not offer a mobile {} tutorial. Please feel free to explore our website or review our official documentation at https://doc.yuuki.me to find more information.".format(version),
                    "We apologize, but a mobile {} tutorial is not available at this time. You can always check our website or the official document at https://doc.yuuki.me for additional resources.".format(version),
                    "It's unfortunate, but we currently don't have a mobile {} tutorial. For more information, please visit our website or consult the official document at https://doc.yuuki.me.".format(version)
                ]
                return []
        else:
            randomAnswer = [
                "I'm sorry, I didn't understand your question. Could you please provide more details about the mobile tutorial?",
                "I'm not sure what you're asking about the mobile tutorial. Could you please rephrase your question?",
                "I'm afraid I didn't catch that. Can you please ask again about the mobile tutorial?",
                "I'm sorry, your question about the mobile tutorial is not clear. Could you please provide more context?",
                "I didn't quite understand your question about the mobile tutorial. Could you please explain it in more detail?",
                "I'm sorry, I'm having trouble understanding your question about the mobile tutorial. Could you please try asking again?",
                "I'm not sure what you're asking about the mobile tutorial. Could you please provide more information?",
                "I didn't get that. Can you please repeat your question about the mobile tutorial?",
                "Sorry, I couldn't understand your question about the mobile tutorial. Can you please try asking it in a different way?",
                "I'm sorry, I'm not able to comprehend your question about the mobile tutorial. Can you please provide more context?"
            ]
            dispatcher.utter_message(random.choice(randomAnswer))

        return []