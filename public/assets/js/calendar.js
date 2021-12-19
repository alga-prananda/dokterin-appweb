// Kalender 
$(document).ready(function() {
    
    $('#calendar').fullCalendar({
        header: {
            left: 'prev,next today',
            center: 'title',
            right: 'month,basicWeek,basicDay'
        },
        defaultDate: '2021-12-12',
        navLinks: true, 
        editable: true,
        eventLimit: true, 
        events: [
            {
                title: 'Acara sepanjang hari',
                start: '2021-12-12'
            },
            {
                title: 'Acara Panjang',
                start: '2021-12-12',
                end: '2021-12-14'
            },
            {
                id: 999,
                title: 'Acara berulang',
                start: '2021-12-12T16:00:00'
            },
            {
                id: 999,
                title: 'Acara berulang',
                start: '2021-12-14T16:00:00'
            },
            {
                title: 'Pertemuan',
                start: '2021-12-13',
                end: '2021-12-14'
            },
            {
                title: 'Pertemuan',
                start: '2021-12-13T10:30:00',
                end: '2021-12-13T12:30:00'
            },
            {
                title: 'Makan siang',
                start: '2021-12-12T12:00:00'
            },
            {
                title: 'Pertemuan',
                start: '2021-12-12T14:30:00'
            },
            {
                title: 'Happy Hour',
                start: '2021-12-12T17:30:00'
            },
            {
                title: 'Makan malam',
                start: '2021-12-12T20:00:00'
            },
            {
                title: 'Pesta ulang tahun',
                start: '2021-12-13T07:00:00'
            },
            {
                title: 'Klik untuk Google',
                url: 'https://google.com/',
                start: '2021-12-14'
            }
        ]
    });
});