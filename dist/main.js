var roleHarvester = require('role.harvester'),
    roleUpgrader = require('role.upgrader'),
    roleBuilder = require('role.builder'),
    checkCountCreep = require('utils.checkCountCreep');

global.greet = function(name) {
    console.log("Hello, " + name + "!");
    return 0;
};

module.exports.loop = function () {
    checkCountCreep.harvester();
    checkCountCreep.builder();
    checkCountCreep.upgrader();

    for(var name in Game.creeps) {
        var creep = Game.creeps[name];
        if(creep.memory.role == 'harvester') {
            roleUpgrader.run(creep);
             roleHarvester.run(creep);
            // roleBuilder.run(creep);
        }
        if(creep.memory.role == 'upgrader') {
            roleUpgrader.run(creep);
        }
        if(creep.memory.role == 'builder') {
            // roleUpgrader.run(creep);
            // roleHarvester.run(creep);
            roleBuilder.run(creep);
        }
    }
}
