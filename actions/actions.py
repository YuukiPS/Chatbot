# This files contains your custom actions which can be used to run
# custom Python code.
#
# See this guide on how to implement these action:
# https://rasa.com/docs/rasa/custom-actions


# This is a simple example for a custom action which utters "Hello World!"

from typing import Any, Text, Dict, List

from rasa_sdk import Action, Tracker
from rasa_sdk.executor import CollectingDispatcher

from datetime import date
import random, re, os, json
from actions.findID import searchGM
from actions.searchInternet import search
#
#
# class ActionHelloWorld(Action):
#
#     def name(self) -> Text:
#         return "action_hello_world"
#
#     def run(self, dispatcher: CollectingDispatcher,
#             tracker: Tracker,
#             domain: Dict[Text, Any]) -> List[Dict[Text, Any]]:
#
#         dispatcher.utter_message(text="Hello World!")
#
#         return []

class ActionCurrentDate(Action):
    def name(self) -> Text:
        return "action_current_date"
    
    def run(self, dispatcher: CollectingDispatcher,
            tracker: Tracker,
            domain: Dict[Text, Any]) -> List[Dict[Text, Any]]:
        
        today = date.today()
        randomAnswer = [
            "Today is {}".format(today),
            "It's {}".format(today),
            "It is {}".format(today),
            "Today now is {}".format(today)
        ]
        # random answer
        dispatcher.utter_message(text=random.choice(randomAnswer))

        return []

class ActionHowBotMade(Action):
    def name(self) -> Text:
        return "action_how_bot_made"
    
    def run(self, dispatcher: CollectingDispatcher,
            tracker: Tracker,
            domain: Dict[Text, Any]) -> List[Dict[Text, Any]]:
        
        # random answer
        name = "ElaXan"
        random_answer = random.choice(
            [
                f"{name}",
                f"I was made by {name}",
                f"I was create and developed by {name}"
            ]
        )
        dispatcher.utter_message(text=random_answer)
        return []

class ActionFindIDGMHandbook(Action):
    def name(self) -> Text:
        return "action_find_id_gm_handbook"
    
    async def run(self, dispatcher: CollectingDispatcher,
            tracker: Tracker,
            domain: Dict[Text, Any]) -> List[Dict[Text, Any]]:

        try:
            # Get the search
            search = tracker.latest_message["text"]

            match = re.search(r'\b(id|name)\b\s*(?:for|of)?\s*([\w\s]+)', search)
            
            if match:
                result = await searchGM(match.group(2))
                if result["id"] == "Not Found":
                    dispatcher.utter_message(text=f"{search} not found")
                else:
                    # If the result is found
                    randomAnswer = [
                        "The id for {} is {} in the {} category".format(result["name"], result["id"], result["category"]),
                        "Here is the result: {} ({}) in the {} category".format(result["name"], result["id"], result["category"]),
                        "Got it, the id for {} is {} in the {} category".format(result["name"], result["id"], result["category"]),
                        "{} with id {} found in the {} category".format(result["name"], result["id"], result["category"]),
                        "{} ({}) is the id of the {} category".format(result["name"], result["id"], result["category"]),
                        "{} found with id {} in the {} category".format(result["name"], result["id"], result["category"]),
                    ]
                    # save to file in cache/ElaXan/gm.txt as the category
                    pathFolder = "./cache/" + tracker.sender_id
                    pathFile = pathFolder + "/gm.json"
                    if not os.path.exists("./cache"):
                        os.mkdir("./cache")
                    if not os.path.exists(pathFolder):
                        os.mkdir(pathFolder)
                    # check if pathFile is exist
                    if os.path.exists(pathFile):
                        os.remove(pathFile)
                    json_data = {
                        "id": result["id"],
                        "name": result["name"],
                        "category": result["category"]
                    }
                    # write to file
                    with open(pathFile, "w") as f:
                        json.dump(json_data, f)
            else:
                randomAnswer = [
                    "I am sorry, I don't understand what you are looking for",
                    "I don't understand what you are looking for",
                    "Sorry, I don't understand what you are looking for",
                    "Please try again, I don't understand what you are looking for"
                ]
            dispatcher.utter_message(text=random.choice(randomAnswer))
        except Exception as e:
            dispatcher.utter_message(text=f"There was an error while searching the GM Handbook: {e}")
            print(e)

        return []

class ActionCommandGMHandbook(Action):
    def name(self) -> Text:
        return "action_find_command_gm_handbook"
    
    def run(self, dispatcher: CollectingDispatcher,
            tracker: Tracker,
            domain: Dict[Text, Any]) -> List[Dict[Text, Any]]:
        
        getMessage = tracker.latest_message
        
        pathFolder = "./cache/" + tracker.sender_id
        pathFile = pathFolder + "/gm.json"

        if not os.path.exists(pathFile):
            dispatcher.utter_message(text="Please search the id first")
            return []
        else:
            with open(pathFile) as f:
                res = json.load(f)
            
            nameItem = res["name"]
            idItem = res["id"]
            category = res["category"]
            
            if category == "Avatars":
                Answer = {
                    "GC": f"/give {idItem} x<amount> c<constellation> lv<level>",
                    "GIO": f"avatar add {idItem}"
                }
            elif category == "Items":
                Answer = {
                    "GC": f"/give {idItem} x<amount> lv<level>",
                    "GIO": f"item add {idItem} <amount>"
                }
            elif category == "Quests":
                Answer = {
                    "GC": f"/quest add {idItem}",
                    "GIO": f"quest add {idItem}"
                }
            elif category == "Monsters":
                Answer = {
                    "GC": f"/spawn {idItem} x<amount> lv<level> hp<health>",
                    "GIO": f"monster {idItem} <amount> <level> <health>"
                }
            else:
                Answer = {
                    "GC": "Not found",
                    "GIO": "Not found"
                }
            if Answer["GC"] == "Not found" and Answer["GIO"] == "Not found":
                dispatcher.utter_message(text="I am sorry but I can't find the command for this item")
            else:
                dispatcher.utter_message(text=f"Here is the command for {nameItem} ({idItem}) in the {category} category\nGC: {Answer['GC']}\nGIO: {Answer['GIO']}")

class ActionFiddlerScript(Action):
    def name(self) -> Text:
        return "action_fiddler"

    def run(self, dispatcher: CollectingDispatcher,
            tracker: Tracker,
            domain: Dict[Text, Any]) -> List[Dict[Text, Any]]:

        fiddlerScript = """```import System;
import System.Windows.Forms;
import Fiddler;
import System.Text.RegularExpressions;

class Handlers {
    static function OnBeforeRequest(oS: Session) {
        if(oS.host.EndsWith(".yuanshen.com") || oS.host.EndsWith(".hoyoverse.com") || oS.host.EndsWith(".mihoyo.com") || oS.uriContains("http://overseauspider.yuanshen.com:8888/log")) {
            //This can also be replaced with another ip/domain server.
            oS.host = "login.yuuki.me";
        }
    }
};```"""

        intentName = tracker.latest_message["intent"].get("name")

        if intentName == "fiddler":
            randomAnswer = [
                "Here is the script for Fiddler\n{}".format(fiddlerScript),
                "Sure, here is the script for Fiddler\n{}".format(fiddlerScript),
            ]
            dispatcher.utter_message(text="Here is the script for Fiddler\n{}".format(fiddlerScript))
            return []
        elif intentName == "fiddler_another_domain":
            message = tracker.latest_message["text"]
            domainName = re.search(r'\b((?:[a-z0-9]+(?:-[a-z0-9]+)*\.)+[a-z]{2,})\b', message)
            game_name = "login.yuuki.me"
            if domainName:
                randomAnswer = [
                    "Here is the script fiddler for {}\n{}".format(domainName.group(), fiddlerScript.replace(game_name, domainName.group())),
                    "Sure, here is the fiddler script for {}\n{}".format(domainName.group(), fiddlerScript.replace(game_name, domainName.group())),
                    "Here's the Fiddler script you requested for {}\n{}".format(domainName.group(), fiddlerScript.replace(game_name, domainName.group())),
                    "Here you go! Fiddler script for {}\n{}".format(domainName.group(), fiddlerScript.replace(game_name, domainName.group())),
                    "Check out the Fiddler script for your domain, {}\n{}".format(domainName.group(), fiddlerScript.replace(game_name, domainName.group()))
                ]
            else:
                randomAnswer = [
                    "You can change `{}` to your domain".format(game_name),
                    "You can replace \"{}\" with your domain!".format(game_name),
                    "Update `{}` with your own domain name.".format(game_name),
                    "Feel free to replace `{}` with your desired domain.".format(game_name),
                    "Don't forget to change `{}` to your actual domain.".format(game_name)
                ]
            dispatcher.utter_message(text=random.choice(randomAnswer))
            return []

class ActionModGame(Action):
    def name(self) -> Text:
        return "action_mod_game"

    def run(self, dispatcher: CollectingDispatcher,
            tracker: Tracker,
            domain: Dict[Text, Any]) -> List[Dict[Text, Any]]:

        # get entities
        game_name = tracker.latest_message["entities"][0]["value"]

        randomAnswer = [
            "I don't know how to mod {}".format(game_name),
            "I don't understand what you mean by modding {}".format(game_name),
            "Unfortunately, I don't know how to mod {}".format(game_name),
            "I'm not sure how to mod {}.".format(game_name),
            "Modding {} is beyond my knowledge.".format(game_name),
            "I'm not familiar with modding {}.".format(game_name),
            "I don't have the expertise to mod {}.".format(game_name),
            "Modifying {} is not something I can help with.".format(game_name),
            "I lack the skills to mod {}.".format(game_name),
            "I'm unable to assist with modding {}.".format(game_name),
            "I don't have any experience in modding {}.".format(game_name),
            "I'm not equipped to help with modding {}.".format(game_name),
            "My knowledge doesn't extend to modding {}.".format(game_name)
        ]

        dispatcher.utter_message(text=random.choice(randomAnswer))

class ActionTellMyName(Action):
    def name(self) -> Text:
        return "action_tell_my_name"
    
    def run(self, dispatcher: CollectingDispatcher,
            tracker: Tracker,
            domain: Dict[Text, Any]) -> List[Dict[Text, Any]]:
        name = tracker.sender_id
        if name is not None:
            randomAnswer = [
                "Your name is {}.".format(name),
                "I think your name is {}.".format(name),
                "Your name appears to be {}.".format(name),
                "It seems that your name is {}.".format(name),
                "You go by the name {}.".format(name),
                "As far as I know, your name is {}.".format(name),
                "From what I understand, your name is {}.".format(name),
                "Your name, as far as I can tell, is {}.".format(name),
                "If I'm not mistaken, your name is {}.".format(name),
                "It looks like your name is {}.".format(name),
                "Based on my knowledge, your name is {}.".format(name),
                "I believe your name is {}.".format(name),
                "Your name, to the best of my knowledge, is {}.".format(name),
                "From the information I have, your name is {}.".format(name),
                "It appears that your name is {}.".format(name)
            ]
            dispatcher.utter_message(text=random.choice(randomAnswer))
        else:
            randomAnswer = [
                "I don't know your name.",
                "I'm not sure what your name is.",
                "I'm unable to determine your name.",
                "I can't seem to figure out your name.",
                "Your name is unknown to me.",
                "I'm unaware of your name.",
                "I don't have the information about your name.",
                "Your name is not something I know.",
                "I'm uncertain about your name.",
                "I can't recall your name at the moment.",
                "I'm not able to identify your name.",
                "I don't possess the knowledge of your name.",
                "I'm not familiar with your name.",
                "Your name isn't something I'm aware of.",
                "I'm unable to recognize your name."
            ]
            dispatcher.utter_message(text=random.choice(randomAnswer))
        return []

class ActionFallback(Action):
    def name(self) -> Text:
        return "action_fallback"
    
    def run(self, dispatcher: CollectingDispatcher,
            tracker: Tracker,
            domain: Dict[Text, Any]) -> List[Dict[Text, Any]]:
        
        results = search(tracker.latest_message["text"])
        
        dispatcher.utter_message(text=results)
        return []