from duckduckgo_search import ddg
import random

def search(keywords):
    final = None
    if keywords == "":
        return "I'm sorry, I didn't understand that."
    while not final:
        try:
            results = ddg(keywords, region='us-en', safesearch='moderate', time='y')
        except:
            return "After searching the internet, I couldn't find anything."
            break
        else:
            for result in results:
                body = result['body']
                if not body.endswith('...'):
                    randomAnswer = [
                        "According to my online sources:",
                        "Based on what I've read online:",
                        "According to the web:",
                        "As per my online research:",
                        "Based on my online findings:",
                        "According to the online resources I consulted:",
                        "Based on what I discovered online:",
                        "As per my online investigations:",
                        "According to the information available online:",
                        "Based on the online research I conducted:",
                        "As per my online analysis:",
                        "Based on my internet search:",
                        "According to my internet findings:",
                        "Based on what I found online:",
                        "As per the online sources I consulted:",
                        "Based on the online information I gathered:",
                        "According to what I uncovered online:",
                        "As per the results of my online search:",
                        "Based on the online data I collected:",
                        "According to my web research:"
                    ]

                    final = random.choice(randomAnswer) + "\n\n" + body
                    break
            else:
                continue
            break
    return final
