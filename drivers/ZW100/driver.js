'use strict';

const path = require('path');
const ZwaveDriver = require('homey-zwavedriver');

// http://www.cd-jackson.com/zwave_device_uploads/355/9-Multisensor-6-V1-07.pdf

// TODO check report group settings, values are probably wrong

module.exports = new ZwaveDriver(path.basename(__dirname), {
	debug: true,
	capabilities: {
		alarm_battery: {},
		measure_battery: {},
		alarm_motion: {},
		measure_temperature: {},
		measure_luminance: {},
		measure_humidity: {},
		alarm_tamper: {},
		measure_ultraviolet: {},
	},
	settings: {
		wake_up_after_repower: {
			index: 2,
			size: 1,
			parser: input => new Buffer([(input) ? 1 : 0])
		},
		pir_off_time: {
			index: 3,
			size: 2,
			parser: input => new Buffer([0, Number(input)])
		},
		motion_sensor_trigger_command: {
			index: 5,
			size: 1,
			parser: input => new Buffer([Number(input)])
		},
		low_battery_value: {
			index: 39,
			size: 1,
			parser: input => new Buffer([input])
		},
		report_group_1: {
			index: 101,
			size: 4,
			parser: input => new Buffer([0, 0, 0, Number(input)])
		},
		report_group_2: {
			index: 102,
			size: 4,
			parser: input => new Buffer([0, 0, 0, Number(input)])
		},
		report_group_3: {
			index: 103,
			size: 4,
			parser: input => new Buffer([0, 0, 0, Number(input)])
		},
		time_interval_1: {
			index: 111,
			size: 4,
			parser: input => new Buffer([0, 0, 0, Number(input)])
		},
		time_interval_2: {
			index: 112,
			size: 4,
			parser: input => new Buffer([0, 0, 0, Number(input)])
		},
		time_interval_3: {
			index: 113,
			size: 4,
			parser: input => new Buffer([0, 0, 0, Number(input)])
		}
	}
});
