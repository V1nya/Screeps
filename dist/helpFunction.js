
global.help = function () {
    return "showStatusForName(' name_creep ')\n" +
        "showStatusColony()\n"
}

global.showStatusForName = function (name) {


    try {
        let creep = Game.creeps[name]
        let bodyCounts = []

        for (const bodyPart of creep.body) {
            const bodyType = bodyPart.type;
            bodyCounts[bodyType] = (bodyCounts[bodyType] || 0) + 1;
        }

        let body = ""
        for (const bodyType in bodyCounts) {
            body += `
${bodyType.toLocaleUpperCase()}: ${bodyCounts[bodyType]}`
        }
        return `
Name:${name}
Role:${creep.memory.role}
Ticks to live:${creep.ticksToLive}
Helalt:${creep.hits}${body}
`
    } catch (e) {
        return `I don't have this creep with name:${name}`

    }

};

global.showStatusColony = function () {
    let harvesters = _.filter(Game.creeps, (creep) => creep.memory.role == 'harvester');
    let builders = _.filter(Game.creeps, (creep) => creep.memory.role == 'builder');
    let updraders = _.filter(Game.creeps, (creep) => creep.memory.role == 'upgrader');

    return `
All members Colony: ${harvesters.length + builders.length + updraders.length}
Harvesters:${harvesters.length}
Builders:${builders.length}
Upgraders:${updraders.length}`
}


module.exports = {
    showStatusForName,
    showStatusColony,
    help
};