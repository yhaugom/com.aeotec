'use strict';

const path = require('path');
const ZwaveDriver = require('homey-zwavedriver');

// http://www.cd-jackson.com/zwave_device_uploads/355/9-Multisensor-6-V1-07.pdf

module.exports = new ZwaveDriver(path.basename(__dirname), {
	capabilities: {
		measure_battery: {
			command_class: 'COMMAND_CLASS_BATTERY',
			command_get_parser: () => {
				return {
					'Sensor Type': 'Electric meter',
					'Properties1': {
						'Scale': 0
					}
				}
			},
			command_report: 'BATTERY_REPORT',
			command_report_parser: report => {
				if (report['Battery Level (Raw)']) return report['Battery Level (Raw)'][0];
				return null;
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
				if (report['Sensor Type'] === 'Temperature (version 1)') return report['Sensor Value (Parsed)'];
				return null;
			}
		},
		measure_luminance: {
			command_class: 'COMMAND_CLASS_SENSOR_MULTILEVEL',
			command_get_parser: () => {
				return {
					'Sensor Type': 'Luminance (version 1)',
					'Properties1': {
						'Scale': 0
					}
				}
			},
			command_report: 'SENSOR_MULTILEVEL_REPORT',
			command_report_parser: report => {
				if (report['Sensor Type'] === 'Luminance (version 1)') return report['Sensor Value (Parsed)'];
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
				if (report['Sensor Type'] === 'Relative humidity (version 2)') return report['Sensor Value (Parsed)'];
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
				if (report['Sensor Type'] === 'Ultraviolet (v5)') return report['Sensor Value (Parsed)'];
				return null;
			}
		},
	},
	settings: {
		wake_up_after_repower: {
			index: 2,
			size: 1
		},
		pir_sensitivity: {
			index: 4,
			size: 1
		},
		pir_off_time: {
			index: 3,
			size: 2
		},
		motion_sensor_trigger_command: {
			index: 5,
			size: 1
		},
		low_battery_value: {
			index: 39,
			size: 1
		},
		selective_reporting: {
			index: 40,
			size: 1
		},
		temperature_threshold: {
			index: 41,
			size: 2,
			parser: input => new Buffer([input * 10, 1])
		},
		humidity_threshold: {
			index: 42,
			size: 1
		},
		luminance_threshold: {
			index: 43,
			size: 2
		},
		battery_threshold: {
			index: 44,
			size: 1
		},
		report_group_1: {
			index: 101,
			size: 4
		},
		report_group_2: {
			index: 102,
			size: 4
		},
		report_group_3: {
			index: 103,
			size: 4
		},
		time_interval_1: {
			index: 111,
			size: 4
		},
		time_interval_2: {
			index: 112,
			size: 4
		},
		time_interval_3: {
			index: 113,
			size: 4
		},
		temperature_calibration: {
			index: 201,
			size: 2,
			parser: input => new Buffer([input * 10, 1])
		},
		humidity_calibration: {
			index: 202,
			size: 1
		},
		luminance_calibration: {
			index: 203,
			size: 2
		},
		ultraviolet_calibration: {
			index: 204,
			size: 1
		}
	}
});
