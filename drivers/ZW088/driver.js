'use strict';

const path = require('path');
const ZwaveDriver = require('homey-zwavedriver');

// http://www.pepper1.net/zwavedb/device/609

module.exports = new ZwaveDriver(path.basename(__dirname), {
	capabilities: {
		measure_battery: {
			command_class: 'COMMAND_CLASS_BATTERY',
			command_get: 'BATTERY_GET',
			command_report: 'BATTERY_REPORT',
			command_report_parser: report => {
				return report['Battery Level (Raw)'][0];
			},
			pollInterval: 'poll_interval'
		}
	}
});

module.exports.on('initNode', function (token) {
	let node = module.exports.nodes[token];
	if (node) {
		node.instance.CommandClass['COMMAND_CLASS_SCENE_ACTIVATION'].on('report', (command, report) => {
			if (command.name === 'SCENE_ACTIVATION_SET') {

				var triggerMap = {
					'1': 'press_1',
					'2': 'hold_1',
					'3': 'press_2',
					'4': 'hold_2',
					'5': 'press_3',
					'6': 'hold_3',
					'7': 'press_4',
					'8': 'hold_4'
				}

				var triggerId = triggerMap[ report['Scene ID'] ];
				if (triggerId) {
					Homey.manager('flow').triggerDevice(`zw088_${triggerId}`, null, null, node.device_data);
				}
			}
		});
	}
});