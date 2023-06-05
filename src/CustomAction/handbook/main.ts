import GMHandbook from '../../Utils/gm';

export default async function CustomAction(actionName: string, entity: string | undefined): Promise<{ answer: string } | undefined> {

    if (actionName !== 'get_id_item') return
    let answer = ''

    entity = entity?.replace(/[^\w\s]/gi, '');

    if (!entity) {
        answer = `I don't understand what you looking for.`
    } else {
        const result = await GMHandbook.find({
            search: entity
        })
    
        const getId = result ? result.result.id : 'Error API'
    
        if (!getId || getId === 'Not Found') {
            answer = `We could't find the id for "${entity}" in the GM Handbook, Can you tell me what you trying to the ID?`
        } else if (getId === 'Error API') {
            answer = `There was an error with the API`
        } else {
            answer = `The id for ${entity} is ${getId}`
        }
    }

    return { answer };
}