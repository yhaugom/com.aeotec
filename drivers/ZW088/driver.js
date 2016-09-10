'use strict';

const path = require('path');
const ZwaveDriver = require('homey-zwavedriver');

// http://www.pepper1.net/zwavedb/device/833

module.exports = new ZwaveDriver(path.basename(__dirname), {
	capabilities: {
		measure_battery: {
			command_class: 'COMMAND_CLASS_BATTERY',
			command_get: 'BATTERY_GET',
			command_report: 'BATTERY_REPORT',
			command_report_parser: report => {
				return report['Battery Level (Raw)'][0];
			}
		}
	},
	settings: {
		mode_control: {
			index: 250,
			size: 1
		}
	}
});
