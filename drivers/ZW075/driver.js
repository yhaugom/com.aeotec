'use strict';

const path = require('path');
const ZwaveDriver = require('homey-zwavedriver');

// http://www.cd-jackson.com/index.php/zwave/zwave-device-database/zwave-device-list/devicesummary/83

module.exports = new ZwaveDriver(path.basename(__dirname), {
	capabilities: {
		onoff: [
			{
				command_class: 'COMMAND_CLASS_SWITCH_BINARY',
				command_set: 'SWITCH_BINARY_SET',
				command_set_parser: value => {
					return { 'Switch Value': value }
				}
			},
			{
				command_class: 'COMMAND_CLASS_BASIC',
				command_report: 'BASIC_REPORT',
				command_report_parser: report => {
					if (report && report.hasOwnProperty('Current Value')) return report['Current Value'] !== 0;
					if (report && report.hasOwnProperty('Value')) return report['Value'] !== 0;
				}
			}
		],
		measure_power: {
			command_class: 'COMMAND_CLASS_METER',
			command_get: 'METER_GET',
			command_get_parser: () => {
				return {
					'Sensor Type': 'Electric meter',
					'Properties1': {
						'Scale': 0
					}
				}
			},
			command_report: 'METER_REPORT',
			command_report_parser: report => report['Meter Value (Parsed)']
		}
	},
	settings: {
		current_overload_protection: {
			index: 3,
			size: 1
		},
		output_load_status: {
			index: 20,
			size: 1
		},
		notify_associated_devices: {
			index: 80,
			size: 1,
			parser: input => new Buffer([(input) ? 2 : 0])
		},
		configure_led_state: {
			index: 81,
			size: 1
		},
		min_watt_change: {
			index: 91,
			size: 4
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
		}, time_interval_1: {
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
		}
	}
});
