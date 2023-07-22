var roleUpgrader = {

    /** @param {Creep} creep **/
    run: function(creep) {
        if (!creep.memory.upgrading && creep.store.getFreeCapacity(RESOURCE_ENERGY) > 0) {
            // Крип не улучшает контроллер и у него есть свободное место для энергии
            var sources = creep.room.find(FIND_SOURCES);
            if (creep.harvest(sources[0]) == ERR_NOT_IN_RANGE) {
                creep.moveTo(sources[0]);
            }
        }
        else {
            // Крип либо улучшает контроллер, либо у него нет свободного места для энергии
            creep.memory.upgrading = true; // Устанавливаем флаг "улучшает контроллер"

            if (creep.store[RESOURCE_ENERGY] == 0) {
                creep.memory.upgrading = false; // Если энергия закончилась, сбрасываем флаг
            }
            else {
                // Если у крипа есть энергия, идем улучшать контроллер
                if (creep.upgradeController(creep.room.controller) == ERR_NOT_IN_RANGE) {
                    creep.moveTo(creep.room.controller);
                }
            }

            if (!creep.memory.upgrading) {
                // Если у крипа нет энергии, идем заполняться
                var sources = creep.room.find(FIND_SOURCES);
                if (creep.harvest(sources[0]) == ERR_NOT_IN_RANGE) {
                    creep.moveTo(sources[0]);
                }
            }
        }
    }
};

module.exports = roleUpgrader;
