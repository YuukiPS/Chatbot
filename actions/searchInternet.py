from duckduckgo_search import ddg

def search(keywords):
    final = None
    while not final:
        results = ddg(keywords, region='us-en', safesearch='moderate', time='y')
        for result in results:
            body = result['body']
            if not body.endswith('...'):
                final = body
                break
        else:
            continue
        break
    return final
