var Harvester = {
    count: 3,
    settings: [WORK, WORK, CARRY, CARRY, CARRY, CARRY, MOVE, MOVE, MOVE]
}
var Builder = {
    count: 3,
    settings: [WORK, WORK, CARRY, CARRY, CARRY, CARRY , MOVE, MOVE]
}

var Upgrader = {
    count: 1,
    settings: [WORK, WORK, CARRY, CARRY, CARRY, CARRY, CARRY, MOVE]
}


module.exports = {
    harvester: function () {
        for (var name in Memory.creeps) {
            if (!Game.creeps[name]) {
                delete Memory.creeps[name];
                console.log('Clearing non-existing creep memory:', name);
            }
        }
        let harvesters = _.filter(Game.creeps, (creep) => creep.memory.role == 'harvester');

        if (harvesters.length < Harvester.count) {
            var newName = 'Harvester' + Game.time;
            let res = Game.spawns['Spawn1'].spawnCreep(Harvester.settings, newName,
                {memory: {role: 'harvester'}});
            if (res === 0)
                console.log('Spawning new harvester: ' + newName);

        }

        if (Game.spawns['Spawn1'].spawning) {
            var spawningCreep = Game.creeps[Game.spawns['Spawn1'].spawning.name];
            Game.spawns['Spawn1'].room.visual.text(
                '🛠️' + spawningCreep.memory.role,
                Game.spawns['Spawn1'].pos.x + 1,
                Game.spawns['Spawn1'].pos.y,
                {align: 'left', opacity: 0.8});
        }
    },

    builder: function () {
        for (var name in Memory.creeps) {
            if (!Game.creeps[name]) {
                delete Memory.creeps[name];
                console.log('Clearing non-existing creep memory:', name);
            }
        }

        let builders = _.filter(Game.creeps, (creep) => creep.memory.role == 'builder');
        if (builders.length < Builder.count) {
            var newName = 'Builder' + Game.time;
            var res = Game.spawns['Spawn1'].spawnCreep(Builder.settings, newName,
                {memory: {role: 'builder'}});
            if (res == 0)
                console.log('Spawning new builder: ' + newName);


        }

        if (Game.spawns['Spawn1'].spawning) {
            var spawningCreep = Game.creeps[Game.spawns['Spawn1'].spawning.name];
            Game.spawns['Spawn1'].room.visual.text(
                '🛠️' + spawningCreep.memory.role,
                Game.spawns['Spawn1'].pos.x + 1,
                Game.spawns['Spawn1'].pos.y,
                {align: 'left', opacity: 0.8});
        }
    },
    upgrader: function () {
        for (var name in Memory.creeps) {
            if (!Game.creeps[name]) {
                delete Memory.creeps[name];
                console.log('Clearing non-existing creep memory:', name);
            }
        }

        let updraders = _.filter(Game.creeps, (creep) => creep.memory.role == 'upgrader');

        if (updraders.length < Upgrader.count) {
            var newName = 'Upgrader' + Game.time;

            let res = Game.spawns['Spawn1'].spawnCreep(Upgrader.settings, newName,
                {memory: {role: 'upgrader'}});
            if (res == 0)
                console.log('Spawning new builder: ' + newName);
        }

        if (Game.spawns['Spawn1'].spawning) {
            var spawningCreep = Game.creeps[Game.spawns['Spawn1'].spawning.name];
            Game.spawns['Spawn1'].room.visual.text(
                '🛠️' + spawningCreep.memory.role,
                Game.spawns['Spawn1'].pos.x + 1,
                Game.spawns['Spawn1'].pos.y,
                {align: 'left', opacity: 0.8});
        }
    },

};