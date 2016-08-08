'use strict';

const path = require('path');
const ZwaveDriver = require('homey-zwavedriver');

// http://products.z-wavealliance.org/products/1003
// http://www.pepper1.net/zwavedb/device/637

module.exports = new ZwaveDriver(path.basename(__dirname), {
	capabilities: {
		alarm_water: {
			command_class: 'COMMAND_CLASS_SENSOR_BINARY', 
 			command_get: 'SENSOR_BINARY_GET', 
 			command_report: 'SENSOR_BINARY_REPORT',
 			command_report_parser: report => {
				 if( report['Sensor Value'] !== 'detected an event') return false;
				 	return true;
			 }
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
		sensor_binary_report: {
			index: 1,
			size: 1,
			parser: input => new Buffer([Number(input)])
		},
		Reports_that_will_be_sent: {
			index: 121,
			size: 4,
			parser: input => new Buffer([0, 0, 0, Number(input)])
		}
	}
});
