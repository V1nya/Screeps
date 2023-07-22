var roleUpgrader = require('role.upgrader');
var roleHarvester = {
    /** @param {Creep} creep **/
    run: function(creep) {
        if (creep.store.getFreeCapacity() > 0) {
            // Найдем ближайший свободный источник
            var closestSource = creep.pos.findClosestByPath(FIND_SOURCES_ACTIVE);
            if (closestSource) {
                if (creep.harvest(closestSource) == ERR_NOT_IN_RANGE) {
                    creep.moveTo(closestSource, { visualizePathStyle: { stroke: '#ffaa00' } });
                }
            } else {
                // Если не нашли активных источников, просто стоим на месте
                creep.say('🔄');
                return null;
            }
        } else {
            var targets = creep.room.find(FIND_STRUCTURES, {
                filter: (structure) => {
                    return (structure.structureType == STRUCTURE_EXTENSION || structure.structureType == STRUCTURE_SPAWN) &&
                        structure.store.getFreeCapacity(RESOURCE_ENERGY) > 0;
                }
            });
            if (targets.length > 0) {
                if (creep.transfer(targets[0], RESOURCE_ENERGY) == ERR_NOT_IN_RANGE) {
                    creep.moveTo(targets[0], { visualizePathStyle: { stroke: '#ffffff' } });
                }
            } else {
                // Если не нашли структур для переноски энергии, просто стоим на месте
                // roleUpgrader.run(creep);
                creep.say('Stay');
                return null;
            }
        }
    }
};

module.exports = roleHarvester;
