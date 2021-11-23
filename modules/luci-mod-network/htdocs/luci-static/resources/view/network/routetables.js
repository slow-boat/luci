'use strict';
'require view';
'require fs';
'require ui';

return view.extend({
	load: function() {
		return L.resolveDefault(fs.read('/etc/iproute2/rt_tables'), '');
	},

	handleSave: function(ev) {
		var value = (document.querySelector('textarea').value || '').trim().replace(/\r\n/g, '\n') + '\n';

		return fs.write('/etc/iproute2/rt_tables', value).then(function(rc) {
			document.querySelector('textarea').value = value;
			ui.addNotification(null, E('p', _('Contents have been saved.')), 'info');
		}).catch(function(e) {
			ui.addNotification(null, E('p', _('Unable to save contents: %s').format(e.message)));
		});
	},

	render: function(user) {
		return E([
			E('h2', _('Routing Tables')),
			E('p', {}, _('Edit the routing table list')),
			E('p', {}, E('textarea', { 'style': 'width:100%', 'rows': 25 }, [ user != null ? user : '' ]))
		]);
	},

	handleSaveApply: null,
	handleReset: null
});
