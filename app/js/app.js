'use strict';

/* Browser */

document.addEventListener('DOMContentLoaded', function () {
  if (!Notification) {
    alert('Desktop notifications not available in your browser. Try Chromium.');
    return;
  }
  if (Notification.permission !== 'granted') {
    Notification.requestPermission();
  }
});

$(document).ready(function () {
  console.log('ready!');

  if (Session.start().authentication()) {
    Checkbox.set('notification', Session.start().get().notification);
    $('#user').val(Session.start().get().user);
    $('#user').blur();
    $('#color').val(Session.start().get().color);
  }
});

/* App */

var APP = new Firebase('https://mirc-9ea63.firebaseio.com/');

$('#user').blur(function (e) {
  if (Number($('#user').val().trim().length) > 0) {
    var msg = 'Acabou de Entrar...';
    var user = $('#user').val().trim();
    var color = Utils.getUserColor();
    var notification = Checkbox.get('notification');

    $('#user').prop('disabled', true);

    Session.start().set({
      user: user,
      color: color,
      notification: notification,
    });

    APP.push({
      user: user,
      color: color,
      msg: msg,
      date: moment().format('YYYY-MM-DD'),
      hour: moment().format('HH:mm:ss'),
      notification: notification,
    });

    $('#msg').val('');
  }
});

$('#notification').click(function (e) {
  var user = $('#user').val().trim();
  var color = Utils.getUserColor();
  var notification = Checkbox.get('notification');

  Session.start().set({
    user: user,
    color: color,
    notification: notification,
  });
});

$('#msg').keypress(function (e) {
  if (!Session.start().authentication()) {
    console.log('Atenção. Favor realizar o login antes de continuar.');
    return;
  }

  if (e.keyCode === 13) {
    var msg = $('#msg').val();
    var user = $('#user').val().trim();
    var color = $('#color').val().trim();
    var notification = Checkbox.get('notification');
    APP.push({
      user: user,
      color: color,
      msg: msg,
      date: moment().format('YYYY-MM-DD'),
      hour: moment().format('HH:mm:ss'),
      notification: notification,
    });
    $('#msg').val('');
  }
});

APP.on('child_added', function (snap) {
  var s = snap.val();
  if (s.date === moment().format('YYYY-MM-DD')) {
    Mirc.addMsg(s.user, s.msg, s.date, s.hour, s.color);
  }
});

APP.endAt()
  .limit(1)
  .on('child_added', function (snap) {
    var s = snap.val();
    if ($('#user').val() !== s.user && s.date === moment().format('YYYY-MM-DD') && Checkbox.get('notification') === true) {
      Mirc.addNotificationMsg(s.user, s.msg, s.date, s.hour);
    }
  });

var Utils = {
  getUserColor: function () {
    var $color = $('#color').val().trim();
    if (!$color) {
      $('#color').val(Utils.getRandomColor());
      $color = $('#color').val().trim();
    }
    return $color;
  },
  getRandomColor: function () {
    var letters = '0123456789ABCDEF';
    var color = '#';
    for (var i = 0; i < 6; i++) {
      color += letters[Math.floor(Math.random() * 16)];
    }
    return color;
  },
};

var Checkbox = {
  get: function (id) {
    return document.getElementById(id).checked;
  },
  set: function (id, checked) {
    document.getElementById(id).checked = checked;
  },
};

var Mirc = {
  addMsg: function (user, msg, date, hour, color) {
    var str = color ? '<strong style="color: #000; background-color: ' + color + '"/>' : '<strong/>';

    $('<div/>')
      .text(' ' + msg)
      .prepend($(str).text('[' + hour + '] <' + user + '>'))
      .prependTo($('#chat'));
    $('#chat')[0].scrollTop = $('#chat')[0].scrollHeight;
  },
  addNotificationMsg: function (user, msg, date, hour) {
    console.log(Notification.permission)
    if (Notification.permission === 'granted' && window.location.href !== "http://emalherbi.com/emm/mirc/") {
      new Notification('MIRC', {
        body: '[' + hour + '] <' + user + '> ' + msg,
      });
    }
  },
};

var Session = {
  start: function () {
    var service = {
      model: 'mirc-9ea63',
    };
    service.set = function (model) {
      window.localStorage.setItem(service.model, JSON.stringify(model));
    };
    service.get = function () {
      return JSON.parse(window.localStorage.getItem(service.model));
    };
    service.remove = function () {
      window.localStorage.removeItem(service.model);
      return true;
    };
    service.authentication = function () {
      return service.get() !== null;
    };
    return service;
  },
};
