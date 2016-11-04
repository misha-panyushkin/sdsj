var list = []
$('table').find('tbody:eq(1)').find('tr').map((i, tr) => {
  const srcOfImageConditions = $(tr).find('td:eq(4)').find('img').attr('src') || ''
  list.push({
    date: {
      day: $(tr).find('td:eq(0)').html(),
      year: 2014,
      month: 8,
    },
    data: {
      temperature: $(tr).find('td:eq(1)').html(),
      pressure: $(tr).find('td:eq(2)').html(),
      storm: !!(srcOfImageConditions.indexOf('storm') + 1),
      rain: !!(srcOfImageConditions.indexOf('rain') + 1),
      snow: !!(srcOfImageConditions.indexOf('snow') + 1),
    }
  })
})
JSON.stringify(list)