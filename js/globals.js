//CANVAS DISPLAY + BUTTON BEHAVIOR
let reserveBtn = document.getElementById('reserve-btn');
let canvasForm = document.getElementById('signature-form');
let formPad = document.getElementById('UserForm');
let cancelBtn = document.getElementById('cancel');
let saveBtn = document.getElementById('save');
let clearBtn = document.getElementById('clear');
let userUI = document.getElementById('user-information');
let message = document.getElementById('reservNone');
let oldMessage = document.getElementById('reservOK');
let cancelReservation = document.getElementById('cancelReservation');
let userAccess = document.getElementById('userAccess');
var user;
var timer;
var reservation;
var toggleInfo;
var canvasObj;