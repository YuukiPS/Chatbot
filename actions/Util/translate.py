from googletrans import Translator

translator = Translator()

def my_translate(text, target='en'):
    convertAllCountries = {
        'indonesian': 'id',
        'indonesia': 'id',
        'english': 'en',
        'japanese': 'ja',
        'korean': 'ko',
        'chinese': 'zh',
        'french': 'fr',
        'german': 'de',
        'russian': 'ru',
        'spanish': 'es',
        'italian': 'it',
        'portuguese': 'pt',
        'turkish': 'tr',
        'arabic': 'ar',
        'hindi': 'hi',
        'thai': 'th',
        'vietnamese': 'vi',
        'malay': 'ms',
        'persian': 'fa',
        'urdu': 'ur',
        'bengali': 'bn',
        'punjabi': 'pa',
        'gujarati': 'gu',
        'tamil': 'ta',
        'telugu': 'te',
        'kannada': 'kn',
        'marathi': 'mr',
        'javanese': 'jv',
        'sundanese': 'su',
        'amharic': 'am',
        'azerbaijani': 'az',
        'belarusian': 'be',
        'bulgarian': 'bg',
        'bosnian': 'bs',
        'catalan': 'ca',
        'croatian': 'hr',
        'czech': 'cs',
        'danish': 'da',
        'estonian': 'et',
        'filipino': 'tl',
        'finnish': 'fi',
        'greek': 'el',
        'hebrew': 'iw',
        'haitian creole': 'ht',
        'hmong': 'hmn',
        'hungarian': 'hu',
        'icelandic': 'is',
        'igbo': 'ig',
        'irish': 'ga',
        'kazakh': 'kk',
        'khmer': 'km',
        'kurdish': 'ku',
        'kyrgyz': 'ky',
        'lao': 'lo',
        'latvian': 'lv',
        'lithuanian': 'lt',
        'macedonian': 'mk',
        'malagasy': 'mg',
        'malayalam': 'ml',
        'maltese': 'mt',
        'maori': 'mi',
        'mongolian': 'mn',
        'nepali': 'ne',
        'norwegian': 'no',
        'pashto': 'ps',
        'polish': 'pl',
        'romanian': 'ro',
        'serbian': 'sr',
        'slovak': 'sk',
        'slovenian': 'sl',
        'somali': 'so',
        'swahili': 'sw',
        'swedish': 'sv',
        'tajik': 'tg',
        'tatar': 'tt',
        'tigrinya': 'ti',
        'ukrainian': 'uk',
        'uzbek': 'uz',
        'welsh': 'cy',
        'xhosa': 'xh',
        'yoruba': 'yo',
        'zulu': 'zu'
    }


    # Get the language code for the target language
    try:
        if target is not None:
            target_code = convertAllCountries[target.lower()]
        else:
            target_code = target
    except:
        return "Sorry, I don't understand what language you want translate to."

    # Translate the text to the target language
    try:
        translation = translator.translate(text, dest=target_code).text
    except Exception as e:
        print("Error translating text: " + e)
        return "Sorry, I don't understand what you mean to translate."

    return translation