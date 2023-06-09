import GMHandbook from "../../Utils/gm";

export default async function CustomAction(actionName: string, entity: string | undefined): Promise<{ answer: string } | undefined> {
    if (actionName !== 'command_item') return

    let answer = '';
    entity = entity?.replace(/[^\w\s]/gi, '');
    if (entity === '' || !entity) return
    const getResult = await GMHandbook.find({
        search: entity,
    })

    if (!getResult) return { answer: 'There is no result for command ' + entity }

    const commandGC = getResult.commands.gc.commands_2?.value
    const commandGIO = getResult.commands.gio.commands_2?.value

    if (!commandGC|| !commandGIO) {
        answer = 'I am not sure what the command you needed'
    } else {
        answer = `To get ${entity} you can use the command ${commandGC} in the Ayaka bots.\n\nOr if you playing on GIO server, you can use the command ${commandGIO}`
    }
    return { answer }
}