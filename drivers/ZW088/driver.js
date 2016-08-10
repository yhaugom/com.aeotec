'use strict';

const path = require('path');
const ZwaveDriver = require('homey-zwavedriver');

// http://www.pepper1.net/zwavedb/device/833

module.exports = new ZwaveDriver(path.basename(__dirname), {
	capabilities: {
		onoff: {
			command_class: 'COMMAND_CLASS_BATTERY',
			command_get: 'BATTERY_GET',
			command_report: 'BATTERY_REPORT',
			command_report_parser: report => {
				console.log('REPORT');
				console.log(report);
			}
		},
		measure_battery: {
			command_class: 'COMMAND_CLASS_BATTERY',
			command_get: 'BATTERY_GET',
			command_report: 'BATTERY_REPORT',
			command_report_parser: report => {
				console.log('REPORT');
				console.log(report['Battery Level (Raw)']);
				console.log(report['Battery Level (Raw)'][0]);
				return report['Battery Level (Raw)'][0];
			}
		}
	},
	settings: {
		mode_control: {
			index: 250,
			size: 1,
			parser: input => new Buffer([Number(input)])
		}
	}
});
