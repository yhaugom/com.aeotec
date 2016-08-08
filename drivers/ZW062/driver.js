'use strict';

const path = require('path');
const ZwaveDriver = require('homey-zwavedriver');

// https://s3.amazonaws.com/cdn.freshdesk.com/data/helpdesk/attachments/production/6009584687/original/16%20Garage%20Door%20Controller%20Gen5.pdf?X-Amz-Algorithm=AWS4-HMAC-SHA256&X-Amz-Credential=AKIAJ2JSYZ7O3I4JO6DA%2F20160808%2Fus-east-1%2Fs3%2Faws4_request&X-Amz-Date=20160808T125747Z&X-Amz-Expires=300&X-Amz-Signature=6cb55207d2d498b7719c2ac11f305a6630a727870a1adcae149f0edb96f9771b&X-Amz-SignedHeaders=Host&response-content-type=application%2Fpdf

module.exports = new ZwaveDriver(path.basename(__dirname), {
	debug: true,
	capabilities: {
		locked: [{
			command_class: 'COMMAND_CLASS_BARRIER_OPERATOR',
			command_get: 'BARRIER_OPERATOR_GET',
			command_report: 'BARRIER_OPERATOR_REPORT',
			command_report_parser: report => (report['State'] !== 'Closed'),
			command_set: 'BARRIER_OPERATOR_SET',
			command_set_parser: input => {
				return {
					'Target Value': (input) ? 'OPEN' : 'CLOSE'
				};
			}
		}]
	},
	settings: {
		startup_ringtone: {
			index: 32,
			size: 1,
			parser: input => new Buffer([(input) ? 1 : 0])
		},
		sensor_calibration: {
			index: 24,
			size: 1,
			parser: input => new Buffer([(input) ? 1 : 0])
		},
		opening_alarm_mode_led_frequency: {
			index: 37,
			size: 4,
			parser: (input, newSettings) => new Buffer([
				Number(input),
				Number(newSettings.opening_alarm_mode_sound),
				Number(newSettings.opening_alarm_mode_volume),
				Number(newSettings.opening_alarm_enabled)
			])
		},
		opening_alarm_mode_sound: {
			index: 37,
			size: 4,
			parser: (input, newSettings) => new Buffer([
				Number(newSettings.opening_alarm_mode_led_frequency),
				Number(input),
				Number(newSettings.opening_alarm_mode_volume),
				Number(newSettings.opening_alarm_enabled)
			])
		},
		opening_alarm_mode_volume: {
			index: 37,
			size: 4,
			parser: (input, newSettings) => new Buffer([
				Number(newSettings.opening_alarm_mode_led_frequency),
				Number(newSettings.opening_alarm_mode_sound),
				Number(input),
				Number(newSettings.opening_alarm_enabled)
			])
		},
		opening_alarm_enabled: {
			index: 37,
			size: 4,
			parser: (input, newSettings) => new Buffer([
				Number(newSettings.opening_alarm_mode_led_frequency),
				Number(newSettings.opening_alarm_mode_sound),
				Number(newSettings.opening_alarm_mode_volume),
				Number(input)
			])
		},
		closing_alarm_mode_led_frequency: {
			index: 38,
			size: 4,
			parser: (input, newSettings) => new Buffer([
				Number(input),
				Number(newSettings.closing_alarm_mode_sound),
				Number(newSettings.closing_alarm_mode_volume),
				Number(newSettings.closing_alarm_enabled)
			])
		},
		closing_alarm_mode_sound: {
			index: 38,
			size: 4,
			parser: (input, newSettings) => new Buffer([
				Number(newSettings.closing_alarm_mode_led_frequency),
				Number(input),
				Number(newSettings.closing_alarm_mode_volume),
				Number(newSettings.closing_alarm_enabled)
			])
		},
		closing_alarm_mode_volume: {
			index: 38,
			size: 4,
			parser: (input, newSettings) => new Buffer([
				Number(newSettings.closing_alarm_mode_led_frequency),
				Number(newSettings.closing_alarm_mode_sound),
				Number(input),
				Number(newSettings.closing_alarm_enabled)
			])
		},
		closing_alarm_enabled: {
			index: 38,
			size: 4,
			parser: (input, newSettings) => new Buffer([
				Number(newSettings.closing_alarm_mode_led_frequency),
				Number(newSettings.closing_alarm_mode_sound),
				Number(newSettings.closing_alarm_mode_volume),
				Number(input)
			])
		},
		unknown_alarm_mode_led_frequency: {
			index: 39,
			size: 4,
			parser: (input, newSettings) => new Buffer([
				Number(input),
				Number(newSettings.unknown_alarm_mode_sound),
				Number(newSettings.unknown_alarm_mode_volume),
				Number(newSettings.unknown_alarm_enabled)
			])
		},
		unknown_alarm_mode_sound: {
			index: 39,
			size: 4,
			parser: (input, newSettings) => new Buffer([
				Number(newSettings.unknown_alarm_mode_led_frequency),
				Number(input),
				Number(newSettings.unknown_alarm_mode_volume),
				Number(newSettings.unknown_alarm_enabled)
			])
		},
		unknown_alarm_mode_volume: {
			index: 39,
			size: 4,
			parser: (input, newSettings) => new Buffer([
				Number(newSettings.unknown_alarm_mode_led_frequency),
				Number(newSettings.unknown_alarm_mode_sound),
				Number(input),
				Number(newSettings.unknown_alarm_enabled)
			])
		},
		unknown_alarm_enabled: {
			index: 39,
			size: 4,
			parser: (input, newSettings) => new Buffer([
				Number(newSettings.unknown_alarm_mode_led_frequency),
				Number(newSettings.unknown_alarm_mode_sound),
				Number(newSettings.unknown_alarm_mode_volume),
				Number(input)
			])
		},
		closed_alarm_mode_led_frequency: {
			index: 40,
			size: 4,
			parser: (input, newSettings) => new Buffer([
				Number(input),
				Number(newSettings.closed_alarm_mode_sound),
				Number(newSettings.closed_alarm_mode_volume),
				Number(newSettings.closed_alarm_enabled)
			])
		},
		closed_alarm_mode_sound: {
			index: 40,
			size: 4,
			parser: (input, newSettings) => new Buffer([
				Number(newSettings.closed_alarm_mode_led_frequency),
				Number(input),
				Number(newSettings.closed_alarm_mode_volume),
				Number(newSettings.closed_alarm_enabled)
			])
		},
		closed_alarm_mode_volume: {
			index: 40,
			size: 4,
			parser: (input, newSettings) => new Buffer([
				Number(newSettings.closed_alarm_mode_led_frequency),
				Number(newSettings.closed_alarm_mode_sound),
				Number(input),
				Number(newSettings.closed_alarm_enabled)
			])
		},
		closed_alarm_enabled: {
			index: 40,
			size: 4,
			parser: (input, newSettings) => new Buffer([
				Number(newSettings.closed_alarm_mode_led_frequency),
				Number(newSettings.closed_alarm_mode_sound),
				Number(newSettings.closed_alarm_mode_volume),
				Number(input)
			])
		},
		report_type_state_changed: {
			index: 80,
			size: 1,
			parser: input => new Buffer([Number(input)])
		},
		sensor_pairing: {
			index: 241,
			size: 4,
			parser: input => {
				if (input) return new Buffer([85, 85, 85, 1]);
				return new Buffer([0, 0, 0, 0]);
			}
		}
	}
});
