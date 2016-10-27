'use strict';

const path = require('path');
const ZwaveDriver = require('homey-zwavedriver');

// http://www.cd-jackson.com/zwave_device_uploads/355/9-Multisensor-6-V1-07.pdf

module.exports = new ZwaveDriver(path.basename(__dirname), {
	capabilities: {
		measure_battery: {
			command_class: 'COMMAND_CLASS_BATTERY',
			command_get: 'BATTERY_GET',
			command_report: 'BATTERY_REPORT',
			command_report_parser: report => {
				if (report['Battery Level'] === "battery low warning")
					return 1;
				
				return report['Battery Level (Raw)'][0];
			}
		},
		
		alarm_motion: {
			command_class: 'COMMAND_CLASS_SENSOR_BINARY',
			command_get: 'SENSOR_BINARY_GET',
			command_report: 'SENSOR_BINARY_REPORT',
			command_report_parser: report => report['Sensor Value'] === 'detected an event'
		},
		
		measure_temperature: {
			command_class: 'COMMAND_CLASS_SENSOR_MULTILEVEL',
			command_get_parser: () => {
				return {
					'Sensor Type': 'Temperature (version 1)',
					'Properties1': {
						'Scale': 0
					}
				}
			},
			command_report: 'SENSOR_MULTILEVEL_REPORT',
			command_report_parser: report => {
				if (report['Sensor Type'] === 'Temperature (version 1)')
					return report['Sensor Value (Parsed)'];
				
				return null;
			}
		},
		
		measure_luminance: {
			command_class: 'COMMAND_CLASS_SENSOR_MULTILEVEL',
			command_get_parser: () => {
				return {
					'Sensor Type': 'Luminance (version 1)',
					'Properties1': {
						'Scale': 1
					}
				}
			},
			command_report: 'SENSOR_MULTILEVEL_REPORT',
			command_report_parser: report => {
				if (report['Sensor Type'] === 'Luminance (version 1)')
					return report['Sensor Value (Parsed)'];
				
				return null;
			}
		},
		
		measure_humidity: {
			command_class: 'COMMAND_CLASS_SENSOR_MULTILEVEL',
			command_get_parser: () => {
				return {
					'Sensor Type': 'Relative humidity (version 2)',
					'Properties1': {
						'Scale': 0
					}
				}
			},
			command_report: 'SENSOR_MULTILEVEL_REPORT',
			command_report_parser: report => {
				if (report['Sensor Type'] === 'Relative humidity (version 2)')
					return report['Sensor Value (Parsed)'];
				
				return null;
			}
		},
		
		measure_ultraviolet: {
			command_class: 'COMMAND_CLASS_SENSOR_MULTILEVEL',
			command_get_parser: () => {
				return {
					'Sensor Type': 'Ultraviolet (v5)',
					'Properties1': {
						'Scale': 0
					}
				}
			},
			command_report: 'SENSOR_MULTILEVEL_REPORT',
			command_report_parser: report => {
				if (report['Sensor Type'] === 'Ultraviolet (v5)')
					return report['Sensor Value (Parsed)'];
				
				return null;
			}
		},
	},
	settings: {
		2: {
			index: 2,
			size: 1,
		},
		4: {
			index: 4,
			size: 1
		},
		3: {
			index: 3,
			size: 2
		},
		39: {
			index: 39,
			size: 1
		},
		40: {
			index: 40,
			size: 1,
		},
		41: {
			index: 41,
			size: 2,
			parser: input => new Buffer([input, 1])
		},
		42: {
			index: 42,
			size: 1
		},
		43: {
			index: 43,
			size: 2
		},
		44: {
			index: 44,
			size: 1
		},
		45: {
			index: 45,
			size: 1
		},
		102: {
			index: 102,
			size: 4
		},
		103: {
			index: 103,
			size: 4
		},
		111: {
			index: 111,
			size: 4
		},
		112: {
			index: 112,
			size: 4
		},
		113: {
			index: 113,
			size: 4
		},
		201: {
			index: 201,
			size: 2,
		},
		202: {
			index: 202,
			size: 1
		},
		203: {
			index: 203,
			size: 2
		},
		204: {
			index: 204,
			size: 1
		}
	}
});
