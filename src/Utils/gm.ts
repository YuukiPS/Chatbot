import axios from 'axios'

// This code using from Repository Takina to find the id in GM Handbook. That people use it with a slash command `/gm`

interface Commands {
    [key: string]: {
        [key: string]: {
            name: string;
            value: string;
        }
    }
}

interface Result {
    id: string;
    name: string;
    category: string;
}

interface Response {
    result: Result;
    image: string;
    commands: Commands;
}

interface query {
    search: string,
    category?: string,
    match?: boolean
}

export default class GMHandbook {
    public result: Result;
    public image: string;
    public commands: Commands;

    constructor(response: Response) {
        this.result = response.result;
        this.image = response.image;
        this.commands = response.commands;
    }

    public static async find(query: query): Promise<GMHandbook | null> {
        const response = await axios.post('https://api.elaxan.com/gm', query).then((item) => {
            return item.data
        })
        if (!response) {
            return null;
        }
        return new GMHandbook(response)
    }
}
