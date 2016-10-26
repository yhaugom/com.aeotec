'use strict';

const path = require('path');
const ZwaveDriver = require('homey-zwavedriver');

// http://www.pepper1.net/zwavedb/device/781
// http://www.zwaveproducts.com/product-documentation/AeonLabs-ZW062-A1_manual.pdf

module.exports = new ZwaveDriver(path.basename(__dirname), {
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
		32: {
			index: 32,
			size: 1,
			parser: input => new Buffer([(input) ? 1 : 0])
		},
		24: {
			index: 24,
			size: 1,
			parser: input => new Buffer([(input) ? 1 : 0])
		},
		371: {
			index: 37,
			size: 4,
			parser: (input, newSettings) => new Buffer([
				Number(input),
				Number(newSettings.opening_alarm_mode_sound),
				Number(newSettings.opening_alarm_mode_volume),
				Number(newSettings.opening_alarm_enabled)
			])
		},
		372: {
			index: 37,
			size: 4,
			parser: (input, newSettings) => new Buffer([
				Number(newSettings.opening_alarm_mode_led_frequency),
				Number(input),
				Number(newSettings.opening_alarm_mode_volume),
				Number(newSettings.opening_alarm_enabled)
			])
		},
		373: {
			index: 37,
			size: 4,
			parser: (input, newSettings) => new Buffer([
				Number(newSettings.opening_alarm_mode_led_frequency),
				Number(newSettings.opening_alarm_mode_sound),
				Number(input),
				Number(newSettings.opening_alarm_enabled)
			])
		},
		374: {
			index: 37,
			size: 4,
			parser: (input, newSettings) => new Buffer([
				Number(newSettings.opening_alarm_mode_led_frequency),
				Number(newSettings.opening_alarm_mode_sound),
				Number(newSettings.opening_alarm_mode_volume),
				Number(input)
			])
		},
		381: {
			index: 38,
			size: 4,
			parser: (input, newSettings) => new Buffer([
				Number(input),
				Number(newSettings.closing_alarm_mode_sound),
				Number(newSettings.closing_alarm_mode_volume),
				Number(newSettings.closing_alarm_enabled)
			])
		},
		382: {
			index: 38,
			size: 4,
			parser: (input, newSettings) => new Buffer([
				Number(newSettings.closing_alarm_mode_led_frequency),
				Number(input),
				Number(newSettings.closing_alarm_mode_volume),
				Number(newSettings.closing_alarm_enabled)
			])
		},
		383: {
			index: 38,
			size: 4,
			parser: (input, newSettings) => new Buffer([
				Number(newSettings.closing_alarm_mode_led_frequency),
				Number(newSettings.closing_alarm_mode_sound),
				Number(input),
				Number(newSettings.closing_alarm_enabled)
			])
		},
		384: {
			index: 38,
			size: 4,
			parser: (input, newSettings) => new Buffer([
				Number(newSettings.closing_alarm_mode_led_frequency),
				Number(newSettings.closing_alarm_mode_sound),
				Number(newSettings.closing_alarm_mode_volume),
				Number(input)
			])
		},
		391: {
			index: 39,
			size: 4,
			parser: (input, newSettings) => new Buffer([
				Number(input),
				Number(newSettings.unknown_alarm_mode_sound),
				Number(newSettings.unknown_alarm_mode_volume),
				Number(newSettings.unknown_alarm_enabled)
			])
		},
		392: {
			index: 39,
			size: 4,
			parser: (input, newSettings) => new Buffer([
				Number(newSettings.unknown_alarm_mode_led_frequency),
				Number(input),
				Number(newSettings.unknown_alarm_mode_volume),
				Number(newSettings.unknown_alarm_enabled)
			])
		},
		393: {
			index: 39,
			size: 4,
			parser: (input, newSettings) => new Buffer([
				Number(newSettings.unknown_alarm_mode_led_frequency),
				Number(newSettings.unknown_alarm_mode_sound),
				Number(input),
				Number(newSettings.unknown_alarm_enabled)
			])
		},
		394: {
			index: 39,
			size: 4,
			parser: (input, newSettings) => new Buffer([
				Number(newSettings.unknown_alarm_mode_led_frequency),
				Number(newSettings.unknown_alarm_mode_sound),
				Number(newSettings.unknown_alarm_mode_volume),
				Number(input)
			])
		},
		401: {
			index: 40,
			size: 4,
			parser: (input, newSettings) => new Buffer([
				Number(input),
				Number(newSettings.closed_alarm_mode_sound),
				Number(newSettings.closed_alarm_mode_volume),
				Number(newSettings.closed_alarm_enabled)
			])
		},
		402: {
			index: 40,
			size: 4,
			parser: (input, newSettings) => new Buffer([
				Number(newSettings.closed_alarm_mode_led_frequency),
				Number(input),
				Number(newSettings.closed_alarm_mode_volume),
				Number(newSettings.closed_alarm_enabled)
			])
		},
		403: {
			index: 40,
			size: 4,
			parser: (input, newSettings) => new Buffer([
				Number(newSettings.closed_alarm_mode_led_frequency),
				Number(newSettings.closed_alarm_mode_sound),
				Number(input),
				Number(newSettings.closed_alarm_enabled)
			])
		},
		404: {
			index: 40,
			size: 4,
			parser: (input, newSettings) => new Buffer([
				Number(newSettings.closed_alarm_mode_led_frequency),
				Number(newSettings.closed_alarm_mode_sound),
				Number(newSettings.closed_alarm_mode_volume),
				Number(input)
			])
		},
		80: {
			index: 80,
			size: 1
		},
		241: {
			index: 241,
			size: 4,
			parser: input => {
				if (input) return new Buffer([85, 85, 85, 1]);
				return new Buffer([0, 0, 0, 0]);
			}
		}
	}
});
