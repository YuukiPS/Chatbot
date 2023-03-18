import re
from typing import Dict

async def searchGM(search: str) -> Dict[str, str]:
    # Define the path to the file based on the category ID
    file_path = "/home/ElaXan/Project/discordBot/gm/gm.txt"
    
    try:
        # Read the file
        with open(file_path, 'r') as fileStream:
            rl = fileStream.readlines()
            matchFound = False
            category = ""
            
            # Search for the name
            for line in rl:
                # get the category starting with "//"
                if line.startswith("//"):
                    category = line.replace("//", "").strip()
                    # Check if the line contains the search term
                regex = re.compile(re.escape(search), re.IGNORECASE)
                if regex.search(line):
                    matchFound = True
                    # Get the id and name
                    id = line.split(":")[0].strip()
                    name = line.split(":")[1].strip()
                    return {
                        "id": id,
                        "name": name,
                        "category": category
                    }

            # If not found
            if not matchFound:
                return {
                    "id": "Not Found",
                    "name": "Not Found",
                    "category": "Not Found"
                }
    except Exception as error:
        # If error
        print(error)
        # return the error
        return {
            "id": "Error",
            "name": "Error",
            "category": "Error"
        }
