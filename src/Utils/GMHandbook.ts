import fs from 'fs';

export type CommandCategory = 'Avatars' | 'Artifacts' | 'Monsters' | 'Materials' | 'Achievements' | 'Quests' | 'Scenes' | 'Dungeons';

export interface Command {
    gc: {
        [key: string]: {
            name: string;
            value: string | (() => string);
        }
    },
    gio: {
        [key: string]: {
            name: string;
            value: string | (() => string);
        }
    }
}

export interface GMHandbookData {
    id: number;
    name: string;
    description?: string | undefined;
    rarity?: number | undefined;
    category: CommandCategory;
    command: Command;
    image?: string | undefined;
}

export interface MainData {
    name: string;
    description: string;
    data: GMHandbookData[];
}

export interface AutocompleteResponse {
    name: string;
    value: string;
}

/**
 * The `GMHandbookUtility` class is responsible for loading data from JSON files and generating commands based on the loaded data.
 * It also provides a method for filtering the loaded data based on a search string.
 *
 * Example Usage:
 * ```javascript
 * // Load the data and generate commands
 * GMHandbookUtility.load();
 *
 * // Filter the loaded data based on a search string
 * const search = 'kamisato';
 * const autocompleteSuggestions = GMHandbookUtility.autocomplete(search);
 * console.log(autocompleteSuggestions);
 * ```
 *
 * Main functionalities:
 * - Load data from JSON files
 * - Generate commands based on the loaded data
 * - Filter the loaded data based on a search string
 *
 * Methods:
 * - `load()`: Loads data from JSON files and generates commands based on the loaded data.
 * - `getCommand(id: string | number, category: CommandCategory): Command`: Retrieves a Command object based on the provided id and category.
 * - `autocomplete(search: string): AutocompleteResponse[]`: Filters the loaded data based on a search string and returns an array of autocomplete suggestions.
 */
class GMHandbookUtility {
    private static readonly data: MainData = JSON.parse(fs.readFileSync('./src/data/gmhandbook.json', 'utf-8'));

    /**
     * Filters the GMData array based on a search string and returns an array of autocomplete suggestions.
     * 
     * @param search - The search string to filter the autocomplete suggestions.
     * @returns An array of autocomplete response objects. Each object has a `name` property that combines the `name` and `category` properties of the data object, and a `value` property that is the `name` property of the data object.
     */
    public static autocomplete(search: string): AutocompleteResponse[] {
        return this.data.data.filter(data => data.name?.toLowerCase().includes(search.toLowerCase()))
            .map(data => ({
                name: `${data.name} (${data.category})`,
                value: data.name,
            }));
    }

    /**
     * Searches for data in the GMData array based on a given name.
     * 
     * @param name - The name to search for in the GMData array.
     * @returns An array of GMHandbookData objects that match the search criteria.
     */
    public static find(name: string): GMHandbookData[] {
        const search = name.toLowerCase();
        return this.data.data.filter(data => data.name?.toLowerCase().includes(search));
    }
}

export default GMHandbookUtility;