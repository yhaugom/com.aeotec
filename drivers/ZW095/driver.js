'use strict';

const path = require('path');
const ZwaveDriver = require('homey-zwavedriver');

// http://www.pepper1.net/zwavedb/device/815

module.exports = new ZwaveDriver(path.basename(__dirname), {
	capabilities: {
		measure_power: {
			command_class: 'COMMAND_CLASS_METER',
			command_get: 'METER_GET',
			command_get_parser: () => {
				return {
					'Sensor Type': 'Electric meter',
					'Properties1': {
						'Scale': 0
					}
				};
			},
			command_report: 'METER_REPORT',
			command_report_parser: report => report['Meter Value (Parsed)']
		}
	},
	settings: {
		energy_detection_mode: {
			index: 2,
			size: 1
		},
		toggle_automatic_reporting: {
			index: 3,
			size: 1
		},
		wattage_threshold_hem: {
			index: 4,
			size: 2
		},
		wattage_threshold_clamp1: {
			index: 5,
			size: 2
		},
		wattage_threshold_clamp2: {
			index: 6,
			size: 2
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
		}
	}
});
