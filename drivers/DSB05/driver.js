'use strict';
const path = require('path');
const ZwaveDriver = require('homey-zwavedriver');
// http://www.cd-jackson.com/zwave_device_uploads/355/9-Multisensor-6-V1-07.pdf

module.exports = new ZwaveDriver(path.basename(__dirname), {
	capabilities: {
		measure_battery: {
			command_class: 'COMMAND_CLASS_BATTERY',
			command_report: 'BATTERY_REPORT',
			command_report_parser: function (report) {
				if (report['Battery Level (Raw)']) {
					return report['Battery Level (Raw)'][0];
				} else {
					return null;
				}
			}
		},
		alarm_motion: {
			command_class: 'COMMAND_CLASS_BASIC',
			command_report: 'BASIC_SET',
			command_report_parser: function (report) {
				return report['Value'] === 255;
			}
		},
		measure_temperature: {
			command_class: 'COMMAND_CLASS_SENSOR_MULTILEVEL',
			command_report: 'SENSOR_MULTILEVEL_REPORT',
			command_report_parser: function (report) {
				if (report['Sensor Type'] === 'Temperature (version 1)')
					return report['Sensor Value (Parsed)'];
				return null;
			}

		},
		measure_luminance: {
			command_class: 'COMMAND_CLASS_SENSOR_MULTILEVEL',
			command_report: 'SENSOR_MULTILEVEL_REPORT',
			command_report_parser: function (report) {
				if (report['Sensor Type'] === 'Luminance (version 1)') {
					return report['Sensor Value (Parsed)'];
				} else {
					return null;
				}
			}
		},
		measure_humidity: {
			command_class: 'COMMAND_CLASS_SENSOR_MULTILEVEL',
			command_report: 'SENSOR_MULTILEVEL_REPORT',
			command_report_parser: function (report) {
				if (report['Sensor Type'] === 'Relative humidity (version 2)') {
					return report['Sensor Value (Parsed)'];
				} else {
					return null;
				}
			}
		}
	},
	settings: {
		sensor_report_type_on_get_without_instances: {
			index: 1,
			size: 1
		},
		wake_up_for_10_minutes_when_batteries_are_inserted: {
			index: 2,
			size: 1
		},
		on_time: {
			index: 3,
			size: 2
		},
		enable_motion_sensor: {
			index: 1,
			size: 1
		},
		send_unsolicited_reports_periodicaly_interval_group_1: {
			index: 101,
			size: 4
		},
		send_unsolicited_reports_periodicaly_interval_group_2: {
			index: 102,
			size: 4
		},
		send_unsolicited_reports_periodicaly_interval_group_3: {
			index: 103,
			size: 4
		},
		unsolicitate_reports_interval_for_timing_groups_1: {
			index: 111,
			size: 4
		},
		unsolicitate_reports_interval_for_timing_groups_2: {
			index: 112,
			size: 4
		},
		unsolicitate_reports_interval_for_timing_groups_3: {
			index: 113,
			size: 4
		}
	}
});