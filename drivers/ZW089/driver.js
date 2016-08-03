'use strict';

const path = require('path');
const ZwaveDriver = require('homey-zwavedriver');

// http://www.pepper1.net/zwavedb/device/833

module.exports = new ZwaveDriver(path.basename(__dirname), {
	capabilities: {
		alarm_contact: {
			command_class: 'COMMAND_CLASS_SENSOR_BINARY',
			command_get: 'SENSOR_BINARY_GET',
			command_report: 'SENSOR_BINARY_REPORT',
			command_report_parser: report => report['Sensor Value'] === 'detected an event'
		},
		measure_battery: {
			command_class: 'COMMAND_CLASS_BATTERY',
			command_get: 'BATTERY_GET',
			command_report: 'BATTERY_REPORT',
			command_report_parser: report => {
				if (report['Battery Level'] === 'battery low warning') return 1;
				return report['Battery Level (Raw)'][0];
			}
		}
	},
	settings: {
		'parameter-1': {
			index: 1,
			size: 1,
			parser: input => new Buffer([parseInt(input)])
		},
		'parameter-101': {
			index: 101,
			size: 1,
			parser: input => new Buffer([parseInt(input)])
		},
		'parameter-121': {
			index: 121,
			size: 4,
			parser: input => new Buffer([parseInt(input)])
		}
	}
});
