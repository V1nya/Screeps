var roleUpgrader = require('role.upgrader');
var roleHarvester = {
    /** @param {Creep} creep **/
    run: function(creep) {
        if (!creep.memory.state) {
            creep.memory.state = 'harvesting';
        }

        if (creep.memory.state === 'harvesting') {
            if (creep.store.getFreeCapacity(RESOURCE_ENERGY) === 0) {
                creep.memory.state = 'replenishing';
            } else {
                // Try to harvest energy from the closest active source
                var closestSource = creep.pos.findClosestByPath(FIND_SOURCES_ACTIVE);
                if (closestSource) {
                    if (creep.harvest(closestSource) === ERR_NOT_IN_RANGE) {
                        creep.moveTo(closestSource, { visualizePathStyle: { stroke: '#ffaa00' } });
                    }
                } else {
                    // If no active sources are found, just stay in place
                    creep.say('🔄');
                }
            }
        } else {
            // State is 'replenishing'
            if (creep.store.getUsedCapacity(RESOURCE_ENERGY) < 50) {
                creep.memory.state = 'harvesting';
            } else {
                // Try to transfer energy to the closest empty extension or spawn
                var targets = creep.pos.findClosestByRange(FIND_STRUCTURES, {
                    filter: (structure) => {
                        return (structure.structureType === STRUCTURE_EXTENSION ||
                                structure.structureType === STRUCTURE_SPAWN) &&
                            structure.store.getFreeCapacity(RESOURCE_ENERGY) > 0;
                    }
                });
                if (targets) {
                    if (creep.transfer(targets, RESOURCE_ENERGY) === ERR_NOT_IN_RANGE) {
                        creep.moveTo(targets, { visualizePathStyle: { stroke: '#ffffff' } });
                    }
                } else {
                    // If no empty extensions or spawns are found, just stay in place
                    creep.say('🔄');
                }
            }
        }
    }
};

module.exports = roleHarvester;
