var roleBuilder = {
    /** @param {Creep} creep **/
    run: function(creep) {
        if (creep.memory.building && creep.store[RESOURCE_ENERGY] == 0) {
            creep.memory.building = false;
            creep.say('🔄 harvest');
        }
        if (!creep.memory.building && creep.store.getFreeCapacity() == 0) {
            creep.memory.building = true;
            creep.say('🚧 build');
        }

        if (creep.memory.building) {
            var targets = creep.room.find(FIND_CONSTRUCTION_SITES);
            if (targets.length > 0) {
                if (creep.build(targets[0]) == ERR_NOT_IN_RANGE) {
                    creep.moveTo(targets[0], {
                        visualizePathStyle: { stroke: '#ffffff' }
                    });
                }
            } else {
                // Если нет строительных площадок, трудяга переключится на роль сборщика (harvester) и будет доставлять энергию к контроллеру
                roleHarvester.run(creep);
            }
        } else {
            // Если крип не занят строительством, выбираем источник для сбора энергии
            if (!creep.memory.sourceId) {
                var sources = creep.room.find(FIND_SOURCES);
                var targetSource = null;

                // Перебираем все источники и выбираем свободный, если таковой есть
                for (var i = 0; i < sources.length; i++) {
                    var source = sources[i];
                    var creepsAtSource = source.pos.findInRange(FIND_MY_CREEPS, 1, {
                        filter: (c) => c.memory.role == 'builder' && c.id !== creep.id
                    });

                    if (creepsAtSource.length === 0) {
                        targetSource = source;
                        break;
                    }
                }

                // Если свободный источник найден, сохраняем его ID в памяти крипа
                if (targetSource) {
                    creep.memory.sourceId = targetSource.id;
                } else {
                    // Если свободных источников нет, трудяга стоит на месте
                    creep.say('🚫 no source');
                    return;
                }
            }

            // Получаем объект источника из сохраненного ID
            var targetSource = Game.getObjectById(creep.memory.sourceId);

            // Собираем энергию, если источник существует и в нем есть энергия
            if (targetSource && targetSource.energy > 0) {
                if (creep.harvest(targetSource) == ERR_NOT_IN_RANGE) {
                    creep.moveTo(targetSource, {
                        visualizePathStyle: { stroke: '#ffaa00' }
                    });
                }
            } else {
                // Если источник исчерпан, сбрасываем сохраненный ID и переключаем трудягу на режим строительства
                creep.memory.sourceId = null;
                creep.memory.building = true;
            }
        }
    }
};

module.exports = roleBuilder;
