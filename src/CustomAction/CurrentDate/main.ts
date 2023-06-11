
export default async function CustomAction(actionName: string, entity: string | undefined): Promise<{ answer: string } | undefined> {
    if (actionName !== 'current_date') return
    if (!entity) return
    let answer = '';

    if (entity === 'date') {
        const date = new Date();
        const day = date.getDate();
        const month = date.getMonth() + 1;
        const year = date.getFullYear();

        answer = `${day}/${month}/${year}`;
    } else if (entity === 'time') {
        const date = new Date();
        const hour = date.getHours();
        const minutes = date.getMinutes();

        answer = `${hour}:${minutes}`;
    } else {
        return
    }

    answer = `The current ${entity} is ${answer}`

    return { answer }


}